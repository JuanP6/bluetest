import { createSelector } from 'reselect';
import Lodash from 'lodash';

const getGifs = state => Lodash.get(state, ['gifs'], {});

export const getGifsList = createSelector(getGifs, gifsState => {
    const gifsList = Lodash.get(gifsState, ['gifsList', 'data'], []);

    return gifsList;
});

export const getGifsListOffset = createSelector(getGifs, gifsState => {
  const offset = Lodash.get(gifsState, ['gifsList', 'pagination', 'offset'], 0);  

  return offset;
});

export const getSelectedGif = createSelector(getGifs, gifsState => {
  const gifsList = Lodash.get(gifsState, ['gifsList', 'data'], []);
  const selectedIndex = Lodash.get(gifsState, ['selectedGif'], 0);

  return gifsList.length ? gifsList[selectedIndex] : null;
});