const { application } = require('express');
const express = require('express');
const { request } = require('http');
const sequelize = require('./sequelize');
const { Ship } = require('./tables');
const cors = require('cors');

const app = express();
const port = 8080;

app.use(express.json());
app.use(cors())

//UTILIZARE ROUTERE
app.use('/api', require('./routes/ship-routes'));
app.use('/api', require('./routes/crewMember-routes'));
app.use('/sync', require('./routes/sync'));

//pornire server cu conectare la bd
app.listen(port, async () => {
    console.warn(`Server started on http://localhost:${port}`);
    try {
        await sequelize.authenticate();
        console.warn('Connection has been established successfully');
      } catch (error) {
        console.error('Unable to connect to the database: ', error);
      }
})

app.post('/',async(request, response, next)=>{
  try{
    const registry = {};
    for(let u of request.body){
      const ship = await Ship.create(u);
    }
  }catch(error){
    next(error);
  }
})