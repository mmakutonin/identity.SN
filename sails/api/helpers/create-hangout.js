const { google } = require("googleapis");

module.exports = {
  friendlyName: "Create hangout",

  description: "",

  inputs: {
    auth: {
      type: "ref",
    },
    eventInfo: {
      type: "ref",
      description: "Hangout Model with data abt event",
    },
  },

  exits: {
    success: {
      description: "The Google Calendar Event",
      outputType: "ref",
    },
  },

  fn: async function ({ auth, eventInfo }) {
    var event = {
      summary: "Hangouts Meeting For Identity Awareness!",
      start: {
        dateTime: new Date(eventInfo.dateTime).toISOString(),
      },
      end: {
        dateTime: new Date(
          new Date(eventInfo.dateTime).getTime() + 3600000
        ).toISOString(),
      },
      reminders: { useDefault: true },
      // ! Requests Hangout Conference
      conferenceData: {
        createRequest: {
          requestId: eventInfo.id + Math.random().toString().slice(2),
          conferenceSolutionKey: { type: "eventHangout" },
        },
      },
    };

    const calendar = google.calendar({ version: "v3", auth });
    const gEvent = await new Promise((s) => {
      calendar.events.insert(
        {
          auth,
          calendarId: "primary",
          resource: event,
          conferenceDataVersion: 1,
        },
        function (err, event) {
          if (err) sails.log.error(err);
          s(event);
        }
      );
    });

    return gEvent;
  },
};
