
const { Sequelize, Model } = require('sequelize');
const { unset, clone, isArray } = require('lodash');

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

// 利用原型链排除字段
Model.prototype.toJSON = function () {
    // 浅拷贝 因为原来是基于引用的 会删除原本的数据
    let data = clone(this.dataValues);
    unset(data, 'createdAt');
    unset(data, 'updatedAt');
    // unset(data, 'deleted_at');

    //    图片拼接地址问题
    for (key in data) {
        if (key === 'image') {
            if (!data[key].startsWith('http')) {
                data[key] = global.config.host + data[key];
            }
        }
    }

    // 有点问题
    if (isArray(this.exclude)) {
        this.exclude.forEach(item => {
            // console.log(item);
            unset(data, item);
        });
    }
    return data;
}


module.exports = {
    db: sequelize
}
