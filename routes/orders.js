const Joi = require('joi');
const express = require('express');
const router = express.Router();

const orders =[
    {id: 1, name: 'cake', price: 2000, number: 1},
    { id: 2, name: 'doughnut', price: 1000, number: 2},  
  { id: 3, name: 'meatpie', price: 1000, number: 1}
];


router.get('/', (req, res) => {
    res.send(orders);
    });
    
    router.post('/', (req, res)=>{
        const { error } = validateOrder(req.body);
        if (error) return res.status(400).send(error.details[0].message);
    
        const order ={
            id: orders.length + 1,
            name: req.body.name
        };
        orders.push(order);
        res.send(order);
    });
    
    router.put('/:id', (req, res)=>{
        const order = orders.find(c => c.id === parseInt(req.params.id));
        if(!order) return res.status(404).send('The order with the specified id was not found');
    
        const { error } = validateOrder(req.body);
        if (error) return res.status(400).send(error.details[0].message);
    
        order.name = req.body.name;
        res.send(order);
    });
    
    router.get('/:id', (req, res) => {
        const order = orders.find(c => c.id === parseInt(req.params.id));
        if (!order) return res.status(404).send('The order with the given ID was not found.');
        res.send(order);
      });
      
      router.delete('/:id', (req, res)=> {
        const order = orders.find(c => c.id === parseInt(req.params.id));
        if (!order) return res.status(404).send('The order with the given ID was not found.');
       const index = orders.indexOf(order);
       orders.splice(index, 1);
       
       
        res.send(order);
      });



      function validateOrder(order) {
        const schema = {
          name: Joi.string().min(3).required(),
          price: Joi.number(),
          number: Joi.number()
        };
      
        return Joi.validate(order, schema);
      }
      module.exports = router;