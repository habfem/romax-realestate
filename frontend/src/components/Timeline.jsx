import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Timeline, TimelineItem } from 'vertical-timeline-component-for-react';
import Loader from './Loader';

const Timelines = () => {
  const [timelines, setTimelines] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get('https://romax-real-estate.onrender.com/api/timeline')
      .then((response) => {
        setTimelines(response.data);
        setLoading(false);
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
                <div style={{ backgroundColor: '#008080', color: 'white' }}>
                  {item.dateText}
                </div>
              }
            >
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
