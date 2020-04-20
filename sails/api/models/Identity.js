/**
 * Identity.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 * 
 * Add new Identity Subcategory
 * Identity.addToCollection('<subIdentity>', 'subcategories', '<parentIdentity>')
 * 
 * Get Identity's Subcategories
 * Identity.find().populate('subcategories')
 * 
 * Add Identity to User
 * User.addToCollection('<UserID>', 'identities', '<IdentityID>')
 * 
 * Get User's Identities
 * User.find().populate('identities')
 * 
 * Add Interest to User
 * User.addToCollection('<UserID>', 'interests', '<IdentityID>')
 * 
 * Get User's Interests
 * User.find().populate('interests')
 * 
 */

module.exports = {

  attributes: {

    id: {
      type: 'string',
      unique: true,
      required: true,
      columnName: 'identity_name',
    }, 

    users: {
      collection: 'user',
      via: 'identities',
    },

    likedBy: {
      collection: 'user',
      via: 'interests',
    },

    subcategories: {
      collection: 'identity'
    }

  },

};

