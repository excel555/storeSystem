'use strict';

module.exports = app => {
    const { STRING, INTEGER, DATE } = app.Sequelize;

    const Client = app.model.define('client', {
        login: STRING,
        name: STRING(30),
        password: STRING(32),
        age: INTEGER,
        last_sign_in_at: DATE,
        created_at: DATE,
        updated_at: DATE,
    });

    Client.findByLogin = function* (login) {
        return yield this.findOne({
            where: {
                login: login
            }
        });
    }

    Client.prototype.logSignin = function* () {
        yield this.update({ last_sign_in_at: new Date() });
    }

    return Client;
};