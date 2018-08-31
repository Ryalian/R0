const Calendar = (app) => {
  let events = [
    {
      "title": "Phats",
      "startDate": 1535439600000,
      "endDate": 1535439600000,
      "description": "Lube are phat",
      "modifyStartDay": false,
      "modifyEndDay": false
    }
  ];

  app.get('/api/calendar', (req, res) => {
    var calendarTasks = {
      events
    }

    res.send(calendarTasks);
  });

  app.post('/api/calendar/configEvent', (req, res) => {
    console.log(req.body);
    events.push(req.body);
    res.send({
      message: "event saved",
      eventsList: events
    });
  });
}

module.exports = Calendar;