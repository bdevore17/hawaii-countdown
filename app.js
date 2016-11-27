const schedule = require('node-schedule');
const mailgun = require('mailgun-js')({
  apiKey: process.env.API_KEY,
  domain: process.env.DOMAIN
});
const email = require('./email');
const tripDate = new Date(process.env.YEAR, process.env.MONTH - 1, process.env.DAY, process.env.HOUR, 0, 0, 0);
console.log(tripDate);

const sched = schedule.scheduleJob('0 * '+ (process.env.HOUR - 1) +' * * *', function() {

  var i = 1;

  var oneDay = 24 * 60 * 60 * 1000;
  var currentDate = new Date();
  var diffDays = Math.round(Math.abs((tripDate.getTime() - currentDate.getTime())/(oneDay)));

  while (true) {

    const toEmail = process.env['EMAIL' + i];
    if (!toEmail)
      break;

    const data = {
      from: 'Hawaii Countdown <countdown@' + process.env.DOMAIN + '>',
      to: toEmail,
      subject: 'Today\'s Hawaii Countdown!',
      html: email.firstHalf + diffDays + email.secondHalf
    };

    mailgun.messages().send(data, function(error, body) {
      console.log(body);
    });

    i++;
  }
});