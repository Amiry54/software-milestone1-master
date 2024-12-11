const db = require('../../connectors/db');

function handlePrivate(app) {


    
  app.get('/users/view' , async function(req , res) {
    // the idea of try and catch is to display error messages
    // and continue running your code without restarting your system
    try{
      const result = await db.raw(`select * from "public"."users"`);
      console.log(`result here`,result.rows);
      return res.status(200).send(result.rows);
    }catch(err){
      console.log("error message",err.message);
      return res.status(400).send(err.message);
    }
  });
  
  // you need to test it using thunderclient or postman
  app.post("/users/new", async (req, res) => {
    try {
      console.log("req", req.body);
      const { user_id, UserName, email, password,Role,  created_at } = req.body;
  
      // Use parameterized query to prevent SQL injection and handle special characters
      const result = await db.raw(
        `INSERT INTO "public"."users" (user_id, username, email, password,role,  created_at)
         VALUES (?, ?, ?, ?, ?, ?);`,
        [user_id, UserName, email, password,Role, created_at]
      );
  
      return res.status(200).send('New user has successfully added');
    } catch (err) {
      console.log("Error message:", err.message);
      return res.status(400).send("Failed to add new user");
    }
  });
  
  
//   there is huge difference between /employee/:id and /employee/id
//   try with and without colon : 
//   /employee/:sid then it is req.params.sid
//   app.get('/users/:id', async (req, res)=> {
//     try {
//       // `` backtick syntax check tutorial 1 slides 
//       const query = `select * from "public"."users" where id = ${req.params.id}`;
//       console.log("req.params id",req.params.id);
//       const result = await db.raw(query);
//       return res.status(200).send(result.rows);
//     } catch (err) {
//       console.log("eror message", err.message);
//       return res.status(400).send("failed to get this employee id");
//     }
//   })
  
  
//   app.delete('/users/:id', async (req, res)=> {
    
//     try {
//       const query = `delete from "public"."users" where id=${req.params.id}`;
//       const result = await db.raw(query);
//       return res.status(200).send("deleted succesfully");
//     } catch (err) {
//       console.log("eror message", err.message);
//       return res.status(400).send("failed to delete user");
//     }
  
//   })
  
//   app.put('/users/:id', async (req, res)=> {
    
//     try {
//       //console.log(req.body);
//       const {UserName , Role} = req.body;
//       console.log(req.body,salary);
//       const query = `update "public"."users"
//                          set username = '${UserName}',
//                          role = '${Role}',
//                          where id = ${req.params.id}`
//       const result = await db.raw(query);
//       return res.status(200).send("updated succesfully");
//     } catch (err) {
//       console.log("eror message", err.message);
//       return res.status(400).send("failed to update user");
//     }
  
//   });
//   };

}
// makes function public and accessible by other classes 
module.exports = {handlePrivate};
