/**
 * User.js
 *
 * Make new user:
 * User.create({ fName: "Bob", lName:"Henry", displayName: "boot", id:"asdf@fe.com" })
 *  .fetch().exec(console.log)
 *
 * Get the messages this user sent
 * User.findOne("asdf@fe.com").populate('sent')
 *
 * Create a message that this user sent
 * const user1 = await User.find('asdf@fe.com')
 * const user2 = await User.find('some@other.email')
 * Message.create({
 *  message: "foobar",
 *  from: user1.id,
 *  to: user2.id,
 * })
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  tableName: "user_info",

  attributes: {
    id: {
      type: "string",
      columnName: "email",
      unique: true,
      required: true,
      isEmail: true,
    },
    displayName: {
      type: "string",
      unique: true,
      required: true,
      columnName: "display_name",
    },
    fullName: {
      type: "string",
      required: true,
      columnName: "full_name",
    },
    createdAt: {
      type: "number",
      autoCreatedAt: true,
      columnName: "created_at",
    },
    updatedAt: {
      type: "number",
      autoUpdatedAt: true,
      columnName: "updated_at",
    },
    sent: {
      collection: "message",
      via: "from",
    },
    received: {
      collection: "message",
      via: "to",
    },
    
    identities: {
      collection: 'identity',
      via: 'users',
    },
    interests: {
      collection: 'identity',
      via: 'likedBy',
    }
  },
  async getCurrent() {
    // TODO: replace this with the
    // TODO: user that's currently logged in
    return (await User.find())[0];
  }
};
