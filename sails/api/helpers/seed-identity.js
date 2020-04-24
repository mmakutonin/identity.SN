module.exports = {
  friendlyName: "Seed identity",

  description: "Add identities to the database",

  inputs: {
    identities: {
      required: true,
      type: "ref",
    },
  },

  exits: {
    success: {
      description: "All done.",
    },
  },

  fn: async function ({ identities }, exits) {
    const result = await Identity.createEach(identities).fetch();
    return exits.success(result);
  },
};
