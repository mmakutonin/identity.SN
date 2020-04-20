/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {

  // Add REST calls above here to override wildcard route
  'POST /api/v1/user/new': 'UserController.store',
  'GET /api/v1/user/:id': 'UserController.find', // ?interests&identities
  'PUT /api/v1/user/:id': 'UserController.update',
  'DELETE /api/v1/user/:id': 'UserController.destroy',

  'POST /api/v1/identity/new': 'IdentityController.store', // new id
  'GET /api/v1/identities': 'IdentityController.index', // get root identities
  'GET /api/v1/identities/:id': 'IdentityController.find', // get identity and subcategories

  'POST /api/v1/user/identity': 'IdentityController.tagUserIdentity',
  'DELETE /api/v1/user/identity': 'IdentityController.removeUserIdentity',
 
  'POST /api/v1/user/interest': 'IdentityController.tagUserInterest',
  'DELETE /api/v1/user/interest': 'IdentityController.removeUserInterest',

  'POST /api/v1/message': 'MessageController.store',
  'GET /api/v1/message': 'MessageController.index',

  'GET /api/v1/match': 'util/match',
  'GET /api/v1/hangout': 'util/hangout',

  // Wildcard Route match that sends all requests to a single page vue app
  // Just put their JS bundle into assets/js and reference it in homepage.ejs
  'GET /*': { 
    view: 'pages/homepage',
    skipAssets: true,
  },

};
