
document.body.style.backgroundColor = 'lightblue';

let movieRental = {

    allMovies: [

        {title: 'Looper',             release: 2012, available: true }, 
        {title: 'Back To The Future', release: 1985, available: true }, 
        {title: 'Inception',          release: 2010, available: false }, 
        {title: 'Donnie Darko',       release: 2001, available: false }, 
        {title: 'Primer',             release: 2004, available: true }, 
        {title: 'Terminator 2',       release: 1991, available: true }
    ],

    createAvlDsply() {

        // console.log('showing a', movieRental.allMovies);

        let heading = movieRental.createHeadingElm('Movie Selection', 1),
            avlDiv = document.getElementById('avldiv'),

            list = document.createElement('ol');

            avlDiv.innerHTML = ''; //clear div because new elements will be inserted

            movieRental.allMovies.forEach(movieObj => {

                if (movieObj.available) {

                    let listElm = document.createElement('li');

                    listElm.innerText = movieObj.title;

                    list.appendChild(listElm)

                }

            });

        avlDiv.appendChild(heading)

        avlDiv.appendChild(list)

    }, 

    createRntDsply() {

        // console.log('showing r', movieRental.rntMov);

        let heading = movieRental.createHeadingElm('Movies Out Of Stock', 1),
            rntDiv = document.getElementById('rntdiv'),

            list = document.createElement('ul');

            rntDiv.innerHTML = ''; //clear data in div

             movieRental.allMovies.forEach(movieObj => {

                if (!movieObj.available) {

                    let listElm = document.createElement('li');

                    listElm.innerText = movieObj.title;

                    list.appendChild(listElm)

                }

            });

        rntDiv.appendChild(heading)
        rntDiv.appendChild(list)
        
    },

    rentRandomMov() {

        let availableMoviesArr = movieRental.allMovies.filter( elm => {

            if ( elm.available == true) {
                return true
            } else {
                return false
            }
        })

        console.log(availableMoviesArr); //returns an array with only the movie objects that have the property 'available' equal true

        if (availableMoviesArr.length == 0) {

            alert('No more movies left')

            return
            
        }
            
        let ranNum = Math.floor(availableMoviesArr.length * Math.random()),

            movieTitleRenting = availableMoviesArr[ranNum].title,

            indexOfMov = movieRental.allMovies.map( obj => {return obj.title}).indexOf(movieTitleRenting);

            console.log(ranNum, indexOfMov);
            
            movieRental.allMovies[indexOfMov].available = false;

        // document.getElementById('avlbtn').innerText = 'Update Info';
        // document.getElementById('rntbtn').innerText = 'Update Info';

        movieRental.createAvlDsply()
        movieRental.createRntDsply()

        
    }
    

}

// movieRental.createInitalElement()

// movieRental.createAvlDsply()

// movieRental.createRntDsply() 

let inewmage = movieRental.createImgElm(100,100, 'https://cdn.pixabay.com/photo/2015/02/24/15/41/dog-647528__340.jpg', 'starsImg')

document.body.appendChild(inewmage)

movieRental.createImgElm = (width, height, src, id) => {

        let image = document.createElement('img');

        image.width = width;
        image.height = height;

        image.src = src;

        if (id != undefined) image.id = id;

        console.log(image);

        return image
        

}

movieRental.createInitalElement = () => {

        const avlDiv = document.createElement('div'),
              rntDiv = document.createElement('div'),
              avlBtn = document.createElement('button'),
              rntBtn = document.createElement('button'),
              randomBtn = document.createElement('button');

        avlDiv.id = 'avldiv';
        rntDiv.id = 'rntdiv';

        avlBtn.id = 'avlbtn';
        rntBtn.id = 'rntbtn';
        randomBtn.id = 'testbtn';

        avlBtn.innerText = 'See Movie Choices';
        rntBtn.innerText = 'See What Others Are Watching Now';
        randomBtn.innerText = 'testing'

        avlBtn.onclick = movieRental.createAvlDsply;
        rntBtn.onclick = movieRental.createRntDsply;
        randomBtn.onclick = movieRental.rentRandomMov;

        avlDiv.style.backgroundColor = 'pink';
        rntDiv.style.backgroundColor = 'lightgreen';

        // avlDiv.style.textAlign = 'center';
        
        document.body.appendChild(avlDiv);
        document.body.appendChild(avlBtn);
        document.body.appendChild(rntDiv);
        document.body.appendChild(rntBtn);
        document.body.appendChild(randomBtn);

}
