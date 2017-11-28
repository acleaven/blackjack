/*
Blackjack homework assignment
Team members:
Chris Bonk
Andy Cleavenger
John Morabito

Division of tasks:
Andy wrote the DeckObject, including the shuffleDeck() function, as well as the getValue() and score()
portions of the PlayerObject. Chris wrote the rest of the PlayerObject, and all of the BankObject. John and Andy
wrote the game play functions in tandem.
*/


////DeckObject///////////////////////// This object written by Andy Cleavenger

function DeckObject() { // unshuffledDeck is an array with all the cards in order
    this.unshuffledDeck = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51];
    this.deckArray = []; // deckArray is an empty array that we will pass cards to during the shuffle function

    this.shuffleDeck = function() {
        for (i=0; i<52; i++) { //loop through the following process 52 times
            var unshuffledLength = this.unshuffledDeck.length; //stores the value of the length of the unshuffledDeck array
            var randomNum = Math.floor(Math.random() * unshuffledLength); // generates a random number between 0 and whatever the length of the array is as the loop continues
            var randomCard = this.unshuffledDeck[randomNum]; // stores the location of a randomly selected card from the unshuffledDeck array
            this.deckArray.push(randomCard); // pushes the random card to the deckArray
            this.unshuffledDeck.splice(randomNum, 1); // removes the same random card from from the unshuffledDeck array
        }
    };

    /*
    this.getDeck = function() {
        return this.deckArray; // returns whatever the present deckArray is
    };*/

    this.getCard = function() {
        var shiftCard = this.deckArray.shift(); // stores the value of whatever the first card in deckArray is
        return shiftCard; // returns the value of that card
    };

    this.resetDeck = function() {
        this.unshuffledDeck = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51];
        this.deckArray = [];
    }
}

//////////////////////////////////


///PlayerObject///////////////////// This object written by Chris

function PlayerObject() {
    this.hand = []; //sets the hand as an empty array


    /*
    this.getHand = function() {
        return this.hand; // returns whatever is in the present hand array
    };*/

    this.setHand = function (card) {
        this.hand.push(card); // pushes a card to the hand array
    };

    this.resetHandValue = function() {
        this.hand = []; // this resets the hand array to an empty array
    };

    /*
    this.getBet = function() {
        return betValue; // this returns the bet value
    };*/


    this.getValue = function(index) { // this function determines the face value of each card
        if ((index % 13) > 10 || (index % 13) === 0) { // if modulus of index is greater than 10 or equal to zero it's a face card, and worth 10
            return 10;
        } if ((index % 13) === 1) { // if modulus of index is equal to 1 it's an ace and will be worth 11 by default
            return 11;
        } else {
            return index % 13; // all other cards are worth the face value which is equal to the modulus of 13
        }
    };

    this.score = function(whichHand) {
        var x;
        var sum = 0; // sets initial score to 0
        var aces = 0; // sets initial count of aces to 0
        for (i=0; i<whichHand.length; i++) { // loops through the following process for every card in the array
            x = this.getValue(whichHand[i]); // gets value of current card
            if (x === 11) { // if it's worth 11 then it's an ace
                aces++; // store the presence of an ace in the aces counter
                sum += x; // add the value to the current sum
            }
            else {sum += x;} // if any other card add the value to the current sum
        }
        while (sum > 21 && aces > 0) { // while the sum is greater than 21 and there are any amount of aces...
            sum -= 10; // lower the sum by 10, effectively making the ace worth one
            aces--; // decrease the number of aces in the aces counter by one
        }
        return sum; // return the sum
    };



}

/////////////////////////////////

//BankObject////////////////////// Written by Chris Bonk

function BankObject() {

    var cash = 1000; //sets initial cash amount at $1000
    bet = 100; // sets initial bet amount at $0

    this.increaseBet = function() {
        if (bet < cash) { // As long as the bet is less than the available amount of cash...
            bet += 100; // you may increase the bet in increments of $100
            this.updateCashBet(); // calls the function to write the current bet to the betAmount div
        }
    };

    this.decreaseBet = function() {
        if (bet > 100) { // As long as bet is more than $100...
            bet -= 100; // you may decrease the bet in increments of $100
            this.updateCashBet(); // calls the function to write the current bet to the betAmount div
        }
    };


    this.updateCashBet = function() {
        $('#betAmount').text('$' + bet.toString()); // targets the betAmount div in the HTML and writes the present bet amount to it
        $('#cashAmount').text('$' + cash.toString()); //targets the cashAmount div in the HTML and writes the present cash amount to it

    };

    this.debtColor = function() {
        if (cash >= 0) {
            $('#cashAmount').css({color: "gold"});
        } if (cash < 0) {
            $('#cashAmount').css({color: "red"});
        }
    };


    this.winGame = function() {
        $('#winLoseMsg').text('You win $' + bet.toString() + '!');
        cash += bet; // adds the bet amount to the available cash
        this.updateCashBet(); // calls the function that updates the betAmount and cashAmount divs in the HTML
        this.debtColor();
    };

    this.drawGame = function() {
        $('#winLoseMsg').text('You Draw!');
        this.debtColor();

    };

    this.loseGame = function() {
        $('#winLoseMsg').text('You lose $' + bet.toString() + '!');  // not working at the moment
        cash -= bet; // subtracts the bet amount from the current amount of available cash
        this.updateCashBet(); // calls the function that writes those totals to the betAmount and cashAmount divs
        if( cash < bet ) { // I'm not sure what the purpose of this is, but it says that if the cash amount is less than the bet amount set the bet to $100...  what is that for?
            bet = 100;
            this.updateCashBet(); // calls the function that updates the betAmount and cashAmount divs in the HTML
        }
        this.debtColor();

    };

    /*
    this.gameOver = function() {
        if (cash === 0) {
            $('#winLoseMsg').text('You suck. I took all your money.');
            this.debtColor();

        }
    };*/


}

//////////////////////////////////

/////playGame////////////////////
////////playGame/////////////////////// John Morabito and Andy Cleavenger wrote the game play functions below together

$(document).ready(function() {
    soundPlayPause();
  });

    $('#play').hide();
    $('#cashDiv').hide();
    $('#betDiv').hide();
    $('#buttonPanel').hide();

    //$('#directionBox').hide().delay(300).slideDown(1500);
    $('#closer').on('click', function() {
        $('#directionBox').slideUp(1500);
        $('#cashDiv').show();
        $('#betDiv').show();
        $('#buttonPanel').show();
    });

    /////Instantiated objects:
    var gameDeck = new DeckObject(); // instantiates the DeckObject
    gameDeck.shuffleDeck(); // shuffles the deck
    var playerHand = new PlayerObject(); // instantiates the PlayerObject as playerHand
    var dealerHand = new PlayerObject(); // instantiates another PlayerObject as dealerHand
    var bank = new BankObject(); // instantiates the BankObject
    bank.updateCashBet();


    $('#hit').hide(); // hides the hit button
    $('#stand').hide(); // hides the stand button
    $('#reset').hide(); // hides the Play Again button


    var printPlayerCards = function() {
        var shiftCard = gameDeck.getCard(); // stores the value of a card from gameDeck in a variable
        playerHand.setHand(shiftCard); // calls the setHand method of the PlayerObject to push that card to the playerHand array
        var pHand = playerHand.hand; //stores the location of the playerHand array in a variable
        var index = pHand[pHand.length - 1]; // stores the value of the last card in the playerHand array in a variable
        $('#playersArea').prepend('<img class=playerCards src="images/' + index + '.png" />'); // targets the playersArea div in the HTML and adds an image with a class of "playerCards" to it with a custom src address of the selected card
        $('.playerCards').nextAll().css({position: "absolute", left: "-=55px", zIndex: "-=10"}); // sets the css of each successive image to appear on top of, and 55 pixels offset from the previous card
        $('#playersArea').css({position: "absolute", left:"+=55px"}); // moves the card area divs the same offset amount as the card offsets to make cards appear to stack left to right
    };

    var printDealerCards = function() {
        var shiftCard = gameDeck.getCard(); // stores the value of a card from gameDeck in a variable
        dealerHand.setHand(shiftCard); // calls the setHand method of the PlayerObject to push that card to the dealerHand array
        var dHand = dealerHand.hand; //stores the location of the dealerHand array in a variable
        var index = dHand[dHand.length - 1]; // stores the value of the last card in the playerHand array in a variable
        $('#dealersArea').prepend('<img class=dealerCards src="images/' + index + '.png" />'); // targets the dealersArea div in the HTML and adds an image with a class of "dealerCards" to it with a custom src address of the selected card
        $('.dealerCards').nextAll().css({position: "absolute", left: "-=55px", zIndex: "-=10"}); // sets the css of each successive image to appear on top of, and 55 pixels offset from the previous card
        $('#dealersArea').css({position: "absolute", left:"+=55px"}); // moves the card area divs the same offset amount as the card offsets to make cards appear to stack left to right
    };

    var currentValuePlayer = document.getElementById('currentValuePlayer'); // stores the location of currentValuePlayer div in the HTML into a variable
    var printPlayerScore = function() {
        currentValuePlayer.innerHTML = playerHand.score(playerHand.hand); // sets the innerHTML of that div to show the score of the current player hand
        $('#currentValuePlayer').css({visibility: "visible"}); // not sure this is necessary, try commenting out and see what happens
    };

    var currentValueDealer = document.getElementById('currentValueDealer'); // stores the location of currentValueDealer div in the HTML into a variable
    var printDealerScore = function() {
        currentValueDealer.innerHTML = dealerHand.score(dealerHand.hand); // sets the innerHTML of that div to show the score of the current dealer hand
        $('#currentValueDealer').css({visibility: "visible"}); // not sure this is necessary, try commenting out and see what happens
    };

    var printFirstDscore = function() { // this function prints the score of only the second card in the dealerHand array
        var x;
        var sum = 0; // don't think we're using this
        x = dealerHand.getValue(dealerHand.hand[1]); // stores the value of the second card in the dealerHand array into a variable
        currentValueDealer.innerHTML = x; // changes the innerHTML of the currentValuePlayer div to show the value of that card
        $('#currentValueDealer').css({visibility: "visible"}); // not sure this is necessary, try commenting out and see what happens
    };

    var showDownCard = function() {
        var shiftCard = gameDeck.getCard();
        dealerHand.setHand(shiftCard);
        var dHand = dealerHand.hand;
        $('#dealersArea').prepend('<img class="dealerCards down" src="images/back.png" />');//append is attaching new image tags immediately after opening div tag
        $('.dealerCards').nextAll().css({position: "absolute", left: "-=55px", zIndex: "-=10"});
        $('#dealersArea').css({position: "absolute", left:"+=55px"});
    };

    $('#increase').on('click', function() { // when user clicks the increase button...
        bank.increaseBet(); // call the bank's increaseBet method
    });
    $('#decrease').on('click', function() { // when user clicks the decrease button...
        bank.decreaseBet(); // call the bank's decreaseBet method
    });

    var flipCard = function() { // this function flips the first card in the dealerArea div
        var dHand = dealerHand.hand; // stores the current dealerHand array into a variable
        var index = dHand[0]; // stores the first card in the dealerHand array into a variable
        $('.down').attr('src', 'images/'+ index + '.png'); // targets the img element with a class of "down" and changes its src attribute to the custom address of the current first card in the dealerHand array
        printDealerScore(); // calls the printDealerScore function to refresh the score with the newly upturned card
    };


    var hitMe = function() {
        printPlayerCards(); // calls function that prints a single card to the playerHand
        printPlayerScore(); // calls a function that adds the amount of that card to the present sum

    };

    var deal = function() { // this is the first function used to start the game
        printPlayerCards(); // calls function that prints the first card to the playerHand
        showDownCard(); // calls function that shows a down card in the first card spot for the dealer
        printPlayerCards(); // calls function that prints the second card to the playerHand
        printDealerCards(); // calls function that prints the second card to the dealerHand
        printPlayerScore(); // calls function to show the player score
        printFirstDscore(); // calls function to show the score of just the one visible dealer card
        $('#deal').hide(); // hides the deal button
        $('#hit').show(); // shows the hit button
        $('#stand').show(); // shows the stand button
    };

    var hitDealer = function() {
        printDealerCards(); // calls function that prints a single card to the dealerHand
        printDealerScore(); // calls a function that adds the amount of that card to the present sum
    };

    var finishDealerHand = function() {
        flipCard(); // calls function that flips the down card
        while (dealerHand.score(dealerHand.hand) < 17) { // while the dealer has a score of less than 17...
            hitDealer(); // continue hitting the dealer

        }
    };


    $('#test1').on('click', function() { // not currently using this. Was just a test button to check the contents of arrays in an alert box
        alert(playerHand.hand);
    });

    $('#test2').on('click', function() { // not currently using this. Was just a test button to check the contents of arrays in an alert box
        alert(gameDeck.deckArray);
    });

    $('#deal').on('click', function() { // calls the deal function when user clicks the deal button
        deal();
        //$('#increase').css({display: "none"});
        //$('#decrease').css({display: "none"});
        $(this).css({display: "none"}); // hides the deal button I think?
    });


    $('#hit').on('click', function() { // calls the hitMe function when user clicks hit button
        hitMe();

        $('#increase').hide();
        $('#decrease').hide();

        var pHand = playerHand.score(playerHand.hand); // stores the current playerHand in a variable
        var dHand = dealerHand.score(dealerHand.hand); // stores the current  dealerHand in a variable



        if (pHand > 21) {
            finishDealerHand();
            if (dHand > 21) {
                bank.drawGame();
                //bank.debtColor();
                $('#hit').hide();
                $('#stand').hide();
                $('#reset').show();
            }

            if (dHand <= 21) {
                bank.loseGame();
                //bank.debtColor();
                $('#hit').hide();
                $('#stand').hide();
                $('#reset').show();
            }
        } if (pHand === 21) { //stand function takes over from here
            return;
        } if (pHand < 21) {
            return;
        }

    });

    $('#stand').on('click', function() { // when user clicks on stand button...
        finishDealerHand(); // call the function that completes the dealerHand and flips the first card
        $('#hit').hide(); // hide the hit button
        $('#stand').hide(); // hide the stand button
        $('#reset').show(); // show the Play Again button
        $('#increase').hide();
        $('#decrease').hide();

        var pHand = playerHand.score(playerHand.hand); // store the score of the player in a variable
        var dHand = dealerHand.score(dealerHand.hand); // store the score of the dealer in a variable

        if (pHand <= 21) { // if the player's score is less than or equal to 21...
            if (pHand > dHand) { // and if the player's score is more than the dealer's score...
                bank.winGame(); // call the bank's winGame method
                //bank.debtColor();
            }
            else {
                if (dHand <= 21) { // if the dealer's hand is less than 21...
                    if (dHand === pHand) { // and the dealer and player both have the same score...
                        bank.drawGame(); // calle the bank's drawGame method
                        //bank.debtColor();
                    }
                    else {
                        bank.loseGame(); // any other result (dealer score > player score is only other option) call the bank's loseGame method
                        //bank.debtColor();
                    }
                }
            }
            if (dHand > 21) { // if the dealer score is over 21...
                bank.winGame(); // call the bank's winGame method
                //bank.debtColor();
            }
        }
        else { // if the player's score is over 21...
            bank.loseGame(); // call the bank's loseGame method
            //bank.debtColor();
        }
    });


    $("#reset").click(function(){   // resets the cards and score, but not the cash amount
        $('#increase').show();
        $('#decrease').show();
        gameDeck.resetDeck();
        gameDeck.shuffleDeck();
        playerHand.resetHandValue(); // calls the resetHandValue method to define the playerHand array as empty
        dealerHand.resetHandValue(); // calls the resetHandValue method to define the dealerHand array as empty
        $("#playersArea").empty(); // empties the playersArea div of all card img elements
        $("#winLoseMsg").empty(); // empties the winLoseMsg div of the text content
        $("#dealersArea").empty(); // empties the dealersArea div of all card img elements
        $('.cardAreas').css({left:"450px"}); // resets the cardArea divs back to original position
        printPlayerScore(); // re-calls the print score method on the empty playerHand array to reset the score to zero
        printDealerScore(); // re-calls the print score method on the empty dealerHand array to reset the score to zero
        $('#reset').hide(); // hides the reset button
        $('#deal').show(); // shows the deal button

    });


/////////////////////
/////////////////////////////////
//Background Music/////////////////////////////// Written by Chris Bonk and John Morabito

function soundPlayPause() {     //plays background music for the game
    var backgroundMusic = document.getElementById("backgroundMusic"); //calls the audio from the HTML page
    if (backgroundMusic.paused) { //if the music button is not paused, play music
        backgroundMusic.play();
    } else {
        backgroundMusic.pause(); //else pause the music.
    }

}

$('#pause').click(function() { //when the pause image is clicked run this function
  var backgroundMusic = document.getElementById("backgroundMusic"); //gets the background song to put into a variable
  backgroundMusic.pause(); //song is paused
  $('#pause').hide(); //pause image is hidden
  $('#play').show(); //shows play image in the place of the pause image
});

$('#play').click(function() { //when the pause image is clicked run this function
  var backgroundMusic = document.getElementById("backgroundMusic"); //gets the background song to put into a variable
  backgroundMusic.play(); //song is played
  $('#play').hide(); //play image is hidden
  $('#pause').show(); //pause image is shown
});


/*

4. We need directions for player div
5. card entrance animations (jQuery)
6. Change appearance of buttons

 */
