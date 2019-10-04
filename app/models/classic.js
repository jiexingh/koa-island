const {
    db
} = require('../../core/db');
const {
    Sequelize,
    Model
} = require('sequelize');


// 定义共有字段 js 面向对象的局限性
const classicFields = {
    image: Sequelize.STRING,
    content: Sequelize.STRING,
    pubdate: Sequelize.DATEONLY,
    fav_nums: Sequelize.INTEGER,
    title: Sequelize.STRING,
    type: Sequelize.TINYINT
}

// 定义电影的对象
class Movie extends Model {

}
Movie.init(classicFields,
    {
        sequelize: db,
        tableName: 'movie'
    });

// 定义句子
class Sentence extends Model {

}
Sentence.init(classicFields, {
    sequelize: db,
    tableName: 'sentence'
});

// 定义音乐
class Music extends Model {

}
// 多于的合并
const musicFields = Object.assign({ url: Sequelize.STRING }, classicFields);
Music.init(musicFields,
    {
        sequelize: db,
        tableName: 'music'
    });


module.exports = {
    Movie,
    Sentence,
    Music
}