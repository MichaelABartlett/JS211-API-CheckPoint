console.log("testing file setup")



    let random = Math.random();

    //*****************************************************************************
    // this fetch is for getting player 1 image

fetch("https://robohash.org/" + random + "?set=set2")
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

    fetch("https://robohash.org/" + random + "?set=set1")
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
            toggleDisplay[i].style.display = "block";
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
