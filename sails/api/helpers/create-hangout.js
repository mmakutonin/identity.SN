module.exports = {
  friendlyName: "Create hangout",

  description: "",

  inputs: {
    auth: {
      type: "ref",
    }
  },

  exits: {
    success: {
      description: "All done.",
    },
  },

  fn: async function ({ auth }) {

    var event = {
      summary: "Google I/O 2015",
      location: "800 Howard St., San Francisco, CA 94103",
      description: "A chance to hear more about Google's developer products.",
      start: {
        dateTime: "2020-05-23T09:00:00-07:00",
        timeZone: "America/Los_Angeles",
      },
      end: {
        dateTime: "2020-05-23T17:00:00-07:00",
        timeZone: "America/Los_Angeles",
      },
      recurrence: ["RRULE:FREQ=DAILY;COUNT=2"],
      attendees: [{ email: "lpage@example.com" }, { email: "sbrin@example.com" }],
      reminders: {
        useDefault: false,
        overrides: [
          { method: "email", minutes: 24 * 60 },
          { method: "popup", minutes: 10 },
        ],
      },
      // ! Requests Hangout Conference
      conferenceData: {
        createRequest: { 
          requestId: Math.random().toString(),
          conferenceSolutionKey: { type: "eventHangout" },
        },
      },
    };
  
    const calendar = google.calendar({ version: "v3", auth });
  
    calendar.events.insert(
      {
        auth,
        calendarId: "primary",
        resource: event,
        conferenceDataVersion: 1,
      },
      function (err, event) {
        if (err) {
          console.log(
            "There was an error contacting the Calendar service: " + err
          );
          return;
        }
        console.log("Event html link: %s", event.data.htmlLink);
        console.log("Event hangout link: %s", event.data.hangoutLink);
      }
    );

  },
};
