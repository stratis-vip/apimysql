import * as  express from 'express';
import { domainToASCII } from 'url';
const router: express.Router = express.Router();

/* GET activities listing. */
router.get('/', function (req, res, next) {

    let queryString = 'SELECT * from activities';
    if (req.query['type']) {
      queryString = `SELECT * from activities WHERE type = ${req.query['type']}`;
    }
    if (req.query['athlete']) {
      queryString = `SELECT * from activities WHERE athlete = ${req.query['athlete']}`;
    }
    console.log(queryString);
    res.locals.connection.query(queryString, function (error: any, results: any, fields: any) {
      if (error) {
        res.send(JSON.stringify({ "status": 500, "error": error, "response": null }));
        //If there is error, we send the error in the error section with 500 status
      } else {
        res.send(JSON.stringify({ "status": 200, "error": null, "response": results }));
        //If there is no error, all is good and response is 200OK.
      }
    });
  res.locals.connection.end();
});

router.get('/:id', function (req, res) {
  console.log(req.params.id);
  res.locals.connection.query(`SELECT * from activities WHERE id = ${req.params.id}`, function (error: any, results: any, fields: any) {
    if (error) {
      //  console.log(`affected rows = ${results.affectedRows} results = ${results.length}`);
      res.send(JSON.stringify({ "status": 500, "error": error, "response": null }));
      //If there is error, we send the error in the error section with 500 status
    } else {
      //     console.log(`affected rows = ${results.affectedRows} results = ${results.length}`);
      res.send(JSON.stringify({ "status": 200, "error": null, "response": results }));
      //If there is no error, all is good and response is 200OK.

    }
  });
  res.locals.connection.end();
});

router.post('/newdata', function (req, res) {
  
  let document = req.body;
  console.log(document.id);
  res.send(document);

//   res.locals.connection.query(`INSERT INTO activities (athlete, activity, type ) VALUES 
//     (${document.athlete}, '${document.activity}',${document.type}
// )`,
//     function (error: any, results: any, fields: any) {
//       if (error) {
//         //  console.log(`affected rows = ${results.affectedRows} results = ${results.length}`);
//         res.send(JSON.stringify({ "status": 500, "error": error, "response": null }));
//         //If there is error, we send the error in the error section with 500 status
//       } else {
//         //     console.log(`affected rows = ${results.affectedRows} results = ${results.length}`);
//         res.send(JSON.stringify({ "status": 200, "error": null, "response": results }));
//         //If there is no error, all is good and response is 200OK.

//       }
//     });
//   res.locals.connection.end();
});



router.post('/', function (req, res) {
  let document = req.body;
  let mysqlDateTime = new Date(document.dTime).toISOString().slice(0, 19).replace('T', ' ');
  let query = `INSERT INTO activities (athlete, name, type, dTime, distance,
    totalTime, filename, minAlt, maxAlt, totalUp,totalDown, maxSpeed, maxCadence, maxHR ) VALUES 
    (${document.athlete},'${document.name}',${document.type},'${mysqlDateTime}', ${document.distance},
    ${document.totalTime},'${document.filename}', ${document.minAlt}, ${document.maxAlt}, ${document.totalUp},
    ${document.totalDown}, ${document.maxSpeed}, ${document.maxCadence}, ${document.maxHR}
)`;
  res.locals.connection.query(query,
    function (error: any, results: any, fields: any) {
      if (error) {
        //  console.log(`affected rows = ${results.affectedRows} results = ${results.length}`);
        res.send(JSON.stringify({ "status": 500, "error": error, "response": null }));
        console.log(error)
        //If there is error, we send the error in the error section with 500 status
      } else {
        //     console.log(`affected rows = ${results.affectedRows} results = ${results.length}`);
        res.send(JSON.stringify({ "status": 200, "error": null, "response": results }));
        //If there is no error, all is good and response is 200OK.

      }
    });
  res.locals.connection.end();
});


router.delete('/:id', function (req, res) {
  console.log(req.params.id);
  res.locals.connection.query(`DELETE from activities WHERE id = ${req.params.id}`, function (error: any, results: any, fields: any) {
    if (error) {
      //  console.log(`affected rows = ${results.affectedRows} results = ${results.length}`);
      res.send(JSON.stringify({ "status": 500, "error": error, "response": null }));
      //If there is error, we send the error in the error section with 500 status
    } else {
      //     console.log(`affected rows = ${results.affectedRows} results = ${results.length}`);
      res.send(JSON.stringify({ "status": 200, "error": null, "response": results }));
      //If there is no error, all is good and response is 200OK.

    }
  });
  res.locals.connection.end();
});

router.put('/:id', function (req, res) {
  console.log(req.params.id);
  let document = req.body;
  res.locals.connection.query(`UPDATE activities SET 
  athlete = ${document.athlete}, activity = ${document.activity}, type=${document.type}
  WHERE id = ${req.params.id}`, function (error: any, results: any, fields: any) {
      if (error) {
        //  console.log(`affected rows = ${results.affectedRows} results = ${results.length}`);
        res.send(JSON.stringify({ "status": 500, "error": error, "response": null }));
        //If there is error, we send the error in the error section with 500 status
      } else {
        //     console.log(`affected rows = ${results.affectedRows} results = ${results.length}`);
        res.send(JSON.stringify({ "status": 200, "error": null, "response": results }));
        //If there is no error, all is good and response is 200OK.

      }
    });
  res.locals.connection.end();
});

export default router;
