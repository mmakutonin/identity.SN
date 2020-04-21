/**
 * UserControllerController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

// TODO: make sure the user actually has permission to do these operations
// TODO: then we wont need to include the weird user email / id thing in the urlstring

module.exports = {
  // Expects the id parameter to contain an email address
  // So escape the . in the email address with %2E
  find: async function (req, res) {
    const { id } = req.params;
    const { interests, identities } = req.query;
    let query = User.findOne({ id });

    if (interests === "true") {
      query = query.populate("interests");
    }

    if (identities === "true") {
      query = query.populate("identities");
    }

    const user = await query;
    return res.json(user);
  },

  store: async function (req, res) {
    // Should only be usable by Google webhook & passport JS later on
    const { body } = req;

    const user = await User.create({
      fullName: body.name,
      displayName: body.name,
      id: body.email,
    }).fetch();

    return res.json(user);
  },

  update: async function (req, res) {
    const { email, displayName, fullName } = req.body;
    const { id } = req.params;

    const newAttributes = {
      ...(typeof displayName === "string" && { displayName }),
      ...(typeof email === "string" && { id: email }),
      ...(typeof fullName === "string" && { fullName }),
    };

    const user = await User.update({ id })
      .set(newAttributes)
      .fetch();

    return res.json(user);
  },

  destroy: async function (req, res) {
    const { id } = req.params;

    await User.destroy({ id });

    return res.ok();
  },
};
