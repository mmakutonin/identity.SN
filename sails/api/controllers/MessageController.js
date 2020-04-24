/**
* MessageController
*
* @description :: Server-side actions for handling incoming requests.
* @help        :: See https://sailsjs.com/docs/concepts/actions
*/

module.exports = {
    store: async function (req, res) {
        const firstUser = await User.getCurrent();

        const { message: text, toId } = req.body;
        const secondUser = await User.findOne(toId);
        var room = await Room.find().populate('users');
        var room_id = -1;
        var checkOne,checkTwo = false;
        for(let userList of room){
            if(userList.users.length > 0){
                for(let user of userList.users){
                    if(user.id = firstUser.id){
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
            from: firstUser.id,
            to: toId,
            message: text,
            room: room_id
        }).fetch();

        return res.json(message);
    },

    index: async function (req, res) {
        const user = await User.getCurrent();
        const { id } = req.params;
        const message1 = await Message.find()
        .where({
            from: user.id ,
            to: id
        });
        const message2 = await Message.find()
        .where({
            from: id ,
            to: user.id
        });
        const messages = Object.assign(message1, message2);
        return res.json(messages);
    },
};
