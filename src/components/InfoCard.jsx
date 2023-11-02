// InfoCard.js
import PropTypes from 'prop-types';

const InfoCard = ({ title, query, assertion, timestamp }) => {
    return (
        <div className="bg-white shadow-md rounded p-4 m-4">
            <h2 className="font-bold text-lg">{title}</h2>
            <p className="text-gray-600 text-xs">Query: {query}</p>
            <p className="text-gray-600 text-sm mt-2">Assertion: {assertion}</p>
            <span className="text-gray-500 text-xs block mt-2">Timestamp: {new Date(timestamp).toLocaleString()}</span>
        </div>
    );
};

InfoCard.propTypes = {
    title: PropTypes.string.isRequired,
    query: PropTypes.string.isRequired,
    assertion: PropTypes.string.isRequired,
    timestamp: PropTypes.string.isRequired,
  };
  
export default InfoCard;