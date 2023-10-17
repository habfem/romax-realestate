import { Box, Divider, styled } from "@mui/material";
import Range from "./range";
import Type from "./type";

export const CustomDivider = styled(Divider)`
  margin: 16px 0px 24px;
  border-width: 0px 0px thin;
  border-style: solid;
  border-color: rgb(243, 245, 249);
`;

const Filter = () => {
  return (
    <>
      <Range />
      <CustomDivider />

      <Type />
      <CustomDivider />
    </>
  );
};

export default Filter;
