/**
 * Survey.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    id: {
      type: "number",
      autoIncrement: true, 
      columnName: 'survey_id',
    },
    questionAnswer: {
      type: "string", 
      required: true,
      columnName: "question_answer",
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
    user: {
      model: 'user',
      columnName: 'user_id',
    },
    question: {
      model: 'questions',
      columnName: 'question_id'
    }
  },

};

