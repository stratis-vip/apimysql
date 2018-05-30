import * as  express  from 'express';
const router:express.Router = express.Router();

/* GET categories publications listing. */
router.get('/', function (req, res, next) {
  res.locals.connection.query('SELECT * from pubCategories', function (error:any, results:any, fields:any) {
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
  res.locals.connection.query(`SELECT * from pubCategories WHERE id = ${req.params.id}`, function (error:any, results:any, fields:any) {
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


// router.post('/', function (req, res) {
//   let document = req.body;

//   res.locals.connection.query(`INSERT INTO documents (content, category, imnia) VALUES ('${document.content}',${document.category},'${document.imnia}')`,
//     function (error:any, results:any, fields:any) {
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
// res.locals.connection.end();
// });

export default router;
