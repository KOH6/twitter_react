import React from "react";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { Box, Grid, Stack, Typography } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";

import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import RepeatIcon from "@mui/icons-material/Repeat";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";

export const PostDetail = (props) => {
  const { post } = props;

  return (
    <Card
      variant="outlined"
      sx={{ width: "50%", margin: "0 auto", textAlign: "center" }}
    >
      <CardContent>
        <Grid container>
          <Grid item xs={1} sx={{ textAlign: "left" }}>
            <PersonIcon fontSize="large" />
          </Grid>
          <Grid item xs={11}>
            <Typography
              variant="body1"
              sx={{ px: 3, textAlign: "left" }}
              gutterBottom
            >
              {post.content}
            </Typography>
            {post.image_paths.map((image_path, index) => (
              <img
                key={index}
                src={image_path}
                style={{
                  width: "80%",
                  margin: "1rem auto",
                  borderRadius: "10px",
                }}
                alt=""
              />
            ))}
            <Box sx={{ mt: 2 }}>
              <Stack
                spacing={{ xs: 1, sm: 2 }}
                direction="row"
                useFlexGap
                flexWrap="wrap"
                justifyContent="space-around"
              >
                <ChatBubbleOutlineIcon />
                <RepeatIcon />
                <FavoriteBorderIcon />
                <BookmarkBorderIcon />
              </Stack>
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};
