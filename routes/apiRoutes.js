const notes = require('../data/noteData.js');


module.exports = function(app) {
  
  
  // API GET Requests
  app.get("/api/notes", function(req, res) {
    res.json(notes);
  });


  // API POST Requests
  app.post("/api/notes", function(req, res) {
    notes.push(req.body);
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
