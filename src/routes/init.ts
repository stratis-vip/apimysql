
import * as fse from 'fs-extra';
import * as fs from 'fs';
import * as path from 'path';

import * as mysql from 'mysql';


const athletePath = path.join(__dirname, '../athletes');

/* GET athletes listing. */
function initDirs() {

    let con = mysql.createConnection({
        //	host     : 'db20.papaki.gr',
        host: 'localhost',
        user: 'y6089_user',
        password: '$lk7Og47',
        database: 'sports'
    });
    let queryString = 'SELECT id FROM athletes';
    con.query(queryString, function (error: any, results: any, fields: any) {
        if (error) {
            console.log(error);
        } else {
            //res.send(JSON.stringify({ "status": 200, "error": null, "response": results }));
            let athletes = [];
            if (results.length > 0) {
                for (let i = 0; i !== results.length; i++) {
                    athletes.push(results[i].id);
                }
            }

            if (!fs.existsSync(athletePath)) {
                //Δεν υπάρχει ο κατάλογος και πρέπει να δημιουργηθεί
                fs.mkdirSync(athletePath);
            }
            let dirs = fs.readdirSync(athletePath).map(value => parseInt(value));
            if (dirs.length > 0) {
                for (let i = 0; i !== dirs.length; i++) {
                    if (!athletes.includes(dirs[i])) {
                        fse.removeSync(path.join(athletePath, dirs[i].toString()));
                    }
                }
            }
            if (athletes.length > 0) {
                for (let i = 0; i !== athletes.length; i++) {
                    if (!dirs.includes(athletes[i])) {
                        fs.mkdirSync(path.join(athletePath, athletes[i].toString()));
                    }
                }
            }

        }
    });
    con.end();
};

export default initDirs;
