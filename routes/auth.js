const Joi = require('joi');
const express = require('express');
const router = express.Router();
const { Pool, Client } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'test',
    password: '10million',
    port: 5432,
  });


  router.post('/', async (req, res) => {
      //validate input
    const { error } = validateAuth(req.body);
    if (error) return res.status(400).send(error.details[0].message); 
   
    let result = await pool.query(
    'SELECT * FROM users WHERE email = ($1)', [ req.body.email] );
    console.log(result)
    if (result.rowCount!==1) return res.status(400).send('Invalid email or password');

    result = await pool.
    query('INSERT INTO users(name, email, password)'  +
              'VALUES($1,$2,$3) RETURNING *',
                [req.body.name, req.body.email, req.body.password]);

    await pool.end();
    res.send(result);
    
   });
   




  function validateAuth(user) {
    const schema = {
        
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(255).required()
    };
  
    return Joi.validate(user, schema);
  }
  module.exports = router;