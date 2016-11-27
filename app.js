const schedule = require('node-schedule');
const mailgun = require('mailgun-js')({
  apiKey: process.env.API_KEY,
  domain: process.env.DOMAIN
});

const sched = schedule.scheduleJob('0 * 23 * * *', function() {

  var i = 1;

  while (true) {

    const toEmail = process.env['EMAIL' + i];
    if (!toEmail)
      break;

    const data = {
      from: 'Hawaii Countdown <countdown@' + process.env.DOMAIN + '>',
      to: toEmail,
      subject: 'Today\'s Hawaii Countdown!',
      text: 'Testing some Mailgun awesomness!'
    };

    mailgun.messages().send(data, function(error, body) {
      console.log(body);
    });

    i++;
  }
});