/**
 * MessageController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  store: async function (req, res) {
    const user = await User.getCurrent();

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
    const user = await User.getCurrent();

    const messages = await Message.find({
      or: [{ from: user.id }, { to: user.id }],
    });

    return res.json(messages);
  },
};
