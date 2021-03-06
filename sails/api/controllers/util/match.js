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
    wrongDatabase: {
      description: "match only works with the mysql, don't use `sails-disk`",
      responseType: "serverError",
    },
  },

  fn: async function ({ uid }) {
    const user = await User.findOne({ id: uid });
    if (!user) throw "notFound";

    const query =
      "SELECT * FROM `match_interests` WHERE `userA` = $1 ORDER BY `matches` DESC";
    const ds = sails.getDatastore();
    if (ds.config.adapter !== "sails-mysql") {
      sails.log.error("Tried to match without MySQL connection!");
      throw "wrongDatabase";
    }
    const { rows } = await ds.sendNativeQuery(query, [user.id]);

    let match;
    if (rows.length !== 0) {
      // IDEA: might wanna pick one random one out of first 5 or 10 when we have enough users.
      match = await User.findOne({ id: rows[0].userB });
    } else {
      // If no match, pairs you up with someone random for sake of demonstration.
      const users = await User.find();
      match = _.sample(users.filter((u) => u.id != user.id));
    }

    const room = await sails.helpers.createRoom.with({ users: [uid, match.id] });

    return room;
  },
};
