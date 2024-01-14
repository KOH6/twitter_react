import React, { useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";
import { useNavigate, useParams } from "react-router-dom";

import { Typography } from "@mui/material";

import { GroupCard } from "../components/cards/GroupCard";

import { loadingState } from "../globalStates/atoms";
import { fetchGroups } from "../apis/messages";

export const MessagesIndex = () => {
  // const currentUser = useRecoilValue(currentUserState);

  const setLoading = useSetRecoilState(loadingState);
  const [groups, setGroups] = useState([]);
  const { group_id: displayingGroupId } = useParams();
  const navigate = useNavigate();

  console.log("groups", groups);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const res = await fetchGroups();
        setGroups(res.data);
      } catch (err) {
        // データがなかった場合、NotFoundページに遷移する
        console.log("err", err);
        navigate("/not_found");
      } finally {
        setLoading(false);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="h-screen flex flex-row flex-1 ">
        <div className="w-2/5 border-r-2 overflow-y-auto">
          <Typography variant="h5" sx={{ m: 2, fontWeight: "bold" }}>
            メッセージ
          </Typography>
          {groups.map((group) => (
            <GroupCard
              key={group.id}
              group={group}
              displayingGroupId={Number(displayingGroupId)}
            />
          ))}
        </div>
        <div className="w-3/5 overflow-y-auto">
          <Typography variant="h5" sx={{ m: 2, fontWeight: "bold" }}>
            画像とか相手のユーザ情報{displayingGroupId}
          </Typography>
        </div>
      </div>
    </>
  );
};
