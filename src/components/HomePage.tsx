import { Container, Typography } from '@mui/material'
const HomePage:React.FC = () => {
  return (
    <Container sx={{textAlign:'center'}}>
      <Typography component='h1' variant='h1'>
        Welcome on Board!
      </Typography>
    </Container>
  )
}

export default HomePage
