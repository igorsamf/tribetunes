import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from '../pages/Loading';

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      loginName: '',
    };
  }

  componentDidMount() {
    this.userName();
  }

  userName= async () => {
    const user = await getUser();
    this.setState({
      loginName: user,
    });
  }

  render() {
    const { loginName, loading } = this.state;
    // console.log(loginName, loading);
    return (
      <header data-testid="header-component">
        {(loading) ? (
          <Loading />
        ) : (
          <h1 data-testid="header-user-name">{loginName}</h1>
        )}

        <Link to="/search"> Search </Link>
        <Link to="/album/:id"> Album </Link>
        <Link to="favorites"> Favorites </Link>
        <Link to="/profile"> Profile </Link>
        <Link to="profile/edit"> Profile Edit </Link>
      </header>
    );
  }
}
export default Header;
