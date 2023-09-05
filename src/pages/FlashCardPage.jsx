// pages/FlashCardPage.jsx
import FlashCard from "../components/FlashCard"; // Import your FlashCard component
import flashCardData from "./flashCardData"; // Import your FlashCard data

const FlashCardPage = () => {
  return (
    <div className="flash-card-page">
      <h1>Flash Cards</h1>
      <div className="flash-card-list">
        {flashCardData.map((card, index) => (
          <FlashCard
            key={index}
            title={card.title}
            query={card.query}
            assertion={card.assertion}
            timestamp={card.timestamp}
            searchId={card.searchId} // Pass the searchId as a prop
          />
        ))}
      </div>
    </div>
  );
};

export default FlashCardPage;

