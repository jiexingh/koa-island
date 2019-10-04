const {
    db
} = require('../../core/db');
const {
    Sequelize,
    Model
} = require('sequelize');

// 业务表的概念 负责去对应实体存储的表中取数据
class Flow extends Model {

}
Flow.init(
    {
        index: Sequelize.STRING,
        art_id: Sequelize.INTEGER,
        type: Sequelize.INTEGER
        // type 对应去哪一张表
        // 100 movie
        // 200 music
        // 300 sentence
    },
    {
        sequelize: db,
        tableName: 'flow'
    }
);

module.exports = {
    Flow
}