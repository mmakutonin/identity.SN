/**
 * RoomController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  async index(req, res) {
    const { uid } = req.params;
    const rooms = (await Room.find().populate('users')).filter(
        r => _.includes(r.users, uid)
    )
    
    return res.json(rooms)
  },
  async find(req, res) {
    const { rid } = req.params;

    const room = await Room.findOne({ id: rid })
      .populate("users")
      .populate("messages");

    return res.json(room);
  },
};
