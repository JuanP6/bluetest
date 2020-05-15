import * as types from './actionTypes';

import { searchGifWithTerm } from '../../core/api';

const addGifs = ({ searchTerm, offset, selectedIndex = 0 }, type) => {
    if (type !== types.ADD_GIFS) {
      throw new Error('Wrong API call!');
    }
    return (dispatch) => {
       searchGifWithTerm(searchTerm, offset)
          .then((response) => {
            dispatch({
              type: types.ADD_GIFS,
              payload: response.data,
              selectedIndex: selectedIndex,
            });
          })
          .catch((err) => {
            // ERROR HANDLING
            /* 
            switch (error.response.status) {
            } */
          });
      };
};

const selectGif = ({ gifIndex }, type) => {
  if (type !== types.SELECT_GIF) {
    throw new Error('Wrong Action call!');
  }
  return (dispatch) => {
    dispatch({
      type: types.SELECT_GIF,
      payload: gifIndex,
    });
  };
};

export default {
    addGifs,
    selectGif
};