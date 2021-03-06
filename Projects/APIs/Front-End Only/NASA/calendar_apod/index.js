//create a grid layout of the calendar
let dateRightNow = new Date();

let dateInfo = {

    year: dateRightNow.getFullYear(), 
    month: dateRightNow.getMonth(), //using index numbering for months, gets converted when displaying to the dom.
    day: dateRightNow.getDate(),
    dow: dateRightNow.getDay(),

    daysInMonths: [31,28,31,30,31,30,31,31,30,31,30,31],
    
    months: ["January","February","March","April","May","June","July","August","September","October","November","December"],
    
    daysOfWeek: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],

    events: []
};

function updateDateString() {

    let heading = document.getElementById('calendarStr'), date;

    if (dateRightNow.getDate() == dateInfo.day && dateRightNow.getMonth() == dateInfo.month && dateRightNow.getFullYear() == dateInfo.year) {
        
        heading.innerText = 'Today';

    } else {

        if (dateInfo.day == 1 || dateInfo.day.toString().substring(1,2) == '1' && dateInfo.day > 11) {
            date = dateInfo.day + 'st'
        } else if (dateInfo.day == 2 || dateInfo.day.toString().substring(1,2) == '2' && dateInfo.day > 12) {
            date = dateInfo.day + 'nd'
        } else if (dateInfo.day == 3 || dateInfo.day.toString().substring(1,2) == '3' && dateInfo.day > 13) {
            date = dateInfo.day + 'rd'
        } else if (dateInfo.day == 0) {
            date = '?'
        } else {
            date = dateInfo.day + 'th'
        }

        heading.innerText = `${dateInfo.months[dateInfo.month]} ${date} ${dateInfo.year}`

    }
  
}


function updateCalDisplay() {

    let calDiv = document.getElementById('calBody');

    calDiv.innerHTML = '';

    for (let i = 0; i < 7; i++) {
        
        let dayDiv = document.createElement('div');

        dayDiv.className = 'daysOfWeek'

        let text = document.createElement('h3');

        text.innerText = dateInfo.daysOfWeek[i];

        dayDiv.appendChild(text);

        calDiv.appendChild(dayDiv);
    }

    let monthStartDay = new Date(`${dateInfo.month+1} 1, ${dateInfo.year}`).getDay(),

        count = 0; //keeps track of how many date elements were created 

    // console.log(monthStartDay);
    
    if (monthStartDay != 0) {

       const prvMonthVar = dateInfo.month-1 != -1 ? dateInfo.month-1 : 11;

            // console.log(prvMonthVar);

        //creates date elements for the previous month
        for (let i = 0; i < monthStartDay; i++) {

            count++
            
            let dateDiv = document.createElement('div');

            dateDiv.className = 'outOfMonth';

            let text = document.createElement('h3');

            text.innerText = dateInfo.daysInMonths[prvMonthVar] - (monthStartDay) + i + 1;

            dateDiv.appendChild(text);

            calDiv.appendChild(dateDiv);
            
        }
    }
    
    //creates date elements for the current month
    for (let i = 1; i < dateInfo.daysInMonths[dateInfo.month] + 1; i++) {

        count++
        
        let dateDiv = document.createElement('div');

        dateDiv.className = 'datesDivs'

        dateDiv.onclick = ()=>selectDate(i);

        let text = document.createElement('h3');

        text.innerText = i;

        if (dateRightNow.getDate() == i && dateRightNow.getMonth() == dateInfo.month && dateRightNow.getFullYear() == dateInfo.year && i == dateInfo.day) {
            dateDiv.id = 'selectedDay';
            dateDiv.className += ' todaysDiv'
        } else if (dateRightNow.getDate() == i && dateRightNow.getMonth() == dateInfo.month && dateRightNow.getFullYear() == dateInfo.year) {
            dateDiv.className += ' todaysDiv'
        } else if (i == dateInfo.day) {
            dateDiv.id = 'selectedDay';
        }

        dateDiv.appendChild(text);

        calDiv.appendChild(dateDiv);
    }
        
    //creates date elements for the next month
    for (let i = 1; count < 42; i++) {

        count++
        
         let dateDiv = document.createElement('div');

        dateDiv.className = 'outOfMonth';

        let text = document.createElement('h3');

        text.innerText = i;

        dateDiv.appendChild(text);

        calDiv.appendChild(dateDiv);
        
    }


}

function previousMonth() {

    dateInfo.day = 0;

    if ( dateInfo.month > 0) {

    dateInfo.month--

    } else if ( dateInfo.month == 0) {

        dateInfo.month = 11;
        dateInfo.year = dateInfo.year > 1996 ? dateInfo.year -1: dateRightNow.getFullYear();

    } 

    updateCalDisplay()

    updateDateString()
    
}

function nextMonth() {

    dateInfo.day = 0;
    
    if ( dateInfo.month < 11) {

        dateInfo.month++
   
    } else if ( dateInfo.month == 11) {

        dateInfo.month = 0;
        dateInfo.year = dateInfo.year+1 < dateRightNow.getFullYear() ? dateInfo.year +1: 1996;

    } 

    updateCalDisplay()

    updateDateString()

}

function nextYear() {

    dateInfo.day = 0;

    dateInfo.year = dateInfo.year+1 < dateRightNow.getFullYear() ? dateInfo.year +1: 1996;

    updateCalDisplay()

    updateDateString()
    
}

function previousYear() {

    dateInfo.day = 0;
    
    dateInfo.year = dateInfo.year > 1996 ? dateInfo.year -1: dateRightNow.getFullYear();

    updateCalDisplay()

    updateDateString()

}

function selectDate(date) {

    dateInfo.day = date;

    updateCalDisplay()

    updateDateString()

    makeNasaReq()
}


function checkLeapYear(year) {

    if (year % 400 == 0 || (year % 4 == 0 && year % 100 != 0 )) {

        dateInfo.daysInMonths[1] = 29
        
    } else {

        dateInfo.daysInMonths[1] = 28
    
    }
    
}

function makeNasaReq() {

    //make a request to the NASA api for a photo/info

    let xhr = new XMLHttpRequest() , 
    endpoint = `https://api.nasa.gov/planetary/apod`, 
    myKey = `2Y4dgeGYMnhG3XrzoYfrUSeOBkcEfhCBK936CLfJ`,
    today = `${dateInfo.year}-${dateInfo.month+1}-${dateInfo.day}`;

    endpoint += `?api_key=${myKey}&date=${today}&hd=true`;

    xhr.open('GET', endpoint, true);
    xhr.send()

    xhr.onload = () => {

        const nasaData = JSON.parse(xhr.responseText);
        console.log(nasaData);

        if (nasaData.msg != undefined && nasaData.msg.includes('format')) {
            
            console.log('date was in the incorrect format');
            
        } else if (nasaData.msg != undefined && nasaData.msg.includes('Date')) {
          
          console.log('request was made to an invalid date');
          
        } else {
            console.log('test');
            
            updateImgDiv(nasaData)
        }

    }
    
}

function updateImgDiv(data) {
    
    let mainDiv = document.getElementById('imgDiv'),
        imgCon = document.getElementById('imgCon'),
        img = document.createElement('img'),
        info = document.createElement('h3');

        mainDiv.innerHTML = '';
        imgCon.innerHTML = '';

        img.src = data.hdurl;

        info.innerText = data.explanation;

        mainDiv.appendChild(imgCon)

        imgCon.appendChild(img)
        imgCon.appendChild(info)

}

//when the browser loads i want to create a div that will store the calendar grid display

window.onload = () => {

    //create divs
    let headerDiv = document.createElement('div'),
    
    calBody = document.createElement('div'),
    
    pageDiv = document.createElement('div'),

    imgDiv = document.createElement('div'),
    imgCon = document.createElement('div'),

    
    //create string that will display the date in the header
    calStr = document.createElement('h1'),

    //buttons for month navigation
    prvMonth = document.createElement('button'), 
    nxtMonth = document.createElement('button'); 

    prvMonth.innerHTML = '<b>Previous Month';
    nxtMonth.innerHTML = '<b>Next Month';

    prvMonth.onclick = previousMonth;
    nxtMonth.onclick = nextMonth;

    prvMonth.id = 'prvMnt';
    nxtMonth.id = 'nxtMnt';

    prvYear = document.createElement('button'), 
    nxtYear = document.createElement('button'); 

    //buttons for year navigation
    prvYear.innerHTML = '<b>Previous Year';
    nxtYear.innerHTML = '<b>Next Year';

    prvYear.onclick = previousYear;
    nxtYear.onclick = nextYear;

    //set ids for all elements
    prvYear.id = 'prvYear';
    nxtYear.id = 'nxtYear';

    calBody.id = 'calBody';

    imgDiv.id = 'imgDiv';
    imgCon.id = 'imgCon';


    pageDiv.id = 'pageDiv';

    headerDiv.id = 'headingDiv';

    calStr.id = 'calendarStr';

    //append elements where they need to be
    document.body.appendChild(headerDiv);

    document.body.appendChild(pageDiv);

    pageDiv.appendChild(calBody);
    pageDiv.appendChild(imgDiv);

    imgDiv.appendChild(imgCon);

    headerDiv.appendChild(prvMonth);
    headerDiv.appendChild(prvYear);
    headerDiv.appendChild(calStr);
    headerDiv.appendChild(nxtYear);
    headerDiv.appendChild(nxtMonth);

    //load in information into blank elements
    updateDateString()

    updateCalDisplay()

    makeNasaReq()

}