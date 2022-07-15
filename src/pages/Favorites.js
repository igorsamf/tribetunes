import React from 'react';
import Header from '../components/Header';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

class Favorites extends React.Component {
  constructor() {
    super();
    this.state = {
      favorites: [],
    };
  }

  componentDidMount() {
    this.getFavorites();
  }

  getFavorites = async () => {
    const favorites = await getFavoriteSongs();
    this.setState({
      favorites,
    });
  }

  render() {
    const { favorites } = this.state;
    return (
      <>
        <Header />
        <div data-testid="page-favorites">
          {
            favorites.map((song, index) => {
              const {
                trackName,
                previewUrl,
              } = song;
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
                </div>
              );
            })
          }
        </div>
      </>
    );
  }
}
export default Favorites;
