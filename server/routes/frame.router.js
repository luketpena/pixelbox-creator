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

router.get('/edit/:id', rejectUnauthenticated, async (req,res)=> {
  const client = await pool.connect();

  try {
    await client.query('BEGIN');
    let frameResult = await client.query(`SELECT * FROM frame WHERE id=$1`,[req.params.id]);
    let layerResult = await client.query(`SELECT * FROM layer WHERE frame_id=$1;`,[req.params.id]);
    //>> The working copy of the query results
    let layerCopy = layerResult.rows;
    //>> Replace the filter arrays as objects with properties
    
    for (let i=0; i<layerCopy.length; i++) {
      layerCopy[i].filter = layerCopy[i].filter.map( item=>{
        return {
          name: item[0],
          value: Number(item[1]),
          unit: item[2]
        }
      })
    }
    let result = {...frameResult.rows[0], layerData: [...layerCopy]}
    await client.query('COMMIT');
    res.send(result);
  } catch(error){
    await client.query('ROLLBACK');
    res.sendStatus(500);
    console.log('Error getting complete frame:',error);
  } finally {
    client.release();
  }
});

//Adding a single frame for a user to the database
router.post('/', async (req, res) => {
  //>> Destructuring the req.body, stored in array for query data
  const {frame_name,bkg_url,size,extend,display,smoothing,framerate,pixelsnap,hideoverflow,layerData} = req.body;
  const frameData = [req.user.id,frame_name,bkg_url,size[0],size[1],extend[0],extend[1],display[0],display[1],smoothing,framerate,pixelsnap,hideoverflow];

  //>> Handshake with database
  const client = await pool.connect();
  try {
    const frameQuery = `
      INSERT INTO frame (user_id, frame_name, bkg_url, size_x, size_y, extend_x, extend_y, display_x, display_y, smoothing, framerate, pixelsnap, hideoverflow)
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13)
      RETURNING id;
    `;
    
    await client.query(`BEGIN`);

      const result = await client.query(frameQuery,frameData);
      const frameId = result.rows[0].id.toString();

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
        
        await client.query(layerQuery, layerArray);
      }

    await client.query('COMMIT');
   
    res.send(frameId);
    
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
    const frameUserId = await client.query(`SELECT user_id FROM frame WHERE id = $1;`, [req.params.id]);
    if(req.user.id === frameUserId.rows[0]['user_id']){

      await client.query(`BEGIN`)
        await client.query(`DELETE FROM layer WHERE frame_id = $1;`,[req.params.id]);
        await client.query(`DELETE FROM frame WHERE id = $1`, [req.params.id]);
      await client.query('COMMIT');
      res.sendStatus(200);
    } else {
      res.sendStatus(403);
      client.query('ROLLBACK');
    }

  } catch (error) {
    client.query('ROLLBACK');
    console.log('Error deleting frame and layers.', error)
    res.sendStatus(500);
  } finally {
    client.release();
  }
});

router.put('/', rejectUnauthenticated, async (req,res)=> {
  //>> Deconstruct the req.body and prep into array
  const {id, frame_name,bkg_url,size,extend,display,smoothing,framerate,pixelsnap,hideoverflow,layerData} = req.body;
  const frameData = [id, frame_name,bkg_url,size[0],size[1],extend[0],extend[1],display[0],display[1],smoothing,framerate,pixelsnap,hideoverflow];

  console.log('Attempting to Edit...');
  
  //>> Connecting to the DB
  const client = await pool.connect();

  try {
    //>> Get the user_id of frame to see if we have the access to modify
    const frameUserId = await client.query(`SELECT user_id FROM frame WHERE id = $1;`, [id]);
    console.log(frameUserId);
    
    if(req.user.id === frameUserId.rows[0]['user_id']){

    //>> Updates the frame of frame_id
    const frameQuery = `
      UPDATE frame 
      SET frame_name=$2, bkg_url=$3, size_x=$4, size_y=$5, extend_x=$6, extend_y=$7, display_x=$8, display_y=$9, smoothing=$10, framerate=$11, pixelsnap=$12, hideoverflow=$13
      WHERE id = $1;
    `;
    
    await client.query(`BEGIN`)

      //>> Update the frame information
      await client.query(frameQuery,frameData);
      //>> Delete all layers
      
      await client.query(`DELETE FROM layer WHERE frame_id=$1;`,[id]);
      //>> Set up layer query
      const layerQuery = `
        INSERT INTO layer (frame_id, layer_name, layer_url, layer_str, blendmode, filter)
        VALUES ($1,$2,$3,$4,$5,$6);
      `;
      //>> Recreate the layers for the frame
      for (let i=0; i<layerData.length; i++) {
        const layerArray = [
          id, 
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

      //>> End the connection successfully
      await client.query('COMMIT');
      res.sendStatus(200);

    } else {
      //>> Current user is not authorize to modify the selected frame
      res.sendStatus(403);
    }
  } catch(error) {
    client.query('ROLLBACK');
    console.log('Error modifying frame and layers.',error);
    res.sendStatus(500);
  } finally {
    client.release();
  }
});

module.exports = router;