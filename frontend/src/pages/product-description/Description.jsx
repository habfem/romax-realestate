import {
  List,
  ListItem,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
const Description = ({ desc, features }) => {
  return (
    <Stack spacing={2}>
      <Stack>
        <Typography variant="body2"> Description</Typography>
        <Typography>{desc}</Typography>
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
          {features?.map((f, index) => (
            <ListItem
              key={index}
              disablePadding
              sx={{
                paddingY: "3px",
              }}
            >
              <ListItemText primary={f} />
            </ListItem>
          ))}
        </List>
      </Stack>
    </Stack>
  );
};

export default Description;
