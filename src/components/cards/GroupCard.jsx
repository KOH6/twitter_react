import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Avatar,
  Box,
  Card,
  CardActions,
  CardContent,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import { formatDate } from "../../lib/utility";

export const GroupCard = (props) => {
  const { group } = props;
  const [updatedAt, setUpdatedAt] = useState("");
  const [latestSummary, setLatestSummary] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // 最新メッセージが取得できない場合、部屋が作られた日付を使用する
    const updatedDateString = group.latest_message
      ? group.latest_message.created_at
      : group.created_at;

    if (updatedDateString)
      setUpdatedAt(formatDate(new Date(updatedDateString)));

    if (group.latest_message) setLatestSummary(group.latest_message.content);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Card
      variant="outlined"
      sx={{
        textAlign: "center",
        borderRight: "none",
        borderLeft: "none",
        borderRadius: "0%",
      }}
    >
      <CardContent style={{ paddingTop: "0.2rem", paddingBottom: "0.2rem" }}>
        <Grid container>
          <Grid item xs={1} sx={{ p: 1 }}>
            <CardActions
              sx={{
                zIndex: (theme) => theme.zIndex.appBar + 1,
                p: 0,
                m: 0,
              }}
              disableSpacing
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/${group.user.user_name}`);
              }}
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
                alt={`${group.user.name}`}
                src={`${group.user.profile_image_path}`}
              />
            </CardActions>
          </Grid>
          <Grid item xs={11} sx={{ py: 1 }}>
            <Stack
              direction="column"
              justifyContent="center"
              alignItems="flex-start"
              spacing={0.5}
              sx={{ px: 3 }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "start",
                }}
              >
                <Typography
                  variant="body2"
                  noWrap
                  sx={{
                    maxWidth: "30%",
                    textAlign: "left",
                    fontWeight: "bold",
                    color: "black",
                  }}
                >
                  {group.user.name}
                </Typography>
                <Typography
                  variant="body2"
                  noWrap
                  sx={{ pl: 1, maxWidth: "30%" }}
                >
                  @{group.user.user_name}
                </Typography>
                <Typography variant="body2" noWrap sx={{ maxWidth: "50%" }}>
                  ・{updatedAt}
                </Typography>
              </Box>
              <Typography variant="body2" noWrap sx={{ maxWidth: "100%" }}>
                {latestSummary}
              </Typography>
            </Stack>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};
