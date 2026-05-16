const express = require('express');
const app = express();
const cors = require('cors');

const usersRouter = require('./routers/userRouters');
const productosRouter= require('./routers/productoRouters')
//const authRouter = require('./routers/authRouters');
//const DashboardRouter=require("./routers/dashboardRouther")

require('./database/connection'); 

app.use(cors()); 
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Servidor funcionando');
});

app.use('/users', usersRouter); 
app.use('/productos', productosRouter);
//app.use('/auth', authRouter);
//app.use('/dashboard', DashboardRouter)

const sequelize = require('./database/connection');
sequelize.sync({ alter: true }) 
  .then(() => {
    app.listen(3000, () => {
      console.log('Servidor corriendo en puerto 3000 con MYSQL (XAMPP)');
    });
  })
  .catch(err => console.log('Error al sincronizar MySQL:', err));
