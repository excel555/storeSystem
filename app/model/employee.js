'use strict';

module.exports = app => {
    const { STRING, INTEGER, DATE,TINYINT } = app.Sequelize;

    const Employee = app.model.define('employee', {
        code: STRING,
        name: STRING(30),
        password: STRING(32),
        email: STRING(32),
        mobile: STRING(32),
        age: INTEGER,
        role: TINYINT,
        group_id: INTEGER,
        last_sign_in_at: DATE,
        created_at: DATE,
        updated_at: DATE,
    });


    Employee.findByCode = async function(code) {
        return this.findOne({
            where: {
                code: code
            }
        });
    }

    Employee.prototype.logSignin = function() {
        this.update({ last_sign_in_at: new Date() });
    }

    return Employee;
};