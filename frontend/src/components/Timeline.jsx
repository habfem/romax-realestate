import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Timeline, TimelineItem } from 'vertical-timeline-component-for-react';
import {
  Grid,
  useMediaQuery,
  Box
} from "@mui/material";
import Loader from './Loader';

const Timelines = () => {
  const isNonMobile = useMediaQuery("(min-width:968px)");
  const [timelines, setTimelines] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get('https://romax-real-estate.onrender.com/api/timeline')
      .then((response) => {
        setTimelines(response.data);
        setLoading(false);
        console.log(response.data)
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, []);

  return (
    <>
      {loading ? ( // Display Loader component when loading is true
        <Loader />
      ) : (
        <Timeline lineColor={'#ddd'}>
          {timelines.map((item) => (
            <TimelineItem
              key={item._id}
              dateText={
                <div style={{ backgroundColor: '#eb8510', color: 'white' }}>
                  {item.dateText}
                </div>
              }
            >
              {item.img && ( // Check if there is a valid img URL
                <Grid
                  container
                  spacing={1}
                  sx={{
                    padding: isNonMobile ? 1 : 2,
                    marginTop: "0 !important",
                  }}
                >
                  <Box
                    sx={{
                      backgroundImage: `url(${item.img})`,
                      backgroundSize: "cover",
                      backgroundRepeat: "no-repeat",
                      padding: "20px",
                      height: "400px",
                      width: "100%",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      boxShadow: "rgb(161, 161, 172) 0px 2px 6px",
                      borderRadius: "8px",
                    }}
                  ></Box>
                </Grid>
              )}
              <h3>{item.title}</h3>
              <h4>{item.subtitle}</h4>
              <p>{item.paragraph}</p>
              {item.paragraph2 && <p>{item.paragraph2}</p>}
            </TimelineItem>
          ))}
        </Timeline>
      )}
    </>
  );
};

export default Timelines;
