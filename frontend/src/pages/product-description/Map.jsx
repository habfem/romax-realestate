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

  const streetViewURL = `https://www.google.com/maps/embed?pb=!3m2!1sen!2sng!4v1707140494131!5m2!1sen!2sng!6m8!1m7!1s5QPqTESWceMIwAMjkXcr_g!2m2!1d9.00629720178299!2d7.270159733240058!3f175.6531677246094!4f-1.6252365112304688!5f0.7820865974627469`;
  const satelliteViewURL = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3940.628832061897!2d7.2669306747132225!3d9.006258891054172!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x104e7195d1abacc9%3A0xc905ee88d56fa2ff!2sNnamdi%20Azikiwe%20International%20Airport!5e0!3m2!1sen!2sng!4v1707140705524!5m2!1sen!2sng`;

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
