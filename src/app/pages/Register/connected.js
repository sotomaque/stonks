import { connect } from 'react-redux';

import RegisterPage from './component';

const mapStateToProps = ({ pageReducers }) => {
  return {
    pageReducers,
  };
};

const Connected = connect(mapStateToProps)(RegisterPage);

export { Connected };
