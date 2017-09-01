//Academic Calender JSON file parser 

var data = require('./academic_calendar.js');

module.exports.testJSON = () => {
        console.log(checkDate("semi1", "19/10/2017"));   
        
}


//returns true if there's college or false if there isnt (tested)
function checkDate(semi, date){
    if(semi=="semi1"){
        hols = data.academic_calendar.semi1.holidays;
        for(var i in hols){
            if(date==hols[i]){
                return false
            }
        }
        return true;
    }else{
         hols = data.academic_calendar.semi2.holidays;
        for(var i in hols){
            if(date==hols[i]){
                return false
            }
        }
        return true;
    }
}

//(tested)
function getStartDate(semi){
    var start;
    if(semi=="semi1"){
        start = data.academic_calendar.semi1.start_date;
    }else{
        start = data.academic_calendar.semi2.start_date;
    }
    //console.log(start);
    return start
}

//(tested)
function getEndDate(semi){
    var start;
    if(semi=="semi1"){
        start = data.academic_calendar.semi1.end_date;
    }else{
        start = data.academic_calendar.semi2.end_date;
    }
    //console.log(start);
    return start
}

//(tested)
function getResults(semi){
    if(semi=="semi1"){
        return data.academic_calendar.semi1.results
    }else{
         return data.academic_calendar.semi2.results
    }
}

//(tested)
function getStudyWeek(semi){
     if(semi=="semi1"){
        return data.academic_calendar.semi1.week13.start_date
    }else{
        return data.academic_calendar.semi2.week13.start_date
    }
}

