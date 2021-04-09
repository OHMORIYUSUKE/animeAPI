import React from 'react';
import { makeStyles,Theme, createStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import clsx from 'clsx';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import noimage from '../images/noimage.png'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
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
    expand: {
      transform: 'rotate(0deg)',
      marginLeft: 'auto',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: 'rotate(180deg)',
    },
  }),
);

type Props = {
  title: string;
  image: string;
};

const PostCard: React.FC<Props> = (props) => {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

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
                <IconButton
                  className={clsx(classes.expand, {
                    [classes.expandOpen]: expanded,
                  })}
                  onClick={handleExpandClick}
                  aria-expanded={expanded}
                  aria-label="show more"
                >
                  <ExpandMoreIcon />
                </IconButton>
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                  <CardContent>
                    <Typography paragraph>Method:</Typography>
                    <Typography paragraph>
                      Heat 1/2 cup of the broth in a pot until simmering, add saffron and set aside for 10
                      minutes.
                    </Typography>
                    <Typography paragraph>
                      Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over medium-high
                      heat. Add chicken, shrimp and chorizo, and cook, stirring occasionally until lightly
                      browned, 6 to 8 minutes. Transfer shrimp to a large plate and set aside, leaving chicken
                      and chorizo in the pan. Add pimentón, bay leaves, garlic, tomatoes, onion, salt and
                      pepper, and cook, stirring often until thickened and fragrant, about 10 minutes. Add
                      saffron broth and remaining 4 1/2 cups chicken broth; bring to a boil.
                    </Typography>
                    <Typography paragraph>
                      Add rice and stir very gently to distribute. Top with artichokes and peppers, and cook
                      without stirring, until most of the liquid is absorbed, 15 to 18 minutes. Reduce heat to
                      medium-low, add reserved shrimp and mussels, tucking them down into the rice, and cook
                      again without stirring, until mussels have opened and rice is just tender, 5 to 7
                      minutes more. (Discard any mussels that don’t open.)
                    </Typography>
                    <Typography>
                      Set aside off of the heat to let rest for 10 minutes, and then serve.
                    </Typography>
                  </CardContent>
                </Collapse>
            </CardContent>
          </CardActionArea>
        </Card>
    </>
  );
}

export default PostCard;
