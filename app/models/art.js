const { monitorEventLoopDelay } = require('perf_hooks');
const {
    Movie,
    Sentence,
    Music
} = require('./classic');
class Art {
    static async getData(artId, type) {
        let art;
        const finder = {
            where: {
                id: artId
            }
        }
        switch (type) {
            case 100:
                art = await Movie.findAll(finder);
                break;
            case 200:
                art = await Music.findAll(finder);
                break;
            case 300:
                art = await Sentence.findAll(finder);
                break;
            case 400:

                break;
            default:
                break;
        }
        return art;
    }
}

module.exports = {
    Art
}
