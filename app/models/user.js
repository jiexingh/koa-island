const bcypt = require('bcryptjs');
const {
    db
} = require('../../core/db');
const {
    Sequelize,
    Model
} = require('sequelize');

class User extends Model {
    static async verifyEmailPassword(email, plainPassword) {
        const user = await User.findOne({
            where: {
                email
            }
        });

        if (!user) {
            throw new global.errors.NotFound('user not found');
        }

        // 比对加密的密码
        const correct = bcypt.compareSync(plainPassword, user.password);
        if (!correct) {
            throw new global.errors.AuthFailed('password incorrect');
        }
        return user;
    }

    /**
     * 根据Openid 查找用户
     * @param {*} openid 
     */
    static async getUserByOpenid(openid) {
        const user = await User.findOne({
            where: {
                openid
            }
        });
        return user;
    }

    /**
     * 根据openid 创建用户
     * @param {*} openid 
     */
    static async registerByOpenid(openid) {
        return await User.create({
            openid
        })
    }
}

User.init({
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    nickName: Sequelize.STRING,
    email: Sequelize.STRING,
    password:
    {
        type: Sequelize.STRING,
        set(val) {
            const salt = bcypt.genSaltSync(10);
            const psw = bcypt.hashSync(val, salt);
            this.setDataValue('password', psw);
        }
    },
    openid:
    {
        type: Sequelize.STRING(64),
        unique: true
    }
},
    {
        sequelize: db,
        tableName: 'user'
    });

module.exports = {
    User
}
 // 数据迁移 SQL 更新 风险