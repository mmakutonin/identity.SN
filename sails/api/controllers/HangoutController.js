/**
 * HangoutController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const { google } = require("googleapis");

module.exports = {
  async store(req, res) {
    const { fromId, toId, roomId, datetime } = req.body;

    const event = await Hangout.create({
      room: roomId,
      from: fromId,
      to: toId,
      datetime,
    }).fetch();

    return res.json(event);
  },
  async accept(req, res) {
    const { id } = req.params;
    // TODO: make this more secure by checking the
    // TODO: that the user had authority to do this

    const event = await Hangout.update({ id }).set({ approved: true }).fetch();

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
    const auth = new google.auth.OAuth2(
      sails.config.google.clientID,
      sails.config.google.clientSecret,
      "http://localhost:8080/auth"
      // TODO: Change this redirect path before deploy!
    );

    auth.setCredentials(token);

    // TODO: implement create-hangout helper
  },
};
