const request = require('request-promise');
const formatString = require('util').format
const cheerio = require('cheerio');

class Reverso {
    constructor(from = 'russian', to = 'english') {
        this.link = `https://context.reverso.net/translation/${from}-${to}/%s`
        this.request = request;
        this.cheerio = cheerio;
    }

    async getExamples(word) {
        try {
            const res = await this.request(formatString(this.link, encodeURIComponent(word)));
            const groupedHtml = await this.cheerioHandler(res);
            const formatedAnswer = await this.formatAnswer(groupedHtml);

            return formatedAnswer;
        } catch (error) {
            console.error(error);
            return 'Not found';
        }
    }

    async formatAnswer(data) {
        for (let i = 1; i < data.length; i = i + 2) {
            data[i] += '\n'
        }
        return data.join('\n');
    }

    async cheerioHandler(html) {
        const cheerioRes = this.cheerio.load(html);
        return cheerioRes('.text', '#examples-content').map((i, elem) => {
            return cheerio(elem).text().replace(/(\s+)(\s)/g, '')
        }).toArray();
    }

}



exports.Reverso = Reverso;