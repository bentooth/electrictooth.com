import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import './App.css';

import EditAlbum from 'screens/EditAlbum';
import EditTrack from 'screens/EditTrack';
import EditArtist from 'screens/EditArtist';
import EditProduct from 'screens/EditProduct';
import Dashboard from 'screens/Dashboard';
import Signin from 'screens/Signin';

const App = ({ history }) => {
  return (
    <>
      <Switch>
        <Route path='/edit_album' component={EditAlbum} />
        <Route path='/edit_track' component={EditTrack} />
        <Route path='/edit_artist' component={EditArtist} />
        <Route path='/edit_product' component={EditProduct} />
        <Route path='/dashboard' component={Dashboard} />
        <Route path='/' component={Signin} history={history} />
        <Redirect to='/' />
      </Switch>
    </>
  );
};

export default App;
