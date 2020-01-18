const envalid = require('envalid');
const {
    str
} = envalid

const env = envalid.cleanEnv(process.env, {
    BOT_TOKEN: str()
})

exports.ENV = env