import React, { useState, useEffect } from 'react';
import { userRequest } from '../../requestMethods';
import { useLocation } from "react-router-dom";
import LaunchIcon from '@mui/icons-material/Launch';

const Map = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const [mapType, setMapType] = useState('roadmap'); // Initial map type
  const [product, setProduct] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productResponse = await userRequest.get(`/products/${id}`);
        setProduct(productResponse.data); 
        console.log(productResponse.data)
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, [id])

  const streetViewURL = product.streetView;
  const satelliteViewURL = product.sataliteView;

  const openInNewTab = (url) => {
    window.open(url, '_blank');
  };

  return (
    <div style={{ position: 'relative' }}>
      <div style={{ position: 'absolute', top: '20px', right: '20px', zIndex: '1', display: 'flex', gap: '10px' }}>
        <button onClick={() => openInNewTab(streetViewURL)} sx={{bgcolor: "primary.main"}} style={buttonStyle}>
         <> Street View <LaunchIcon /></>
        </button>
        <button onClick={() => openInNewTab(satelliteViewURL)} style={buttonStyle}>
         <> Satellite View <LaunchIcon /> </>
        </button>
      </div>
      <iframe
        src={mapType === 'street' ? streetViewURL : satelliteViewURL}
        width="100%"
        height="450"
        style={{ border: '0' }}
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
  );
};

const buttonStyle = {
  padding: '10px 20px',
  fontSize: '16px',
  backgroundColor: '#003366',
  color: 'white',
  border: '1px solid #fff',
  borderRadius: '5px',
  cursor: 'pointer',
};

export default Map;
