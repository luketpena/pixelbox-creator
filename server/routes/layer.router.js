const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

router.get('/', rejectUnauthenticated, (req, res) => {
  const queryString = `
    SELECT * FROM layer WHERE frame_id=$1;
  `;
  pool.query(queryString,[3]).then(result=>{
    res.send(result.rows);
  }).catch(error=>{
    console.log('Router error getting layers:',error);
  })
});

router.post('/', (req, res) => {
  
});

module.exports = router;