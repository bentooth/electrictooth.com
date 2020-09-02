import axios from 'axios';
import { pender } from 'redux-pender';
import { createAction, handleActions } from 'redux-actions';

function getDate() {
  let utcDate = new Date(Date.now());
  return utcDate.toUTCString();
}

const _getUser = (token) => {
  return axios({
    url: '/api/v1/user',
    method: 'GET',
    headers: { Authorization: token },
  });
};

const _signup = (credentials) => {
  return axios.post('/auth/signup', credentials);
};

const _signin = (credentials) => {
  return axios.post('/auth/signin', credentials);
};

const _addToCart = (product_id, type, token) => {
  return axios({
    url: `/api/v1/user/cart/add/${product_id}`,
    method: 'POST',
    data: {
      productId: product_id,
      type: type,
    },
    headers: { Authorization: token },
  });
};

const _removeFromCart = (product_id, type, token) => {
  return axios({
    url: `/api/v1/user/cart/remove/${product_id}`,
    method: 'DELETE',
    data: {
      productId: product_id,
      type: type,
    },
    headers: { Authorization: token },
  });
};

const _getCoins = (token) => {
  return axios({
    url: `/api/v1/user/coins`,
    method: 'GET',
    headers: { Authorization: token },
  });
};

const _addToPlaylist = (token, productId) => {
  return axios({
    url: `/api/v1/user/playlist/add/${productId}`,
    method: 'POST',
    headers: { Authorization: token },
  });
};

const _removeFromPlaylist = (token, productId) => {
  return axios({
    url: `/api/v1/user/playlist/remove/${productId}`,
    method: 'DELETE',
    headers: { Authorization: token },
  });
};

export const REMOVE_FROM_PLAYLIST = 'player/REMOVE_FROM_PLAYLIST';
export const removeFromPlaylist = createAction(REMOVE_FROM_PLAYLIST, _removeFromPlaylist);

export const ADD_TO_PLAYLIST = 'player/ADD_TO_PLAYLIST';
export const addToPlaylist = createAction(ADD_TO_PLAYLIST, _addToPlaylist);

export const GET_COINS = 'user/GET_COINS';
export const getCoins = createAction(GET_COINS, _getCoins);

export const GET_USER = 'user/GET_USER';
export const getUser = createAction(GET_USER, _getUser);

export const SIGN_UP = 'user/SIGN_UP';
export const signUp = createAction(SIGN_UP, _signup);

export const SIGN_IN = 'user/SIGN_IN';
export const signIn = createAction(SIGN_IN, _signin);

export const ADD_TO_CART = 'user/ADD_TO_CART';
export const addToCart = createAction(ADD_TO_CART, _addToCart);

export const REMOVE_FROM_CART = 'user/REMOVE_FROM_CART';
export const removeFromCart = createAction(REMOVE_FROM_CART, _removeFromCart);

export const SIGN_OUT = 'user/SIGN_OUT';
export const signOut = createAction(SIGN_OUT);

const initialState = {
  userId: localStorage.getItem('userId'),
  authenticated: localStorage.getItem('token'),
  username: localStorage.getItem('username'),
  albumCollection: [],
  playlist: [],
  cart: {
    items: [],
    total: 0,
  },
  coins: 0,
  showModal: false,
  updatedAt: getDate(),
  error: '',
  message: '',
};

export default handleActions(
  {
    ...pender({
      type: ADD_TO_PLAYLIST,
      onSuccess: (state, { payload }) => {
        const newState = {
          ...state,
          updatedAt: getDate(),
          error: null,
        };

        newState.playlist = payload.data;

        return newState;
      },
      onFailure: (state, { payload }) => {
        return { ...state, error: payload };
      },
    }),
    ...pender({
      type: REMOVE_FROM_PLAYLIST,
      onSuccess: (state, { payload }) => {
        const newState = {
          ...state,
          updatedAt: getDate(),
          error: null,
        };

        let newPlaylist = payload.data;

        newState.playlist = newPlaylist;

        return newState;
      },
      onFailure: (state, { payload }) => {
        return { ...state, error: payload };
      },
    }),
    ...pender({
      type: GET_USER,
      onSuccess: (state, { payload }) => {
        const newState = { ...state, updatedAt: getDate(), error: null };
        newState.albumCollection = payload.data.albumCollection;
        newState.coins = payload.data.coins;
        newState.username = payload.data.username;
        newState.cart = payload.data.cart;
        newState.playlist = payload.data.playlist;
        return newState;
      },
      onFailure: (state, { payload }) => {
        return { ...state, error: 'bad' };
      },
    }),
    ...pender({
      type: SIGN_UP,
      onSuccess: (state, { payload }) => {
        const newState = { ...state, updatedAt: getDate(), error: null };
        localStorage.setItem('token', payload.data.token);
        localStorage.setItem('userId', payload.data.userId);
        localStorage.setItem('username', payload.data.username);
        newState.authenticated = payload.data.token;
        newState.userId = payload.data.userId;
        newState.albumCollection = payload.data.albumCollection;
        newState.cart = payload.data.cart;
        newState.coins = payload.data.coins;
        newState.username = payload.data.username;
        return newState;
      },
      onFailure: (state, { payload }) => {
        return {
          ...state,
          error: payload.response.data.error,
          message: payload.response.data.message,
        };
      },
    }),
    ...pender({
      type: SIGN_IN,
      onSuccess: (state, { payload }) => {
        const newState = { ...state, updatedAt: getDate(), error: null };
        console.log(payload);
        localStorage.setItem('token', payload.data.token);
        localStorage.setItem('userId', payload.data.userId);
        localStorage.setItem('username', payload.data.username);
        newState.userId = payload.data.userId;
        newState.authenticated = payload.data.token;
        newState.albumCollection = payload.data.albumCollection;
        newState.cart = payload.data.cart;
        newState.coins = payload.data.coins;
        newState.username = payload.data.username;
        return newState;
      },
      onFailure: (state, { payload }) => {
        return {
          ...state,
          error: payload.response.data.error,
          message: payload.response.data.message,
        };
      },
    }),
    ...pender({
      type: ADD_TO_CART,
      onSuccess: (state, { payload }) => {
        const newState = { ...state, updatedAt: getDate(), error: null };
        newState.cart = payload.data;
        return newState;
      },
      onFailure: (state, { payload }) => {
        return { ...state, error: 'err' };
      },
    }),
    ...pender({
      type: REMOVE_FROM_CART,
      onSuccess: (state, { payload }) => {
        const newState = { ...state, updatedAt: getDate(), error: null };
        newState.cart = payload.data;
        return newState;
      },
      onFailure: (state, { payload }) => {
        return { ...state, error: 'err' };
      },
    }),
    ...pender({
      type: GET_COINS,
      onSuccess: (state, { payload }) => {
        const newState = { ...state, updatedAt: getDate(), error: null };
        newState.coins = payload.data;
        return newState;
      },
      onFailure: (state, { payload }) => {
        return { ...state, error: 'err' };
      },
    }),
    [SIGN_OUT]: (state) => {
      localStorage.removeItem('token');
      localStorage.removeItem('userId');
      localStorage.removeItem('username');

      const newState = {
        ...initialState,
        authenticated: undefined,
        updatedAt: getDate(),
        error: null,
      };

      return newState;
    },
  },
  initialState,
);
