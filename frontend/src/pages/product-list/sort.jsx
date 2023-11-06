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
import { setSort } from "../../redux/filter";
import { useSelector, useDispatch } from "react-redux";

const Sort = ({ openDrawer, products }) => {
  const dispatch = useDispatch();
  const { sort } = useSelector((state) => state.filter);
  const isNonMobile = useMediaQuery("(min-width:968px)");

  return (
    <Box
      bgcolor="white"
      p={{ xs: 1.2, sm: 2 }}
      borderRadius="10px"
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
          {products?.length}
          <span
            style={{
              fontSize: "14px",
              fontWeight: "400",
              marginLeft: 2,
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
                  dispatch(setSort(e.target.value));
                }}
                sx={{
                  borderRadius: "10px",
                }}
              >
                <MenuItem value={"highest"}>Highest </MenuItem>
                <MenuItem value={"lowest"}>Lowest </MenuItem>
                <MenuItem value={"newest"}>Newest </MenuItem>
                <MenuItem value={"oldest"}>Oldest </MenuItem>
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
