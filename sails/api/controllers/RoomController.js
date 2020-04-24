/**
 * RoomController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
const { v4: uuidv4 } = require("uuid");

module.exports = {
  async store(req, res) {
    const { uid } = req.params;
    const { userId } = req.body;
    const secondUser = await User.findOne(userId);
    const room_id = uuidv4();
    const room = await Room.create({
      id: room_id,
    }).fetch();

    await Room.addToCollection(room.id, "users", [uid, secondUser.id]);
    return res.json("Room created " + room.id);
  },
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
