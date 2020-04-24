/**
 * RoomController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  async index(req, res) {
    // TODO: list all the rooms a certain user has?
  },
  async find(req, res) {
    const { rid } = req.params;

    const room = await Room.findOne({ id: rid })
      .populate("users")
      .populate("messages");

    return res.json(room);
  },
};
