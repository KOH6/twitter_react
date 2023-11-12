import React from "react";

import TextField from "@mui/material/TextField";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import { Box, Grid } from "@mui/material";
import ImageIcon from "@mui/icons-material/Image";

import { ImageUploader } from "../ImageUploader.jsx";

export const PostForm = (props) => {
  const { post, images, setImages, handleChange, handleSubmit } = props;

  return (
    <form>
      <Card sx={{ width: "50%", margin: "3rem auto", textAlign: "center" }}>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item={true} xs={1}>
              <ImageIcon />
            </Grid>
            <Grid item={true} xs={11}>
              <TextField
                required
                fullWidth
                multiline
                rows={4}
                margin="normal"
                name="content"
                value={post.content}
                InputLabelProps={{ shrink: true }}
                onChange={handleChange}
              />
            </Grid>
          </Grid>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div>
              <ImageIcon />
            </div>
            <div>
              <Button
                sx={{ margin: "1rem auto" }}
                type="submit"
                variant="contained"
                size="large"
                onClick={handleSubmit}
              >
                ポストする
              </Button>
            </div>
          </Box>
          <ImageUploader images={images} setImages={setImages} />
        </CardContent>
      </Card>
    </form>
  );
};
