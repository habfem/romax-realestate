import { useState, useRef, useEffect } from 'react';
import {
  Box,
  //Button,
  //ButtonGroup,
  VStack,
  Flex,
  HStack,
  IconButton,
  Input,
  Skeleton,
  Select,
  //SkeletonText,
  Text,
} from '@chakra-ui/react'
import {
//  TextField,
// Grid,
// Container,
// Typography,
  Button,
  ButtonGroup,
  Typography,
// IconButton
} from '@mui/material';
//import { FaLocationArrow, FaTimes } from 'react-icons/fa'

import ClearIcon from '@mui/icons-material/Clear';
import { userRequest } from '../requestMethods';
import { useLocation } from "react-router-dom";
import NearMeIcon from '@mui/icons-material/NearMe';
import CloseFullscreenIcon from '@mui/icons-material/CloseFullscreen';
import OpenInFullIcon from '@mui/icons-material/OpenInFull';
import {
  useJsApiLoader,
  GoogleMap,
  Marker,
  Autocomplete,
  DirectionsRenderer,
} from '@react-google-maps/api';

const center = { lat: 48.8584, log: 2.2945 }

function TravelTime() {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyBJZonCnd--SkMsOqKTk-JV23VJ1wCanMY", // Replace with your API key
    libraries: ["places"],
  });
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const [map, setMap] = useState(/** @type google.maps.Map */ (null))
  const [isMinimized, setIsMinimized] = useState(false);
  const [directionsResponse, setDirectionsResponse] = useState(null)
  const [distance, setDistance] = useState('')
  const [duration, setDuration] = useState('')
  const [product, setProduct] = useState('');
  const [travelMode, setTravelMode] = useState('DRIVING')

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
  
   /** @type React.MutableRefObject<HTMLInputElement> */
   const originRef = useRef()
   //console.log(product.address)
   /** @type React.MutableRefObject<HTMLInputElement> */
   const destiantionRef = useRef()
    
  if (!isLoaded) {
    return (<Skeleton />)
  }

  async function calculateRoute() {
    if (originRef.current.value === '' || destiantionRef.current.value === '') {
      return
    }
    // eslint-disable-next-line no-undef
    const directionsService = new google.maps.DirectionsService()
    const results = await directionsService.route({
      origin: originRef.current.value,
      destination: destiantionRef.current.value,
      // eslint-disable-next-line no-undef
      travelMode: google.maps.TravelMode.DRIVING,
    })
    setDirectionsResponse(results)
    setDistance(results.routes[0].legs[0].distance.text)
    setDuration(results.routes[0].legs[0].duration.text)
  }

  function clearRoute() {
    setDirectionsResponse(null)
    setDistance('')
    setDuration('')
    originRef.current.value = product?.address
    destiantionRef.current.value = ''
  }

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  return (
    <Flex
      position='relative'
      flexDirection='column'
      alignItems='center'
      h={['auto', '100%']}
      w='100%'
    >
      <Box position='absolute' left={0} top={0} h='100%' w='100%'>
        {/* Google Map Box */}
        <GoogleMap
          center={center}
          zoom={15}
          mapContainerStyle={{ width: '100%', height: '100%' }}
          options={{
            zoomControl: false,
            streetViewControl: false,
            mapTypeControl: false,
            fullscreenControl: false,
          }}
          onLoad={map => setMap(map)}
        >
          <Marker position={center} />
          {directionsResponse && (
            <DirectionsRenderer directions={directionsResponse} />
          )}
        </GoogleMap>
      </Box>
      <Box
        p={4}
        borderRadius='lg'
        m={4}
        //bgColor='white'
        shadow='base'
        minW='container.md'
        zIndex='1'
        bg='rgba(255, 255, 255, 0.7)'
        display={isMinimized ? 'none' : 'block'} 
      >
       <VStack spacing={4} alignItems='stretch'>
        <Typography variant='h6'>Calculate travel time</Typography>
          <HStack spacing={2} justifyContent='space-between' style={{ height: '40px', width: '275px' }}>
            <Autocomplete>
              <Input type='text' placeholder='Origin' value={product?.address} ref={originRef} style={{ height: '30px', width: '275px', borderRadius: '6px' }} />
            </Autocomplete>
            </HStack>
          <HStack spacing={2} justifyContent='space-between' style={{ height: '40px', width: '275px' }}>
            <Autocomplete>
              <Input type='text' placeholder='Destination' ref={destiantionRef} style={{ height: '30px', width: '275px', borderRadius: '6px' }} />
            </Autocomplete>
          </HStack>
          <Select style={{ height: '30px', width: '275px', borderRadius: '6px' }}>
            <option value="driving">Driving</option>
            <option value="cycling">Cycling</option>
            <option value="walking">Walking</option>
          </Select>
          <HStack spacing={4} justifyContent='center' alignItems='center'>
            <ButtonGroup >
              <Button type='submit' onClick={calculateRoute} style={{ height: '30px' }}>
                Calculate
              </Button>
              <IconButton aria-label='center back' icon={<ClearIcon />} onClick={clearRoute} style={{ height: '30px' }} />
            </ButtonGroup>
          </HStack>
          <HStack spacing={4} mt={4} justifyContent='space-between'>
            <Typography style={{ fontSize: '12px' }}>Distance: {distance} </Typography>
            <Typography style={{ fontSize: '12px' }}>Duration: {duration} </Typography>
            {/* <IconButton
              aria-label='center back'
              icon={<NearMeIcon />}
              isRound
              onClick={() => {
                map.panTo(center)
                map.setZoom(15)
              }}
            /> */}
          </HStack>
        </VStack>
      </Box>
      <Button onClick={toggleMinimize}>
        {isMinimized ? <CloseFullscreenIcon /> : <OpenInFullIcon />}
      </Button>
    </Flex>
   );
}

export default TravelTime;