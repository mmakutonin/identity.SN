/**
 * MatchController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
const { v4: uuidv4 } = require('uuid');

module.exports = {
    store: async function (req, res) {
        const from = await User.findOne({ id: req.body.firstUserId });
        const to = await User.findOne({ id: req.body.secondUserId });

        if(!from || !to) return res.status(400).send({ error: 'User not found!' });

        const room = Room.create({
            id: uuidv4(),
            from,
            to 
        }).fetch();

        return res.json(room);
    },
    index: async function (req, res) {
       const { firstUser, secondUser } = req.query;

       const room = findOne({ from: firstUser, to: secondUser });

       if(room) return res.json(room);
       return res.status(400).send({ error: 'User not found!' })
    }
};

