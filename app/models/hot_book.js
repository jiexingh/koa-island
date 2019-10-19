const {
    db
} = require('../../core/db');
const {
    Sequelize,
    Model
} = require('sequelize');


class HotBook extends Model {
    static async getAll() {
        const books = await HotBook.findAll({
            order: [
                'index'
            ]
        });
        return books;
        // const ids = [];
    }
}

HotBook.init({
    index: Sequelize.STRING,
    image: Sequelize.STRING,
    author: Sequelize.STRING,
    title: Sequelize.STRING,
},
    {
        sequelize: db,
        tableName: 'hot_book'
    }
);

module.exports = {
    HotBook
}