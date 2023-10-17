import { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import Announcement from "../../components/Announcement";
import Newsletter from "../../components/Newsletter";
import Footer from "../../components/Footer";
import {
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Stack,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { publicRequest } from "../../requestMethods";

const FAQ = () => {
  const [faqs, setFaqs] = useState([]);
  const [expanded, setExpanded] = useState(0);

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };
  useEffect(() => {
    const getFaqs = async () => {
      try {
        const res = await publicRequest.get("/faq");
        setFaqs(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getFaqs();
  }, []);
  return (
    <Box>
      <Announcement />
      <Navbar />
      <Stack
        width={{ xs: "95%", sm: "80%", md: "65%" }}
        margin="0 auto"
        spacing={4}
        py={8}
      >
        <Box
          p={2}
          textAlign="center"
          bgcolor="teal"
          color="white"
          borderRadius="8px"
        >
          <Typography variant={"h5"} fontSize={{ xs: "20px", sm: "25px" }}>
            Frequently Asked Questions
          </Typography>
        </Box>
        <Box>
          {faqs.map((faq, index) => (
            <Accordion
              expanded={expanded === index}
              onChange={handleChange(index)}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography variant="body2" textTransform="capitalize">
                  {faq?.question}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant="body1">{faq?.answer}</Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>
      </Stack>
      <Newsletter />
      <Footer />
    </Box>
  );
};

export default FAQ;
