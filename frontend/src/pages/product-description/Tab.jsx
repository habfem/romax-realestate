import { useState } from "react";
import { Tabs, Tab, Box, Stack, Typography } from "@mui/material";
import Description from "./Description";
import Reviews from "./Reviews";

const TabPanel = ({ children, value, index }) => (
  <div
    role="tabpanel"
    hidden={value !== index}
    id={`tabpanel-${index}`}
    aria-labelledby={`tab-${index}`}
  >
    {value === index && <Box py={3}>{children}</Box>}
  </div>
);

const TabComponent = ({product}) => {
  const [selectedTab, setSelectedTab] = useState(0);
  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={selectedTab}
          onChange={handleTabChange}
          variant="scrollable"
          scrollButtons
          allowScrollButtonsMobile
        >
          <Tab
            label="Property Description"
            sx={{
              textTransform: "none",
              fontSize: "16px",
            }}
          />
          <Tab
            label="Payment Plan"
            sx={{
              textTransform: "none",
              fontSize: "16px",
            }}
          />
          <Tab
            label="Property Reviews"
            sx={{
              textTransform: "none",
              fontSize: "16px",
            }}
          />
        </Tabs>
      </Box>

      <TabPanel value={selectedTab} index={0}>
        <Description desc={product.desc} features={product.features}/>
      </TabPanel>
      <TabPanel value={selectedTab} index={1}>
        <Stack spacing={1.5}>
          <Typography variant="body2">
            50% Initial deposit balance spread within 6 months.
          </Typography>

          <Stack>
            <Typography variant="subtitle1">Contact Number</Typography>
            <Typography>09019876493</Typography>
          </Stack>

          <Stack>
            <Typography variant="subtitle1">Tollfree Hotline</Typography>
            <Typography>0700080003</Typography>
          </Stack>
        </Stack>
      </TabPanel>
      <TabPanel value={selectedTab} index={2}>
        <Reviews />
      </TabPanel>
    </Box>
  );
};

export default TabComponent;
