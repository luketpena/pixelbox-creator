const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

//Getting all frames for a particular user
router.get('/', rejectUnauthenticated, (req, res) => {
  const queryString = `
    SELECT * FROM frame WHERE user_id=$1;
  `;
  pool.query(queryString,[req.user.id]).then(result=>{
    res.send(result.rows);
  }).catch(error=>{
    console.log('Router error getting frames:',error);
  })
});

//Adding a single frame for a user to the database
router.post('/', (req, res) => {
  const {user_id,frame_name,bkg_url,size,extend,display,smoothing,framerate,pixelsnap,layerData} = req.body;
  const queryData = [user_id,frame_name,bkg_url,size,extend,display,smoothing,framerate,pixelsnap,layerData];
  console.log('Query data:',queryData);  
  res.sendStatus(200);
});

module.exports = router;