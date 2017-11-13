// Player Object
function Player(){
    var hand = [],
        betValue = 0,
        cashTotal = 1000,
        bank = 0,
        score = '',
        element = '';

    // Presents card elements at the beginning of the game and returns their values (Function)
    this.getElements = function() {
        if (this === Player) {
            element = '#playerCard1'; //Might instead relate to Players hand CSS?
            score = '#playerCard-0'; //Whatever card will equal 0.
        } else {
            element = '#dealerCard1'; //Same with the player, must relate to dealer hand CSS.
            score = '#dealerCard-0'; //Whatever card will equal 0.
        }
        return {'element': element, 'score': score};
    };
    // Returns the current value for the current hand dealt. (Function)
    this.getHand = function() {
        return hand;
    };
    // Returns the value of the cards and pushes it to the value of the hand (Method)
    this.setHand = function (card) {
        hand.push(card);
    };
    //Resets the hand value when game resets (Method)
    this.resetHandValue = function() {
        hand = [];
    };
    //Returns the value of the current bet (Function)
    this.getBet = function() {
        return betValue;
    };
    //When called, will change the value of the bet and return an integer (this is for
    //manual input of a bet... not sure if we want that or a button to increase bet). (Method)
    this.setBet = function(money) {
        betValue += parseInt(money, 0);
    };
    //Resets bet at the start of a new game (Method)
    this.resetBet = function() {
        betValue = 0;
    };
    //Makes sure that wager cannot be more than current cash amount (Function)
    this.checkWager = function() {
        return betValue <= cashTotal;
    };
    //Returns the running total of cash amount. (Function)
    this.getCashValue = function() {
        return cashTotal;
    };
    //Subtracts bet amount from total cash when lose (Method)
    this.setCash = function(money) {
        cashTotal += money;
        this.updateScore();
    };
    //Runs the bank and notifies when player has negative money in "Take Home" area (Method)
    this.getBank = function() {
        $(/*Whatever CSS we plan on attaching*/).html('Take Home: $' + bank);

        //Adds negative symbol to
        if(bank < 0) {
            $(/*What ever our CSS is*/).html('Take Home: <span style="color: #D90000">-$' +
                bank.toString().replace('-', '') + '</span>');
        }
    };
    //Subtracts/Adds money to and from "Take Home" (Method)
    this.setBank = function(money) {
        bank = bank + money;
        this.updateBoard();
    };
    //Flips one card down for the Dealer and both cards up for the player.
    this.flipCards = function() {
        $('.down').each(function() {
            $(this).removeClass('down').addClass('up');
            //Creates Boolean for the cards on the table
            renderCard(false, false, false, $(this));
        });

        $('#dealerCard-0').html(dealer.getScore());
    };
}
