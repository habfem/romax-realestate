import { useState, useEffect } from "react";
import {
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Stack,
  Typography,
  useMediaQuery,
  Button,
  IconButton,
  CircularProgress,
} from "@mui/material";
import { publicRequest, userRequest } from "../../requestMethods";
import { Add, ExpandMore, Delete, Edit } from "@material-ui/icons";
import { useNavigate } from "react-router";

const Faqs = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const navigate = useNavigate();
  const [faqs, setFaqs] = useState([]);
  const [deleteFlaq, setDeleteFlag] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getFaqs = async () => {
      setLoading(true);

      try {
        const res = await publicRequest.get("/faq");
        setLoading(false);
        setFaqs(res.data);
      } catch (error) {
        setLoading(false);

        console.log(error);
      }
    };
    getFaqs();
  }, [deleteFlaq]);

  const handleDeleteFaq = async (id) => {
    setLoading(true);
    try {
      const res = await userRequest.delete(`/faq/${id}`);
      if (res.data) {
        setLoading(false);
        setDeleteFlag(!deleteFlaq);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  return (
    <Box
      px={{ xs: 2, md: 4 }}
      sx={{
        flex: 4,
      }}
    >
      <Stack spacing={4}>
        <Stack
          justifyContent="space-between"
          direction={{ xs: "column", sm: "row" }}
          rowGap={{ xs: 2, sm: 0 }}
        >
          <Typography variant="h6" fontSize={{ xs: "19px", sm: "23px" }}>
            FAQs
          </Typography>

          <Button
            onClick={() => navigate("/faq/create")}
            sx={{
              textTransform: "none",
              bgcolor: "#4e97fd",
              color: "white",
              fontSize: "14px",
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
            <Typography variant="body2">Add New Faq</Typography>
          </Button>
        </Stack>
        {loading ? (
          <CircularProgress sx={{margin: "0 auto !important"}} />
        ) : faqs.length === 0 ? (
          <Typography variant="h5" textAlign="center">No FAQs Added Yet</Typography>
        ) : (
          <Box>
            {faqs.map((faq) => (
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMore />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    width="100%"
                  >
                    <Typography variant="body2" textTransform="capitalize">
                      {faq?.question}
                    </Typography>
                    <Box>
                      <IconButton onClick={() => navigate(`/faq/${faq._id}`)}>
                        <Edit />
                      </IconButton>
                      <IconButton
                        onClick={() => handleDeleteFaq(faq._id)}
                        disabled={loading}
                      >
                        <Delete />
                      </IconButton>
                    </Box>
                  </Stack>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography variant="body1">{faq?.answer}</Typography>
                </AccordionDetails>
              </Accordion>
            ))}
          </Box>
        )}
      </Stack>
    </Box>
  );
};

export default Faqs;
