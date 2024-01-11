import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useRecoilState, useSetRecoilState } from "recoil";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Card, Box, Tab } from "@mui/material";

import { UserDetail } from "../components/details/UserDetail";
import { PostCard } from "../components/cards/PostCard";
import { currentUserState, loadingState } from "../globalStates/atoms";
import { fetchUser } from "../apis/users";

export const UsersShow = () => {
  const [currentUser, setCurrentUser] = useRecoilState(currentUserState);

  const setLoading = useSetRecoilState(loadingState);
  const [user, setUser] = useState(null);
  const [isLoggedInUser, setIsLoggedInUser] = useState(false);
  const { user_name } = useParams();
  const navigate = useNavigate();

  const profileTabs = [
    {
      label: "ポスト",
      value: "posts",
      items: user?.tweets.map((post) => (
        <PostCard
          key={post.id}
          post={post}
          afterDeletePost={() => afterDeletePost()}
        />
      )),
    },
    {
      label: "コメント一覧",
      value: "comments",
      items: "item2",
    },
    {
      label: "いいね",
      value: "likes",
      items: "item3",
    },
    {
      label: "フォロー",
      value: "followings",
      items: "item4",
    },
  ];

  const defaultTab = profileTabs[0].value;
  const [selectedTab, setSelectedTab] = useState(defaultTab);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const res = await fetchUser(user_name);
        setUser(res.data);
        setIsLoggedInUser(user_name === currentUser.user_name);
      } catch (err) {
        // データがなかった場合、NotFoundページに遷移する
        console.log("err", err);
        navigate("/not_found");
      } finally {
        setLoading(false);
      }
    })();
    // 別ユーザプロフィールへのURL遷移とログインユーザ情報の更新を検知
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user_name, currentUser]);

  /**
   * 投稿削除後は投稿一覧を含んだユーザ情報を再取得する
   */
  const afterDeletePost = async () => {
    const res = await fetchUser(user_name);
    setCurrentUser(res.data);
  };

  return (
    <>
      {/* 初期描画時の画面ちらつき対策で、userの存在を明示的に確認した上でコンポーネントを描画する */}
      {user && (
        <Card variant="outlined" sx={{ border: "none", px: 0 }}>
          <UserDetail user={user} isLoggedInUser={isLoggedInUser} />
          <TabContext value={selectedTab}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList
                onChange={(e, selectedValue) => {
                  setSelectedTab(selectedValue);
                }}
                centered
                variant="fullWidth"
              >
                {profileTabs.map((tab) => (
                  <Tab key={tab.value} label={tab.label} value={tab.value} />
                ))}
              </TabList>
            </Box>
            {profileTabs.map((tab) => (
              <TabPanel sx={{ p: 0 }} key={tab.value} value={tab.value}>
                {tab.items}
              </TabPanel>
            ))}
          </TabContext>
        </Card>
      )}
    </>
  );
};
