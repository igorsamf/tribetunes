import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      loginName: '',
      loading: true,
    };
  }

  componentDidMount() {
    this.userName();
  }

  userName = async () => {
    const user = await getUser();
    this.setState({
      loginName: user,
      loading: false,
    });
  }

  render() {
    const { loginName, loading } = this.state;
    return (
      <header data-testid="header-component">
        {loading ? <div>Carregando...</div>
          : <h1 data-testid="header-user-name">{loginName.name}</h1>}
        <Link data-testid="link-to-search" to="/search"> Search </Link>
        <Link to="/album/:id"> Album </Link>
        <Link data-testid="link-to-favorites" to="/favorites"> Favorites </Link>
        <Link data-testid="link-to-profile" to="/profile"> Profile </Link>
        <Link to="profile/edit"> Profile Edit </Link>
      </header>
    );
  }
}
export default Header;
