const Calendar = (app) => {
  let events = [
    {time: 1533526619165, title: 'task 1', content: 'test 1'},
    {time: 1534526619165, title: 'task 2', content: 'test 2'},
    {time: 1543526619165, title: 'task 3', content: 'test 3'},
  ];

  app.get('/api/calendar', (req, res) => {
    var calendarTasks = {
      events
    }

    res.send(calendarTasks);
  });

  app.post('/api/calendar/createEvent', (req, res) => {
    console.log(req.body);
    events.push(req.body);
    res.send({
      message: "event saved",
      eventsList: events
    });
  });
}

module.exports = Calendar;