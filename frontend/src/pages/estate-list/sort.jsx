import {
  Box,
  Stack,
  IconButton,
  FormControl,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";

import FilterListIcon from "@mui/icons-material/FilterList";
import useMediaQuery from "@mui/material/useMediaQuery";

const Sort = ({ openDrawer, sort, setSort }) => {
  const isNonMobile = useMediaQuery("(min-width:968px)");

  return (
    <Box
      bgcolor="white"
      p={{ xs: 1.2, sm: 2 }}
      borderRadius="5px"
      sx={{
        boxShadow: "0px 1px 3px rgba(3, 0, 71, 0.09)",
      }}
    >
      {" "}
      <Stack
        direction={"row"}
        justifyContent="space-between"
        alignItems="center"
      >
        <Typography variant="h6">
          {" "}
          447{" "}
          <span
            style={{
              fontSize: "14px",
              fontWeight: "400",
            }}
          >
            results
          </span>{" "}
        </Typography>

        <Stack direction="row" spacing={1} alignItems="center">
          <Stack direction="row" spacing={1} alignItems="center">
            <Typography display={{ xs: "none", sm: "block" }}>
              Sort By:
            </Typography>
            <FormControl
              size="small"
              sx={{
                flex: 1,
              }}
            >
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={sort}
                onChange={(e) => {
                  setSort(e.target.value);
                }}
              >
                <MenuItem value={"highest"}>Highest Price</MenuItem>
                <MenuItem value={"lowest"}>Lowest Price</MenuItem>
                <MenuItem value={"newest"}>Newest Price</MenuItem>
                <MenuItem value={"oldest"}>Oldest Price</MenuItem>
              </Select>
            </FormControl>
          </Stack>
          <IconButton
            onClick={openDrawer}
            sx={{
              display: isNonMobile ? "none" : "inline-flex",
            }}
          >
            <FilterListIcon />
          </IconButton>
        </Stack>
      </Stack>
    </Box>
  );
};

export default Sort;
