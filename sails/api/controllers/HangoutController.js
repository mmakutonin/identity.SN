/**
 * HangoutController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const { google } = require("googleapis");

module.exports = {
  async store(req, res) {
    const { fromId, toId, roomId, dateTime } = req.body;

    const event = await Hangout.create({
      room: roomId,
      from: fromId,
      to: toId,
      dateTime,
    }).fetch();

    return res.json(event);
  },
  async now(req, res) {
    const { fromId, toId, roomId } = req.body;

    let hangout = await Hangout.create({
      room: roomId,
      from: fromId,
      to: toId,
      dateTime: (new Date()).toISOString(),
      approved: true,
    }).fetch();

    const access_token = req.param("access_token");

    const auth = new google.auth.OAuth2(
      sails.config.google.clientID,
      sails.config.google.clientSecret,
      "http://localhost:8080/api/v1/auth/google/callback"
      // TODO: Change this redirect path before deploy!
    );

    auth.setCredentials({ access_token });

    const gEvent = await sails.helpers.createHangout(auth, hangout);
  
    hangout = await Hangout.update({ id: hangout.id }).set({
      hangoutUrl: gEvent.data.hangoutLink,
    }).fetch()

    return res.json(hangout);
  },
  async accept(req, res) {
    const { id } = req.params;
    // TODO: make this more secure by checking the
    // TODO: that the user had authority to do this
    const event = await Hangout.updateOne({ id }).set({ approved: true });

    // IDEA: might be nice to stale the event after the scheduled time passes

    return res.json(event);
  },
  async destroy(req, res) {
    const { id } = req.params;

    await Hangout.destroy({ id });
    return res.ok();
  },
  async makeHangoutLink(req, res) {
    const { id } = req.params;
    let hangout = await Hangout.findOne({ id });
    if (hangout.approved !== true) return res.status(401).send("Access Denied");

    const access_token = req.param("access_token");

    const auth = new google.auth.OAuth2(
      sails.config.google.clientID,
      sails.config.google.clientSecret,
      "http://localhost:8080/api/v1/auth/google/callback"
      // TODO: Change this redirect path before deploy!
    );

    auth.setCredentials({ access_token });

    const gEvent = await sails.helpers.createHangout(auth, hangout);
  
    hangout = await Hangout.update({ id: hangout.id }).set({
      hangoutUrl: gEvent.data.hangoutLink,
    }).fetch()

    return res.json(hangout);
  },
};
