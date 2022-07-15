import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

class Album extends React.Component {
  constructor() {
    super();
    this.state = ({
      musics: [],
      favorites: [],
    });
  }

  componentDidMount() {
    this.callMusicApi();
  }

  callMusicApi = async () => {
    const { match } = this.props;
    const { id } = match.params;
    const musicApi = await getMusics(id);
    this.setState({
      musics: musicApi,
    });
  }

  getFavorites = async () => {
    const favorites = await getFavoriteSongs();
    this.setState({
      favorites,
    });
  }

  render() {
    const { musics, favorites } = this.state;
    console.log(favorites);
    return (
      <>
        <Header />
        <div data-testid="page-album">
          {
            musics.length > 0 && (
              <>
                <h2 data-testid="artist-name">{musics[0].artistName}</h2>
                <h2 data-testid="album-name">{musics[0].collectionName}</h2>
              </>
            )

          }
          {musics
            .filter((element, index) => (index !== 0))
            .map((music, index) => {
              const { trackName, previewUrl } = music;
              return (
                <div key={ index }>
                  <h2>{ trackName }</h2>
                  <audio data-testid="audio-component" src={ previewUrl } controls>
                    <track kind="captions" />
                    O seu navegador não suporta o elemento
                    {' '}
                    {' '}
                    <code>audio</code>
                    .
                  </audio>
                  <MusicCard musics={ music } getFavorites={ this.getFavorites } />
                </div>
              );
            })}
        </div>
      </>
    );
  }
}
Album.propTypes = {
  match: PropTypes.object,
}.isRequired;

export default Album;
