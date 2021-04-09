import React,{ useState,useEffect } from 'react';
import './App.css';

import axios from 'axios';

import PostCard from './components/PostCard';

import {cools, years} from './utils/Year';

import Grid from '@material-ui/core/Grid';
import LinearProgress from '@material-ui/core/LinearProgress';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';

import Footer from './components/Footer';
import Header from './components/Header';

const useStyles = makeStyles((theme) => ({
  button: {
    display: 'block',
    marginTop: theme.spacing(2),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 160,
    marginBottom: 10,
    marginTop: 20,
  },
}));

function App() {
  const classes = useStyles();

  const [selectYear, setYear] = React.useState('2020');
  const [open, setOpen] = React.useState(false);

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>): void => {
    setYear(event.target.value as string);
  };

  const handleClose = ():void => {
    setOpen(false);
  };

  const handleOpen = ():void => {
    setOpen(true);
  };

  //  ---

  const [selectCool, setCool] = React.useState('1');
  const [open2, setOpen2] = React.useState(false);

  const handleChange2 = (event: React.ChangeEvent<{ value: unknown }>): void => {
    setCool(event.target.value as string);
  };

  const handleClose2 = ():void => {
    setOpen2(false);
  };

  const handleOpen2 = ():void => {
    setOpen2(true);
  };

  const [posts, setPosts] = useState([]);
  // 無限ループを回避する
  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get(`http://utan.php.xdomain.jp/animeapi/api.php?when=${selectYear}/${selectCool}`);
        setPosts(res.data);
      } catch (err) {
        console.log(err);
      }
    })();
  }, [selectYear,selectCool]);
  
  console.log(posts);

  if(posts.length === 0){
    return(
      <>
        <div style={{ position: 'absolute', top: 0, width: '100%' }}>
          <Header />
          <LinearProgress />
        </div>
      </>
    );
  }

  return (
    <>
    <Header />
      <Grid container justify="center">
        <Grid item md={9}>
          <FormControl className={classes.formControl}>
              <InputLabel id="demo-controlled-open-select-label">放送年</InputLabel>
              <Select
                labelId="demo-controlled-open-select-label"
                id="demo-controlled-open-select"
                open={open}
                onClose={handleClose}
                onOpen={handleOpen}
                value={selectYear}
                onChange={handleChange}
              >
                {years.map((year, idx) => (
                  <MenuItem value={year} key={idx}>
                    {year}
                  </MenuItem>
                ))}
              </Select>
          </FormControl>
          <FormControl className={classes.formControl}>
              <InputLabel id="demo-controlled-open-select-label">放送時期</InputLabel>
              <Select
                labelId="demo-controlled-open-select-label"
                id="demo-controlled-open-select"
                open={open2}
                onClose={handleClose2}
                onOpen={handleOpen2}
                value={selectCool}
                onChange={handleChange2}
              >
                {cools.map((cool, idx) => (
                  <MenuItem value={cool.id} key={idx}>
                    {cool.title}
                  </MenuItem>
                ))}
              </Select>
          </FormControl>
        </Grid>
        {posts.map((post ,idx_i) => (
          <>
            <Grid item lg={3} key={idx_i} style={{margin:'10px'}}>
              <PostCard 
                title={post['title']}
                image={post['image']}
                description={post['description']}
              />
            </Grid>
          </>
          ))}
        </Grid>
    <Footer />
    </>
  );
}

export default App;
