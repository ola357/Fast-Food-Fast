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
    const { error } = validateUser(req.body);
    if (error) return res.status(400).send(error.details[0].message); 
   
    let result = await pool.query(
    'SELECT * FROM users WHERE email = ($1)', [ req.body.email] );
    console.log(result)
    if (result.rowCount!==0) return res.status(400).send('User already registered.');

    result = await pool.
    query('INSERT INTO users(name, email, password)'  +
              'VALUES($1,$2,$3) RETURNING *',
                [req.body.name, req.body.email, req.body.password]);

    await pool.end();
    res.send(result);
    
   });
   




  function validateUser(user) {
    const schema = {
        name: Joi.string().min(3).max(50).required(),
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(255).required()
    };
  
    return Joi.validate(user, schema);
  }
  module.exports = router;