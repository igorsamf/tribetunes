import PropTypes from 'prop-types';
import React from 'react';
import { createUser } from '../services/userAPI';
import Loading from './Loading';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      loginName: '',
      button: true,
      loading: false,
    };
  }

handleLogin = () => {
  const { loginName } = this.state;
  const numberMin = 3;
  if (loginName.length >= numberMin) {
    this.setState({ button: false });
  } else { this.setState({ button: true }); }
}

typeLogin = (event) => {
  const { name, value } = event.target;
  this.setState({
    [name]: value,
  }, () => this.handleLogin());
}

pushProp = () => {
  const { history } = this.props;
  history.push('/search');
  console.log(this.props);
}

userCreate = async (event) => {
  event.preventDefault();
  this.setState({ loading: true });
  const { loginName } = this.state;
  await createUser(
    {
      name: loginName,
    },
  ); this.setState({ loading: false }, () => this.pushProp());
}

render() {
  const { loginName, button, loading } = this.state;
  return (
    <form data-testid="page-login">
      <label htmlFor="login-name-input">
        Descrição
        <input
          id="login-name-input"
          name="loginName"
          type="text"
          value={ loginName }
          data-testid="login-name-input"
          onChange={ this.typeLogin }
        />
      </label>
      <button
        data-testid="login-submit-button"
        type="submit"
        disabled={ button }
        onClick={ this.userCreate }
      >
        Entrar

      </button>
      {
        loading && <Loading />
      }
    </form>

  );
}
}

Login.propTypes = {
  userLogin: PropTypes.object,
}.isRequired;
export default Login;
