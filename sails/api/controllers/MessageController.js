/**
 * MessageController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  store: async function (req, res) {
    // TODO: replace w/ user who's logged in
    const user = (await User.find())[0];

    const { message: text, toId } = req.body;

    // TODO: add some sort of check here to make
    // TODO: sure they have permission to chat

    const message = await Message.create({
      from: user.id,
      to: toId,
      message: text,
    }).fetch();

    return res.json(message);
  },

  index: async function (req, res) {
    // TODO: replace w/ user who's logged in
    const user = (await User.find())[0];

    const messages = await Message.find({ from: user.id })

    return res.json(messages)
  },
};
