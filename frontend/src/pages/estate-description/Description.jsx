import {
  List,
  ListItem,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
const Description = () => {
  const features = [
    "4 Bedrooms",
    "CCTV",
    "24 Hour Security",
    "3 Car parking",
    "Dwarf Fencing",
    "Smart Automation available for maximum comfort",
    "All room en-suite apartments including a visitor's toilet in the main lounge (sitting room)",
    "2 Large sitting rooms, one each on the ground and first floors",
    "Spacious master bedroom with terrace (balcony) furnished with modern wardrobes.",
  ];
  return (
    <Stack spacing={2}>
      <Stack>
        <Typography variant="body2"> Description</Typography>
        <Typography>
          {" "}
          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
          dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
          proident, sunt in culpa qui officia deserunt mollit anim id est
          laborum,sunt in culpa qui officia deserunt mollit anim id est
          laborum.,
        </Typography>
      </Stack>

      <Stack>
        <Typography variant="body2"> Features:</Typography>
        <List
          sx={{
            "&.MuiList-root": {
              paddingY: "5px",
            },
          }}
        >
          {features.map((f, index) => (
            <ListItem key={index} disablePadding sx={{
              paddingY: "3px"
            }}>
              <ListItemText primary={f} />
            </ListItem>
          ))}
        </List>
      </Stack>
    </Stack>
  );
};

export default Description;
