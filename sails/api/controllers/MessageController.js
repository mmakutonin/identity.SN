/**
 * MessageController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  store: async function (req, res) {

    const { message: text, toId, userID } = req.body;
    const firstUser = await User.find().where({ id: userID });
    const secondUser = await User.find().where({ id: toId });
    
    const room = Room.find().where({ firstUser, secondUser 
    })
    if(room){
      const message = await Message.create({
        from: user.id,
        to: toId,
        message: text,
      }).fetch();
  
      return res.json(message);
    } else {
      return res.status(400).send({ error: 'There is no such room for these users'})
    }
  },

  index: async function (req, res) {

    const { messagesNumber, messagesTimePoint, firstUser, secondUser } = req.query

    var arrayOfChats = []
    let fromMessages = await Message.find()
      .where({ from: firstUser })
      .then(res => {
        return res = res.filter((message) => message.to === secondUser)
      }).catch(error => {
        return { error }
      })
    let toMessages = await Message.find()
      .where({ from: secondUser })
      .then(res => {
        return res.filter((message) => message.to === firstUser)
      }).catch(error => {
        return { error }
      })
    arrayOfChats = fromMessages.concat(toMessages)
    const sortedChats = arrayOfChats.slice().sort((a, b) => a.createdAt - b.createdAt)
    if (firstUser && secondUser) {
      if (messagesNumber) {
        const end = sortedChats.length();
        const init = end - messagesNumber;
        const limitedChats = sortedChats.slice(init, end);
        return res.json(limitedChats)
      }
      return res.json(sortedChats);
    } else{
      return res.send({ error: 'User not found!'})
    }
  },
};
