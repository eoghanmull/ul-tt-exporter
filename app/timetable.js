/*
 * Library of functions for timetable operations
 */

module.exports.refreshEntry = (timetableEntry) => {
    for(var key in timetableEntry){
        timetableEntry[key] = null;
    }
    return timetableEntry;
} 
