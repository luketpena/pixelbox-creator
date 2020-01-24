const express = require('express');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');
const userStrategy = require('../strategies/user.strategy');

const router = express.Router();

// Handles Ajax request for user information if user is authenticated
router.get('/', rejectUnauthenticated, (req, res) => {
  // Send back user object from the session (previously queried from the database)
  res.send(req.user);
});

router.get('/info', rejectUnauthenticated, (req,res)=> {
  pool.query('SELECT * FROM user_info WHERE user_id = $1', [req.user.id]).then(result=>{
    res.send(result.rows);
  }).catch(error=>{
    console.log('Could not get user data',error);
    res.sendStatus(400);
  })
});

// Handles POST request with new user data
// The only thing different from this and every other post we've seen
// is that the password gets encrypted before being inserted
router.post('/register', async (req, res) => {  
  const username = req.body.username;
  const password = encryptLib.encryptPassword(req.body.password);
  const avatar = req.body.avatar

  const client = await pool.connect();
  try {
    await client.query(`BEGIN`);
    const queryText = 'INSERT INTO "user" (username, password) VALUES ($1, $2) RETURNING id';
    const result = await pool.query(queryText, [username, password]);
    await pool.query('INSERT INTO user_info (user_id, avatar) VALUES ($1, $2)', [result.rows[0].id, avatar]);

    await client.query('COMMIT');
    res.sendStatus(201);
    
  } catch (error) {
    client.query('ROLLBACK');
    res.sendStatus(400);
  } finally {
    client.release();
  }
});

router.put('/avatar', rejectUnauthenticated, (req,res)=>{
  console.log('User:',req.user.id,'Avatar:',req.body.avatar);
  
  pool.query(`UPDATE user_info SET avatar=$1 WHERE user_id=$2`,[req.body.avatar,req.user.id]).then(result=>{
    console.log(result);
    
    res.sendStatus(200);
  }).catch(error=>{
    console.log('Error changing user avatar:',error);
    res.sendStatus(400);
  })
});

// Handles login form authenticate/login POST
// userStrategy.authenticate('local') is middleware that we run on this route
// this middleware will run our POST if successful
// this middleware will send a 404 if not successful
router.post('/login', userStrategy.authenticate('local'), (req, res) => {
  res.sendStatus(200);
});

// clear all server session information about this user
router.post('/logout', (req, res) => {
  // Use passport's built-in method to log out the user
  req.logout();
  res.sendStatus(200);
});

module.exports = router;
