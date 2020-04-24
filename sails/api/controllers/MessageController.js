/**
* MessageController
*
* @description :: Server-side actions for handling incoming requests.
* @help        :: See https://sailsjs.com/docs/concepts/actions
*/

module.exports = {
    store: async function (req, res) {
        const { message: text, toId, fromId } = req.body;
        const secondUser = await User.findOne(toId);
        var room = await Room.find().populate('users');
        var room_id = -1;
        var checkOne = false, checkTwo = false;
        for(let userList of room){
            if(userList.users.length > 0){
                for(let user of userList.users){
                    if(user.id = fromId){
                        checkOne = true;
                    }
                }
                if(checkOne){
                    for(let user of userList.users){
                        if(user.id = secondUser.id){
                            checkTwo = true;
                            room_id = userList.id;
                        }
                    }
                }
            }
        }

        const message = await Message.create({
            from: fromId,
            to: toId,
            message: text,
            room: room_id
        }).fetch();

        return res.json(message);
    },
};
