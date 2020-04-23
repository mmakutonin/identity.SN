/**
 * RoomController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
const { v4: uuidv4 } = require('uuid');

module.exports = {
    store: function(req, res){
        const room = Room.create({
            id: uuidv4()
        }).fetch();
        await Room.addToCollection(room.id, 'users', [firstUser, secondUser]);
    },
    index: function(req, res){

    }

};

