/**
 * RoomController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
const { v4: uuidv4 } = require('uuid');

module.exports = {
    store: async function(req, res){
        const firstUser = await User.getCurrent();
        const { userId } = req.body;
        const secondUser = await User.findOne(userId);
        const room_id = uuidv4();
        const room = await Room.create({
            id: room_id,
        }).fetch();

        await Room.addToCollection(room.id, 'users', [firstUser.id, secondUser.id]);
        return res.json("Room created " + room.id);
    },
    index: function(req, res){

    }

};
