module.exports = {
  friendlyName: "Match",

  description: "Match util.",

  inputs: {
    uid: {
      type: "string",
      description: "The requesting User ID",
    },
  },

  exits: {
    success: {
      outputType: "json",
      description: "A user you match with",
    },
    notFound: {
      description: "No user with the specified ID was found in the database.",
      responseType: "notFound",
    },
  },

  fn: async function ({ uid }) {
    const user = await User.findOne({ id: uid });
    let match;
    if (!user) throw "notFound";

    const { rows } = await sails.getDatastore().sendNativeQuery(
      'SELECT * FROM `shared_identities_and_interests` WHERE `userA` = "$1" ORDER BY `total_shared` DESC',
      [user.id]
    );

    if(rows.length !== 0) {
      // IDEA: might wanna pick one random one out of first 5 or 10 when we have enough users.
      match = rows[0].userB;
    } else {
      // If no match, pairs you up with someone random for sake of demonstration.
      const users = await User.find();
      match = _.sample(users.filter(u => u.id != user.id))
    }

    // TODO: once the chatroom model is finished, start a chatroom down here.
    sails.log("TODO: Create chatroom with users who've matched!")

    return match;
  },
};
