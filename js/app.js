/*
 * Create a list that holds all of your cards
 */
let card = document.getElementsByClassName("card");
let cards = [...card];

//deck
const deck = document.querySelector(".deck");

//restart icon
let restart = document.getElementsByClassName(".fa fa-repeat");

// declaring move variable
let moves = 0;
let counter = document.querySelector(".moves");

// declare variables for star icons
const stars = document.querySelectorAll(".fa-star");

// declaring variable of matchedCards
let matchedCard = document.getElementsByClassName("match");

//timer
var second = 0, minute = 0, hour = 0;
var interval;
var timer = document.querySelector(".timer");

// stars list
let starsList = document.querySelectorAll(".stars li");

// declare modal
var modal = document.getElementById("myModal");

// array for opened cards
var opendCards = [];

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

//open and and show class to display cards
function displayCard() {
  this.classList.toggle("open");
  this.classList.toggle("show");
}

//Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue,
    randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

//function to start a new game
function startGame() {
  // shuffle the deck
  var ShuffleCards = shuffle(cards);

  //remove all classes from each card
  for (let i = 0; i < ShuffleCards.length; i++) {
    deck.innerHTML = "";
    [].forEach.call(ShuffleCards, function(item) {
      deck.appendChild(item);
    });
    ShuffleCards[i].classList.remove("show", "open", "match");
  }

  //reset moves
  moves = 0;
  counter.innerHTML = moves;

  //display stars
  for (var i = 0; i < stars.length; i++) {
    stars[i].style.color = "#FFD700";
    stars[i].style.visibility = "visible";
  }

  //reset timer
  timer.innerHTML = "0 min 0 sec";
  clearInterval(interval);

  // loop to add event listeners to each card
  for (var i = 0; i < cards.length; i++) {
    card = cards[i];
    card.addEventListener("click", displayCard);
    card.addEventListener("click", openCards);
  }
}

window.onload = startGame();

//add opend card to opendcards list and check if cards are match or not
function openCards() {
  this.removeEventListener("click", openCards);
  opendCards.push(this);
  var length = opendCards.length;
  if (length == 2) {
    moveCounter();
    if (opendCards[0].getElementsByTagName("i")[0].className ===
      opendCards[1].getElementsByTagName("i")[0].className) {
      matched();
    } else {
      unmatched();
    }
  }
  congratulate();
}

// player's moves
function moveCounter() {
  moves++;
  counter.innerHTML = moves;

  //start timer on first click
  if (moves == 1) {
    second = 0;
    minute = 0;
    hour = 0;
    startTimer();
  }

  // setting rates based on moves
  if (moves > 8 && moves < 16) {
    for (i = 0; i < 3; i++) {
      if (i > 1) {
        stars[i].style.visibility = "collapse";
      }
    }
  } else if (moves > 17) {
    for (i = 0; i < 3; i++) {
      if (i > 0) {
        stars[i].style.visibility = "collapse";
      }
    }
  }
}

// game timer
function startTimer() {
  interval = setInterval(function() {
    timer.innerHTML = minute + "mins " + second + "secs";
    second++;
    if (second == 60) {
      minute++;
      second = 0;
    }
    if (minute == 60) {
      hour++;
      minute = 0;
    }
  }, 1100);
}

//for when cards match
function matched() {
  opendCards[0].classList.add("match");
  opendCards[1].classList.add("match");
  opendCards[0].classList.remove("show", "open");
  opendCards[1].classList.remove("show", "open");
  opendCards = [];
}

//for when cards dont match
function unmatched() {
  opendCards[0].classList.add("unmatch");
  opendCards[1].classList.add("unmatch");
  setTimeout(function() {
    opendCards[0].classList.remove("show", "open", "unmatch");
    opendCards[1].classList.remove("show", "open", "unmatch");
    opendCards = [];
  }, 1100);
  opendCards[0].addEventListener("click", openCards);
  opendCards[1].addEventListener("click", openCards);
}

function restartGame() {
  startGame();
}

//for congratulation model
function congratulate() {
  var span = document.getElementsByClassName("close")[0];
  var playAgain = document.getElementsByClassName("play-button");
  var message = document.querySelector("#message");
  if (matchedCard.length == 2) {
    setTimeout(function() {
      {
        modal.style.display = "block";

        //var starRating = document.querySelector(".stars");
        if (moves > 8 && moves < 16) {
          starRating = 2;
        } else if (moves > 17) starRating = 1;
        else starRating = 3;

        // When the user clicks on <span> (x), close the modal
        span.onclick = function() {
          modal.style.display = "none";
          startGame();
        };

        message.innerHTML = "<p> With " + moves + " Moves and " + starRating + " Stars !!!";
      }
    }, 1100);
  }

  document.querySelector(".play-button").addEventListener("click", play);
}

function play() {
  modal.style.display = "none";
  startGame();
}

document.querySelector(".restart").addEventListener("click", restartGame);
