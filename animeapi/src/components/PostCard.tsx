import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

import noimage from '../images/noimage.png'

const useStyles = makeStyles({
  root: {
    maxWidth: 1000,
    minWidth: 300,
  },
  media: {
    height: 210,
  },
  pos: {
    marginBottom: 10,
  },
  underDescription:{
    marginTop: 10,
    marginRight: 15,
    display: 'inline-block',
  },
});

type Props = {
  title: string;
  image: string;
};

const PostCard: React.FC<Props> = (props) => {
  const classes = useStyles();

  console.log(props.image);

  let image = '';
  if (props.image === 'noimage'){
    image = noimage;
  }else{
    image = props.image;
  }

  return (
    <>
        <Card className={classes.root}>
          <CardActionArea>
            <CardMedia
              className={classes.media}
              image={image}
              title={props.title}
            />
            <CardContent>
              <Typography gutterBottom variant="h6" component="h2">
              {props.title}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
    </>
  );
}

export default PostCard;
