const { v4: uuidv4 } = require("uuid");
const fs = require("fs");

const readFile = (res) => {
  fs.readFile("db/db.json", "utf8", function(err, data){
    if(err)throw err;
    return res.json(JSON.parse(data));
  })
}

module.exports = function(app) {
  
  // API GET Requests
  app.get("/api/notes", function(req, res) {

    readFile(res);
  });


  // API POST Requests
  app.post("/api/notes", function(req, res) {
      const newNote = {
        title: req.body.title,
        text: req.body.text,
        id: uuidv4()
      }
      
      fs.readFile("db/db.json", "utf8", function(err, data){
        if(err)throw err;

        const dataArr = JSON.parse(data);
        dataArr.push(newNote);

        fs.writeFile("db/db.json", JSON.stringify(dataArr), function(err){
          if(err)throw err;

          console.log("New note was added")
        })
      });
      res.json(newNote);
    });
    
  //delete a note with matching id
  app.delete("/api/notes/:id", function(req, res) {

    fs.readFile("db/db.json", "utf8", function(err, data){
      if(err)throw err;

      const dataArr = JSON.parse(data);
      const newDataArr = dataArr.filter(note => {
        return note.id != req.params.id;
      })
      console.log(newDataArr);

      fs.writeFile("db/db.json", JSON.stringify(newDataArr), function(err){
        if(err)throw err;
        
        console.log("Your note was deleted")
      })
    });
    res.end();
  });
};
