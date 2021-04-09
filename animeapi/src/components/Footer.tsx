import { Typography,Container } from '@material-ui/core';
import Link from '@material-ui/core/Link';

function Footer() {
  return (
    <>     
    <footer style={{background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',color: 'white',marginTop: '20px'}}>
      <Container maxWidth="lg" style={{paddingBottom: '20px', paddingTop: '20px'}}>
        <Typography align="center" gutterBottom>
            アニメで振り返ろう
        </Typography>
        <Link underline='none' href={'https://github.com/Project-ShangriLa/sora-playframework-scala'}>
        <Typography
          style={{color: 'white'}}
          variant="subtitle1"
          align="center"
          component="p">
          使用したAPI
        </Typography>
        </Link>
      </Container>
      </footer>
    </>
  );
}

export default Footer;
