import React from "react";

import TextField from "@mui/material/TextField";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Button from "@mui/material/Button";
import { Box, Grid } from "@mui/material";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import ImageIcon from "@mui/icons-material/Image";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export const PostForm = (props) => {
  const { post, handleChange, handleSubmit } = props;

  return (
    <form>
      <Card sx={{ width: "50%", margin: "3rem auto", textAlign: "center" }}>
        <CardContent>
          <Grid container spacing={2}>
            <Grid xs={1}>
              <ImageIcon />
            </Grid>
            <Grid xs={11}>
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
        </CardContent>
      </Card>
    </form>
  );
};
