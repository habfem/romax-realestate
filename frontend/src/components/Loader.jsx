import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const Loader = () => {
  return (
    <Box sx={{ width: '100px', height: '100px', margin: 'auto', display: 'block' }}>
      <CircularProgress />
    </Box>
  )
}

export default Loader