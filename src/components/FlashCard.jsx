// FlashCard.js

const FlashCard = ({ title, query, assertion, timestamp, searchId }) => {
  const [selectedResponse, setSelectedResponse] = useState(null);

  const handleResponseSelect = async (response) => {
    setSelectedResponse(response);
    // Make API request to update repetition interval based on selected response
    try {
      const response = await fetch(
        `https://quickquestion-server-52abd9886244.herokuapp.com/api/users/search-history/${searchId}/repetition-interval`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
          body: JSON.stringify({ response }),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to update repetition interval");
      }
      // Handle successful update
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flash-card">
      <h2 className="flash-card-title">{title}</h2>
      <p className="flash-card-query">{query}</p>
      <p className="flash-card-assertion">{assertion}</p>
      <p className="flash-card-timestamp">Created on: {timestamp}</p>
      <div className="flash-card-response">
        <button onClick={() => handleResponseSelect("again")}>Again</button>
        <button onClick={() => handleResponseSelect("hard")}>Hard</button>
        <button onClick={() => handleResponseSelect("good")}>Good</button>
        <button onClick={() => handleResponseSelect("easy")}>Easy</button>
      </div>
    </div>
  );
};

export default FlashCard;
