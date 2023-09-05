import React, { useState, useEffect } from "react";
import DeckSelector from "../components/DeckSelector"; // Import the DeckSelector component
import FlashCard from "../components/FlashCard"; // Import the FlashCard component
import LoadingSpinner from "../components/LoadingSpinner";

const FlashCardPage = () => {
  const [selectedDeck, setSelectedDeck] = useState(null);
  const [searchHistory, setSearchHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (selectedDeck) {
      fetchSearchHistory(selectedDeck._id);
    }
  }, [selectedDeck]);

  const fetchSearchHistory = async (deckId) => {
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
        throw new Error("Failed to fetch search history");
      }
      const data = await response.json();
      setSearchHistory(data.searchHistory);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-full max-w-md">
        <h1 className="text-2xl font-semibold mb-4">Flash Cards</h1>
        <DeckSelector setSelectedDeck={setSelectedDeck} /> {/* Use your DeckSelector component */}
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <div className="flex flex-col items-center">
            {searchHistory.map((searchEntry) => (
              <FlashCard
                key={searchEntry._id}
                title={searchEntry.title}
                query={searchEntry.query}
                assertion={searchEntry.assertion}
                timestamp={searchEntry.timestamp}
                searchId={searchEntry._id}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FlashCardPage;
