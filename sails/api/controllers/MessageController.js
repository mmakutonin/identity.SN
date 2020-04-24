/**
 * MessageController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  store: async function (req, res) {
    const { message: text, fromId, toId } = req.body;

    // TODO: add some sort of check here to make
    // TODO: sure they have permission to chat

    const message = await Message.create({
      from: fromId,
      to: toId,
      message: text,
    }).fetch();

    return res.json(message);
  },

  index: async function (req, res) {
    // TODO: Replace this with method for querying 
    // TODO: a given chatroom for all its messages
    const { uid } = req.params;

    const messages = await Message.find({
      or: [{ from: uid }, { to: uid }],
    });

    return res.json(messages);
  },
};
