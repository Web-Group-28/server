const mongoose = require('mongoose');
const Course = require('./models/course');
const SentenceQuestion = require('./models/sentenceQuestion');
const Lesson = require('./models/lesson');
const FillQuestion = require('./models/fillQuestion');
const Part = require('./models/part');
const part = require('./models/part');
const choiceQuestion = require('./models/choiceQuestion');
mongoose.connect('mongodb://127.0.0.1:27017/duolingo', {
   useNewUrlParser: true,
   useUnifiedTopology: true,
}).then(() => {
   // TODO: Lesson 1 - Part 2
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
   fillQuestion.save().then(console.log(fillQuestion._id.toString()));
   const sQ1 = new SentenceQuestion({
      words: [
         "con",
         "Bạn",
         "lớn",
         "không",
         "Vâng",
         "tốt",
         "một",
         "có",
         "chó"
      ],
      left_sentence: "You have a dog",
      correct: "Bạn có một con chó"
   });
   sQ1.save().then(() => console.log(sQ1._id.toString()));
   const sQ2 = new SentenceQuestion({
      words: [
         "mèo",
         "một",
         "nhỏ",
         "Tôi",
         "viên",
         "giáo",
         "tốt",
         "giỏi",
         "là"
      ],
      left_sentence: "I am a teacher",
      correct: "Tôi là một giáo viên"
   });
   sQ2.save().then(() => console.log(sQ2._id.toString()));
   const sQ3 = new SentenceQuestion({
      words: [
         "Bạn",
         "có",
         "một",
         "không",
         "sinh",
         "người",
         "viên",
         "bạn",
         "chó"
      ],
      left_sentence: "You have a friend",
      correct: "Bạn có một người bạn"
   });
   sQ3.save().then(() => console.log(sQ3._id.toString()));
   const sQ4 = new SentenceQuestion({
      words: [
         "Tôi",
         "và",
         "đến",
         "tiếng Pháp",
         "ở",
         "biết",
         "sống",
         "Đôn",
         "Luân"
      ],
      left_sentence: "I live in London",
      correct: "Tôi sống ở Luân Đôn"
   });
   sQ4.save().then(() => console.log(sQ4._id.toString()));
   const sQ5 = new SentenceQuestion({
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
   sQ5.save().then(() => console.log(sQ5._id.toString()));
   const sQ6 = new SentenceQuestion({
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
   sQ6.save().then(() => console.log(sQ6._id.toString()));
   const lesson1 = new Lesson({
      title: "Giới thiệu bản thân",
      choice: [],
      match: {
      },
      sentence: [
         sQ1._id,
         sQ2._id,
         sQ3._id,
         sQ4._id,
         sQ5._id,
         sQ6._id
      ],
      fill: [
         fillQuestion._id
      ]
   })
   lesson1.save().then(console.log(`LESSON:${lesson1._id.toString()}`))
   const part2 = new Part({
      title: "Cửa 2",
      description: "Giới thiệu bản thân, miêu tả gia đình",
      lessons: [lesson1._id]
   })
   part2.save().then(console.log("ADD PART 2"))
   process.exit(0);
});