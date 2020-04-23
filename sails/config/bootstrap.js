/**
 * Seed Function
 * (sails.config.bootstrap)
 *
 * A function that runs just before your Sails app gets lifted.
 * > Need more flexibility?  You can also create a hook.
 *
 * For more information on seeding your app with fake data, check out:
 * https://sailsjs.com/config/bootstrap
 */

async function seed() {
  // Seed the database during development

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

  await Identity.createEach([
    { id: "gay" },
    { id: "gayest" },
    { id: "a bit gay" },
    { id: "not gay" },
  ]);
  await Identity.addToCollection("gay", "subcategories", [
    "gayest",
    "a bit gay",
  ]);

  await User.addToCollection(users[0].id, "identities", "gayest");
  await User.addToCollection(users[0].id, "interests", "not gay");
  await User.addToCollection(users[1].id, "identities", "not gay");
  await User.addToCollection(users[1].id, "interests", "gayest");

  await Message.createEach([
    {
      from: users[0].id,
      to: users[1].id,
      message: "Hi I'm Dan",
    },
    {
      from: users[1].id,
      to: users[0].id,
      message: "Hi I'm Amelia",
    },
  ]);
}

module.exports.bootstrap = async function () {
  const identities = await Identity.find();
  if (identities.length === 0) await seed();
};
