import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      artistName: '',
      button: true,
      album: [],
      searchedArtist: '',
    };
  }

  artistButton = () => {
    const { artistName } = this.state;
    const numberMin = 2;
    if (artistName.length >= numberMin) {
      this.setState({ button: false });
    } else { this.setState({ button: true }); }
  }

  typeArtist = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    }, () => this.artistButton());
  }

  user = async (event) => {
    event.preventDefault();
    const { artistName } = this.state;
    const albumApi = await searchAlbumsAPI(artistName);

    this.setState((prevState) => ({
      album: albumApi,
      artistName: '',
      searchedArtist: prevState.artistName,
    }));
  }

  render() {
    const { artistName, button, album, searchedArtist } = this.state;
    return (
      <div data-testid="page-search">
        <form>
          <input
            onChange={ this.typeArtist }
            type="text"
            data-testid="search-artist-input"
            value={ artistName }
            id="search-artist-input"
            name="artistName"
          />
          <button
            disabled={ button }
            data-testid="search-artist-button"
            type="button"
            onClick={ this.user }
          >
            Pesquisar

          </button>
        </form>
        <Header />
        {(searchedArtist.length !== 0) && (
          <h2>
            Resultado de álbuns de:
            {` ${searchedArtist}` }
          </h2>
        )}
        {album.length === 0 ? <div>Nenhum álbum foi encontrado</div> : (
          album.map((element, index) => {
            const {
              artistName: name,
              collectionName,
              collectionPrice,
              collectionId,
              artworkUrl100 } = element;
            return (

              <div key={ index }>
                <h3>{ name }</h3>
                <p>{ collectionPrice }</p>
                <p>{ collectionName }</p>
                <img
                  src={ artworkUrl100 }
                  alt="capa"
                />
                <Link
                  data-testid={ `link-to-album-${collectionId}` }
                  to={ `/album/${collectionId}` }
                >
                  Veja mais...
                </Link>
              </div>
            );
          })
        ) }
      </div>
    );
  }
}
export default Search;
