// app/model/user.js

module.exports = app => {
    const { STRING, INTEGER, DATE } = app.Sequelize;

    const User = app.model.define('user', {
        login: STRING,
        name: STRING(30),
        password: STRING(32),
        age: INTEGER,
        last_sign_in_at: DATE,
        created_at: DATE,
        updated_at: DATE,
    });

    User.findByLogin = function* (login) {
        return this.findOne({
            where: {
                code: login
            }
        });
    }

    User.prototype.logSignin = function* () {
        this.update({ last_sign_in_at: new Date() });
    }

    return User;
};