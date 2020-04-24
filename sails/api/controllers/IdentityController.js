/**
 * IdentityController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  async store(req, res) {
    const { name, parentCategory } = req.body;

    const newIdentity = await Identity.create({
      id: name,
      ...(typeof parentCategory === 'string' && { parentCategory })
    }).fetch();

    return res.json(newIdentity);
  },
  async index(req, res) {
    const { query: searchStr, root, n, skip } = req.query;

    const identities = await Identity.find({
      where: {
        ...(typeof searchStr === "string" && {
          id: { contains: searchStr },
        }),
        ...(root === "true" && { parentCategory: null }),
      },
      ...(typeof n === "string" && { limit: n }),
      ...(typeof skip === "string" && { skip }),
    });

    return res.json(identities);
  },
  async find(req, res) {
    const { id } = req.params;
    const { query: searchStr, n, skip } = req.query;
    const identity = await Identity.findOne({ id })
      .populate("subcategories", {
        ...(typeof searchStr === "string" && {
          where: { id: { contains: searchStr } },
        }),
        ...(typeof n === "string" && { limit: n }),
        ...(typeof skip === "string" && { skip }),
      })
      .populate("parentCategory");

    return res.json(identity);
  },
  async tagUserIdentity(req, res) {
    const { uid } = req.params;
    const { identity } = req.body;

    // FIXME: Tagging an identity that doesn't exist doesn't cause error!
    // FIXME: But also doesn't change the database 

    // IDEA: prevent someone from having an identity as both 
    // IDEA: self-identity & interest at same time

    await User.addToCollection(uid, "identities", identity);
    return res.ok();
  },
  async removeUserIdentity(req, res) {
    const { uid } = req.params;
    const { identity } = req.body;

    await User.removeFromCollection(uid, "identities", identity);
    return res.ok();
  },
  async tagUserInterest(req, res) {
    const { uid } = req.params;
    const { identity } = req.body;

    // FIXME: Tagging an identity that doesn't exist doesn't cause error!
    // But also doesn't change the database 

    await User.addToCollection(uid, "interests", identity);
    return res.ok();
  },
  async removeUserInterest(req, res) {
    const { uid } = req.params;
    const { identity } = req.body;

    await User.removeFromCollection(uid, "interests", identity);
    return res.ok();
  },
};
