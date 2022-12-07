const db = require('./db')
const Query = {
   greeting:() => {
      return "hello from  TutorialsPoint !!!"
   },
   students:() => db.students.list(),
   studentById:(root, args, context, info) => {
      return db.students.get(args.id);
   },
   colleges:() => db.colleges.list()
}

module.exports = {Query}