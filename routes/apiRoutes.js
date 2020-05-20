const { v4: uuidv4 } = require("uuid");
const fs = require("fs");

const notes = [];

module.exports = function(app) {
  
  
  // API GET Requests
  app.get("/api/notes", function(req, res) {
    fs.readFile("db/db.json", "utf8", function(err, data){
      if (err){
        throw err;
      }
      res.json(JSON.parse(data));
    })
  });


  // API POST Requests
  app.post("/api/notes", function(req, res) {
      const newNote = {
        title: req.body.title,
        text: req.body.text,
        id: uuidv4()
      }
      
      fs.readFile("db/db.json", "utf8", function(err, data){
        if(err){
          throw err;
        }
        const dataArr = JSON.parse(data);
        dataArr.push(newNote);

        fs.writeFile("db/db.json", JSON.stringify(dataArr), function(err){
          if(err){
            throw err;
          }
          console.log("New note was added")
        })
      });
      res.json(newNote);
    });
    
  //delete a note with matching id
  app.delete("/api/notes/:id", function(req, res) {
    console.log(req.params.id);
    fs.readFile("db/db.json", "utf8", function(err, data){
      if(err){
        throw err;
      }
      const dataArr = JSON.parse(data);
      console.log(data);
      let newDataArr = dataArr.filter(note => {
        console.log(note.id);
        console.log(req.params.id);
        console.log(note.id != req.params.id);
      note.id != req.params.id;
  
    })
    
     //  for (var i = 0; i < dataArr.length; i++){
    //    console.log(i);
    //     if(dataArr[i].id === req.params.id){
    //       console.log("test");
    //       dataArr.splice(i,1);

    //     }
    //  } 
     
     
     console.log(newDataArr);

      fs.writeFile("db/db.json", JSON.stringify(newDataArr), function(err){
        if(err){
          throw err;
        }
        console.log("Your note was deleted")
      })
    });
    res.end();
  });


};
