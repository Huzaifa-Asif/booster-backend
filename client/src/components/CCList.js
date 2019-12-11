import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { registerContentCreator } from './UserFunctions'
import Navbar from './Navbar';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import { throws } from 'assert';
import { element } from 'prop-types';

const API = 'http://localhost:5000/contentcreators';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    margin: 'auto',
    maxWidth: 500,
  },
  image: {
    width: 128,
    height: 128,
  },
  img: {
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
  },
}));

class CCList extends Component {
  constructor() {
    super()
    this.state = {
      contentCreator: [],
      open: false
    }
  }

  componentDidMount() {
    fetch(API)
      .then(response => response.json())
      .then(data => {
        console.log(data)
        this.setState({ contentCreator: data })
      }
      );
  }

  mapContentCreators() {
    const { contentCreator } = this.state;
    for (let i = 0; i < contentCreator.length; i++) {
      if (contentCreator[i].igShoutoutPrice === null) {
        delete contentCreator[i]
      }
    }

    return (
      contentCreator.map(cc =>
        <div >
          <Paper >
            <Grid container spacing={2}>
              <Grid item>
                <ButtonBase >
                  <img src={cc.profilePic} width='100' height='50' />
                </ButtonBase>
              </Grid>
              <Grid item xs={12} sm container>
                <Grid item xs container direction="column" spacing={2}>
                  <Grid item xs>
                    <Typography gutterBottom variant="subtitle1">
                      <b>{cc.name}</b>
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                      <b>Instagram Profile Url:</b> <a href={cc.igLink}>{cc.igLink}</a><br />
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                    <b>Content Type:</b> {cc.igCategory}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant="body2" style={{ cursor: 'pointer' }}>
                      <Link to={{
                        pathname: '/placeorder/',
                        contentCreator: { cc }
                      }}> <b className="btn btn-primary"> Order Now</b> </Link>
                    </Typography>
                  </Grid>
                </Grid>
                <Grid item>
                  <Typography variant="subtitle1"><b>Price:</b> {cc.igShoutoutPrice}</Typography>
                </Grid>
              </Grid>
            </Grid>
          </Paper>
          <hr />
        </div>
      )
    )
  }

  render() {
    return (
      <div>
        <Navbar />
        <div className="container">
        <div className="content-sec text-center">
              <h2>Instagram Content Creators</h2>
            </div>
          <div className="row">
            <div className="col-md-8 mt-5 mx-auto">
            {this.mapContentCreators()}
            </div>
          </div>
        </div>
      </div>

    )
  }
}

export default CCList
