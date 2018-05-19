// heroku.js
// https://devcenter.heroku.com/articles/deploy-hooks#http-post-hook
// ========
const BaseProvider = require('../util/BaseProvider');

class Heroku extends BaseProvider {
    static getName() {
        return 'Heroku';
    }

    async parseData() {
        var release =  this.body.action

        if (release === 'update') {
            var embed = {
                title: "Deployed App " + this.body.data.app.name,
                url: this.body.output_stream_url,
                fields: [{release: this.body.release.version}],
                author: {
                    name: this.body.user.email
                }
            }
        } else {
            var embed = {
                title: "Deploying App " + this.body.data.app.name,
                url: this.body.output_stream_url,
                author: {
                    name: this.body.user.email
                }
            }
        }

        this.payload.setEmbedColor(0xC9C3E6);
        this.payload.addEmbed(embed);
    }
}

module.exports = Heroku;