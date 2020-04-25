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
  "POST /api/v1/user/new": "UserController.store",
  "GET /api/v1/user/:id": "UserController.find", // ?interests=<bool>&identities=<bool>
  "PUT /api/v1/user/:id": "UserController.update",
  "DELETE /api/v1/user/:id": "UserController.destroy",
  "GET /api/v1/auth/google": "UserController.googleAuth",
  "GET /api/v1/auth/google/callback": "UserController.googleCallback",
  "GET /api/v1/auth/facebook": "UserController.facebookAuth",
  "GET /api/v1/auth/facebook/callback": "UserController.facebookCallback",

  "POST /api/v1/identity/new": "IdentityController.store", // new id
  "GET /api/v1/identity": "IdentityController.index", // get identities // ?root=<bool>&query=<str>&n=<num>&skip=<num>
  "GET /api/v1/identity/:id": "IdentityController.find", // get identity's subcategories // ?query=<str>&n=<num>&skip=<num>

  "POST /api/v1/user/:uid/identity": "IdentityController.tagUserIdentity",
  "DELETE /api/v1/user/:uid/identity": "IdentityController.removeUserIdentity",
  "POST /api/v1/user/:uid/interest": "IdentityController.tagUserInterest",
  "DELETE /api/v1/user/:uid/interest": "IdentityController.removeUserInterest",

  "POST /api/v1/message": "MessageController.store",

  "GET /api/v1/room/:rid": "RoomController.find", // Use this to get the messages in a room.
  "GET /api/v1/user/:uid/room": "RoomController.index",

  "GET /api/v1/user/:uid/match": "util/match",
  "GET /api/v1/room/:rid/icebreaker": "util/icebreaker",

  "POST /api/v1/hangout": "HangoutController.store",
  "POST /api/v1/hangout/now": "HangoutController.now",
  "PUT /api/v1/hangout/:id/accept": "HangoutController.accept",
  "DELETE /api/v1/hangout/:id": "HangoutController.destroy",

  /* This route below expects a token in the post body (json), or queryparams
    For example,
    ```{
      "access_token": "ya29.a0Ae4lvC3ldd3vBuzhQUbz10Ni4BITGfrrC8V--xyV-b6UT_s0AXI34ItaiAkrolKL22xk-GHjqP51Qn9fhZ24p0AbWV7kkoyO4i8rgExG1LpEJUavCeZONllOfhCw-9zFlA6Gf3JtF4jI77GGDASdPbGzfd3Q_ytsDuI",
      "scope": "https://www.googleapis.com/auth/calendar.events",
      "token_type": "Bearer",
      "expiry_date": 1587769922990
    }```
  */
  "POST /api/v1/hangout/:id/link": "HangoutController.makeHangoutLink",

  // Wildcard Route match that sends all requests to a single page vue app
  // Just put their JS bundle into assets/js and reference it in homepage.ejs
  "GET /*": {
    view: "pages/homepage",
    skipAssets: true,
  },
};
