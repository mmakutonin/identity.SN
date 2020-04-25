/**
* MessageController
*
* @description :: Server-side actions for handling incoming requests.
* @help        :: See https://sailsjs.com/docs/concepts/actions
*/

const ToneAnalyzerV3 = require('ibm-watson/tone-analyzer/v3');
const { IamAuthenticator } = require('ibm-watson/auth');
const keys = require('../../config/local.js');

module.exports = {
    store: async function (req, res) {
        const { message: text, toId, fromId } = req.body;
        const secondUser = await User.findOne(toId);
        var room = await Room.find().populate('users');
        var room_id = -1;
        var checkOne = false, checkTwo = false;
        for(let userList of room){
            if(userList.users.length > 0){
                for(let user of userList.users){
                    if(user.id = fromId){
                        checkOne = true;
                    }
                }
                if(checkOne){
                    for(let user of userList.users){
                        if(user.id = secondUser.id){
                            checkTwo = true;
                            room_id = userList.id;
                        }
                    }
                }
            }
        }

        const toneAnalyzer = new ToneAnalyzerV3({
            version: '2017-09-21',
            authenticator: new IamAuthenticator({
                apikey: keys.toneAnalyzer.apiKey,
            }),
            url: keys.toneAnalyzer.url,
        });

        const toneParams = {
            toneInput: { 'text': text },
            contentType: 'application/json',
        };

        console.log(text);
        var tone;
        await toneAnalyzer.tone(toneParams)
        .then(toneAnalysis => {
            if(toneAnalysis.result.document_tone.tones.length == 0){
                tone = "Neutral";
            }
            else
                tone = toneAnalysis.result.document_tone.tones[0].tone_name;
        })
        .catch(err => {
            console.log('error:', err);
        });



        const message = await Message.create({
            from: fromId,
            to: toId,
            message: text,
            room: room_id,
            tone: tone
        }).fetch();

        return res.json(tone);
    },
};
