import React from 'react';
import PropTypes from 'prop-types';
import {
  addSong,
  getFavoriteSongs,
  removeSong,
} from '../services/favoriteSongsAPI';
import Loading from '../pages/Loading';

class MusicCard extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      isChecked: false,
    };
  }

  componentDidMount() {
    this.update();
  }

  update = async () => {
    const { musics } = this.props;
    const favorites = await getFavoriteSongs();
    const result = favorites.some((music) => musics.trackId === music.trackId);
    this.setState({
      isChecked: result,
    });
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
      this.update();
      setTimeout(() => {
        this.setState({
          loading: false,
        });
      }, magicNumber);
    });
  };

  // checkFavorite(event) {
  //   const { savedFavoritesSongs } = this.state;
  // }

  render() {
    const { loading, isChecked } = this.state;
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
            onChange={ this.musicsApi }
            id={ `checkbox-music-${trackId}` }
            type="checkbox"
            checked={ isChecked }
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
