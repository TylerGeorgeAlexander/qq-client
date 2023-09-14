import { useState, useEffect } from "react";
import DeckSelector from "../components/DeckSelector"; // Import the DeckSelector component
import FlashCard from "../components/FlashCard"; // Import the FlashCard component
import LoadingSpinner from "../components/LoadingSpinner";

const FlashCardPage = () => {
  const [selectedDeck, setSelectedDeck] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isUnderConstruction, setIsUnderConstruction] = useState(false); // TODO: add features

  useEffect(() => {
    if (selectedDeck) {
      fetchQuestions(selectedDeck._id);
    }
  }, [selectedDeck]);

  const fetchQuestions = async (deckId) => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `https://quickquestion-server-52abd9886244.herokuapp.com/api/decks/${deckId}/search-history`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch questions");
      }
      const data = await response.json();
      setQuestions(data.searchHistory);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {isUnderConstruction ? (
        <div className="flex justify-center items-center h-screen">
          <div className="w-full max-w-md">
            <h1 className="text-2xl font-semibold mb-4">
              Flash Cards (Under Construction)
            </h1>
            <p>This feature is currently under construction. Check back later for updates!</p>
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center h-screen">
          <div className="w-full max-w-md">
            <h1 className="text-2xl font-semibold mb-4">Flash Cards</h1>
            <DeckSelector setSelectedDeck={setSelectedDeck} /> {/* Use your DeckSelector component */}
            {isLoading ? (
              <LoadingSpinner />
            ) : (
              <div className="flex flex-col items-center">
                {questions.length > 0 && (
                  <FlashCard questions={questions} />
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default FlashCardPage;
