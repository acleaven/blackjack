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
    var score = '';

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
}

/////////////////////////////////

//BankObject////////////////////// Chris

function BankObject() {

    var cash = 1000;
    var bet = 0;
    var playerHand = 20; //Used to test gameplay
    var dealerHand = 21; //Used to test gameplay

    function updateCashBet() {
        $('#betAmount').text('$' + bet.toString());
        $('#cashAmount').text('$' + cash.toString());
        gameOver();
    }
//Add money to bet in increments of $100
    $('#increase').click(function () {
        if (bet < cash) {
            bet += 100;
            updateCashBet();
        }
    });
    $('#decrease').click(function () {
        if (bet > 100) {
            bet -= 100;
            updateCashBet();
        }
    });

    function winGame() {
        $('#winLoseMsg').append('<div class="result">You win $' + bet.toString() + '!</div');
        cash += bet;
        updateCashBet();
    }

    function drawGame() {
        $('#winLoseMsg').append('<div class="result">You Draw!</div');
        $('#increase').css({display: "show"});
        $('#decrease').css({display: "show"});
        $('#deal').css({display: "show"});
    }

    function loseGame() {
        $('#winLoseMsg').append('<div class="result">You lose $' + bet.toString() + '!</div');
        cash -= bet;
        updateCashBet();
        if( cash < bet ) {
            bet = 100;
            updateCashBet();
        }
        $('#increase').css({display: "show"});
        $('#decrease').css({display: "show"});
        $('#deal').css({display: "show"});
    }


    function gameOver() {
        if (cash === 0) {
            $('#winLoseMsg').append('<div class="result"> You suck. I took all your money. </div');
            $('#increase').css({display: "none"});
            $('#decrease').css({display: "none"});
            $('#deal, #hit, #stand').css({display: "none"});
        }
    }

    function scoreCheck() {
        if (playerHand < 22) {
            if (playerHand > dealerHand) {
                winGame();
            }
            else {
                if (dealerHand < 22) {
                    if (dealerHand === playerHand) {
                        drawGame();
                    }
                    else {
                        loseGame();
                    }
                }
            }
            if (dealerHand > 21) {
                winGame();
            }
        }
        else {
            loseGame();
        }
    }
}



/////playGame////////////////////
////////playGame///////////////////////program jQuery effects in this section

$(document).ready(function() {

    ////instantiate your objects here first////////
    var gameDeck = new DeckObject();
    gameDeck.shuffleDeck();
    var playerHand = new PlayerObject();
    var dealerHand = new PlayerObject();

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

    var hitMe = function() {
        printPlayerCards();
        printPlayerScore();
    };

    var deal = function() {
        printPlayerCards();
        printDealerCards();
        printPlayerCards();
        printDealerCards();
        printPlayerScore();
        printDealerScore();
    };

    var hitDealer = function() {
        printDealerCards();
        printDealerScore();
    };

    $('#test').on('click', function() {
        alert(gameDeck.deckArray[0]);
    });

    $('#deal').on('click', function() {
        deal();
        $('#increase').css({display: "none"});
        $('#decrease').css({display: "none"});
        $(this).css({display: "none"});
    });


    $('#hit').on('click', function() {
        hitMe();
    });

    $('#stand').on('click', function() {
        hitDealer();
    });

    $("#reset").click(function(){   //john
        $("#playersArea").empty(); // we need to make this reset the score to zero too
        $("#dealersArea").empty();
        gameDeck.deckArray = []; // gameDeck not being called?
        var gameDeck = new DeckObject();
        gameDeck.deckArray.shuffleDeck();
    });

});

/////////////////////
/////////////////////////////////
