import * as React from 'react';
import PropTypes from 'prop-types';
import styles from './GifCard.module.css'
import Link from '@material-ui/core/Link';


const GifCard = props => {
  const { gifObject, index, cardAction } = props;
  
  return (
    <Link href="" onClick={cardAction} className={styles.card}>
      <img data-index={index} loading='lazy' src={gifObject.images.fixed_height_downsampled.url}></img>
    </Link>
  );
};

GifCard.defaultProps = {
  gifObject: {},
};

GifCard.propTypes = {
  gifObject: PropTypes.shape({}),
  cardAction: PropTypes.func,
  index: PropTypes.number,
};

export default GifCard;
