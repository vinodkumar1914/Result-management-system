const express = require("express");
const bodyparser = require("body-parser");
const cors = require("cors");

const mysql = require("mysql2");

const db =mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'school',
    port:3306
});

db.connect(err =>{
    if(err){console.log('err')}
    console.log("connect ayindi mawa")
});

const app= express();
app.use(cors())

app.use(bodyparser.json())
app.listen(3000,()=>{
    console.log("hello mawa bro");
});
app.get('/student',(req,res)=>{
    console.log('get all users')
    let querry=`SELECT * FROM student`;
    db.query(querry,(err,result)=>{
        if(err){
            console.log(err)
        }
        if(result.length>0){
            res.send({
                data:result
            })
        }
    })
})

app.get('/student/:id', (req, res) => {
    let qId = req.params.id;
    let query = `SELECT * FROM student WHERE student_id = ${qId}`;
    db.query(query, (err, result) => {
      if (err) {
        console.log(err);
        res.sendStatus(500); 
      } else if (result.length > 0) {
        res.send({
          data: result
        });
      } else {
        res.sendStatus(404);
      }
    });
  }); 

app.get('/result/:id', (req, res) => {
    let qId = req.params.id;
    let query = `SELECT student.student_id, student.student_name, student.date_of_birth,
            results.subject1, results.subject2, results.subject3, results.subject4, results.subject5
            FROM student
            JOIN results ON student.student_id = results.student_id
            WHERE student.student_id = ${qId}`;
    db.query(query, (err, result) => {
      if (err) {
        console.log(err);
        res.sendStatus(500); 
      } else if (result.length > 0) {
        res.send({
          data: result
        });
      } else {
        res.sendStatus(404);
      }
    });
  }); 

  app.get('/results', (req, res) => {

    let query = `SELECT * FROM results`;
  
    db.query(query, (err, result) => {
      if (err) {
        console.log(err);
        res.sendStatus(500); // Sending HTTP status 500 for server error
      } else if (result.length > 0) {
         res.send({
            data: result
          });
      } else {
        res.sendStatus(404); // Sending HTTP status 404 for not found
      }
    });
  });
  
app.post('/result', (req, res) => {
    let resultData = req.body; // Assuming the request body contains the result data
  
    let query = `INSERT INTO results (result_id,student_id, subject1, subject2, subject3, subject4, subject5)
                 VALUES (${resultData.result_id},${resultData.student_id}, ${resultData.subject1}, ${resultData.subject2}, ${resultData.subject3}, ${resultData.subject4}, ${resultData.subject5})`;
  
    db.query(query, (err, result) => {
      if (err) {
        console.log(err);
        res.sendStatus(500); // Sending HTTP status 500 for server error
      } else {
        let selectQuery = `SELECT * FROM results`;
        db.query(selectQuery, (selectErr, selectResult) => {
          if (selectErr) {
            console.log(selectErr);
            res.sendStatus(500); // Sending HTTP status 500 for server error
          } else {
            res.send({
              data: selectResult
            }); 
          }
        });
      }
    });

  });
  
  // Delete a result for a student
  app.delete('/result/:id', (req, res) => {
    let qId = req.params.id;
  
    let query = `DELETE FROM results WHERE student_id = ${qId}`;
  
    db.query(query, (err, result) => {
      if (err) {
        console.log(err);
        res.sendStatus(500); // Sending HTTP status 500 for server error
      } else {
        // Retrieve all results from the database
        let selectQuery = `SELECT * FROM results`;
        db.query(selectQuery, (selectErr, selectResult) => {
          if (selectErr) {
            console.log(selectErr);
            res.sendStatus(500); // Sending HTTP status 500 for server error
          } else {
            res.send({
              data: selectResult
            }); 
          }
        });
      }
    });
  });

// Update a result for a student
app.put('/result/:id', (req, res) => {
  let qId = req.params.id;
  let resultData = req.body;

  let query = `UPDATE results
               SET subject1 = ${resultData.subject1},
                   subject2 = ${resultData.subject2},
                   subject3 = ${resultData.subject3},
                   subject4 = ${resultData.subject4},
                   subject5 = ${resultData.subject5}
               WHERE student_id = ${qId}`;

  db.query(query, (err, result) => {
    if (err) {
      console.log(err);
      res.sendStatus(500); // Sending HTTP status 500 for server error
    } else {
      // Retrieve all results from the database
      let selectQuery = `SELECT * FROM results`;
      db.query(selectQuery, (selectErr, selectResult) => {
        if (selectErr) {
          console.log(selectErr);
          res.sendStatus(500); // Sending HTTP status 500 for server error
        } else {
          res.send({
            data: selectResult
          }); 
        }
      });
    }
  });
});

