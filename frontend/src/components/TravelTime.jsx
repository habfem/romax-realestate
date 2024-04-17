import { useState, useRef } from 'react';
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
// IconButton
} from '@mui/material';
//import { FaLocationArrow, FaTimes } from 'react-icons/fa'

import ClearIcon from '@mui/icons-material/Clear';
import NearMeIcon from '@mui/icons-material/NearMe';
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
    googleMapsApiKey: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxx", // Replace with your API key
    libraries: ["places"],
  });

  const [map, setMap] = useState(/** @type google.maps.Map */ (null))
  const [directionsResponse, setDirectionsResponse] = useState(null)
  const [distance, setDistance] = useState('')
  const [duration, setDuration] = useState('')
  const [travelMode, setTravelMode] = useState('DRIVING')
  
   /** @type React.MutableRefObject<HTMLInputElement> */
   const originRef = useRef()
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
    originRef.current.value = ''
    destiantionRef.current.value = ''
  }

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
      >
       <VStack spacing={4} alignItems='stretch'>
          <HStack spacing={2} justifyContent='space-between'>
            <Autocomplete>
              <Input type='text' placeholder='Origin' ref={originRef} />
            </Autocomplete>
            <Autocomplete>
              <Input type='text' placeholder='Destination' ref={destiantionRef} />
            </Autocomplete>
          </HStack>
          <Select>
            <option value="driving">Driving</option>
            <option value="cycling">Cycling</option>
            <option value="walking">Walking</option>
          </Select>
          <HStack spacing={2} justifyContent='center'>
            <ButtonGroup>
              <Button type='submit' onClick={calculateRoute}>
                Calculate
              </Button>
              <IconButton aria-label='center back' icon={<ClearIcon />} onClick={clearRoute} />
            </ButtonGroup>
          </HStack>
          <HStack spacing={4} mt={4} justifyContent='space-between'>
            <Text>Distance: {distance} </Text>
            <Text>Duration: {duration} </Text>
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
    </Flex>
   );
}

export default TravelTime;