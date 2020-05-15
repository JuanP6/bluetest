import Head from 'next/head'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import GifCard from '../components/GifCard'
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import Modal from '@material-ui/core/Modal';

import gifsActions from '../redux/actions/gifsActions'
import * as actionTypes from '../redux/actions/actionTypes'
import * as selectors from '../redux/selectors/gifsSelectors'

const PAGE_OFFSET = 24

const Home = props => {
  const { addGifs, selectGif, gifsList, listOffset, selectedGif, selectedGifIndex } = props;

  const [searchTerm, setSearchTerm] = React.useState('');
  const [modalIsOpen, setModal] = React.useState(false);
  const [loadedImage, setLoadedImage] = React.useState(false);

  const myRef = React.createRef();

  const previousPage = (e) => {
    e.preventDefault();
    const newOffset = listOffset - PAGE_OFFSET - 1;
    if (searchTerm.length) {
      addGifs({ searchTerm,  offset: newOffset }, actionTypes.ADD_GIFS);
    }
  }

  const nextPage = (e) => {
    e.preventDefault();
    const newOffset = listOffset + PAGE_OFFSET + 1;
    if (searchTerm.length) {
      addGifs({ searchTerm,  offset: newOffset }, actionTypes.ADD_GIFS);
    }
  }

  const openModal = (e) => {
    e.preventDefault();
    setLoadedImage(true)
    const gifIndex = e.target.dataset.index;
    selectGif({ gifIndex }, actionTypes.SELECT_GIF);
    setModal(true)
  }

  const decreaseIndex = (e) => {
    e.preventDefault();
    if (searchTerm.length) {
      setLoadedImage(false)
      let gifIndex = selectedGifIndex;
      gifIndex--;
      if (gifIndex < 0 && listOffset) {
        const newOffset = listOffset - PAGE_OFFSET - 1
        addGifs({ searchTerm, offset: newOffset > -1 ? newOffset : 0, }, actionTypes.ADD_GIFS)
      } else {
        if (gifIndex >= 0) {
          console.log(gifIndex)
          selectGif({ gifIndex }, actionTypes.SELECT_GIF);
        } else {
          setLoadedImage(true)
        }
      }
    }
  }

  const increaseIndex = (e) => {
    e.preventDefault();
    if (searchTerm.length) {
      setLoadedImage(false)
      let gifIndex = selectedGifIndex;
      gifIndex++;
      if (gifIndex > PAGE_OFFSET ) {
        const newOffset = listOffset + PAGE_OFFSET + 1
        addGifs({ searchTerm, offset: newOffset, selectedIndex: selectedGifIndex }, actionTypes.ADD_GIFS)
      } else {
        selectGif({ gifIndex }, actionTypes.SELECT_GIF);
      }
    }
  }
  
  const inputUpdate = (e) => {
    setSearchTerm(e.target.value);
  }

  const searchAction = (e) => {
    if (searchTerm.length) {
      addGifs({ searchTerm, offset: 0 }, actionTypes.ADD_GIFS);
    }
  }

  const cardList = () => {
    let offset = 0;
    return gifsList.reduce((gifObject, gifElement) => {

      gifObject.push(
        <GifCard gifObject={gifElement} key={`gifcard_${gifElement.id}`} index={offset} cardAction={openModal}>
        </GifCard> 
      )

      offset++;
     
      return gifObject;
    }, []);
  }

  return (
    <div className="container" ref={myRef}>
      <Head>
        <title>Giphy App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Modal
        disablePortal
        disableEnforceFocus
        disableAutoFocus
        disableScrollLock
        open={modalIsOpen}
        onClose={() => setModal(false)}
        container={() => myRef.current}
      >
        <div className="modalContent">

          <img className="modalImage" loading='eager' src={'/loading.gif'} style={!loadedImage ? {} : {display: 'none'}}></img>
          
          <img className="modalImage" loading='lazy' src={selectedGif ? selectedGif.images.original.url : ''}
          onLoad={()=>setLoadedImage(true)} style={loadedImage ? {} : {display: 'none'}}></img>
          
          <div className="modalControlBar">
            <Button className="modalAction" variant="contained" color="primary" onClick={decreaseIndex}>Previous</Button>
            <Button className="modalAction" variant="contained" color="primary" onClick={increaseIndex}>Next</Button>
          </div>
          
        </div>
      </Modal>

      <main>

        <h1>Juan's Giphy Search Single Page App</h1>

        <div className="search">
          <input className="searchBar" type="text" placeholder="Find your gif" onChange={inputUpdate} />
          <Button variant="contained" color="secondary" onClick={searchAction} >Search</Button>
        </div>

        <div className="grid">
          {cardList()}
        </div>

        <div className="gridControlBar">
          <Button className="modalAction" variant="contained" color="secondary" onClick={previousPage}>Previous Page</Button>
          <Button className="modalAction" variant="contained" color="secondary" onClick={nextPage}>Next Page</Button>
        </div>
      </main>

      <style jsx>{`
        .container {
          min-height: 100vh;
          padding: 0 0.5rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        main {
          padding: 2rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          align-items: center;
          max-width: 800px;
        }

        a {
          color: inherit;
          text-decoration: none;
        }

        .search {
          display: flex;
          align-items: center;
          justify-content: flex-start;
          flex-wrap: wrap;

          min-width: 800px;
          width: 100%;
          padding: 1rem 0.5rem;
          background-color: #eee;
          border-radius: 20px;
        }

        .searchBar {
          display: flex;
          min-width: 200px;
          margin-right: 20px;
        }

        .grid {
          display: flex;
          align-items: center;
          justify-content: space-around;
          flex-wrap: wrap;
          width: 100%;
          margin-top: 1rem;
        }
        .gridControlBar {
          display: flex;
          flex-direction: row;
          width: 100%;
          justify-content: space-between;
          margin-top: 20px;
        }

        .modalContent {
          display: flex;
          align-items: center;
          justify-content: center;
          max-height:100%;
          max-width:100%; 
          margin: auto;
          width: 50%;
          height: 100%;
          flex-direction: column;
        }
        .modalImage {
          display: flex;
          max-height: 400px;
          height: 400px;
          object-fit: cover;
        }

        

        .modalControlBar {
          display: flex;
          flex-direction: row;
          width: 100%;
          justify-content: space-between;
          margin-top: 20px;
        }
        .modalAction {
          width: 50px;
          display: flex;
        }

        @media (max-width: 600px) {
          .grid {
            width: 100%;
            flex-direction: column;
          }
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }

        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  )
}

Home.propTypes = {
  gifsList: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  selectedGif: PropTypes.shape(),
  addGifs: PropTypes.func.isRequired,
};

const mapStateToProps = state => {
  return {
    gifsList: selectors.getGifsList(state),
    selectedGif: selectors.getSelectedGif(state),
    selectedGifIndex: state.gifs.selectedGif,
    listOffset: selectors.getGifsListOffset(state),
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      addGifs: gifsActions.addGifs,
      selectGif: gifsActions.selectGif,
    },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
