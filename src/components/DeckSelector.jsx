import { useState, useEffect } from "react";

const DeckSelector = ({ setSelectedDeck }) => {
    const [decks, setDecks] = useState([]);
    const [selectedDeckId, setSelectedDeckId] = useState(null);

    useEffect(() => {
        fetchDecks();
    }, []);

    const fetchDecks = async () => {
        try {
            const response = await fetch(
                "https://quickquestion-server-52abd9886244.herokuapp.com/api/decks",
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
                    },
                }
            );
            if (!response.ok) {
                throw new Error("Failed to fetch decks");
            }
            const data = await response.json();
            setDecks(data.decks);
        } catch (error) {
            console.error(error);
        }
    };

    const handleDeckSelection = (deckId) => {
        setSelectedDeckId(deckId);
        const selectedDeck = decks.find((deck) => deck._id === deckId);
        setSelectedDeck(selectedDeck);
    };

    return (
        <div className="mb-4">
            <label htmlFor="deckSelector" className="block font-semibold mb-2">
                Select a Deck:
            </label>
            <select
                id="deckSelector"
                className="border rounded-md p-2 w-full"
                value={selectedDeckId || ""}
                onChange={(e) => handleDeckSelection(e.target.value)}
            >
                <option value="">Select a deck...</option>
                {decks && decks.map((deck) => (
                    <option key={deck._id} value={deck._id}>
                        {deck.name}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default DeckSelector;
