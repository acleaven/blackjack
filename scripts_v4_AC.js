var unshuffledDeck = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51];
//var deckArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51];
var deckArray = [];
var playerHand = [];
var dealerHand = [];

///shuffleDeck/////////////////////

var shuffleDeck = function() {

    for (i=0; i<51; i++) {
        var unshuffledLength = unshuffledDeck.length;
        var randomNum = Math.floor(Math.random() * unshuffledLength);
        var randomCard = unshuffledDeck.slice(randomNum, (randomNum +1));
        deckArray.push(randomCard);
    }
};

///////////////////////////////////





//printPlayerCards////////////////

var printPlayerCards = function() {
    var shiftCard = deckArray.shift();
    playerHand.push(shiftCard);
    var index = playerHand[playerHand.length - 1];
    $('#playersArea').prepend('<img class=playerCards src="images/' + index + '.png" />');//append is attaching new image tags immediately after opening div tag
    $('.playerCards').nextAll().css({position: "absolute", left: "+=55px", zIndex: "+=10"});
};
//////////////////////

//printDealerCards////////////////

var printDealerCards = function() {
    var shiftCard = deckArray.shift();
    dealerHand.push(shiftCard);
    var index = dealerHand[dealerHand.length - 1];
    $('#dealersArea').prepend('<img class=dealerCards src="images/' + index + '.png" />');//append is attaching new image tags immediately after opening div tag
    $('.dealerCards').nextAll().css({position: "absolute", left: "+=55px", zIndex: "+=10"});
};
//////////////////////


/// hitMe and deal /////////////////
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

var testDeal = function() {
    printDealerCards();
    printDealerScore();
};
///////////////////////////

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
    //printPlayerScore();
    //printDealerScore();
    shuffleDeck();

    $('#deal').on('click', function() {
        deal();
    });

    $('#hit').on('click', function() {
        hitMe();
    });

    $('#stand').on('click', function() {
        testDeal();
    });

});

/////////////////////
/////////////////////////////////
