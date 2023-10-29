const mongoose = require('mongoose');
const Course = require('./models/course');
const SentenceQuestion = require('./models/sentenceQuestion');
const Lesson = require('./models/lesson');
const FillQuestion = require('./models/fillQuestion');
const Part = require('./models/part');
const part = require('./models/part');
const ChoiceQuestion = require('./models/choiceQuestion');
mongoose.connect('mongodb://127.0.0.1:27017/duolingo', {
   useNewUrlParser: true,
   useUnifiedTopology: true,
}).then(async () => {
   // TODO: Lesson 1 - Part 4

   const cQ1 = new ChoiceQuestion({
      question: "wʌn",
      answers: ["on", "once", "or", 'one'],
      correct: "one"
   });
   cQ1.save().catch(err => console.log(err));

   const sQ1 = new SentenceQuestion({
      sentence: "năm bánh pizza và ba bia",
      words: ['dollar', 'or', 'three', 'five', 'pizzas', 'a cup of', 'and', `he's`, 'beers'],
      correct: "five pizzas and three beers"
   })
   sQ1.save().catch(err => console.log(err))
   const sQ2 = new SentenceQuestion({
      sentence: "I would like a pizza and a beer",
      words: ['hai', 'năm', 'bánh', 'muốn', 'một', 'bia', 'một', `chiếc`, 'thực đơn', 'Tôi', 'và', 'không', 'pizza'],
      correct: "Tôi muốn một chiếc bánh pizza và một bia"
   })
   sQ2.save().catch(err => console.log(err))
   const sQ3 = new SentenceQuestion({
      sentence: "Đây là hóa đơn của bạn",
      words: ['smart', 'is', 'father', 'This', 'check', 'your', 'for two', `mother`],
      correct: "This is your check"
   })
   sQ3.save().catch(err => console.log(err))
   const sQ4 = new SentenceQuestion({
      sentence: "a nice restaurant",
      words: ['hàng', 'nhà', 'Họ', 'đẹp', 'cơm', 'cho', 'một', `nhỏ`],
      correct: "một nhà hàng đẹp"
   })
   sQ4.save().catch(err => console.log(err))
   const sQ5 = new SentenceQuestion({
      sentence: "I need a menu, please",
      words: ['quyển', 'thực', 'cần', 'một', 'ơn', 'tiền', 'Tôi', `làm`, `có`, `đơn`, `hai`, `của`],
      correct: "Tôi cần một quyển thực đơn, làm ơn"
   })
   sQ5.save().catch(err => console.log(err))
   const sQ6 = new SentenceQuestion({
      sentence: "Cheers, Duo",
      words: [`bánh`, `Dô`, 'thì', 'cho', 'Duo', 'bia'],
      correct: "Dô Duo"
   })
   sQ6.save().catch(err => console.log(err))
   const sQ7 = new SentenceQuestion({
      sentence: "I would like more coffee",
      words: ['cả', 'muốn', 'nước', 'cốc', 'cái bàn', 'phê', 'Tôi', 'thêm', 'tốt'],
      correct: "Tôi muốn thêm cà phê"
   })
   sQ7.save().catch(err => console.log(err))

   const lesson1 = new Lesson({
      title: "Giao tiếp ở nhà hàng",
      choice: [cQ1._id
      ],
      match: {
      },
      sentence: [
         sQ1._id,
         sQ2._id,
         sQ3._id,
         sQ4._id,
         sQ5._id,
         sQ6._id,
         sQ7._id
      ],
      fill: []
   })
   lesson1.save().then(console.log(`LESSON 1:${lesson1._id}`))

   const part4 = await Part.create({
      title: "Cửa 4",
      description: "Giao tiếp ở nhà hàng, nói chuyện trường lớp",
      lessons: [lesson1._id]
   });
   console.log(part4._id);
   const englishCourse = await Course.findOne({ courseID: "en-vi" }).exec();
   englishCourse.parts.push(part4._id);
   englishCourse.save().then(() => {
      console.log(`ADD TO THE COURSE: ${part4._id}`)
      process.exit(0)
   }).catch(err => console.log(err));
});