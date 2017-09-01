/*
 * Library of functions for route handling. 
 */
var request = require('request');
const UL = 'https://www.timetable.ul.ie/tt2.asp';
var html2json = require('html2json').html2json;
var timetablelib = require('./timetable.js');

// res.render a simple homepage with a form for entering student ID
module.exports.homepage = (req, res) => {
    res.send("You're home");
}

module.exports.tt = (req, res) => {
    console.log(req.body);
}

module.exports.getTimeTable = (req, res) => {

    let timeTable = {
        monday: [],
        tuesday: [],
        wednesday: [],
        thursday: [],
        friday: []
    }

    console.log(req.params.id);
    let config = {
        url: UL,
        form: { T1: req.params.id }
    }
    request.post(config, function (err, httpResponse, body) {
        if (err) {
            console.log(err);
        } else {
            var monday = html2json(body).child[0].child[3].child[3].child[1].child[3].child[1].child;
            var tuesday = html2json(body).child[0].child[3].child[3].child[1].child[3].child[3].child;
            var wednesday = html2json(body).child[0].child[3].child[3].child[1].child[3].child[5].child;
            var thursday = html2json(body).child[0].child[3].child[3].child[1].child[3].child[7].child;
            var friday = html2json(body).child[0].child[3].child[3].child[1].child[3].child[9].child;

            var days = [];
            days.push(monday);
            days.push(tuesday);
            days.push(wednesday);
            days.push(thursday);
            days.push(friday);

            function buildTimeTableDay(day) {
                var data = [];
                day.forEach(function (element) {
                    if (element != undefined && element.hasOwnProperty('child')) {
                        if (element.child[0].hasOwnProperty('child')) {
                            if (element.child[0].child[0].hasOwnProperty('child')) {
                                //console.log(element.child[0].child[0].child);
                                var dayData = element.child[0].child[0].child;
                                for (var obj in dayData) {
                                    if (dayData[obj].hasOwnProperty('text')) {
                                        //console.log(dayData[obj].text);
                                        data.push(dayData[obj].text);
                                    }
                                }
                            }
                        }
                    }
                }, this);
                var count = 0;
                let timetableEntry = {
                    start_time: null,
                    end_time: null,
                    module_code: null,
                    class_type: null,
                    room_code: null,
                    runs_for: null
                }

                for (var i = 0; i <= data.length; i++) {
                    if (count == 7) {
                        switch (day) {
                            case monday:
                                timeTable.monday.push(timetableEntry);
                                break;
                            case tuesday:
                                timeTable.tuesday.push(timetableEntry);
                                break;
                            case wednesday:
                                timeTable.wednesday.push(timetableEntry);
                                break;
                            case thursday:
                                timeTable.thursday.push(timetableEntry);
                                break;
                            case friday:
                                timeTable.friday.push(timetableEntry);
                                break;
                        }

                        timetableEntry = {
                            start_time: null,
                            end_time: null,
                            module_code: null,
                            class_type: null,
                            room_code: null,
                            runs_for: null
                        }
                        count = 0;
                    }
                    switch (count) {
                        case 0:
                            timetableEntry.start_time = data[i];
                            break;
                        case 1:
                            timetableEntry.end_time = data[i];
                            break;
                        case 2:
                            timetableEntry.module_code = data[i];
                            break;
                        case 3:
                            timetableEntry.class_type = data[i];
                            break;
                        case 4:
                            break;
                        case 5:
                            timetableEntry.room_code = data[i];
                            break;
                        case 6:
                            timetableEntry.runs_for = data[i];
                            break;
                    }
                    count++;
                }
            }


            for (var i in days) {
                buildTimeTableDay(days[i]);
            }

            res.send(timeTable);
        }
    })
}