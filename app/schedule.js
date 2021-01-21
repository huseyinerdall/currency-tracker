let schedule = require('node-schedule');

var date = new Date(2021, 1, 10, 18, 11, 30);

var j = schedule.scheduleJob(date, function(){
    console.log('The world is going to end today.');
});

console.log(j)