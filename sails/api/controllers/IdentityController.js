/**
 * IdentityController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  
  async store(req, res) {
    const { name, category } = req.body

    const newIdentity = await Identity.create({
      id: name
    }).fetch()

    if(category) {
      await Identity.addToCollection(name, "subcategories", category)
    }

    return res.json(newIdentity)
  },
  async index(req, res) {
    const identities = await Identity.find().populate('subcategories')
    return res.json(identities.filter(i => i.subcategories.length === 0))
  },
  async find(req, res) {
    const { id } = req.params
    const identity = await Identity.findOne({ id }).populate('subcategories')
    return res.json(identity)
  },
  async tagUserIdentity(req, res) {
    const user = await User.getCurrent();
    const { identity } = req.body

    User.addToCollection(user.id, 'identities', identity)
  },
  async removeUserIdentity(req, res) {
    const user = await User.getCurrent();
    const { identity } = req.body

    User.removeFromCollection(user.id, 'identities', identity)
  },
  async tagUserInterest(req, res) {
    const user = await User.getCurrent();
    const { identity } = req.body

    User.addToCollection(user.id, 'interests', identity)
  },
  async removeUserInterest(req, res) {
    const user = await User.getCurrent();
    const { identity } = req.body

    User.removeFromCollection(user.id, 'interests', identity)
  },

};

