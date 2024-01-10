import React, { useState } from "react";

import { Icon, Menu, MenuItem } from "@mui/material";

export const ExpandableMenu = (props) => {
  const [anchorEl, setAnchorEl] = useState(false);
  const open = Boolean(anchorEl);

  const handleClick = (e, func) => {
    e.stopPropagation();
    func();
  };

  return (
    <>
      <Icon
        sx={{
          p: 0,
          zIndex: 10000,
        }}
        onClick={(e) => handleClick(e, () => setAnchorEl(e.currentTarget))}
      >
        {props.displayIcon}
      </Icon>
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
