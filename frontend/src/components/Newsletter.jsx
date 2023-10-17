import {
  Box,
  TextField,
  InputAdornment,
  Button,
  Typography,
  useMediaQuery
} from "@mui/material";
import { Send } from "@material-ui/icons";

const Newsletter = () => {
  const isNonMobile = useMediaQuery("(min-width:815px)");
  return (
    <Box
      sx={{
        height: "300px",
        backgroundColor: "rgb(252, 245, 245)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <Typography
        variant="h5"
        fontSize={{xs: "34px", md:"40px"}}
        letterSpacing="2px"
        textTransform="uppercase"
      >
        Newsletter
      </Typography>
      <Typography
        variant={{xs: "subtitle1", md:"body2"}}
        color="#7d879c"
        textTransform="uppercase"
        textAlign="center"
        letterSpacing="1px"
        mt={1}
        mb={3}
      >
        Get updates on our latest properties.{" "}
      </Typography>

      <TextField
        placeholder="Enter Your Email Address"
        variant="outlined"
        // fullWidth
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <Button
                sx={{
                  textTransform: "none",
                  bgcolor: "teal",
                  color: "white",
                  paddingX: isNonMobile ? "40px": "20px",
                  fontSize: "16px",
                  fontWeight: "600",
                  letterSpacing: "1px",
                  paddingY: "8px",
                  borderLeft: "1px solid #7D879C",
                  justifyContent: "space-between",
                  borderTopRightRadius: "1200px",
                  borderBottomRightRadius: "1200px",
                  height: "100%",
                  "&:hover": {
                    backgroundColor: "#119595",
                  },
                }}
              >
                <Send/>
              </Button>
            </InputAdornment>
          ),
        }}
        sx={{
          width: isNonMobile ? "60%": "95%",
          paddingRight: 0,
          "& .MuiOutlinedInput-root": {
            borderRadius: "1200px",
            padding: "0px 0px 0px 20px !important",
            "& .MuiAutocomplete-input": {
              padding: "1px !important",
              fontSize: "14px",
            },
            "& .MuiInputAdornment-positionEnd": {
              height: "100%",
              maxHeight: "100%",
            },
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "teal",
          },
        }}
      />
    </Box>
  );
};

export default Newsletter;
