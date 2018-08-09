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
        
        for(let n=1;n<5;n++){
            if (numMove > 8*n){
                $(`.stars li:nth-child(${6-n})`).children('i').switchClass('fa-star','fa-star-o',0);
            }
        }

        // if(numMove > 8){
        //     // $('.stars li:nth-child(3)').children('i').switchClass('fa-star','fa-star-o',0);
        //     $(`.stars li:nth-child(${i})`).children('i').switchClass('fa-star','fa-star-o',0);
        // } 
        
        // if (numMove > 16){
        //     $('.stars li:nth-child(2)').children('i').switchClass('fa-star','fa-star-o',0);
        // }
        
        // if (numMove > 32){
        //     $('.stars li:nth-child(1)').children('i').switchClass('fa-star','fa-star-o',0);
        // }        
        
        $('.moves').text(numMove);

        if(matchedCards===1){
            $('#darkOverlay').show('slow');
        }

    }); 

}


// Initialize deck function
function initializeDeck(){

    // initialize score panel
    $('.stars li').children('i').switchClass('fa-star-o','fa-star',0);
    $('.moves').text(0);

    // close all cards
    $('.card').removeClass('open show match');

}

// Start game function
function startGame(){

    // initialize score panel
    $('.stars li').children('i').switchClass('fa-star-o','fa-star',0);
    $('.moves').text(0);

    // open all cards
    $('.card').switchClass('match','open show',0);

    // close all cards after 2s
    // add clickCard handler to each card
    setTimeout(function(){
        $('.card').switchClass('open show match','',1500);
        clickCard();
    },500);
    
}


// Initialize the game web
$(function() {
    shuffleCards();
    initializeDeck();
});

// Start game when click on 'repeat' logo
$('.fa-repeat').on('click', function(){
    shuffleCards();
    startGame();
});

// close floating window while re-initialize the game web
$('.close-button').click(function(){
    $('#darkOverlay').hide('slow');

    shuffleCards();
    initializeDeck();
});