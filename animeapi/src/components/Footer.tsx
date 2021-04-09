import { Typography,Container } from '@material-ui/core';
import Link from '@material-ui/core/Link';

function Footer() {
  return (
    <>      
      <Container maxWidth="lg" style={{marginBottom: '20px', marginTop: '15px'}}>
        <Typography align="center" gutterBottom>
          ラブライブライブラリ
        </Typography>
        <Link underline='none' href={'https://github.com/OHMORIYUSUKE/loveliveAPI'}>
        <Typography
          variant="subtitle1"
          align="center"
          color="textSecondary"
          component="p">
          使用したAPI
        </Typography>
        </Link>
      </Container>
    </>
  );
}

export default Footer;
