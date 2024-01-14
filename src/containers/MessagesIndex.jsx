import React, { useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";
import { useNavigate, useParams } from "react-router-dom";

import { Avatar, CardActions, Typography } from "@mui/material";

import { GroupCard } from "../components/cards/GroupCard";

import { loadingState } from "../globalStates/atoms";
import { fetchGroups, fetchMessages } from "../apis/messages";
import { MessageCard } from "../components/cards/MessageCard";

const MessageLists = (props) => {
  const { group, messages } = props;
  const navigate = useNavigate();

  return (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
        }}
      >
        <CardActions
          sx={{ p: 0, m: 0 }}
          disableSpacing
          onClick={(e) => navigate(`/${group.user.user_name}`)}
        >
          <Avatar
            sx={{
              height: "4vh",
              width: "4vh",
              "&:hover": {
                cursor: "pointer",
                opacity: "0.8",
              },
            }}
            alt={`${group?.user.name}`}
            src={`${group?.user.profile_image_path}`}
          />
        </CardActions>
        <Typography variant="h5" sx={{ m: 2, fontWeight: "bold" }}>
          {group?.user.name}
        </Typography>
      </div>
      {messages.map((message) => (
        <MessageCard
          key={message.id}
          otherUser={group?.user}
          message={message}
        />
      ))}
    </div>
  );
};

export const MessagesIndex = () => {
  const [groups, setGroups] = useState([]);
  const [messages, setMessages] = useState([]);
  const setLoading = useSetRecoilState(loadingState);

  const { group_id } = useParams();

  const displayingGroup = groups.find((group) => group.id === Number(group_id));

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const groupResponse = await fetchGroups();
        setGroups(groupResponse.data);

        if (group_id) {
          const messagesResponse = await fetchMessages(group_id);
          setMessages(messagesResponse.data);
        }
      } catch (err) {
        console.log("err", err);
      } finally {
        setLoading(false);
      }
    })();
    // 別グループへのURL遷移を検知
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [group_id]);

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
              displayingGroupId={displayingGroup?.id}
            />
          ))}
        </div>
        <div className="px-2 w-3/5 overflow-y-auto">
          {displayingGroup && (
            <MessageLists group={displayingGroup} messages={messages} />
          )}
        </div>
      </div>
    </>
  );
};
