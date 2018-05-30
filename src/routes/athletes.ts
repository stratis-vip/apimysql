import * as  express from 'express';
const router: express.Router = express.Router();

/* GET athletes listing. */
router.get('/', function (req, res, next) {
  let queryString = 'SELECT * from athletes';
  if (req.query['category']) {
    queryString = `SELECT * from athletes WHERE category = ${req.query['category']}`;
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
  res.locals.connection.query(`SELECT * from athletes WHERE id = ${req.params.id}`, function (error: any, results: any, fields: any) {
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

  res.locals.connection.query(`INSERT INTO athletes (name, surName, email, height, birthday) VALUES 
    ('${document.name}', '${document.surName}','${document.email}', ${document.height}, '${document.birthDay}')`,
    function (error: any, results: any, fields: any) {
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
  res.locals.connection.query(`DELETE from athletes WHERE id = ${req.params.id}`, function (error: any, results: any, fields: any) {
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
  res.locals.connection.query(`UPDATE athletes SET 
  name = '${document.name}', surName = '${document.surName}', email='${document.email}', 
  height = ${document.height}, birthday='${document.birthDay}'
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
