
var timetable = require('./timetable.js');

var event = {
  'summary': 'Google I/O 2015',
  'location': '800 Howard St., San Francisco, CA 94103',
  'description': 'A chance to hear more about Google\'s developer products.',
  'start': {
    'dateTime': '2015-05-28T09:00:00-07:00',
    'timeZone': 'America/Los_Angeles',
  },
  'end': {
    'dateTime': '2015-05-28T17:00:00-07:00',
    'timeZone': 'America/Los_Angeles',
  },
  'recurrence': [
    'RRULE:FREQ=DAILY;COUNT=2'
  ],
  'attendees': [
    {'email': 'lpage@example.com'},
    {'email': 'sbrin@example.com'},
  ],
  'reminders': {
    'useDefault': false,
    'overrides': [
      {'method': 'email', 'minutes': 24 * 60},
      {'method': 'popup', 'minutes': 10},
    ],
  },
};


// let timetableEntry = {
//     start_time: null,
//     end_time: null,
//     module_code: null,
//     class_type: null,
//     room_code: null,
//     runs_for: null
// }


var timeEvent = {
    startDate   : '',
    endDate     : '',
    lectureCode : '',
    roomCode    : '',
    moduleCode  : '',
}

//college dates is an array of objects this form

/*
    var collegeMonday = [
        {
            sd:x,
            ed: y
        },
        {
            sd: x1,
            ed: y1
        }
    ]; 

     var collegeTuesday = [
        {
            sd:x,
            ed: y
        },
        {
            sd: x1,
            ed: y1
        }
    ]; ...
*/

/* for(var i = 0; i < collegeDays; i++){
    switch (i) {
        case 0:
            insertTimeTableEvent(timeEvent, collegeDates, monday)
            break;
    
        default:
            break;
    }
} */

function insertTimeTableEvent(timeEvent, collegeDates, day) {
    for (var datePair in collegeDates) {
        var event = {
            'summary': 'Google I/O 2015',
            'location': '800 Howard St., San Francisco, CA 94103',
            'description': 'A chance to hear more about Google\'s developer products.',
            'start': {
                'dateTime': '2015-05-28T09:00:00-07:00',
                'timeZone': 'America/Los_Angeles',
            },
            'end': {
                'dateTime': '2015-05-28T17:00:00-07:00',
                'timeZone': 'America/Los_Angeles',
            },
            'recurrence': [
                'RRULE:FREQ=DAILY;COUNT=2'
            ],
            'reminders': {
                'useDefault': false,
                'overrides': [
                    { 'method': 'email', 'minutes': 24 * 60 },
                    { 'method': 'popup', 'minutes': 10 },
                ],
            }
        }

        calendar.events.insert({
            auth: auth,
            calendarId: 'primary',
            resource: event
        })
    }
}


calendar.events.insert({
  auth: auth,
  calendarId: 'primary',
  resource: event,
}, function(err, event) {
  if (err) {
    console.log('There was an error contacting the Calendar service: ' + err);
    return;
  }
  console.log('Event created: %s', event.htmlLink);
});

