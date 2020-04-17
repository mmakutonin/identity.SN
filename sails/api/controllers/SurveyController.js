/**
 * SurveyController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  // Expects a dict of "qid": "answer" in request body
  store: async function (req, res) {
    // TODO: replace this with the
    // TODO: user that's currently logged in
    const user = (await User.find())[0];

    const newRecords = Object.entries(req.body).map(([qid, answer]) => ({
      question: qid,
      questionAnswer: answer,
      user: user.id,
    }));

    const surveys = await Survey.createEach(newRecords).fetch();
    return res.json(surveys);
  },
  index: async function (req, res) {
    // TODO: replace this with the
    // TODO: user that's currently logged in
    const user = (await User.find())[0];

    const surveys = await Survey.find({
      user: user.id,
    });

    return res.json(surveys);
  },

  // Expects a "qid" and "answer" in json req body
  update: async function (req, res) {
    // TODO: replace this with the
    // TODO: user that's currently logged in
    const user = (await User.find())[0];

    const { qid, answer } = req.body;
    
    const survey = await Survey.update({ question: qid, user: user.id })
      .set({ questionAnswer: answer }).fetch()

    return res.json(survey);
  },
};
