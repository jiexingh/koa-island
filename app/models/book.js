const util = require('util');
const axios = require('axios');
const {
    db
} = require('../../core/db');
const {
    Sequelize,
    Model
} = require('sequelize');

class Book extends Model {
    // constructor(id) {
    //     super();
    //     this.id = id;
    // }

    async detail(id) {
        const url = util.format(global.config.yushu.detailUrl, id);
        const detail = await axios.get(url);
        return detail.data;
    }

    static async searchFromYuShu(q, start, count, summary = 1) {
        const url = util.format(global.config.yushu.keywordUrl, encodeURI(q), encodeURI(start), count, summary);
        const result = await axios.get(url);
        return result.data;
    }

}

Book.init({
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    fav_nums: {
        type: Sequelize.INTEGER,
        default: 0
    }
},
    {
        sequelize: db,
        tableName: 'book'
    }
);

module.exports = {
    Book
}