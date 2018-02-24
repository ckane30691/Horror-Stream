const convict = require('convict');

const config = convict({
    http: {
        port: {
            doc: 'The port to listen on',
            default: 3000,
            env: 'PORT'
        }
    },
    authentication: {
        google: {
            "clientId": {
                "doc": "The Client ID from Google to use for authentication",
                "default": process.env.CLIENT_ID,
                "env": process.env.CLIENT_ID
            },
            "clientSecret": {
                "doc": "The Client Secret from Google to use for authentication",
                "default": process.env.CLIENT_SECRET,
                "env": process.env.CLIENT_SECRET
            }
        },
        token: {
            secret: {
                doc: 'The signing key for the JWT',
                default: process.env.JWT_SECRET,
                env: process.env.JWT_SECRET
            },
            issuer: {
                doc: 'The issuer for the JWT',
                default: 'live-nature-stream'
            },
            audience: {
                doc: 'The audience for the JWT',
                default: 'live-nature-stream'
            }
        }
    }
});

config.validate();

module.exports = config;
