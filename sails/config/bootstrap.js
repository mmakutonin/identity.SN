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

const jsonfile = require("jsonfile");
const path = "./data/identities.json";

module.exports.bootstrap = async function () {
  const identities = await Identity.find();
  const users = await User.find();

  if (identities.length === 0) {
    jsonfile.readFile(path, async (err, data) => {
      const identities = data
        .filter((i) => typeof i.parent != "undefined")
        .map((i) => ({
          id: i.id,
          parentCategory: i.parent !== "null" ? i.parent : null,
        }));
      await sails.helpers.seedIdentity(identities);
    });
  }

  const { environment, models } = sails.config;
  if (environment !== "production" && models.migrate === "drop")
    await sails.helpers.seedDebug();
};
