import React from "react";
import { useNavigate } from "react-router-dom";

import {
  Avatar,
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardHeader,
  Icon,
} from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

export const SideBarFooter = (props) => {
  const { user, handleLogout } = props;
  const navigate = useNavigate();

  return (
    <Card
      variant="outlined"
      sx={{
        width: "100%",
        border: "none",
        margin: "0 auto",
      }}
    >
      <CardActionArea
        onClick={(e) => {
          navigate(`/${user.user_name}`);
        }}
      >
        <CardHeader
          sx={{ p: 1 }}
          avatar={
            <CardActions
              sx={{
                zIndex: 10000,
              }}
              disableSpacing
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/${user.user_name}`);
              }}
            >
              <Avatar
                sx={{
                  height: "40px",
                  width: "40px",
                  p: 0,
                  "&:hover": {
                    cursor: "pointer",
                    opacity: "0.8",
                  },
                }}
                alt={`${user.name}`}
                src={`${user.profile_image_path}`}
              />
            </CardActions>
          }
          action={
            <Icon>
              <MoreHorizIcon />
            </Icon>
          }
          title={`${user.name}`}
          titleTypographyProps={{
            variant: "body1",
            fontWeight: "bold",
            px: 1,
          }}
          subheader={"@".concat(`${user.user_name}`)}
          subheaderTypographyProps={{ px: 1 }}
        />
      </CardActionArea>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Button
          type="submit"
          variant="outlined"
          size="large"
          onClick={handleLogout}
          sx={{
            borderRadius: 50,
            fontWeight: "bold",
            width: "80%",
          }}
        >
          ログアウト
        </Button>
      </Box>
    </Card>
  );
};
