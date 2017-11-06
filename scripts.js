//Constructor for making Card objects:
function Card(value, index, face, back) {
    this.value = value;
    this.face = face;
    this.back = back;

    this.flip = function() {
        var el = document.getElementById('dealerCard1').src;
        el.src = Card.face;
    }
}

//Instantiations of Cards:
//Clubs:
var C2 = new Card(2, 'images/C2.png', 'images/back.png');
var C3 = new Card(3, 'images/C3.png', 'images/back.png');
var C4 = new Card(4, 'images/C4.png', 'images/back.png');
var C5 = new Card(5, 'images/C5.png', 'images/back.png');
var C6 = new Card(6, 'images/C6.png', 'images/back.png');
var C7 = new Card(7, 'images/C7.png', 'images/back.png');
var C8 = new Card(8, 'images/C8.png', 'images/back.png');
var C9 = new Card(9, 'images/C9.png', 'images/back.png');
var C10 = new Card(10, 'images/C10.png', 'images/back.png');
var CJ = new Card(10, 'images/CJ.png', 'images/back.png');
var CQ = new Card(10, 'images/CQ.png', 'images/back.png');
var CK = new Card(10, 'images/CK.png', 'images/back.png');
var CA = new Card(11, 'images/CA.png', 'images/back.png');
//Diamonds:
var D2 = new Card(2, 'images/D2.png', 'images/back.png');
var D3 = new Card(3, 'images/D3.png', 'images/back.png');
var D4 = new Card(4, 'images/D4.png', 'images/back.png');
var D5 = new Card(5, 'images/D5.png', 'images/back.png');
var D6 = new Card(6, 'images/D6.png', 'images/back.png');
var D7 = new Card(7, 'images/D7.png', 'images/back.png');
var D8 = new Card(8, 'images/D8.png', 'images/back.png');
var D9 = new Card(9, 'images/D9.png', 'images/back.png');
var D10 = new Card(10, 'images/D10.png', 'images/back.png');
var DJ = new Card(10, 'images/DJ.png', 'images/back.png');
var DQ = new Card(10, 'images/DQ.png', 'images/back.png');
var DK = new Card(10, 'images/DK.png', 'images/back.png');
var DA = new Card(11, 'images/DA.png', 'images/back.png');
//Hearts:
var H2 = new Card(2, 'images/H2.png', 'images/back.png');
var H3 = new Card(3, 'images/H3.png', 'images/back.png');
var H4 = new Card(4, 'images/H4.png', 'images/back.png');
var H5 = new Card(5, 'images/H5.png', 'images/back.png');
var H6 = new Card(6, 'images/H6.png', 'images/back.png');
var H7 = new Card(7, 'images/H7.png', 'images/back.png');
var H8 = new Card(8, 'images/H8.png', 'images/back.png');
var H9 = new Card(9, 'images/H9.png', 'images/back.png');
var H10 = new Card(10, 'images/H10.png', 'images/back.png');
var HJ = new Card(10, 'images/HJ.png', 'images/back.png');
var HQ = new Card(10, 'images/HQ.png', 'images/back.png');
var HK = new Card(10, 'images/HK.png', 'images/back.png');
var HA = new Card(11, 'images/HA.png', 'images/back.png');
//Spades:
var S2 = new Card(2, 'images/S2.png', 'images/back.png');
var S3 = new Card(3, 'images/S3.png', 'images/back.png');
var S4 = new Card(4, 'images/S4.png', 'images/back.png');
var S5 = new Card(5, 'images/S5.png', 'images/back.png');
var S6 = new Card(6, 'images/S6.png', 'images/back.png');
var S7 = new Card(7, 'images/S7.png', 'images/back.png');
var S8 = new Card(8, 'images/S8.png', 'images/back.png');
var S9 = new Card(9, 'images/S9.png', 'images/back.png');
var S10 = new Card(10, 'images/S10.png', 'images/back.png');
var SJ = new Card(10, 'images/SJ.png', 'images/back.png');
var SQ = new Card(10, 'images/SQ.png', 'images/back.png');
var SK = new Card(10, 'images/SK.png', 'images/back.png');
var SA = new Card(11, 'images/SA.png', 'images/back.png');

//Constructor for Deck object:
function Deck(cardArray) {
    this.cardArray = [C2, C3, C4, C5, C6, C7, C8, C9, C10, CJ, CQ, CK, CA, D2, D3, D4, D5, D6, D7, D8, D9, D10, DJ, DQ, DK, DA, H2, H3, H4, H5, H6, H7, H8, H9, H10, HJ, HQ, HK, HA, S2, S3, S4, S5, S6, S7, S8, S9, S10, SJ, SQ, SK, SA];

    this.deal = function(e) {
        var randomIndex = Math.floor((Math.random() * 52 + 1); //this probably needs to be made a function that gets called repeatedly otherwise we'll be calling the same random number repeatedly.
        var randomCard = cardArray[randomIndex];
        var dealButton = document.getElementById('deal');
        var hitButton = document.getElementById('hit'):
        var target = e.target;
        if (target = dealButton) {
            Player.handArray.push(randomCard); //Player gets random card 1...  not confident in this whole block
            Deck.cardArray.splice(randomIndex, 1);//card is removed from cardArray
            Player.handArray.push(randomCard);//Player card 2
            Deck.cardArray.splice(randomIndex, 1);
            Dealer.handArray.push(randomCard);//Dealer gets random card 1
            Deck.cardArray.splice(randomIndex, 1);//card is removed from cardArray
            Dealer.handArray.push(randomCard);//Dealer card 2
            Deck.cardArray.splice(randomIndex, 1);
        } if (target = hitButton) {
            Player.handArray.push(randomCard);//Player gets random card
            Deck.cardArray.splice(randomIndex, 1);// card is removed from cardArray
            Dealer.handArray.push(randomCard);//Dealer gets random card
            Deck.cardArray.splice(randomIndex, 1);//card is removed from cardArray
        }
    }
}

//Constructor for Player object:
function Player(bankValue, betValue, handArray, handValue) {
    this.bankValue = bankValue;
    this.betValue = betValue;
    this.handArray = handArray;
    this.handValue = handValue;

    this.calcPlayerHand = function() {
        var total = 0;
        for (counter=0; counter<Player.handArray.length; counter++) { // not confident in this
            total += Player.handArray[counter];//this either
        }
    }
}



//Constructor for Dealer object:
function Dealer(handValue, handArray) {
    this.handValue = handValue;
    this.handArray = handArray;

    this.calcDealerHand() = function() {
        var total = 0;
        for (counter=0; counter,Dealer.handArray.length; counter++) { // not confident in this
            total += Dealer.handArray[counter]; //this either
        }
    }
    this.alertWinLose = function() {
        if (/*greater than dealer but !> 21*/) {
            $('#winLoseMsg').show(); //need to create two separate messages...  obviously
        }
    }
}
