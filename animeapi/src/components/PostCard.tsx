import React from 'react';
import { makeStyles,Theme, createStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Link from '@material-ui/core/Link';
import clsx from 'clsx';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import TwitterIcon from '@material-ui/icons/Twitter';
import HomeIcon from '@material-ui/icons/Home';

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
      fontSize: 'large',
    },
    expand: {
      transform: 'rotate(0deg)',
      float: 'right',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: 'rotate(180deg)',
    },
    icon: {
      marginRight: 20,
    },
  }),
);

type Props = {
  title: string;
  image: string;
  description: string;
  twitter_account: string;
  public_url: string;
  twitter_hash_tag: string;
  sex: number;
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
  let sex = '';
  if (props.sex === 0){
    sex = '男性向け';
  }else{
    sex = '女性向け';
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
                    <Typography paragraph>
                      {props.description}
                      <br/>
                      <Link 
                        href={`https://twitter.com/hashtag/${props.twitter_hash_tag}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        >
                        <Typography variant="body2" className={classes.underDescription}>
                          #{props.twitter_hash_tag}
                        </Typography>
                      </Link>
                      <Typography variant="body2" className={classes.underDescription}>
                        {sex}
                      </Typography>
                    </Typography>
                    <Link 
                      className={classes.icon}
                      underline='none' 
                      href={props.public_url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      >
                      <HomeIcon fontSize="large" />
                    </Link>
                    <Link 
                      className={classes.icon}
                      underline='none' 
                      href={`https://twitter.com/${props.twitter_account}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      >
                      <TwitterIcon fontSize="large" />
                    </Link>
                  </CardContent>
                </Collapse>
            </CardContent>
          </CardActionArea>
        </Card>
    </>
  );
}

export default PostCard;
