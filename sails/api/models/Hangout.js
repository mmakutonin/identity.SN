/**
 * Hangout.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    //  ╔═╗╦═╗╦╔╦╗╦╔╦╗╦╦  ╦╔═╗╔═╗
    //  ╠═╝╠╦╝║║║║║ ║ ║╚╗╔╝║╣ ╚═╗
    //  ╩  ╩╚═╩╩ ╩╩ ╩ ╩ ╚╝ ╚═╝╚═╝
    id: {
      type: "number",
      autoIncrement: true,
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
    dateTime: {
      type: "string",
      isAfter: new Date(),
      description: "ISO Date String. Create with (new Date()).toISOString()"
    },
    hangoutUrl: {
      type: "string",
      isURL: true,
      allowNull: true,
    },
    approved: {
      type: "boolean",
      defaultsTo: false,
    },

    //  ╔═╗╔╦╗╔╗ ╔═╗╔╦╗╔═╗
    //  ║╣ ║║║╠╩╗║╣  ║║╚═╗
    //  ╚═╝╩ ╩╚═╝╚═╝═╩╝╚═╝

    //  ╔═╗╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ╠═╣╚═╗╚═╗║ ║║  ║╠═╣ ║ ║║ ║║║║╚═╗
    //  ╩ ╩╚═╝╚═╝╚═╝╚═╝╩╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝
    room: {
      model: "room",
    },
    from: {
      model: "user",
    },
    to: {
      model: "user",
    },
  },
};
