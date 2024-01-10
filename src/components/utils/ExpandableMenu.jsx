import React, { useState } from "react";

import { Menu, MenuItem } from "@mui/material";
import IconButton from "@mui/material/IconButton";

export const ExpandableMenu = (props) => {
  const [anchorEl, setAnchorEl] = useState(false);
  const open = Boolean(anchorEl);

  const handleClick = (e, func) => {
    e.stopPropagation();
    func();
  };

  return (
    <>
      <IconButton
        sx={{
          p: 0,
          zIndex: 10000,
        }}
        disableSpacing
        onClick={(e) => handleClick(e, () => setAnchorEl(e.currentTarget))}
      >
        {props.displayIcon}
      </IconButton>
      <Menu
        id="fade-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={(e) => handleClick(e, () => setAnchorEl(false))}
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
