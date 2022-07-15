import React from 'react';
import PropTypes from 'prop-types';
import {
  addSong,
  // getFavoriteSongs,
  removeSong,
} from '../services/favoriteSongsAPI';
import Loading from '../pages/Loading';

class MusicCard extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
    };
  }

  musicsApi = async (event) => {
    const { musics } = this.props;
    const { checked } = event.target;
    const magicNumber = 500;
    this.setState({
      loading: true,
    }, () => {
      if (checked) {
        addSong(musics);
      } else {
        removeSong(musics);
      }
      setTimeout(() => {
        this.setState({
          loading: false,
        });
      }, magicNumber);
    });
  };

  render() {
    const { loading } = this.state;
    const { musics } = this.props;
    const { trackId } = musics;
    return (
      <>
        {
          (loading) && <Loading />
        }
        <label
          htmlFor={ `checkbox-music-${trackId}` }
          data-testid={ `checkbox-music-${trackId}` }
        >
          Favorita
          <input
            onClick={ this.musicsApi }
            id={ `checkbox-music-${trackId}` }
            type="checkbox"
          />
        </label>
      </>
    );
  }
}
MusicCard.propTypes = {
  musics: PropTypes.object,
}.isRequired;

export default MusicCard;
