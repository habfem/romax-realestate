import { Box, Stack, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

function CategoryItem({ img, title, cat }) {
  const navigate = useNavigate()
  return (
    <Box
      sx={{
        backgroundImage: `url(${img})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        padding: "20px",
        height: "300px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        boxShadow: "rgb(161, 161, 172) 0px 2px 6px",
        borderRadius: "8px",
      }}
    >
      <Stack spacing={1}>
        <Typography variant="h5" color="white" textAlign="center">
          {title}
        </Typography>
        <Button
          onClick={() => navigate("/products")}
          sx={{
            textTransform: "none",
            bgcolor: "teal",
            color: "white",
            fontSize: "14px",
            paddingX: "18px",
            fontWeight: 600,
            paddingY: "8px",
            alignSelf: "center",
            display: "flex",
            gap: "10px",
            borderRadius: "16px",
            "&:hover": {
              backgroundColor: "#119595",
            },
          }}
        >
          SEE NOW
        </Button>
      </Stack>
    </Box>
  );
}

export default CategoryItem;
