//Hit ME////////////////

var deckArray = [0, 1, 2, 3];
var handArray = [];

var hitMe = function() {
    $('#hit').on('click', function() {
        var shiftCard = deckArray.shift();
        handArray.push(shiftCard);
        var index = handArray[handArray.length - 1];
        $('#playersArea').prepend('<img class=playingCards src="images/' + index + '.png" />');
        $('.playingCards').nextAll().css({paddingLeft: "+=55px", zIndex: "+=10"});

    });
};
hitMe();
//////////////////////

////getScore///////////

var getValue = function() {
    if ((handArray[i] % 13) > 10 || (handArray[i] % 13) === 0) {
        return 10;
    } if ((handArray[i] % 13) === 1) {
        return 11;
    } else {
        return handArray[i] % 13;
    }
};

var score = function(cards) { // does this really need a parameter?
    var x;
    var sum = 0;
    var aces = 0;
    for (i=0; i<cards.length; i++) {
        x=cards[i].getValue();
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


////////Deal/////////////////////
/*
var deal = function() {
    $('#deal').on('click', function() {
        hitMe();
        hitMe();
    });

};
deal();
*/

//for (i=0; i<(deckArray.length); i++) {
    //index = deckArray[i];
    //printPlayerCards(index);
//}
/////////////////////



/////This displays the score in the appropriate area/////
var currentValuePlayer = document.getElementById('currentValuePlayer');
var printPlayerScore = function() {
    currentValuePlayer.innerHTML = 'changed';
};
printPlayerScore();

var currentValueDealer = document.getElementById('currentValueDealer');
var printDealerScore = function() {
    currentValueDealer.innerHTML = 'more better'
};
printDealerScore();
/////////////

