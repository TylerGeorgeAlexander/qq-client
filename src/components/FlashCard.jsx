import { useState } from "react";

const FlashCard = ({ questions }) => {
  const [isAnswerVisible, setIsAnswerVisible] = useState(false);
  const [selectedResponse, setSelectedResponse] = useState(null);
  const [selectedQuestionIndex, setSelectedQuestionIndex] = useState(null);

  const toggleAnswerVisibility = () => {
    setIsAnswerVisible(!isAnswerVisible);
  };

  const selectRandomQuestion = () => {
    const randomIndex = Math.floor(Math.random() * questions.length);
    setSelectedQuestionIndex(randomIndex);
    setIsAnswerVisible(false);
    setSelectedResponse(null);
  };

  const handleResponseSelect = async (response) => {
    setSelectedResponse(response);
    // Make API request to update repetition interval based on selected response
    try {
      if (selectedQuestionIndex !== null) {
        // Use selectedQuestionIndex to get the selected question from the array
        const selectedQuestion = questions[selectedQuestionIndex];
        const apiResponse = await fetch(
          `https://quickquestion-server-52abd9886244.herokuapp.com/api/users/search-history/${selectedQuestion.searchId}/repetition-interval`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
            body: JSON.stringify({ response }),
          }
        );
        if (!apiResponse.ok) {
          throw new Error("Failed to update repetition interval");
        }
        // Handle successful update
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="bg-white border rounded-lg shadow-md p-4 w-full max-w-md mx-auto mt-6">
      <button
        className="mb-3 bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 transition duration-300"
        onClick={selectRandomQuestion}
      >
        Show Random Question
      </button>
      {selectedQuestionIndex !== null && (
        <div>
          <div className="front">
            <h3 className="text-lg font-semibold mb-2">Question</h3>
            <p className="text-gray-600">{questions[selectedQuestionIndex].query}</p>
            <button
              className="mt-3 bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 transition duration-300"
              onClick={toggleAnswerVisibility}
            >
              Show Answer
            </button>
          </div>
          {isAnswerVisible && (
            <div className="back mt-4">
              <h3 className="text-lg font-semibold mb-2">Answer</h3>
              <p className="text-gray-600">{questions[selectedQuestionIndex].assertion}</p>
              <div className="response-buttons mt-3">
                <button
                  className="response-button bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition duration-300"
                  onClick={() => handleResponseSelect("again")}
                >
                  Again
                </button>
                <button
                  className="response-button bg-orange-500 text-white px-3 py-1 rounded-md hover:bg-orange-600 transition duration-300"
                  onClick={() => handleResponseSelect("hard")}
                >
                  Hard
                </button>
                <button
                  className="response-button bg-yellow-500 text-white px-3 py-1 rounded-md hover:bg-yellow-600 transition duration-300"
                  onClick={() => handleResponseSelect("good")}
                >
                  Good
                </button>
                <button
                  className="response-button bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600 transition duration-300"
                  onClick={() => handleResponseSelect("easy")}
                >
                  Easy
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default FlashCard;
