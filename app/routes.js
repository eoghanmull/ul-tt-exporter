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
            //HTML2JSON magic..
            //moday first
            //console.log(html2json(body).child[0].child[3].child[3].child[1].child[3].child[1].child);
            var monday = html2json(body).child[0].child[3].child[3].child[1].child[3].child[1].child;
            var mondayData = [];
            monday.forEach(function (element) {
                if (element != undefined && element.hasOwnProperty('child')) {
                    if (element.child[0].hasOwnProperty('child')) {
                        if (element.child[0].child[0].hasOwnProperty('child')) {
                            //console.log(element.child[0].child[0].child);
                            var dayData = element.child[0].child[0].child;
                            for (var obj in dayData) {
                                if (dayData[obj].hasOwnProperty('text')) {
                                    //console.log(dayData[obj].text);
                                    mondayData.push(dayData[obj].text);
                                }
                            }
                        }
                    }
                }
            }, this);
            console.log(mondayData);

            console.log("\n\n\n")

            var count = 0;
            let timetableEntry = {
                start_time: null,
                end_time: null,
                module_code: null,
                class_type: null,
                room_code: null,
                runs_for: null
            }

            for (var i = 0; i < mondayData.length; i++) {
                if (count == 7) {
                    timeTable.monday.push(timetableEntry);
                    timetableEntry = {
                        start_time: null,
                        end_time: null,
                        module_code: null,
                        class_type: null,
                        room_code: null,
                        runs_for: null
                    }
                    // timetableEntry = timetablelib.refreshEntry(timetableEntry);
                    // console.log(timetableEntry);
                    count = 0;
                }
                switch (count) {
                    case 0:
                        timetableEntry.start_time = mondayData[i];
                        break;
                    case 1:
                        timetableEntry.end_time = mondayData[i];
                        break;
                    case 2:
                        timetableEntry.module_code = mondayData[i];
                        break;
                    case 3:
                        timetableEntry.class_type = mondayData[i];
                        break;
                    case 4:
                        break;
                    case 5:
                        timetableEntry.room_code = mondayData[i];
                        break;
                    case 6:
                        timetableEntry.runs_for = mondayData[i];
                        break;
                }
                count++;
            }

            console.log(timeTable);


            // MAGIC DO NOT TOUCH LOLOLOL.
            var weekdays = html2json(body).child[0].child[3].child[3].child[1].child[3].child;
        }
    })
}
