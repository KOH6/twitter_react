import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import { Stack, Typography } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";

const navItems = [
  {
    icon: <HomeIcon sx={{ fontSize: 40 }} />,
    href: "/",
    title: "ホーム",
  },
  {
    icon: <NotificationsIcon sx={{ fontSize: 40 }} />,
    href: "/",
    title: "通知",
  },
  {
    icon: <MailOutlineIcon sx={{ fontSize: 40 }} />,
    href: "/",
    title: "メッセージ",
  },
  {
    icon: <BookmarkBorderIcon sx={{ fontSize: 40 }} />,
    href: "/",
    title: "ブックマーク",
  },
  {
    icon: <PersonOutlineIcon sx={{ fontSize: 40 }} />,
    href: "/",
    title: "プロフィール",
  },
  {
    icon: <ExitToAppIcon sx={{ fontSize: 40 }} />,
    href: "/",
    title: "退会",
  },
];

export const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex flex-row flex-1">
        <aside className="pl-3 pt-3 w-80 border-r-2 fixed z-40 h-screen translate-x-0">
          <nav className="h-full px-3 py-4 overflow-y-auto">
            <div className="pl-3 mb-5">
              <svg
                className="w-[36px] h-[36px] text-gray-800 dark:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  fill="currentColor"
                  d="M12.186 8.672 18.743.947h-2.927l-5.005 5.9-4.44-5.9H0l7.434 9.876-6.986 8.23h2.927l5.434-6.4 4.82 6.4H20L12.186 8.672Zm-2.267 2.671L8.544 9.515 3.2 2.42h2.2l4.312 5.719 1.375 1.828 5.731 7.613h-2.2l-4.699-6.237Z"
                />
              </svg>
            </div>
            <ul className="space-y-2 font-medium">
              {navItems.map(({ icon, href, title }) => (
                <li className="mx-2 py-4" key={title}>
                  <NavLink to={href}>
                    <Stack
                      direction="row"
                      justifyContent="flex-start"
                      alignItems="center"
                      spacing={3}
                    >
                      {icon}
                      <Typography variant="h5">{title}</Typography>
                    </Stack>
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
        </aside>
        <main className="flex-1 p-4 ml-80">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
