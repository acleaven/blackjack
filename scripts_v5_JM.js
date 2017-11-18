//var unshuffledDeck = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51];
//var deckArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51];
//var deckArray = [];
var playerHand = [];
var dealerHand = [];



////DeckObject/////////////////////////

function DeckObject() {
    this.unshuffledDeck = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51];
    this.deckArray = [];

    this.shuffleDeck = function() {
        for (i=0; i<51; i++) {
            var unshuffledLength = this.unshuffledDeck.length;
            var randomNum = Math.floor(Math.random() * unshuffledLength);
            var randomCard = this.unshuffledDeck.slice(randomNum, (randomNum +1));
            this.deckArray.push(randomCard);
        }
    };

    this.printPlayerCards = function() {
        var shiftCard = this.deckArray.shift();
        playerHand.push(shiftCard);
        var index = playerHand[playerHand.length - 1];
        $('#playersArea').prepend('<img class=playerCards src="images/' + index + '.png" />');//append is attaching new image tags immediately after opening div tag
        $('.playerCards').nextAll().css({position: "absolute", left: "+=55px", zIndex: "+=10"});
    };

    this.printDealerCards = function() {
        var shiftCard = this.deckArray.shift();
        dealerHand.push(shiftCard);
        var index = dealerHand[dealerHand.length - 1];
        $('#dealersArea').prepend('<img class=dealerCards src="images/' + index + '.png" />');//append is attaching new image tags immediately after opening div tag
        $('.dealerCards').nextAll().css({position: "absolute", left: "+=55px", zIndex: "+=10"});
    };

    this.hitMe = function() { ////should these be part of the Hand object?
        this.printPlayerCards(); ////should these all have "this" on them?
        this.printPlayerScore();
    };

    this.deal = function() {
        this.printPlayerCards();
        this.printDealerCards();
        this.printPlayerCards();
        this.printDealerCards();
        this.printPlayerScore();
        this.printDealerScore();
    };

    this.hitDealer = function() {
        this.printDealerCards();
        this.printDealerScore();
    };

  //  this.reset = function() {
  //      this.deckArray = [];
  //      deckArray.shuffleDeck();
  //  };


}

//////////////////////////////////


///HandObject/////////////////////

//////////////////////////////////






////getScore///////////

var getValue = function(index) {  ////This logic needs attention, combined with the order of cards/indexNums in image folder
    if ((index % 13) > 10 || (index % 13) === 0) {
        return 10;
    } if ((index % 13) === 1) {
        return 11;
    } else {
        return index % 13;
    }
};

var score = function(whichHand) {
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

//////////////////////


/////This displays the score in the appropriate area/////
var currentValuePlayer = document.getElementById('currentValuePlayer');
var printPlayerScore = function() {
    currentValuePlayer.innerHTML = score(playerHand);
    $('#currentValuePlayer').css({visibility: "visible"});
};

var currentValueDealer = document.getElementById('currentValueDealer');
var printDealerScore = function() {
    currentValueDealer.innerHTML = score(dealerHand);
    $('#currentValueDealer').css({visibility: "visible"});
};

/////////////


/////playGame////////////////////
////////playGame///////////////////////program jQuery effects in this section

//wondering if Game should be an object and we call of these functions within an IIFE?

$(document).ready(function() {

    ////instantiate your objects here first////////
    var gameDeck = new DeckObject();
    gameDeck.shuffleDeck();

    $('#deal').on('click', function() {
        gameDeck.deal();
    });

    $('#hit').on('click', function() {
        gameDeck.hitMe();
    });

    $('#stand').on('click', function() {
        gameDeck.hitDealer();
    });

    $("#reset").click(function(){   //john
        $("#playersArea").empty();
        $("#dealersArea").empty();
        gameDeck.deckArray = [];
        var gameDeck = new DeckObject();
        gameDeck.deckArray.shuffleDeck();
    });

});

/////////////////////
/////////////////////////////////
