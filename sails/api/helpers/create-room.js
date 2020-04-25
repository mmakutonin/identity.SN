const uuidv4 = require("uuid").v4

module.exports = {
  friendlyName: "Create room",
  description: "Make a chatroom for 2 users",

  inputs: {
    users: {
      type: "ref",
      description: "an array of 2 user ids to be added to the room",
    },
  },

  exits: {
    success: {
      description: "All done. Return a room",
      outputType: "ref",
    },
  },

  fn: async function ({ users: [uid1, uid2] }, exits) {
    const roomId = uuidv4();

    const room = await Room.create({ id: roomId });
    await Room.addToCollection(roomId, "users", [uid1, uid2]);

    return exits.success(
      await Room.findOne({ id: roomId }).populate("users").populate("messages")
    );
  },
};
