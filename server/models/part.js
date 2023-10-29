const mongoose = require('mongoose');
const { Schema } = mongoose;
const { ObjectId } = require('mongodb');
const partSchema = new Schema({
   title: String,
   description: String,
   lessons: [ObjectId]
},
   {
      methods: {
         /**
          * Return all lesson IDs in this part
          * @returns Array[]
          */
         getLessonIds() {
            const result = []
            for (let i = 0; i < this.lessons.length; i++) {
               const id = this.lessons[i].toString()
               result.push(id);
            }
            return result;
         }
      }
   }
);
const Part = mongoose.model('part', partSchema);
module.exports = Part;