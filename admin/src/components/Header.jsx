import {
  Stack,
  Typography,
  Button,
  TextField,
  InputAdornment,
  styled,
} from "@mui/material";
import { Link } from "react-router-dom";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Add, Search } from "@material-ui/icons";

const Header = ({
  title,
  button,
  placeholder,
  route,
  searchQuery,
  setSearchQuery,
}) => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
 
  return (
    <Stack spacing={3} mb={3}>
      <Typography variant="h6" fontSize={{ xs: "19px", sm: "21px" }}>
        {title}
      </Typography>
      <Stack
        justifyContent="space-between"
        direction={{ xs: "column", sm: "row" }}
        rowGap={{ xs: 2, sm: 0 }}
      >
        <TextField
          placeholder={placeholder}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }}
          variant="outlined"
          size="small"
          sx={{
            width: "350px",
            "& .MuiOutlinedInput-root": {
              borderRadius: "10px",
              backgroundColor: "white",
              padding: "5px 12px",
            },
          }}
        />
        {button && (
          <Link to={`/${route}`}>
            <Button
              sx={{
                textTransform: "none",
                bgcolor: "#4e97fd",
                color: "white",
                fontSize: "16px",
                paddingX: "15px",
                fontWeight: 600,
                paddingY: "13px",
                alignSelf: isNonMobile ? "start" : "stretch",
                borderRadius: "10px",
                alignItems: "center",
                width: isNonMobile ? "auto" : "100%",
                gap: 1,

                "&:hover": {
                  backgroundColor: "#2756b6",
                },
              }}
            >
              <Add />
              <Typography variant="body2">{button}</Typography>
            </Button>
          </Link>
        )}
      </Stack>
    </Stack>
  );
};

export default Header;
