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

/* const orders =[
    {id: 1, name: 'cake', price: 2000, number: 1},
    { id: 2, name: 'doughnut', price: 1000, number: 2},  
  { id: 3, name: 'meatpie', price: 1000, number: 1}
]; */


/* router.get('/', (req, res) => {
    res.send(orders);
    }); */
    
    router.get('/', async (req, res) => {
       // const { id } = req.params
        const { rows } = await pool.query('SELECT * FROM orders');
       // console.log(rows);
        res.send(rows);
        await pool.end();
      });


    router.post('/', async (req, res)=>{
        const { error } = validateOrder(req.body);
        if (error) return res.status(400).send(error.details[0].message);
    const result = await pool.
    query('INSERT INTO orders(meal, quantity, meal_cost, total)'  +
              'VALUES($1,$2,$3,$4) RETURNING *',
                      [req.body.meal, req.body.quantity, req.body.meal_cost,
                       req.body.total]);
        console.log(result);
        res.send(row);
        await pool.end();
    });
        //const order =  +
    
    router.put('/:orderId', async (req, res)=>{
    
    const { error } = validateOrder(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    const result = await pool.
    query('UPDATE orders SET meal = ($1), quantity= ($2), meal_cost = ($3), total = ($4) WHERE order_id = ($5) RETURNING *',
      [req.body.meal, req.body.quantity, req.body.meal_cost, req.body.total, parseInt( req.params.orderId, 10) ]);
       // order.name = req.body.name;
       console.log(result);
        res.send(result);
        await pool.end();
        
    });
    
    router.get('/:orderId', async (req, res) => {
      const result = await pool.query(
        'SELECT * FROM orders WHERE order_id = ($1)',[ parseInt(req.params.orderId, 10)]);
       
        console.log(result);
        res.send(result);
        await pool.end();
      });
      
     /*  router.delete('/:id', (req, res)=> {
        const order = orders.find(c => c.id === parseInt(req.params.id));
        if (!order) return res.status(404).send('The order with the given ID was not found.');
       const index = orders.indexOf(order);
       orders.splice(index, 1);
       
       
        res.send(order);
      }); */



      function validateOrder(order) {
        const schema = {
          meal: Joi.string().min(3).required(),
          quantity: Joi.number(),
          meal_cost: Joi.number(),
          total: Joi.number()
        };
      
        return Joi.validate(order, schema);
      }
      module.exports = router;