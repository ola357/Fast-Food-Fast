const Joi = require('joi');
const express = require ('express');
const app = express();

app.use(express.json());

const orders =[
    {id: 1, name: 'cake'},
    { id: 2, name: 'doughnut' },  
  { id: 3, name: 'meatpie' }
];

app.get('/api/v1/orders', (req, res) => {
res.send(orders);
});

app.post('/api/v1/orders', (req, res)=>{
    const { error } = vaidateOrder(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const order ={
        id: orders.length + 1,
        name: req.body.name
    };
    orders.push(order);
    res.send(order);
});

app.put('/api/v1/orders/:id', (req, res)=>{
    const order = orders.find(c => c.id === parseInt(req.params.id));
    if(!order) return res.status(404).send('The order with the specified id was not found');

    const { error } = validateOrder(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    order.name = req.body.name;
    res.send(order);
});

app.get('/api/v1/orders/:id', (req, res) => {
    const order = orders.find(c => c.id === parseInt(req.params.id));
    if (!order) return res.status(404).send('The order with the given ID was not found.');
    res.send(order);
  });
  
  function validateOrder(order) {
    const schema = {
      name: Joi.string().min(3).required()
    };
  
    return Joi.validate(order, schema);
  }
  
  const port = process.env.PORT || 3000;
  app.listen(port, () => console.log(`Listening on port ${port}...`));





















