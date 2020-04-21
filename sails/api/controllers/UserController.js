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
    const { interests, identities } = req.query;
    let query = User.findOne({ id });

    if(interests === "true") {
      query = query.populate('interests');
    }

    if(identities === "true") {
      query = query.populate('identities');
    }

    const user = await query;
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

        if(typeof body.lName !== "undefined") {
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
                res.redirect('back')
            } else {
                var newUser = true;
                User.findOrCreate({ id: user.email }, { id: user.email, fullName: user.firstname + " " + user.last_name, displayName: user.firstname + " " + user.last_name})
                .exec(async(err, user, wasCreated)=> {
                    if (err) { return res.serverError(err); }

                    if(!wasCreated) {
                        newUser = false;
                    }
                });
                res.redirect(`http://localhost:8080/auth?newuser=${newUser}&id=${user.email}`) //hard-coded for now, will change when deploying.
            }
        })(req, res, next);
    },
    facebookAuth: function(req, res, next) {
        passport.authenticate('facebook', { scope: ['email']})(req, res, next);
    },

    facebookCallback: function(req, res, next) {
        passport.authenticate('facebook', function(err, user) {
            if(err) {
                res.redirect('back')
            } else {
                var newUser = true;
                User.findOrCreate({ id: user.email }, { id: user.email, fullName: user.firstname + " " + user.last_name, displayName: user.firstname + " " + user.last_name})
                .exec(async(err, user, wasCreated)=> {
                    if (err) { return res.serverError(err); }

                    if(!wasCreated) {
                        newUser = false;
                    }
                });
                res.redirect(`http://localhost:8080/auth?newuser=${newUser}&id=${user.email}`) //hard-coded for now, will change when deploying.
            }
        })(req, res, next);
    },
};
