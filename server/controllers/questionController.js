const SentenceQuestion = require('../models/sentenceQuestion');
const FillQuestion = require('../models/fillQuestion');
const ChoiceQuestion = require('../models/choiceQuestion');
const BaseResponse = require('../utils/baseResponse');

class QuestionController{
    async createChoiceQuestion(req, res){
        try{
            const { question, answers, correct } = req.body;
            if(!question || !answers || !correct){
                return res.status(400).send(BaseResponse.ofError("Missed some required fields", 400));
            }
            const choiceQuestion = new ChoiceQuestion({
                question, answers, correct
            });

            await choiceQuestion.save();
            return res.status(200).send(BaseResponse.ofSucceed(choiceQuestion));
        }
        catch(err){
            return res.status(400).send(BaseResponse.ofError(err, 400))
        }
    }

    async createSentenceQuestion(req, res){
        try{
            const { sentence, words, correct } = req.body;
            if(!sentence || !words || !correct){
                return res.status(400).send(BaseResponse.ofError("Missed some required fields", 400));
            }
            const sentenceQuestion = new SentenceQuestion({
                sentence, words, correct
            });

            await sentenceQuestion.save();
            return res.status(200).send(BaseResponse.ofSucceed(sentenceQuestion));
        }
        catch(err){
            return res.status(400).send(BaseResponse.ofError(err, 400))
        }
    }

    async createFillQuestion(req, res){
        try{
            const { left_sentence, right_sentence, answers, correct } = req.body;
            if(!left_sentence || !right_sentence || !answers || !correct){
                return res.status(400).send(BaseResponse.ofError("Missed some required fields", 400));
            }
            const fillQuestion = new FillQuestion({
                left_sentence, right_sentence, answers, correct
            });

            await fillQuestion.save();
            return res.status(200).send(BaseResponse.ofSucceed(fillQuestion));
        }
        catch(err){
            return res.status(400).send(BaseResponse.ofError(err, 400))
        }
    }
}

module.exports = new QuestionController();