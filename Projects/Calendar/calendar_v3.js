//create a grid layout of the calendar
let dateRightNow = new Date();

let dateInfo = {

    year: dateRightNow.getFullYear(), 
    month: dateRightNow.getMonth(), //using index numbering for months, gets converted when displaying to the dom.
    day: dateRightNow.getDate(),
    dow: dateRightNow.getDay(),

    daysInMonths: [31,28,31,30,31,30,31,31,30,31,30,31],
    
    months: ["January","February","March","April","May","June","July","August","September","October","November","December"],
    
    daysOfWeek: ["Sunday","Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

};

//when the browser loads i want to create a div that will store the calendar grid display

window.onload = () => {

    let headDiv = document.createElement('div'),
    
    mainCalDiv = document.createElement('div'),

    calStr = document.createElement('h1'),

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

    prvYear.innerHTML = '<b>Previous Year';
    nxtYear.innerHTML = '<b>Next Year';


    prvYear.onclick = previousYear;
    nxtYear.onclick = nextYear;

    prvYear.id = 'prvYear';
    nxtYear.id = 'nxtYear';

    mainCalDiv.id = 'mainCalDiv';

    headDiv.id = 'headingDiv';

    calStr.id = 'calendarStr';

    document.body.appendChild(headDiv);

    document.body.appendChild(mainCalDiv);

    headDiv.appendChild(prvMonth)
    headDiv.appendChild(prvYear)
    headDiv.appendChild(calStr)
    headDiv.appendChild(nxtYear)
    headDiv.appendChild(nxtMonth)


    updateDateString()

    updateCalDisplay()
}

function updateDateString() {

    let heading = document.getElementById('calendarStr'), date;

   if (dateInfo.day == 1 || dateInfo.day.toString().substring(1,2) == '1' && dateInfo.day > 11) {
        date = dateInfo.day + 'st'
    } else if (dateInfo.day == 2 || dateInfo.day.toString().substring(1,2) == '2' && dateInfo.day > 12) {
        date = dateInfo.day + 'nd'
    } else if (dateInfo.day == 3 || dateInfo.day.toString().substring(1,2) == '3' && dateInfo.day > 13) {
        date = dateInfo.day + 'rd'
    } else {
        date = dateInfo.day + 'th'
    }

    heading.innerText = `${dateInfo.months[dateInfo.month]} ${date} ${dateInfo.year}`

}


function updateCalDisplay() {
    
    let calDiv = document.getElementById('mainCalDiv');

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
    

    for (let i = 1; i < dateInfo.daysInMonths[dateInfo.month] + 1; i++) {

        count++
        
        let dateDiv = document.createElement('div');

        dateDiv.className = 'datesDivs'

        dateDiv.onclick = ()=>selectDate(i);

        let text = document.createElement('h3');

        text.innerText = i;

        dateDiv.appendChild(text);

        calDiv.appendChild(dateDiv);
    }

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

    if ( dateInfo.month > 0) {

    dateInfo.month--

    } else if ( dateInfo.month == 0) {

        dateInfo.month = 11;
        dateInfo.year--

    } 

    updateCalDisplay()

    updateDateString()
    
}

function nextMonth() {
    
    if ( dateInfo.month < 11) {

        dateInfo.month++
   
    } else if ( dateInfo.month == 11) {

        dateInfo.month = 0;
        dateInfo.year++

    } 

    updateCalDisplay()

    updateDateString()

}

function nextYear() {

    dateInfo.year++

    updateCalDisplay()

    updateDateString()
    
}

function previousYear() {
    
    dateInfo.year--

    updateCalDisplay()

    updateDateString()

}

function selectDate(date) {

    // console.log(date);
    
    dateInfo.day = date;

    updateCalDisplay()

    updateDateString()
}


function checkLeapYear(year) {

    if (year % 400 == 0 || (year % 4 == 0 && year % 100 != 0 )) {

        dateInfo.daysInMonths[1] = 29
        
    } else {

        dateInfo.daysInMonths[1] = 28
    
    }
    
}