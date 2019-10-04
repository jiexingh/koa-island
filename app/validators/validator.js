const {
    Rule,
    LinValidator
} = require('../../core/lin-validator');
const {
    LoginType
} = require('../libs/enum');

class PositiveIntergerValidator extends LinValidator {
    constructor() {
        super();
        this.id = [
            new Rule('isInt', '需要正整数', {
                min: 1
            })
        ]
    }
}

class RegisterValidator extends LinValidator {
    constructor() {
        super();
        this.email = [
            new Rule('isEmail', '不符合Email规范')
        ];
        this.password1 = [
            new Rule('isLength', '密码长度6-32位', {
                min: 6,
                max: 32
            }),
            new Rule('matches', '密码不符合规范', '^(?![0-9]+$)(?![a-zA-Z]+$)[0-9a-zA-Z]')
        ];
        this.password2 = this.password1;
        this.nickName = [
            new Rule('isLength', '昵称不符合规范2-12位', {
                min: 2,
                max: 12
            }),
        ]
    }

    validatePassword(vals) {
        const pwd1 = vals.body.password1;
        const pwd2 = vals.body.password2;
        if (pwd1 != pwd2) {
            throw new Error('密码不一致');
        }
    }
}

class TokenValidator extends LinValidator {
    constructor() {
        super();
        this.account = [
            new Rule('optional'),
            new Rule('isLength', '不符合帐号规则', {
                min: 4,
                max: 32
            })
        ];
        this.secret = [
            new Rule('optional'),
            new Rule('isLength', '至少6位字符', {
                min: 6,
                max: 128
            })
        ];
    }

    validateLoginType(vals) {
        if (!vals.body.type) {
            throw new Error('type is necessary');
        }
        if (!LoginType.isThisType(vals.body.type)) {
            throw new Error('type is illegal');
        }
    }
}

class NotEmptyValidator extends LinValidator {
    constructor() {
        super();
        this.token = [
            new Rule('isLength', 'Not allowed to be empty', { min: 1 })
        ]
    }
}

function checkType(val) {
    if (!vals.body.type) {
        throw new Error('type is nessary');
    }
    if (!LoginType.isThisType(vals.body.type)) {
        throw new Error('type is illegal');
    }
}

class LikeValidator extends PositiveIntergerValidator {
    constructor() {
        super();
        this.validateType = checkType
    }
}

module.exports = {
    PositiveIntergerValidator,
    RegisterValidator,
    TokenValidator,
    NotEmptyValidator,
    LikeValidator
}
