import React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";

import { UserDetail } from "../components/details/UserDetail";
import { currentUserState } from "../globalStates/atoms";
import { useRecoilValue } from "recoil";
import { PostCard } from "../components/cards/PostCard";
import { Card, Container } from "@mui/material";

export const UsersShow = () => {
  const currentUser = useRecoilValue(currentUserState);

  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Container>
      <Card variant="outlined">
        <UserDetail user={currentUser} />
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList
              onChange={handleChange}
              aria-label="lab API tabs example"
              centered
              variant="fullWidth"
            >
              <Tab label="Item One" value="1" />
              <Tab label="Item Two" value="2" />
              <Tab label="Item Three" value="3" />
            </TabList>
          </Box>
          <TabPanel value="1">Item One</TabPanel>
          <TabPanel value="2">Item Two</TabPanel>
          <TabPanel value="3">Item Three</TabPanel>
        </TabContext>
        {currentUser.tweets.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </Card>
    </Container>
  );
};
