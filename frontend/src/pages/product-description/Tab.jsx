import { useState } from "react";
import { Tabs, Tab, Box, Stack, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, } from "@mui/material";
import Description from "./Description";

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

const TabComponent = ({ product }) => {
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
            label="Room Sizes"
            sx={{
              textTransform: "none",
              fontSize: "16px",
            }}
          />
          <Tab
            label="Other Spaces"
            sx={{
              textTransform: "none",
              fontSize: "16px",
            }}
          />
           <Tab
            label="Outside Space"
            sx={{
              textTransform: "none",
              fontSize: "16px",
            }}
          />
        </Tabs>
      </Box>

      <TabPanel value={selectedTab} index={0}>
      <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Living Area</TableCell>
                <TableCell>Dimensions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>
                  <div>
                    <Typography variant="body2">Parlour</Typography>
                    <Typography variant="subtitle1">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis libero quidem necessitatibus! Libero, ipsa! Magni vero quam aut sed mollitia. Inventore amet atque numquam quas odit esse aspernatur, quasi deserunt!
                    </Typography>
                  </div>
                </TableCell>
                <TableCell>
                  <div>
                    <Typography variant="subtitle1">
                    25m by 15m
                    </Typography>
                  </div>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <div>
                    <Typography variant="body2">Kitchen</Typography>
                    <Typography variant="subtitle1">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque, harum.
                    </Typography>
                  </div>
                </TableCell>
                <TableCell>
                  <div>
                    <Typography variant="subtitle1">
                    15m by 15m
                    </Typography>
                  </div>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </TabPanel>
      <TabPanel value={selectedTab} index={1}>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Room</TableCell>
                <TableCell>Dimensions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>
                  <div>
                    <Typography variant="body2">Room 1:</Typography>
                    <Typography variant="subtitle1">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis libero quidem necessitatibus! Libero, ipsa! Magni vero quam aut sed mollitia. Inventore amet atque numquam quas odit esse aspernatur, quasi deserunt!
                    </Typography>
                  </div>
                </TableCell>
                <TableCell>
                  <div>
                    <Typography variant="subtitle1">
                    25m by 15m
                    </Typography>
                  </div>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <div>
                    <Typography variant="body2">Room 2:</Typography>
                    <Typography variant="subtitle1">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque, harum.
                    </Typography>
                  </div>
                </TableCell>
                <TableCell>
                  <div>
                    <Typography variant="subtitle1">
                    15m by 15m
                    </Typography>
                  </div>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </TabPanel>
      <TabPanel value={selectedTab} index={2}>
      <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Space</TableCell>
                <TableCell>Dimensions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>
                  <div>
                    <Typography variant="body2">Room 1:</Typography>
                    <Typography variant="subtitle1">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis libero quidem necessitatibus! Libero, ipsa! Magni vero quam aut sed mollitia. Inventore amet atque numquam quas odit esse aspernatur, quasi deserunt!
                    </Typography>
                  </div>
                </TableCell>
                <TableCell>
                  <div>
                    <Typography variant="subtitle1">
                    25m by 15m
                    </Typography>
                  </div>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <div>
                    <Typography variant="body2">Room 2:</Typography>
                    <Typography variant="subtitle1">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque, harum.
                    </Typography>
                  </div>
                </TableCell>
                <TableCell>
                  <div>
                    <Typography variant="subtitle1">
                    15m by 15m
                    </Typography>
                  </div>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </TabPanel>
      <TabPanel value={selectedTab} index={3}>
      <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Outside Area</TableCell>
                <TableCell>Dimensions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>
                  <div>
                    <Typography variant="body2">Room 1:</Typography>
                    <Typography variant="subtitle1">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis libero quidem necessitatibus! Libero, ipsa! Magni vero quam aut sed mollitia. Inventore amet atque numquam quas odit esse aspernatur, quasi deserunt!
                    </Typography>
                  </div>
                </TableCell>
                <TableCell>
                  <div>
                    <Typography variant="subtitle1">
                    25m by 15m
                    </Typography>
                  </div>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <div>
                    <Typography variant="body2">Room 2:</Typography>
                    <Typography variant="subtitle1">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque, harum.
                    </Typography>
                  </div>
                </TableCell>
                <TableCell>
                  <div>
                    <Typography variant="subtitle1">
                    15m by 15m
                    </Typography>
                  </div>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </TabPanel>
    </Box>
  );
};

export default TabComponent;
