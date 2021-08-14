console.log("testing file setup")



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
        console.log(imageObjectURL)

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
            console.log(imageObjectURL2)
    
            // set this temporary url as the source for the image tag
            document.getElementById("player-2-image").src = imageObjectURL2
        })
    
// ********************************************************************************************************

// below is the function to toggle the display of the 'address' class on and off

function handleSubmit1() {
    var toggleDisplay = document.querySelectorAll(".player-1-image");
    console.log('?' ,toggleDisplay)
    // toggleDisplay[0].style.display = "block";
    
    for (let i = 0; i < toggleDisplay.length; i++) { // there must be a for loop to turn each individual 'address'
        // in the node list
        if (toggleDisplay[i].style.display === "block") {
            toggleDisplay[i].style.display = "none";
        } 
        else {
            toggleDisplay[i].style.display = "block";1
        }
    }
}
// ****************************************************************************************************88

// below is the function to toggle the display of the 'address' class on and off

function handleSubmit2() {
    var toggleDisplay = document.querySelectorAll(".player-2-image");
    console.log(toggleDisplay)
    for (let i = 0; i < toggleDisplay.length; i++) { // there must be a for loop to turn each individual 'address'
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

 fetch("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1") // ?results=5 - this number represents how many name to process
    .then(function(response){
        // do something with the result
        // extract the json from the response
        console.log('response status: ', response.status)
        return response.json();
    }).then(function(json){
        // do something with the json payload
        // this is unpacking the json so it can be used
        console.log("response payload: ", json)
        processJson(json); // passing the (json) to the addToDom function
})

let processJson = function(json){
        let deckOfCards = json // creates a variable for each individual contact ' person' in this case
        console.log(deckOfCards)
        console.log(deckOfCards.deck_id)
        //processContact(contact);
        
    }
