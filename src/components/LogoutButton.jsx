import PropTypes from 'prop-types';

const LogoutButton = ({ onLogout }) => {
  const handleLogout = () => {
    // Call the onLogout callback to handle the logout action
    onLogout();
  };

  return (
    <button
      className="text-gray-300 hover:text-white"
      onClick={handleLogout}
    >
      Logout
    </button>
  );
};

LogoutButton.propTypes = {
  onLogout: PropTypes.func.isRequired,
};

export default LogoutButton;
