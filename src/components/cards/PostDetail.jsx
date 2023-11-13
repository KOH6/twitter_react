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
          <Grid item xs={1} sx={{ textAlign: "left" }}>
            <PersonIcon fontSize="large" />
          </Grid>
          <Grid item xs={11}>
            <Typography variant="body1" sx={{ textAlign: "left" }} gutterBottom>
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
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};
