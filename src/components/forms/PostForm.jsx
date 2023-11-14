import React from "react";

import TextField from "@mui/material/TextField";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import { Grid } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";

import { ImageUploader } from "../ImageUploader.jsx";

export const PostForm = (props) => {
  const { post, images, setImages, handleChange, handleSubmit } = props;

  return (
    <form>
      <Card sx={{ width: "80%", margin: "3rem auto", textAlign: "center" }}>
        <CardContent>
          <Grid container>
            <Grid item xs={3} sm={2} md={1} sx={{ textAlign: "left" }}>
              <PersonIcon fontSize="large" />
            </Grid>
            <Grid item xs={9} sm={10} md={11}>
              <TextField
                required
                fullWidth
                multiline
                rows={4}
                name="content"
                value={post.content}
                InputLabelProps={{ shrink: true }}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sx={{ mt: 7 }}>
              <ImageUploader images={images} setImages={setImages} />
            </Grid>
            <Grid item xs={12} sx={{ textAlign: "right" }}>
              <Button
                type="submit"
                variant="contained"
                size="large"
                onClick={handleSubmit}
              >
                ポストする
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </form>
  );
};
