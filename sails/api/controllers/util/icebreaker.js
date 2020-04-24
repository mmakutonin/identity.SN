const jsonfile = require("jsonfile");
const icePath = "./data/icebreakers.json";

module.exports = {
  friendlyName: "Icebreaker",

  description: "Icebreaker util.",

  inputs: {
    rid: {
      type: "string",
      description: "Room Id",
    },
  },

  exits: {
    success: {
      description: "An icebreaker",
      outputType: "json",
    },
  },

  fn: async function ({ rid }) {
    const ices = await new Promise((s) =>
      jsonfile.readFile(icePath, (err, data) => s(data))
    );

    const userIds = (
      await Room.findOne({ id: rid }).populate("users")
    ).users.map((u) => u.id);

    const users = await User.find({ id: userIds })
      .populate("interests")
      .populate("identities");

    const u0Interests = users[0].interests.map((i) => i.id);
    const u1Interests = users[1].interests.map((i) => i.id);
    const u0Identities = users[0].identities.map((i) => i.id);
    const u1Identities = users[1].identities.map((i) => i.id);

    const interestingIdentities = [
      ..._.intersection(u0Interests, u1Identities),
      ..._.intersection(u1Interests, u0Identities),
    ];

    const interestingIce = ices.filter((i) =>
      _.includes(interestingIdentities, i.identity)
    );

    if (interestingIce.length > 0) {
      return _.sample(interestingIce);
    } else {
      return {
        identity: null,
        icebreaker: "how's the weather?",
        error: "No matching ice breaker found!",
      };
    }
  },
};
