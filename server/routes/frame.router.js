const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

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

router.post('/', (req, res) => {

});

module.exports = router;