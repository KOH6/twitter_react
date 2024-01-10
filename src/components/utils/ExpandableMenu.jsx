import React, { useState } from "react";

import { Menu, MenuItem } from "@mui/material";
import IconButton from "@mui/material/IconButton";

export const ExpandableMenu = (props) => {
  const [anchorEl, setAnchorEl] = useState(false);
  const open = Boolean(anchorEl);

  const handleClick = (e, func) => {
    e.stopPropagation();
    // item.onClick();
    func(e);
  };

  const handleOpen = (e) => {
    e.stopPropagation();
    setAnchorEl(e.currentTarget);
  };

  const handleClose = (e) => {
    e.stopPropagation();
    setAnchorEl(false);
  };

  return (
    <>
      <IconButton
        sx={{
          p: 0,
          zIndex: 10000,
        }}
        disableSpacing
        onClick={(e) => handleOpen(e)}
      >
        {props.displayIcon}
      </IconButton>
      <Menu
        id="fade-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={(e) => handleClose(e)}
      >
        {props.menuItems.map((item) => (
          <MenuItem onClick={(e) => handleClick(e, item.onClick)}>
            {item.icon} {item.title}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};
