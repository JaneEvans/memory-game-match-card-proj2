/*
 * Create a list that holds all of your cards
 */
let cardList = $('.card');

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

// Shuffle cards function
function shuffleCards(){
    cardList = shuffle(cardList);
    $('.deck').empty().append(cardList);
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

// Click card function
function clickCard(){
    let openedCard, clickedCard, numMove=0, matchedCards=0;

    $('.card').on('click',function(){
        
        clickedCard = $(this).addClass('open show');
        
        if(!openedCard){
            openedCard=clickedCard;
        }
        else if((openedCard.attr('id')!==clickedCard.attr('id'))){
            
            numMove+=1;

            if(openedCard.children('i').attr('class') === clickedCard.children('i').attr('class')){
                matchedCards+=1;
                openedCard.switchClass('open show','match');
                clickedCard.switchClass('open show','match');
            }
            else{
                openedCard.switchClass('open show','',600);
                clickedCard.switchClass('open show','',600);
            }
            
            openedCard='';
        }
        

        if(numMove > 8){
            $('.stars li:nth-child(3)').children('i').switchClass('fa-star','fa-star-o',0);
        } 
        
        if (numMove > 16){
            $('.stars li:nth-child(2)').children('i').switchClass('fa-star','fa-star-o',0);
        }
        
        if (numMove > 32){
            $('.stars li:nth-child(1)').children('i').switchClass('fa-star','fa-star-o',0);
        }        
        
        $('.moves').text(numMove);

        if(matchedCards===1){
            $('#darkOverlay').show(500);
                           
        }

    }); 

}


// Initialize card deck function
function initializeDeck(){

    // display all of the cards on the page
    $('.card').switchClass('match','open show',0);

    // initialize stars and clean out moves
    $('.stars li').children('i').switchClass('fa-star-o','fa-star',0);
    $('.moves').text(0);

    // after 1s close all cards
    setTimeout(function(){
        $('.card').switchClass('open show match','');
        clickCard();
    },2000);
    
}


// Initialize the game web
$(function() {
    $('.card').removeClass('open show match');
    shuffleCards();
    clickCard();
});

// Add 'click' event listener on repeat logo
$('.fa-repeat').on('click', function(){
    initializeDeck();
    shuffleCards();
});

// Add 'click' event listener on close button of results floating window
$('.close-button').click(function(){
    $('#darkOverlay').hide();
});