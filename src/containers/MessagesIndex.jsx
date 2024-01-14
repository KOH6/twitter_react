import React from "react";
import { useParams } from "react-router-dom";

import { Card } from "@mui/material";

export const MessagesIndex = () => {
  const { group_id } = useParams();

  return (
    <>
      メッセージ画面やで{group_id}
      <div className="min-h-screen flex flex-col">
        <div className="flex flex-row flex-1">
          <aside className="pl-3 pt-3 w-80 border-r-2  z-40 h-screen translate-x-0">
            <Card></Card>
          </aside>
        </div>
      </div>
    </>
  );
};
