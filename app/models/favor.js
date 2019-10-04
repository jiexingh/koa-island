const {
    db
} = require('../../core/db');
const {
    Sequelize,
    Model
} = require('sequelize');
const {
    Art
} = require('./art');

class Favor extends Model {
    //    业务表 就是写入与删除
    /**
     * 喜欢
     * @param {*} art_id 期刊id
     * @param {*} type 期刊类型
     * @param {*} uid  用户id
     */
    static async like(art_id, type, uid) {
        // 1. 添加记录
        // 2. classic fav_nums
        // 3. 数据库事务 保证一致性
        const favor = await Favor.findOne({
            where: {
                art_id,
                type,
                uid
            }
        });

        if (favor) {
            throw new global.errors.LikeError();
        }

        return sequelize.transaction(async t => {
            await Favor.create({
                art_id,
                type,
                uid
            }, { transaction: t })
            const art = await Art.getData(art_id, type);
            // 此处注意
            await art.increment('fav_nums', { by: 1, transaction: t })
        })
    }

    /**
     * 不喜欢 取消
     * @param {*} art_id 
     * @param {*} type 
     * @param {*} uid 
     */
    static async disLike(art_id, type, uid) {
        const favor = await Favor.findOne({
            where: {
                art_id,
                type,
                uid
            }
        });

        if (!favor) {
            throw new global.errors.DisLikeError();
        }

        return sequelize.transaction(async t => {
            await Favor.destroy({
                force: false,
                transaction: t
            })
            const art = await Art.getData(art_id, type);
            await art.decrement('fav_nums', { by: 1, transaction: t })
        })
    }
}
Favor.init({
    uid: Sequelize.INTEGER,
    art_id: Sequelize.INTEGER,
    type: Sequelize.INTEGER
},
    {
        sequelize: db,
        tableName: 'favor'
    });

module.exports = {
    Favor
}