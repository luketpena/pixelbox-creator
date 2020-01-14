const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

router.get('/', rejectUnauthenticated, (req, res) => {
  const queryString = `
    SELECT * FROM layer WHERE frame_id=$1;
  `;
  pool.query(queryString,[3]).then(result=>{
    //>> The working copy of the query results
    let copy = result.rows;
    //>> Replace the filter arrays as objects with properties
    for (let i=0; i<copy.length; i++) {
      copy[i].filter = copy[i].filter.map( item=>{
        return {
          name: item[0],
          value: Number(item[1]),
          unit: item[2]
        }
      })
    }
    //>> Send the modified copy
    res.send(copy);
  }).catch(error=>{
    console.log('Router error getting layers:',error);
  })
});

router.post('/', (req, res) => {
  
});

module.exports = router;