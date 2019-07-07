import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

// Externals
import PropTypes from 'prop-types';
import compose from 'recompose/compose';

// Material helpers
import { withStyles } from '@material-ui/core';

// Material components
import {
  Grid,
  Button,
  IconButton,
  Typography
} from '@material-ui/core';

// Material icons
import { ArrowBack as ArrowBackIcon } from '@material-ui/icons';

// Shared components
import { Spotify as SpotifyIcon } from 'icons';

// Component styles
import styles from './styles';

class SignIn extends Component {
  state = {
    isLoading: false,
    submitError: null
  };

  handleBack = () => {
    const { history } = this.props;

    history.goBack();
  };

  handleSignIn = async () => {
    window.open(process.env.REACT_APP_API_URL + '/auth/spotify');
    window.location.replace('/authorized')
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Grid
          className={classes.grid}
          container
        >
          <Grid
            className={classes.quoteWrapper}
            item
            lg={5}
          >
            <div className={classes.quote}>
              <div className={classes.quoteInner}>
                <div className={classes.person} />
              </div>
            </div>
          </Grid>
          <Grid
            className={classes.content}
            item
            lg={7}
            xs={12}
          >
            <div className={classes.content}>
              <div className={classes.contentHeader}>
                <IconButton
                  className={classes.backButton}
                  onClick={this.handleBack}
                >
                  <ArrowBackIcon />
                </IconButton>
              </div>
              <div className={classes.contentBody}>
                <form className={classes.form}>
                  <Typography
                    className={classes.title}
                    variant="h2"
                  >
                    Sign in
                  </Typography>
                  <Typography
                    className={classes.subtitle}
                    variant="body1"
                  >
                    You're one step away from 
                    <span
                      aria-label="Fire"
                      className="animated lightSpeedIn"
                      id="fire1"
                      role="img"
                    >🔥</span>
                    <span
                      aria-label="Fire"
                      className="animated lightSpeedIn"
                      id="fire2"
                      role="img"
                    >🔥</span>
                    <span
                      aria-label="Fire"
                      className="animated lightSpeedIn"
                      id="fire3"
                      role="img"
                    >🔥</span>
                  </Typography>
                  <Button
                    className={classes.facebookButton}
                    color="primary"
                    onClick={this.handleSignIn}
                    size="large"
                    variant="contained"
                  >
                    <SpotifyIcon className={classes.facebookIcon} />
                    Login with Spotify
                  </Button>
                </form>
              </div>
            </div>
          </Grid>
        </Grid>
      </div>
    );
  }
}

SignIn.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};

export default compose(
  withRouter,
  withStyles(styles)
)(SignIn);
