import React, { useState } from "react";

import { Box, Menu, MenuItem } from "@mui/material";

export const ExpandableMenu = (props) => {
  const [anchorEl, setAnchorEl] = useState(false);
  const open = Boolean(anchorEl);

  const handleClick = (e, func) => {
    e.stopPropagation();
    func();
  };

  return (
    <>
      <Box
        sx={{
          zIndex: 10000,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "5vh",
          width: "5vh",
          p: 0,
          "&:hover": {
            background: "#E4E4E4",
            borderRadius: "50%",
            opacity: 0.99,
          },
        }}
        onClick={(e) => handleClick(e, () => setAnchorEl(e.currentTarget))}
      >
        {props.displayIcon}
      </Box>
      <Menu
        id="fade-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={(e) => handleClick(e, () => setAnchorEl(false))}
      >
        {props.menuItems.map((item) => (
          <MenuItem
            key={item.title}
            sx={{ p: 1, fontWeight: "bold", color: item.fontColor }}
            onClick={(e) => handleClick(e, item.onClick)}
          >
            {item.icon} {item.title}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};
