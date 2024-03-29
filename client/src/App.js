import React, { useEffect } from 'react';
import { Box } from '@chakra-ui/react';
import { Route, Switch, Redirect } from 'react-router-dom';

import Home from 'screens/Home';
import Album from 'screens/Album';
import Merch from 'screens/Merch';

import Download from 'screens/Download';
import Checkout from 'screens/Checkout';
import Cart from 'screens/Cart';
import Profile from 'screens/Profile';
import Help from 'screens/Help';
import Coins from 'screens/Coins';
import Signin from 'screens/Signin';
import Signup from 'screens/Signup';
import Artist from 'screens/Artist';

import ForgotPassword from 'screens/ForgotPassword';
import NewPassword from 'screens/NewPassword';
import Navigation from 'components/Navigation';
import AudioPlayer from 'components/AudioPlayer';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as musicActions from 'redux/modules/music';
import * as userActions from 'redux/modules/user';

function App({ MusicActions, UserActions, auth }) {
  //def need to refactor into hook or something
  useEffect(() => {
    MusicActions.getAlbums();
    auth && UserActions.getUser(auth);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Navigation />

      <Box mb='100px' style={{ fontFamily: 'Spotify-Light' }}>
        <Switch>
          <Route path='/download/:orderId' component={Download} />
          <Route path='/checkout' component={Checkout} />
          <Route path='/help' component={Help} />
          <Route path='/forgot' component={ForgotPassword} />
          <Route path='/reset/:userId/:token' component={NewPassword} />
          <Route path='/coins' component={Coins} />
          <Route path='/cart' component={Cart} />
          <Route path='/profile' component={Profile} />
          <Route path='/signup' component={Signup} />
          <Route path='/signin' component={Signin} />
          <Route path='/music/:name' component={Album} />
          <Route path='/merch/:name' component={Merch} />
          <Route path='/artist/:name' component={Artist} />
          <Route exact path='/' component={Home} />
          <Redirect to='/' />
        </Switch>
      </Box>

      <AudioPlayer />
    </>
  );
}

export default connect(
  (state) => ({
    auth: state.user.authenticated
  }),
  (dispatch) => ({
    MusicActions: bindActionCreators(musicActions, dispatch),
    UserActions: bindActionCreators(userActions, dispatch),
  }),
)(App);
