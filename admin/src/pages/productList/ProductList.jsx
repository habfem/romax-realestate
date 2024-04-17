import "./productList.css";
import { useState, useEffect } from "react";
import {
  Stack,
  Typography,
  IconButton,
  Chip,
  Switch,
  Grid,
  Box
} from "@mui/material";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getProducts,
  resetState,
  deleteProduct,
} from "../../redux/productRedux";
import Header from "../../components/Header";
import makeToast from "../../toaster";
import { Edit, Delete } from "@material-ui/icons";

export default function ProductList() {
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      dispatch(getProducts());
    };
    fetchData();
  }, [searchQuery]);
  const productState = useSelector((state) => state.product);
  const { isSuccess, isError, isLoading, deletedProduct } = productState;
  useEffect(() => {
    if (deletedProduct) {
      makeToast("success", "Product deleted successfully!");
      dispatch(resetState());
      dispatch(getProducts());
    }
    if (isError) {
      makeToast("error", "Something went wrong");
    }
  }, [deletedProduct, isError]);

  const filteredProducts = productState.products.filter((product) =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const products = filteredProducts.map((product) => ({
    id: product._id,
    title: product.title,
    price: product.price,
    inStock: product?.inStock,
    action: null,
  }));
  return (
    <Box sx={{
      px: 2,
    }}>
      <Header
        title={"Property List"}
        placeholder="Search Property..."
        button="Add Property"
        route="product/create"
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      <Box sx={{
        height: "80vh"
      }}>
        <DataGrid
          rows={products}
          columns={[
            {
              field: "title",
              headerName: "Property Title",
              width: 300,

            },
            {
              field: "price", headerName: "Price", width: 200, headerAlign: "center",
              align: "center",
            },

            {
              field: "inStock",
              headerName: "Stock",
              width: 150,
              headerAlign: "center",
              align: "center",
              renderCell: ({ value }) => (
                <Chip label={value} sx={{ height: "25px" }} />
              ),
            },

            {
              field: "action",
              headerName: "Action",
              width: 200,
              headerAlign: "center",
              align: "center",
              renderCell: ({ row }) => (
                <Stack direction="row">
                  <Link to={`/product/${row.id}`}>
                    <IconButton aria-label="Edit">
                      <Edit />
                    </IconButton>
                  </Link>
                  <IconButton
                    aria-label="Delete"
                    disabled={isLoading}
                    onClick={() => {
                      dispatch(deleteProduct(row.id));
                    }}
                  >
                    <Delete />
                  </IconButton>
                </Stack>
              ),
            },
          ]}
        />
      </Box>

    </Box>
  );
}

