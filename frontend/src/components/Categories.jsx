import { categories } from "../data";
import CategoryItem from "./CategoryItem";
import { Grid, useMediaQuery } from "@mui/material";

const Categories = () => {
  const isNonMobile = useMediaQuery("(min-width:968px)");

  return (
    <Grid
      container
      spacing={3}
      sx={{
        padding: isNonMobile ? 5 : 2,
        marginTop: "0 !important",
      }}
    >
      {categories.map((cat) => (
        <Grid item xs={12} sm={6} md={4}>
          <CategoryItem {...cat} />
        </Grid>
      ))}
    </Grid>
  );
};

export default Categories;
