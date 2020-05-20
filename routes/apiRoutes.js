const fs = require("fs");


const notes = [];

module.exports = function(app) {
  
  
  // API GET Requests
  app.get("/api/notes", function(req, res) {
    fs.readFile("../db/db.json", function(err, data){
      if (err){
        throw err;
      }

    })
    res.json(notes);
  });


  // API POST Requests
  app.post("/api/notes", function(req, res) {
      //write a function to create a random id and then assign it to the unique id property
      const newNote = {
        title: req.body.title,
        text: req.body.text,
        id: Math.random()
      }
      notes.push(newNote);
      fs.writeFile("../db/db.json", JSON.stringify(notes), "utf8");
      res.json(true);
    });
    
//   //delete a note with matching id
//   app.delete("/api/notes/:id", function(req, res) {
//     // Empty out the arrays of data
//     notes.length = 0;
//     res.json({ ok: true });
//   });
// 

};
