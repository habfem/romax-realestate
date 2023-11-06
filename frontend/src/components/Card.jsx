import { Box, Stack, Typography } from "@mui/material";
import HotelOutlinedIcon from "@mui/icons-material/HotelOutlined";
import { useNavigate } from "react-router";

const Card = ({ _id, title, location, price, img }) => {
  const navigate = useNavigate();

  return (
    <Box
      onClick={() => navigate(`/product/${_id}`)}
      sx={{
        display: "flex",
        flexDirection: "column",
        cursor: "pointer",
        width: "100%",
        backgroundColor: "rgb(255, 255, 255)",
        boxShadow: "rgb(161, 161, 172) 0px 2px 6px",
        borderColor: "rgb(113, 113, 132)",
        borderRadius: "8px",
      }}
    >
      <Box
        sx={{
          height: "200px",
          width: "100%",
          borderRadius: "5px 5px 0px 0px",
        }}
      >
        <img
          style={{
            height: "100%",
            width: "100%",
            objectFit: "cover",
            borderRadius: "5px 5px 0px 0px",
          }}
          alt="Property"
          src={img ? img[0] : ""}
        />
      </Box>
      <Box bgcolor="#f4f4f5" p={2} sx={{}}>
        <Typography color="primary.main" variant="h6" fontSize="22px">
          {`₦ ${price?.toLocaleString()}`}
        </Typography>
      </Box>
      <Box bgcolor="white" px={2} py={3} borderRadius="0 0 5px 5px ">
        <Typography variant="body2">
          {title?.length > 30 ? `${title.substring(0, 30)}...` : title}
        </Typography>

        <Typography mt={1} color="#7D879C" variant="subtitle2">
          {location?.length > 45 ? `${location.substring(0, 45)}...` : location}
        </Typography>
      </Box>
    </Box>
  );
};

export default Card;
