import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';

class Album extends React.Component {
  constructor() {
    super();
    this.state = ({
      musics: [],
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

  render() {
    const { musics } = this.state;

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
