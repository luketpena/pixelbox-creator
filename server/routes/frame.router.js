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
router.post('/', async (req, res) => {
  //>> Destructuring the req.body, stored in array for query data
  const {frame_name,bkg_url,size,extend,display,smoothing,framerate,pixelsnap,layerData} = req.body;
  const frameData = [req.user.id,frame_name,bkg_url,size[0],size[1],extend[0],extend[1],display[0],display[1],smoothing,framerate,pixelsnap];
  console.log('Query data:',frameData);

  //>> Handshake with database
  const client = await pool.connect();
  try {
    const frameQuery = `
      INSERT INTO frame (user_id, frame_name, bkg_url, size_x, size_y, extend_x, extend_y, display_x, display_y, smoothing, framerate, pixelsnap)
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)
      RETURNING id;
    `;
    
    /*
      Currently creating the query to add frames and their layers to the DB.

      The filter arrays on the layers need to be formated before query to fit
      the syntax for a SQL array data type. Aka {{'thing1','thing2'}{'thing3,'thing4'}}

      It will loop through it after a succesful frame query, format the information for
      the filters, then await an individual query for each layer in the loop.
    */

    await client.query(`BEGIN`)

      const result = await client.query(frameQuery,frameData);
      console.log('Frame ID:',result.rows[0].id);

      const layerQuery = `
        INSERT INTO layer (frame_id, layer_name, layer_url, layer_str, blendmode, filter)
        VALUES ($1,$2,$3,$4,$5,$6);
      `;
      
      for (let i=0; i<layerData.length; i++) {
        const layerArray = [
          result.rows[0].id, 
          layerData[i].layer_name, 
          layerData[i].layer_url, 
          layerData[i].layer_str, 
          layerData[i].blendmode,
          layerData[i].filter.map( item=> {
            return [item.name, item.value, item.unit];
          })
        ]
        console.log('Layer query:',layerArray);
        
        await client.query(layerQuery, layerArray);
      }

    await client.query('COMMIT');
    res.sendStatus(200);
    
  } catch (error) {
    client.query('ROLLBACK');
    console.log('error deleting', error)
    res.sendStatus(500);
  } finally {
    client.release();
  }
  /*
  
  
  
  pool.query(frameQuery,frameData).then(result=>{
    console.log('Query response:',result.rows);
    res.sendStatus(200);
  }).catch(error=>{
    console.log('Query error:',error);
    
    res.sendStatus(400);
  });
  */

  
});

module.exports = router;