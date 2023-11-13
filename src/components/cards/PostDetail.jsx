import React from "react";

import TextField from "@mui/material/TextField";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { Grid, Typography } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";

export const PostDetail = (props) => {
  const { post } = props;

  return (
    <Card
      variant="outlined"
      sx={{ width: "50%", margin: "0 auto", textAlign: "center" }}
    >
      <CardContent>
        <Grid container>
          <Grid item xs={3} sm={2} md={1} sx={{ textAlign: "left" }}>
            <PersonIcon fontSize="large" />
          </Grid>
          <Grid item xs={9} sm={10} md={11}>
            <Typography variant="body1" sx={{ textAlign: "left" }} gutterBottom>
              {post.content}
            </Typography>
          </Grid>
          {post.images &&
            post.images.map((image, index) => (
              <Grid
                key={index}
                item
                xs={4}
                sx={{
                  display: "flex",
                  justifyContent: "start",
                  alignItems: "center",
                  position: "relative",
                }}
              >
                <img
                  src={URL.createObjectURL(image)}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                    aspectRatio: "1 / 1",
                  }}
                  alt=""
                />
              </Grid>
            ))}
        </Grid>
      </CardContent>
    </Card>
  );
};
