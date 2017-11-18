//var unshuffledDeck = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51];
//var deckArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51];
//var deckArray = [];
//var playerHand = [];
//var dealerHand = [];



////DeckObject/////////////////////////

function DeckObject() {
    this.unshuffledDeck = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51];
    this.deckArray = [];

    this.shuffleDeck = function() {
        for (i=0; i<51; i++) {
            var unshuffledLength = this.unshuffledDeck.length;
            var randomNum = Math.floor(Math.random() * unshuffledLength);
            var randomCard = this.unshuffledDeck.slice(randomNum, (randomNum +1)); // see if problem lies in
            this.deckArray.push(randomCard);
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

    this.getValue = function(index) {  ////This logic needs attention, combined with the order of cards/indexNums in image folder
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
            x = getValue(whichHand[i]);
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
        $('.playerCards').nextAll().css({position: "absolute", left: "+=55px", zIndex: "+=10"});
    };

    var printDealerCards = function() {
        var shiftCard = gameDeck.getCard();
        dealerHand.setHand(shiftCard);
        var dHand = dealerHand.hand;
        var index = dHand[dHand.length - 1];
        $('#dealersArea').prepend('<img class=dealerCards src="images/' + index + '.png" />');//append is attaching new image tags immediately after opening div tag
        $('.dealerCards').nextAll().css({position: "absolute", left: "+=55px", zIndex: "+=10"});
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
        playerHand.printPlayerScore();
        dealerHand.printDealerScore();
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