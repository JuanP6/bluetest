import Lodash from 'lodash';

import * as types from '../actions/actionTypes';

const initialState = {
  gifsList: {},
  isLoading: false, 
  isError: false,
  selectedGif: 0,
};

const PAGE_OFFSET = '24'

const gifsReducer = (state = initialState, action) => {
  
  switch (action.type) {
      case types.ADD_GIFS:
          const gifPayload = Lodash.get(action, ['payload'], []);
          const index = Lodash.get(action, ['selectedIndex'], 0);
          const selectedGif = (index == PAGE_OFFSET) ? 0 : PAGE_OFFSET
          
          return {
            ...state,
            gifsList: gifPayload,
            selectedGif: selectedGif,
            isLoading: false,
            isError: false,
          };
      case types.LOADING_GIFS:
            return {
              ...state,
              isLoading: true,
              isError: false,
            };
      case types.ERROR_GIFS:
            return {
              ...state,
              isLoading: false,
              isError: true,
            };
      case types.SELECT_GIF:
          const indexPayload = Lodash.get(action, ['payload'], []);
            return {
              ...state,
              selectedGif: indexPayload,
            };
      default:
          return {...state};
  }
};

export default gifsReducer;