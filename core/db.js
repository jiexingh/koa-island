
const Sequelize = require('sequelize');
const {
    dbName,
    host,
    port,
    user,
    password
} = require('../config/config').dataBase;

const sequelize = new Sequelize(dbName, user, password, {
    dialect: 'mysql',
    host,
    port,
    logging: false,
    timezone: '+08:00',
    define: {
        // create_at 和updata_at
        timestamps: true,
        paranoid: true,
        createAt: 'create_at',
        updateAt: 'update_at',
        deleteAt: 'delete_at',
        underscored: true,
        freezeTableName: true
    }
});

sequelize.sync({
    force: false
});

module.exports = {
    db: sequelize
}
