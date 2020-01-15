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
    console.log('Error posting frame', error)
    res.sendStatus(500);
  } finally {
    client.release();
  }  
});

router.delete('/:id', rejectUnauthenticated, async (req,res)=> {
  const client = await pool.connect();
  try {
    const frameUserId = await client.query(`SELECT user_id FROM frame WHERE id = $1;`, [req.params.id])
    if(req.user.id === frameUserId.rows[0]['user_id']){

      await client.query(`BEGIN`)
        await client.query(`DELETE FROM layer WHERE frame_id = $1;`,[req.params.id]);
        await client.query(`DELETE FROM frame WHERE id = $1`, [req.params.id]);
      await client.query('COMMIT');
      res.sendStatus(200);
    }  
    res.sendStatus(403);
  } catch (error) {
    client.query('ROLLBACK');
    console.log('Error deleting frame and layers.', error)
    res.sendStatus(500);
  } finally {
    client.release();
  }
});

module.exports = router;