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
        //console.log('player 1: ', imageObjectURL)

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
            //console.log('player 2: ' ,imageObjectURL2)
    
            // set this temporary url as the source for the image tag
            document.getElementById("player-2-image").src = imageObjectURL2
        })
    
// ********************************************************************************************************

// below is the function to toggle the display of the 'player-1-image' class on and off

function handleSubmit1() {

    var toggleDisplay = document.querySelectorAll(".player-1-image");
    console.log('?' ,toggleDisplay)
    // toggleDisplay[0].style.display = "block";
    
    
        if (toggleDisplay[0].style.display === "block") {
            toggleDisplay[0].style.display = "none";
        } 
        else {
            toggleDisplay[0].style.display = "block";
        }
    
}
// look into conditional ternary operators to combind the two handlesubmit functions
// function getFee(isMember) {
//     return (isMember ? '$2.00' : '$10.00');
//   }

// ****************************************************************************************************88

// below is the function to toggle the display of the 'player-2-image' class on and off

function handleSubmit2() {
    var toggleDisplay = document.querySelectorAll(".player-2-image");
    console.log(toggleDisplay)
    for (let i = 0; i < toggleDisplay.length; i++) { // there must be a for loop to turn each individual 'item'
        // in the node list
        if (toggleDisplay[i].style.display === "block") {
            toggleDisplay[i].style.display = "none";
        } else {
            toggleDisplay[i].style.display = "block";
        }
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
        
        processJson(json); // passing the (json) to...
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
let fetchCall = ''; 
let player1Card;
let player2Card;
let p1CardImg;
let p2CardImg;
let p1CardValue;
let p2CardValue;
let count = 0;

// setTimeout(() => console.log('2nd call for deck of cards id#: ' ,deckId),500)
// setTimeout(() => fetchCall = ('https://deckofcardsapi.com/api/deck/'+ deckId + '/draw/?count=2'),600)
// setTimeout(() => console.log('fetchCall: ', fetchCall),700);


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
        console.log('The drawn cards: ', drawnCards)
        //console.log(deckOfCards.deck_id)
        player1Card = drawnCards.cards[0];
        player2Card = drawnCards.cards[1];
        console.log('player 1 card: ' ,player1Card)
        console.log('player 2 card: ' ,player2Card)
        p1CardImg = player1Card.image
        p2CardImg = player2Card.image
        //console.log('p1CardImg: ', p1CardImg)
        //console.log('p2CardImg: ', p2CardImg)
        document.getElementById("player-1-card").src = p1CardImg
        document.getElementById("player-2-card").src = p2CardImg
        p1CardValue = player1Card.value;
        p2CardValue = player2Card.value;
        console.log('player1 card value: ', p1CardValue)
        console.log('player2 card value: ', p2CardValue)
        processWin(p1CardValue,p2CardValue);
        
    }
    
    funcDrawCards();
    
}

// ****************************************************************************************************88

// below is the function to display the class players cards

let p1ts = 0;
let p2ts = 0;

function funcDrawCards() {
    var drawDisplay1 = document.querySelectorAll(".player-1-card");
    var drawDisplay2 = document.querySelectorAll(".player-2-card");
    console.log('drawDisplay1: ', drawDisplay1)
    console.log('drawDisplay2: ', drawDisplay2)
    drawDisplay1[0].style.display = "block"
    drawDisplay2[0].style.display = "block"
}

function processWin(p1V,p2V) {
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
    

    if(parseInt(p1V) > parseInt(p2V)){
        let x = document.getElementById ('win-box');
        x.innerHTML = "Player 1 Won!!!";
        console.log('player 1 won')
        
        p1ts += 1;
        console.log('p1ts: ', p1ts)
        let p1 = document.getElementById('p1ts');
        p1.innerHTML = 'Player 1 score: ',p1ts;
    } else if (parseInt(p1V) < parseInt(p2V)){
        let x = document.getElementById ('win-box');
        x.innerHTML = "Player 2 Won!!!";
        console.log('player 2 won')
        
        p2ts += 1;
        console.log('p2ts: ',p2ts)
        let p2 = document.getElementById('p2ts');
        p2.innerHTML = 'Player 2 score: ',p2ts;
    } else {
        let y = document.getElementById ('win-box');
        y.innerHTML = "It's a Tie!!";
        console.log('there is a tie, draw again')
    }
    count += 1;
    console.log('count: ', count);
    if (count === 26){
        console.log('game over')
        let z = document.getElementById ('game-over');
        z.innerHTML = "Game Over";
    } 
}