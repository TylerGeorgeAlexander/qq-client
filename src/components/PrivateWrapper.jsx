import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';

const PrivateWrapper = ({ children, isLoggedIn, authToken }) => {
  return isLoggedIn && authToken ? (
    children
  ) : (
    <Navigate to="/login" replace />
  );
};

PrivateWrapper.propTypes = {
  children: PropTypes.node.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  authToken: PropTypes.string,
};

export default PrivateWrapper;
