/**
 * UserControllerController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

// TODO: make sure the user actually has permission to do these operations
// TODO: then we wont need to include the weird user email / id thing in the urlstring

var passport = require('passport');

module.exports = {
  // Expects the id parameter to contain an email address
  // So escape the . in the email address with %2E
  find: async function (req, res) {
    const { id } = req.params;
    const user = await User.findOne({ id });

    return res.json(user);
  },

  store: async function (req, res) {
    // Should only be usable by Google webhook & passport JS later on

    const { body } = req;

    const user = await User.create({
      fName: body.fName,
      lName: body.lName,
      displayName: body.displayName,
      id: body.email,
    }).fetch()

    return res.json(user);
  },

  update: async function (req, res) {
    const { body, params } = req;

    const newAttributes = {};

    if (typeof body.displayName !== "undefined") {
      newAttributes.displayName = body.displayName;
    }

    if (typeof body.email !== "undefined") {
      newAttributes.id = body.email;
    }

    if(typeof body.fName !== "undefined") {
      newAttributes.fName = body.fName;
    }

    if(typeof body.fName !== "undefined") {
      newAttributes.lName = body.lName;
    }

    const user = await User.update({ id: params.id })
      .set(newAttributes)
      .fetch();

    return res.json(user);
  },

  destroy: async function (req, res) {
    const { id } = req.params;

    await User.destroy({ id });

    return res.ok();
  },

  googleAuth: function(req, res) {
    passport.authenticate('google', { scope: ['email', 'profile'] })(req, res);
  },

  googleCallback: function(req, res, next) {
    passport.authenticate('google', function(err, user) {
      if(err) {
        // redirect to login page
        console.log('google callback error: '+err);
      } else {
        console.log('google credentials');
        console.log(user);
        res.json(user);
      }
    })(req, res, next);
  },
  facebookAuth: function(req, res, next) {
    passport.authenticate('facebook', { scope: ['email']})(req, res, next);
  },

  facebookCallback: function(req, res, next) {
    passport.authenticate('facebook', function(err, user) {

      console.log('facebook credentials');
      console.log(user);
      res.json(user);
    })(req, res, next);
  },
};
