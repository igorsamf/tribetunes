import React from 'react';
import Header from '../components/Header';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      artistName: '',
      button: true,
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
    const { artistName } = this.state;
    console.log('oi', artistName);
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    }, () => this.artistButton());
  }

  render() {
    const { artistName, button } = this.state;
    return (
      <>
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
            onClick={ this.artistButton }
          >
            Pesquisar

          </button>
        </form>
        <Header />
        <div data-testid="page-search" />
      </>
    );
  }
}
export default Search;
