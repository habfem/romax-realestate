import { useState } from "react";
import { Tabs, Tab, Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, } from "@mui/material";
//import Description from "./Description";

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
                      {product?.parlourDesc}
                    </Typography>
                  </div>
                </TableCell>
                <TableCell>
                  <div>
                    <Typography variant="subtitle1">
                    {product?.parlourDimension}
                    </Typography>
                  </div>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <div>
                    <Typography variant="body2">Kitchen</Typography>
                    <Typography variant="subtitle1">
                      {product?.kitchenDesc}
                    </Typography>
                  </div>
                </TableCell>
                <TableCell>
                  <div>
                    <Typography variant="subtitle1">
                    {product?.kitchenDimension}
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
              {product.rooms.map((room, index) => (
              <TableRow key={index}>
              <TableCell>
              <div>
                <Typography variant="body2">{room?.title}</Typography>
                <Typography variant="subtitle1">{room?.description}</Typography>
              </div>
              </TableCell>
              <TableCell>
                <div>
                  <Typography variant="subtitle1">{room?.dimensions}</Typography>
                </div>
                </TableCell>
              </TableRow>
              ))}
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
            {product.otherSpace.map((space, index) => (
              <TableRow key={index}>
                <TableCell>
                  <div>
                    <Typography variant="body2">{space?.title}</Typography>
                    <Typography variant="subtitle1">{space?.description}</Typography>
                  </div>
                </TableCell>
                <TableCell>
                  <div>
                    <Typography variant="subtitle1">{space?.dimensions}</Typography>
                  </div>
                </TableCell>
              </TableRow>
              ))}
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
            {product.OutsideSpace.map((outside, index) => (
              <TableRow key={index}>
                <TableCell>
                  <div>
                    <Typography variant="body2">{outside?.title}</Typography>
                    <Typography variant="subtitle1">{outside?.description}</Typography>
                  </div>
                </TableCell>
                <TableCell>
                  <div>
                    <Typography variant="subtitle1">{outside?.dimensions}</Typography>
                  </div>
                </TableCell>
              </TableRow>
            ))}
            </TableBody>
          </Table>
        </TableContainer>
      </TabPanel>
    </Box>
  );
};

export default TabComponent;
