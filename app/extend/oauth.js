'use strict';

module.exports = () => {
    const model = {};
    model.getClient = async (clientId, clientSecret, callback) => {
        console.log('getClient');
        if (clientId === 'my_app' && clientSecret === 'my_secret') {
            callback(null, { clientId, clientSecret });
            return;
        }
        callback(null, null);
    };
    model.grantTypeAllowed = async (clientId, grantType, callback) => {
            let allowed = false;
            if (grantType === 'password' && clientId === 'my_app') {
                allowed = true;
            }
            callback(null, allowed);
    };
    model.getUser = async (username, password, callback) => {
        const user = await app.model.User.findOne({ $or: [
            { email: username },
            { name: username },
        ] });
        if (!user) {
            callback(null, null);
            return;
        }
        const result = await bcrypt.compare(password, user.password);
        if (!result) {
            callback(null, null);
        } else {
            callback(null, { id: user._id });
        }
    };
    model.saveAccessToken = async (accessToken, clientId, expires, user, callback) => {
        await app.model.OauthToken({ accessToken, expires, clientId, user }).save();
        callback(null);
    };

    model.getAccessToken = async (bearerToken, callback) => {
        const token = await app.model.OauthToken.findOne({ accessToken: bearerToken });
        callback(null, token);
    };
    return model;
};