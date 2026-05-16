const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('NovaSaludDB', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    logging: false
});

sequelize.authenticate()
    .then(() => console.log('Conexión exitosa a MySQL'))
    .catch(err => {
        console.error('Error al conectar a MySQL:');
        console.error(err.message); 
    });

module.exports = sequelize;