const Telegraf = require('telegraf')
const {
    Reverso
} = require('./models');
const reverso = new Reverso();
const {
    ENV
} = require('./env')
const bot = new Telegraf(ENV.BOT_TOKEN)

bot.start((ctx) => {
    ctx.reply('Hi')
})

bot.on('text', handleMessage)

async function handleMessage(ctx) {
    try {
        let word = ctx.message.text;
        let examples = await reverso.getExamples(word)
        ctx.replyWithHTML(examples)
    } catch (error) {
        console.log(error)
    }
    return
}

bot.launch()