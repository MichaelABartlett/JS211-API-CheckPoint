//console.log("testing file setup")



    let random = Math.random();

    //*****************************************************************************
    // this fetch is for getting player 1 image

fetch("https://robohash.org/" + random + "?set=set1")
    // this api returns binary data (ie the picture)
    .then(function (response) {
        return response.blob(); // extract the binary data / blob/ picture
    }).then(function (binaryData) {
        // make a temporary url that references this binary data
        const imageObjectURL = URL.createObjectURL(binaryData);
        // set this temporary url as the source for the image tag
        document.getElementById("player-1-image").src = imageObjectURL
    })

//*********************************************************************************
    // this fetch is for getting player 2 image

    fetch("https://robohash.org/" + random + "?set=set4")
        // this api returns binary data (ie the picture)
        .then(function (response) {
            return response.blob(); // extract the binary data / blob/ picture
        }).then(function (binaryData) {
            // make a temporary url that references this binary data
            const imageObjectURL2 = URL.createObjectURL(binaryData);
            // set this temporary url as the source for the image tag
            document.getElementById("player-2-image").src = imageObjectURL2
        })
    
// ********************************************************************************************************

// below is the function to toggle the display of the 'player-1-image' and 'player-2-image' class on and off

function handleSubmit1(classname) {
    var toggleDisplay = document.querySelectorAll(classname);
    //console.log('toggleDisplay' ,toggleDisplay)
        if (toggleDisplay[0].style.display === "block") {
            toggleDisplay[0].style.display = "none";
        } 
        else {
            toggleDisplay[0].style.display = "block";
        }
}
// ****************************************************************************************

 // this fetch is for getting a deck of cards
let deckId = '';


 fetch("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1")
    .then(function(response){
        // do something with the result
        // extract the json from the response
        console.log('response status: ', response.status)
        return response.json();
    }).then(function(json){
        // do something with the json payload
        // this is unpacking the json so it can be used
        console.log("response payload: ", json)
        processJson(json); // passing the (json) to the processJson function
})

let processJson = function(json){
        let deckOfCards = json // creates a variable for each individual contact ' person' in this case
        console.log(deckOfCards)
        //console.log(deckOfCards.deck_id)
        deckId = deckOfCards.deck_id
        console.log('deck of cards id#: ' ,deckId)
        console.log('2nd call for deck of cards id#: ' ,deckId)
        fetchCall = ('https://deckofcardsapi.com/api/deck/'+ deckId + '/draw/?count=2')
        console.log('fetchCall: ', fetchCall);
        //processContact(contact);
        
    }


// ***************************************************************************************************

// this fetch draws a card



function drawCards() {

fetch(fetchCall)
    .then(function(draw){
        console.log('response status for draw: ', draw.status)
        return draw.json();
    }).then(function(json){
        console.log("response payload for draw: ", json)
        processDrawJson(json); // passing the (json) to the addToDom function
})

let processDrawJson = function(json){
        let drawnCards = json // creates a variable for each individual contact ' person' in this case
        let fetchCall = ''; 
        let player1Card;
        let player2Card;
        let p1CardImg;
        let p2CardImg;
        let p1CardValue;
        let p2CardValue;
        
        console.log('The drawn cards: ', drawnCards)
        //console.log(deckOfCards.deck_id)

        // assigning a card to each palyer and putting it in a variable
        player1Card = drawnCards.cards[0];
        player2Card = drawnCards.cards[1];
        //console.log('player 1 card: ' ,player1Card)
        //console.log('player 2 card: ' ,player2Card)

        // putting the image of the card into a variable for each palyer
        p1CardImg = player1Card.image
        p2CardImg = player2Card.image
        //console.log('p1CardImg: ', p1CardImg)
        //console.log('p2CardImg: ', p2CardImg)

        // setting a variable that has the source for the image so HTML knows it is a image
        document.getElementById("player-1-card").src = p1CardImg
        document.getElementById("player-2-card").src = p2CardImg

        // making a variable for each players card
        p1CardValue = player1Card.value;
        p2CardValue = player2Card.value;
        //console.log('player1 card value: ', p1CardValue)
        //console.log('player2 card value: ', p2CardValue)
        
        // passing the card values to the processWin function to determine the winner
        processWin(p1CardValue,p2CardValue);
        
    }
    
    funcDrawCards();
    
}

// ****************************************************************************************************88

let p1ts = 0;
let p2ts = 0;
let count = 0;

function funcDrawCards() {
    // this function acually puts the card image on the DOM
    var drawDisplay1 = document.querySelectorAll(".player-1-card");
    var drawDisplay2 = document.querySelectorAll(".player-2-card");
    //console.log('drawDisplay1: ', drawDisplay1)
    //console.log('drawDisplay2: ', drawDisplay2)
    drawDisplay1[0].style.display = "block"
    drawDisplay2[0].style.display = "block"
}

function processWin(p1V,p2V) {
    // these if statments put a numerical value on the face cards so it would be easier
    // to determine the winner
    if(p1V == 'JACK'){
        p1V = '11'
    } else if (p1V == 'QUEEN'){
        p1V = '12'
    } else if (p1V == 'KING'){
        p1V = '13'
    } else if (p1V == 'ACE'){
        p1V = '14'
    } 

     if(p2V == 'JACK'){
         p2V = '11'
     } else if (p2V == 'QUEEN'){
         p2V = '12'
     } else if (p2V == 'KING'){
         p2V = '13'
     } else if (p2V == 'ACE'){
         p2V = '14'
     }
    // changing the string values to numbers in the if statement
    if(parseInt(p1V) > parseInt(p2V)){
        // posting the player won in the center-box div using the id='win-box'
        let x = document.getElementById ('win-box');
        x.innerHTML = "Player 1 Won!!!";
        //console.log('player 1 won')
        // adding the players win total
        p1ts += 1;
        //console.log('p1ts: ', p1ts)
        // posting the total wins for the player to the DOM
        document.getElementById('p1ts').innerHTML = 'Player 1 score: ' + p1ts;
    } else if (parseInt(p1V) < parseInt(p2V)){
        // posting the player won in the center-box div using the id='win-box'
        let y = document.getElementById ('win-box');
        y.innerHTML = "Player 2 Won!!!";
        //console.log('player 2 won')
        // adding the players win total
        p2ts += 1;
        //console.log('p2ts: ',p2ts);
        // posting the total wins for the player to the DOM
        document.getElementById('p2ts').innerHTML = 'Player 2 score: '+ p2ts;
    } else {
        // if no winner posting that there was a tie
        // there is no addition to player win totals
        let z = document.getElementById ('win-box');
        z.innerHTML = "It's a Tie!!";
        //console.log('there is a tie, draw again')
    }
    // each round of play the count is added to
    // this will allow the ganme to end when the entire deck is dealed out
    count += 1;
    //console.log('count: ', count);
    if (count === 26){
        //console.log('game over')
        // posting to the DOM that the game is over
        let z = document.getElementById ('game-over');
        z.innerHTML = "Game Over";
        // turning off the style.display for the draw button so it no longer is available when the game is over
        document.getElementById('draw-b').style.display = "none";
        // here we are posting the player that had the most wins, that player wins the series
        if(p1ts === p2ts){
            let w1 = document.getElementById('win-box');
            w1.innerHTML = 'The series was a TIE!!' ;
        } else if(p1ts > p2ts){
            let w2 = document.getElementById('win-box');
            w2.innerHTML = 'Player 1 won the series!!' ;
        } else {
            let w3 = document.getElementById('win-box');
            w3.innerHTML = 'Player 2 won the series!!'; 
        }
    } 
}

