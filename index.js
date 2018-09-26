
const rentals = require('./routes/orders');
const express = require ('express');
const app = express();
const { Pool, Client } = require('pg');

app.use(express.json());
app.use('/api/v1/orders', rentals);


const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'test',
    password: '10million',
    port: 5432,
  });

  pool.connect()
   .then(() =>console.log("connected to Postgres..."))
   .catch(err => console.error("could NOT connect to Postgres..."));

  // pool.query('SELECT * FROM orders', (err, res) => {
  //   if (err) {
  //     console.log(err.stack)
  //   } else {
  //     console.log(res.rows)
  //   }
  // });



/* app.get('/', (req, res)=> {
    res.send("Welcome to Aladun").status(200);
    }); */


  
  const port = process.env.PORT || 3000;
  app.listen(port, () => console.log(`Listening on port ${port}...`));





















