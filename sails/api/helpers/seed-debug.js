module.exports = {
  friendlyName: "Seed debug",

  description: "Seed Database For Debug",

  inputs: {},

  exits: {
    success: {
      description: "All done.",
    },
  },

  fn: async function () {
    const users = await User.createEach([
      {
        fullName: "Jane Kim",
        displayName: "JK",
        id: "kim@123.com",
      },
      {
        fullName: "Amelia Earhart",
        displayName: "Amelia Earhart",
        id: "hart@fda.gov",
      },
      {
        fullName: "Emilee Rodgers",
        displayName: "Rodilla",
        id: "lee@123.edu",
      },
    ]).fetch();

    const identities = await Identity.find();
    const indicies = Array(2)
      .fill(undefined)
      .map(() => Math.floor(Math.random() * identities.length));

    await User.addToCollection(
      users[0].id,
      "identities",
      identities[indicies[0]].id
    );
    await User.addToCollection(
      users[0].id,
      "interests",
      identities[indicies[1]].id
    );
    await User.addToCollection(
      users[1].id,
      "identities",
      identities[indicies[1]].id
    );
    await User.addToCollection(
      users[1].id,
      "interests",
      identities[indicies[0]].id
    );

    const room02 = await sails.helpers.createRoom([users[0].id, users[2].id]);

    await Message.createEach([
      {
        from: users[0].id,
        to: users[2].id,
        message: "Hi I'm Dan",
        room: room02.id,
      },
      {
        from: users[2].id,
        to: users[0].id,
        message: "Hi I'm Amelia",
        room: room02.id,
      },
    ]);

    await Hangout.create({
      id: 1,
      from: users[0].id,
      to: users[2].id,
      room: room02.id,
      dateTime: new Date(new Date().getTime() + 3600000).toISOString(),
      approved: true,
    });
  },
};
