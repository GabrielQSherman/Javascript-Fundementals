window.onload = () => {

    submitUpdate.onclick = updateMovieReq;

    submitNew.onclick = newMovieReq;
    const formDiv = document.getElementById('formDiv');

    // hsl(0, 70%, 50%), 
    // hsl(30, 70%, 50%), 
    // hsl(45, 70%, 50%), 
    // hsl(60, 70%, 50%), 
    // hsl(75, 70%, 50%), 
    // hsl(90, 70%, 50%), 
    // hsl(120, 70%, 50%),
    // hsl(150, 70%, 50%),
    // hsl(165, 70%, 50%),
    // hsl(180, 70%, 50%),
    // hsl(210, 70%, 50%),
    // hsl(240, 70%, 50%),
    // hsl(270, 70%, 50%),
    // hsl(285, 70%, 50%),
    // hsl(300, 70%, 50%),
    // hsl(330, 70%, 50%),
    // hsl(345, 70%, 50%)
    
    setInterval( () => {
        
        const cNum = 10, //numer of colors
              nums = Array.from({length: cNum}, (_, index) => index), //empty array to map over
              colors = nums.map( (i) => {
                const 
                hue = Math.round(i*360/cNum),
                color =`hsl(${hue},70%,57%)`;
                return color
              })
              .join(',')

        formDiv.style.backgroundImage = 
        `           
            linear-gradient(rgb(164, 0, 206), rgb(255, 157, 226)),
            repeating-linear-gradient(${(Date.now()/111)%360}deg, 
            ${colors}
            420px)
        `

    }, 15)
}

function newMovieReq() {
    
    //complie submition from form
    let reqBody = {};

    //loop through thr form element
    
    for (const input of newMovieForm) {
        
        reqBody[input.name] = input.value;

    }

    reqBody.inventory = {available: reqBody.available, rented: 0};
    
    // returns
    //make xhr 
    const endpoint = `${location.origin}/movie/post`,

    reqObj = {

        headers: {
                    
            'Access-Control-Allow-Origin': '*',
             Accept: 'application/json',
            'content-type':'application/json'
        
        },

        method: 'POST',

        body: JSON.stringify(reqBody)
    }

    fetch(endpoint, reqObj)
    .then(rs => {return rs.json()})
    .then(response => {
        if (response.validation_error != undefined) {
        let errMsg = '';
        response.validation_error.forEach( error => {
            errMsg += `Error With ${titleCase(error.key)}:\n${error.message}\n\n\n`
        })
        alert(errMsg)
    }

        console.log(response);
        
    })

}

function updateMovieReq() {

    //validate the id provided
    if (idInput.value.trim() === '' || idInput.value.trim().length != 24) return alert('A valid Id must be provided');

    //set endpoint
    const endpoint = location.origin + '/movie/patch/' + idInput.value,
          reqBody = {};

    for (const input of updateMovieForm) {

        const temp = input.value.trim();

        if (temp != '' && input.name != 'id') {

            reqBody[input.name] = temp;
        } 
            
    }

    const reqObj = {

        headers: {
                    
            'Access-Control-Allow-Origin': '*',
             Accept: 'application/json',
            'content-type':'application/json'
        
        },

        method: 'PATCH',

        body: JSON.stringify(reqBody)

    };

    fetch( endpoint, reqObj)
    .then(rs => {return rs.json()})
    .then(res => {
        console.log(res);
        
    })
    .catch( err => {
        
    })
}

function titleCase(str) {
    return str.substring(0,1).toUpperCase()+str.substring(1, str.length).toLowerCase()
}

