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


////DeckObject/////////////////////////

function DeckObject() {
    this.unshuffledDeck = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51];
    this.deckArray = [];

    this.shuffleDeck = function() {
        for (i=0; i<52; i++) {
            var unshuffledLength = this.unshuffledDeck.length;
            var randomNum = Math.floor(Math.random() * unshuffledLength);
            var randomCard = this.unshuffledDeck[randomNum];
            this.deckArray.push(randomCard);
            this.unshuffledDeck.splice(randomNum, 1);
        }
    };

    this.getDeck = function() {
        return this.deckArray;
    };

    this.getCard = function() {
        var shiftCard = this.deckArray.shift();
        return shiftCard;
    };
}

//////////////////////////////////


///PlayerObject///////////////////// Chris

function PlayerObject() {
    this.hand = [];
    //var score = '';

    this.getHand = function() {
        return this.hand;
    };

    this.setHand = function (card) {
        this.hand.push(card);
    };

    this.resetHandValue = function() {
        this.hand = [];
    };

    this.getBet = function() {
        return betValue;
    };

    this.flipCards = function() {
        $('.down').each(function() {
            $(this).removeClass('down').addClass('up');
            //Creates Boolean for the cards on the table
            renderCard(false, false, false, $(this));
        });

        $('#dealerCard-0').html(dealer.getScore());
    };

    this.getValue = function(index) {
        if ((index % 13) > 10 || (index % 13) === 0) {
            return 10;
        } if ((index % 13) === 1) {
            return 11;
        } else {
            return index % 13;
        }
    };

    this.score = function(whichHand) {
        var x;
        var sum = 0;
        var aces = 0;
        for (i=0; i<whichHand.length; i++) {
            x = this.getValue(whichHand[i]);
            if (x === 11) {
                aces++;
                sum += x;
            }
            else {sum += x;}
        }
        while (sum > 21 && aces > 0) {
            sum -= 10;
            aces--;
        }
        return sum;
    };

    this.resetScore = function(whichHand) {
        var x = this.getValue(whichHand[0]);
        return x;
    }

}

/////////////////////////////////

//BankObject////////////////////// Chris

function BankObject() {

    var cash = 1000;
    bet = 0;
    //var playerHand = 20; //Used to test gameplay
    //var dealerHand = 21; //Used to test gameplay

    //Add money to bet in increments of $100
    this.increaseBet = function() {
        if (bet < cash) {
            bet += 100;
            this.updateCashBet();
        }
    };

    this.decreaseBet = function() {
        if (bet > 100) {
            bet -= 100;
            this.updateCashBet();
        }
    };

    /*
    $('#increase').click(function () {
        if (bet < cash) {
            bet += 100;
            bank.updateCashBet();
        }
    });
    $('#decrease').click(function () {
        if (bet > 100) {
            bet -= 100;
            bank.updateCashBet();
        }
    });
    */


    this.updateCashBet = function() {
        $('#betAmount').text('$' + bet.toString());
        $('#cashAmount').text('$' + cash.toString());
        this.gameOver();
    };


    this.winGame = function() {
        $('#winLoseMsg').innerHTML = 'You win $' + bet.toString() + '!'; // change append
        cash += bet;
        this.updateCashBet();
    };

    this.drawGame = function() {
        $('#winLoseMsg').innerHTML = 'You Draw!'; // change append
        //$('#increase').css({display: "show"});
        //$('#decrease').css({display: "show"});
        //$('#deal').css({display: "show"});
    };

    this.loseGame = function() {
        $('#winLoseMsg').innerHTML = 'You lose $' + bet.toString() + '!'; // change append
        cash -= bet;
        this.updateCashBet();
        if( cash < bet ) {
            bet = 100;
            this.updateCashBet();
        }
        //$('#increase').css({display: "show"});
        //$('#decrease').css({display: "show"});
        //$('#deal').css({display: "show"});
    };


    this.gameOver = function() {
        if (cash === 0) {
            $('#winLoseMsg').innerHTML = 'You suck. I took all your money.'; // change append
            //$('#increase').css({display: "none"});
            //$('#decrease').css({display: "none"});
            //$('#deal, #hit, #stand').css({display: "none"});
        }
    };


    this.scoreCheck = function(playerHand, dealerHand) { // Run this function at end of round or when playerHand === 21
        if (playerHand < 22) { //change playerHand/dealerHand variables to get value of each player's hand
            if (playerHand > dealerHand) {
                this.winGame();
            }
            else {
                if (dealerHand < 22) {
                    if (dealerHand === playerHand) {
                        this.drawGame();
                    }
                    else {
                        this.loseGame();
                    }
                }
            }
            if (dealerHand > 21) {
                this.winGame();
            }
        }
        else {
            this.loseGame();
        }
    }
}

//////////////////////////////////

/////playGame////////////////////
////////playGame///////////////////////program jQuery effects in this section

$(document).ready(function() {

    ////instantiate your objects here first////////
    var gameDeck = new DeckObject();
    gameDeck.shuffleDeck();
    var playerHand = new PlayerObject();
    var dealerHand = new PlayerObject();
    var bank = new BankObject();

    //hide stuff:
    $('#hit').hide();
    $('#stand').hide();
    $('#reset').hide();

    
    var printPlayerCards = function() {
        var shiftCard = gameDeck.getCard();
        playerHand.setHand(shiftCard);
        var pHand = playerHand.hand;
        var index = pHand[pHand.length - 1];
        $('#playersArea').prepend('<img class=playerCards src="images/' + index + '.png" />');//append is attaching new image tags immediately after opening div tag
        $('.playerCards').nextAll().css({position: "absolute", left: "-=55px", zIndex: "-=10"});
        $('#playersArea').css({position: "absolute", left:"+=55px"});
    };

    var printDealerCards = function() {
        var shiftCard = gameDeck.getCard();
        dealerHand.setHand(shiftCard);
        var dHand = dealerHand.hand;
        var index = dHand[dHand.length - 1];
        $('#dealersArea').prepend('<img class=dealerCards src="images/' + index + '.png" />');//append is attaching new image tags immediately after opening div tag
        $('.dealerCards').nextAll().css({position: "absolute", left: "-=55px", zIndex: "-=10"});
        $('#dealersArea').css({position: "absolute", left:"+=55px"});
    };

    var currentValuePlayer = document.getElementById('currentValuePlayer');
    var printPlayerScore = function() {
        currentValuePlayer.innerHTML = playerHand.score(playerHand.hand);
        $('#currentValuePlayer').css({visibility: "visible"});
    };

    var currentValueDealer = document.getElementById('currentValueDealer');
    var printDealerScore = function() {
        currentValueDealer.innerHTML = dealerHand.score(dealerHand.hand);
        $('#currentValueDealer').css({visibility: "visible"});
    };

    var printFirstDscore = function() {
        var x;
        var sum = 0;
        x = dealerHand.getValue(dealerHand.hand[1]);
        currentValueDealer.innerHTML = x;
        $('#currentValueDealer').css({visibility: "visible"});
    };

    var showDownCard = function() {
        var shiftCard = gameDeck.getCard();
        dealerHand.setHand(shiftCard);
        var dHand = dealerHand.hand;
        //var index = dHand[dHand.length - 1];
        $('#dealersArea').prepend('<img class="dealerCards down" src="images/back.png" />');//append is attaching new image tags immediately after opening div tag
        $('.dealerCards').nextAll().css({position: "absolute", left: "-=55px", zIndex: "-=10"});
        $('#dealersArea').css({position: "absolute", left:"+=55px"});
    };

    $('#increase').on('click', bank.increaseBet());
    $('#decrease').on('click', bank.decreaseBet());

    var flipCard = function() {
        var dHand = dealerHand.hand;
        var index = dHand[0];
        $('.down').attr('src', 'images/'+ index + '.png');
        printDealerScore();
    };

    var checkBust = function() {
        if (playerHand.score(playerHand.hand) >= 21) {
            $('#hit').hide();
            $('#stand').hide();
            finishDealerHand();
            //bank.scoreCheck(playerHand.hand, dealerHand.hand);         /////////Start working here
        } if (playerHand.score(playerHand.hand) === 21) {
            return;
        } else {
            return;
        }
    };

    var hitMe = function() {
        printPlayerCards();
        printPlayerScore();
        checkBust();

    };

    var deal = function() {
        printPlayerCards();
        showDownCard(); //change to print down card
        printPlayerCards();
        printDealerCards();
        printPlayerScore();
        printFirstDscore();
        $('#deal').hide();
        $('#hit').show();
        $('#stand').show();
    };

    var hitDealer = function() {  // bring in some if/else stuff to check if <17
        printDealerCards();
        printDealerScore();
    };

    var finishDealerHand = function() {
        flipCard();
        while (dealerHand.score(dealerHand.hand) < 17) {
            hitDealer();

        }
    };

    var declareWinner = function() {

    };

    $('#test').on('click', function() {
        alert(playerHand.hand);
    });

    $('#deal').on('click', function() {
        deal();
        //$('#increase').css({display: "none"});
        //$('#decrease').css({display: "none"});
        $(this).css({display: "none"});
    });


    $('#hit').on('click', function() {
        hitMe();

        var pHand = playerHand.score(playerHand.hand);
        var dHand = dealerHand.score(dealerHand.hand);

        if (pHand >= 21) {
            $('#reset').show();
            if (dHand <= 21) {
                if (dHand === pHand) {
                    bank.drawGame();
                }
                else {
                    bank.loseGame();
                }
            } else {
                return;
            }
        }


    });

    $('#stand').on('click', function() {
        finishDealerHand();
        $('#hit').hide();
        $('#stand').hide();
        $('#reset').show();

        var pHand = playerHand.score(playerHand.hand);
        var dHand = dealerHand.score(dealerHand.hand);

        if (pHand <= 21) {
            if (pHand > dHand) {
                bank.winGame();
            }
            else {
                if (dHand <= 21) {
                    if (dHand === pHand) {
                        bank.drawGame();
                    }
                    else {
                        bank.loseGame();
                    }
                }
            }
            if (dHand > 21) {
                bank.winGame();
            }
        }
        else {
            bank.loseGame();
        }
    });


    $("#reset").click(function(){   //john
        var pCurrentHand = playerHand.hand;
        var dCurrentHand = dealerHand.hand;
        gameDeck.unshuffledDeck.push(pCurrentHand.slice(0));
        gameDeck.unshuffledDeck.push(dCurrentHand.slice(0));
        playerHand.resetHandValue();
        dealerHand.resetHandValue();
        $("#playersArea").empty(); // Maybe push all cards from hands back into unshuffledDeck
        $("#dealersArea").empty(); // Still need to figure out how to zero out score. Maybe just call printDealerScore again to provoke a zero?
        $('.cardAreas').css({left:"450px"});
        //playerHand.resetScore(playerHand.hand); // maybe try pop()?
        printPlayerScore();
        //dealerHand.resetScore(dealerHand.hand);
        printDealerScore();
        $('#reset').hide();
        $('#deal').show();

    });

});

/////////////////////
/////////////////////////////////

/*
1. Betting only seems to be working if I use win/lose via the hit button
2. "Play again" button needs to show and declare winner needs to show if player gets 21(or more) and dealer gets <21
3. Need to program a Game Over function when player runs out of money.
4. Figure out why increase/decrease buttons don't do anything.
 */
