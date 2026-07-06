import { useState } from "react";

const defaultDecks = [
  {
    id: 1,
    name: "JavaScript Basics",
    emoji: "⚡",
    cards: [
      { q: "What is a closure?", a: "A function that retains access to its outer scope even after the outer function has returned." },
      { q: "What does `typeof null` return?", a: '"object" — a known quirk in JavaScript due to legacy reasons.' },
      { q: "What is event delegation?", a: "Attaching a single event listener to a parent element to handle events from its children." },
      { q: "What is the difference between `==` and `===`?", a: "`==` does type coercion before comparing. `===` compares value AND type strictly." },
      { q: "What is a Promise?", a: "An object representing the eventual completion or failure of an asynchronous operation." },
    ],
  },
  {
    id: 2,
    name: "World Capitals",
    emoji: "🌍",
    cards: [
      { q: "Capital of Japan", a: "Tokyo" },
      { q: "Capital of Brazil", a: "Brasília" },
      { q: "Capital of Australia", a: "Canberra" },
      { q: "Capital of Canada", a: "Ottawa" },
      { q: "Capital of Egypt", a: "Cairo" },
    ],
  },
  {
    id: 3,
    name: "Human Biology",
    emoji: "🧬",
    cards: [
      { q: "What is the powerhouse of the cell?", a: "The mitochondria — it produces ATP through cellular respiration." },
      { q: "How many bones are in the adult human body?", a: "206 bones." },
      { q: "What does DNA stand for?", a: "Deoxyribonucleic Acid." },
      { q: "What is the largest organ in the body?", a: "The skin." },
      { q: "How many chambers does the human heart have?", a: "4 chambers: right atrium, right ventricle, left atrium, left ventricle." },
    ],
  },
];

/**
 * Create a new array with the elements of the input array in randomized order.
 * @param {Array} arr - The array whose elements will be randomized.
 * @returns {Array} A new array containing the same elements as `arr` in random order.
 */
function shuffle(arr) {
  return [...arr].sort(() => Math.random() - 0.5);
}

/**
 * Flashcard study app component that manages decks, study sessions, and a UI for creating decks and cards.
 *
 * Renders a three-view interface ("home", "study", "add") that lets users:
 * - browse and start decks (shuffling cards for study),
 * - run interactive study sessions with card flipping, marking items as known or to review, and retrying missed cards,
 * - create new decks and add question/answer cards to existing decks.
 *
 * @returns {JSX.Element} The React element for the flashcard application UI.
 */
export default function FlashcardApp() {
  const [decks, setDecks] = useState(defaultDecks);
  const [activeDeck, setActiveDeck] = useState(null);
  const [cards, setCards] = useState([]);
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [known, setKnown] = useState([]);
