import * as  express  from 'express';
const router:express.Router = express.Router();

/* GET zones listing. */
router.get('/', function (req, res, next) {
  res.locals.connection.query('SELECT * from zones', function (error:any, results:any, fields:any) {
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
  res.locals.connection.query(`SELECT * from zones WHERE athlete = ${req.params.id}`, function (error:any, results:any, fields:any) {
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



router.post('/', function (req, res) {
  let document = req.body;

  res.locals.connection.query(`INSERT INTO zones (athlete, date, value) 
  VALUES (${document.athlete},'${document.date}', '${document.value}')`,

    function (error:any, results:any, fields:any) {
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

router.delete('/:id', function (req, res) {
  console.log(req.params.id);
  res.locals.connection.query(`DELETE from zones WHERE id = ${req.params.id}`, function (error: any, results: any, fields: any) {
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
  res.locals.connection.query(`UPDATE zones SET 
  date = '${document.date}', value='${document.value}'
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

