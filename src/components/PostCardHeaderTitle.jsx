import React from "react";
import { Stack, Typography } from "@mui/material";

export const PostCardHeaderTitle = (props) => {
  const { header, subHeader } = props;

  return (
    <Stack
      direction="row"
      justifyContent="flex-start"
      alignItems="center"
      spacing={0}
    >
      <Typography
        variant="body1"
        sx={{ fontWeight: "bold", textAlign: "left" }}
      >
        {header}
      </Typography>
      <Typography variant="body1" sx={{ color: "grey", px: 1 }}>
        {subHeader}
      </Typography>
    </Stack>
  );
};
