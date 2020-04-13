/**
 * UserControllerController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  find: async function(req, res) {
    const { id } = req.params;
    const user = await User.findOne({ id })

    return res.json(user);
  },
  
  store: async function(req, res) {
    // Should only be usable by Google webhook & passport JS later on
    const { body } = req;
    
    const user = await User.create({
      email: body.email,
      displayName: body.displayName,
    }).fetch()

    return res.json(user);
  },

  update: async function(req,res) {
    const { body, params } = req;

    const newAttributes = {};

    if(typeof body.displayName !== 'undefined') {
      newAttributes.displayName = body.displayName;
    }

    if(typeof body.email !== 'undefined') {
      newAttributes.email = body.email;
    }

    const user = await User.update({ id: params.id })
      .set(newAttributes)
      .fetch();
    
    return res.json(user);
  },

  destroy: async function(req, res) {
    const { id } = req.params;

    await User.destroy({ id });

    return res.ok();
  }

};

