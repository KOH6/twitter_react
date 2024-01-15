import React from "react";
import { useNavigate } from "react-router-dom";

import { Avatar, CardActions, Typography } from "@mui/material";

import { GroupCard } from "../components/cards/GroupCard";

import { MessageCard } from "../components/cards/MessageCard";
import { MessageForm } from "../components/forms/MessageForm";
import { useMessagesFetch } from "../hooks/posts/useMessagesFetch";

const MessageLists = (props) => {
  const { group, messages, refName } = props;
  const navigate = useNavigate();

  return (
    <>
      <div
        style={{
          position: "fixed",
          top: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
          background: "white",
          width: "100%",
          opacity: "0.9",
        }}
      >
        <CardActions
          sx={{ p: 0, m: 0 }}
          disableSpacing
          onClick={() => navigate(`/${group.user.user_name}`)}
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
        <div>
          <Typography variant="h5" sx={{ m: 2, fontWeight: "bold" }}>
            {group?.user.name}
          </Typography>
        </div>
      </div>
      <div style={{ paddingTop: "5vh" }}>
        {messages?.map((message) => (
          <MessageCard
            key={message.id}
            otherUser={group?.user}
            message={message}
          />
        ))}
        <div ref={refName}></div>
      </div>
    </>
  );
};

export const MessagesIndex = () => {
  const {
    groups,
    displayingGroup,
    messages,
    messagesBottom,
    fetchInitialGroups,
    scrollToBottom,
  } = useMessagesFetch();

  return (
    <div className="h-screen flex flex-row flex-1">
      <div className="w-2/5 border-r-2 overflow-y-auto">
        <Typography variant="h5" sx={{ m: 2, fontWeight: "bold" }}>
          メッセージ
        </Typography>
        {groups?.map((group) => (
          <GroupCard
            key={group.id}
            group={group}
            displayingGroupId={displayingGroup?.id}
          />
        ))}
      </div>
      <div className="h-full w-3/5">
        {displayingGroup && (
          <>
            <div className="h-[90%] px-2 border-b-2 overflow-y-auto">
              <MessageLists
                group={displayingGroup}
                messages={messages}
                refName={messagesBottom}
              />
            </div>
            <div className="h-[10%] pt-4">
              <MessageForm
                group={displayingGroup}
                reFetch={async () => {
                  await fetchInitialGroups();
                  scrollToBottom();
                }}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};
