const mongoose = require('mongoose');
const Lesson = require('./models/lesson');
const SentenceQuestion = require('./models/sentenceQuestion');
const FillQuestion = require('./models/fillQuestion');
const Part = require('./models/part');
mongoose.connect('mongodb://127.0.0.1:27017/duolingo', {
   useNewUrlParser: true,
   useUnifiedTopology: true,
}).then(() => {
   console.log("connected");
   const sentenceQuestion1 = new SentenceQuestion({
      words: [
         "con",
         "Bạn",
         "lớn",
         "không",
         "Vâng",
         "tốt",
         "một",
         "có",
         'chó'
      ],
      left_sentence: "You have a dog",
      correct: "Bạn có một con chó"
   });
   const sentenceQuestion2 = new SentenceQuestion({
      words: [
         "mèo",
         "một",
         "nhỏ",
         "Tôi",
         "viên",
         "giáo",
         "tốt",
         "giỏi",
         'là'
      ],
      left_sentence: "I am a teacher",
      correct: "Tôi là một giáo viên"
   });
   const sentenceQuestion3 = new SentenceQuestion({
      words: [
         "Bạn",
         "có",
         "một",
         "không",
         "sinh",
         "người",
         "viên",
         "bạn",
         'chó'
      ],
      left_sentence: "You have a friend",
      correct: "Bạn có một người bạn"
   });
   const sentenceQuestion4 = new SentenceQuestion({
      words: [
         "Tôi",
         "và",
         "đến",
         "tiếng Pháp",
         "ở",
         "biết",
         "sống",
         "Đôn",
         'Luân'
      ],
      left_sentence: "I live in London",
      correct: "Tôi sống ở Luân Đôn"
   });
   const sentenceQuestion5 = new SentenceQuestion({
      words: [
         "small",
         "a",
         "student",
         "car",
         "house",
         "dogs",
         "cars"
      ],
      left_sentence: "một ngôi nhà nhỏ",
      correct: "a small house"
   });
   const sentenceQuestion6 = new SentenceQuestion({
      words: [
         "small",
         "cars",
         "I",
         "car",
         "a",
         "in",
         "student",
         "live",
         "house",
         "friend"
      ],
      left_sentence: "Tôi sống ở một ngôi nhà nhỏ",
      correct: "I live in a small house"
   });
   const fillQuestion = new FillQuestion({
      left_sentence: "You",
      right_sentence: "a good friend",
      answers: [
         "is",
         "are",
         "am"
      ],
      correct: "are"
   });
   const part2 = new Part({
      title: "Cửa 2",
      description: "Giới thiệu bản thân, miêu tả gia đình",
      lessons: [
         new Lesson({
            title: "Giới thiệu bản thân",
            match: {},
            sentence: [sentenceQuestion1,
               sentenceQuestion2,
               sentenceQuestion3,
               sentenceQuestion4,
               sentenceQuestion5,
               sentenceQuestion6
            ],
            fill: [fillQuestion]
         })
      ]
   });
   part2.save().then(()=>{
      console.log("Part 2 created");
   })
});