const quotes = [
  { quote: "The best way to get started is to quit talking and begin doing.", author: "Walt Disney" },
  { quote: "Don't let yesterday take up too much of today.", author: "Will Rogers" },
  { quote: "It's not whether you get knocked down, it's whether you get up.", author: "Vince Lombardi" },
  { quote: "If you are working on something exciting, it will keep you motivated.", author: "Unknown" },
  { quote: "Success is not in what you have, but who you are.", author: "Bo Bennett" },
];

const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const newQuoteBtn = document.getElementById("new-quote");

function getRandomQuote() {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  return quotes[randomIndex];
}

function displayQuote() {
  const randomQuote = getRandomQuote();
  quoteText.textContent = `"${randomQuote.quote}"`;
  authorText.textContent = `- ${randomQuote.author}`;
}

newQuoteBtn.addEventListener("click", displayQuote);
