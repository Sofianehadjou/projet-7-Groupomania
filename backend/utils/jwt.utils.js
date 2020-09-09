var jwt = require('jsonwebtoken');

const JWT_SIGN_SECRET = 'fl87jkdd8èe37ksdjdod39jjk2jo1idklk23hklm9nb75ikolokh34oj2honf84non2d9kdhen1pzlanvh283';

//export 
module.exports = {
    generateTokenForUser: function(userData) {
        return jwt.sign({
            userId: userData.id,
            isAdmin: userData.isAdmin
        }, 
        JWT_SIGN_SECRET, 
        {
            expiresIn: '1h'
        })
    },
    parseAuthorization: function(authorization){
        return (authorization !=null) ? authorization.replace('Bearer ', '') : null;
    },
    getUserId: function(authorization) {
        var userId = -1;
        var token = module.exports.parseAuthorization(authorization);
        if (token != null){
            try {
                var jwtToken = jwt.verify(token, JWT_SIGN_SECRET);
                if (jwtToken != null)
                    userId = jwtToken.userId; 
            } catch(err) { } 
        }
        return userId;
    }
}