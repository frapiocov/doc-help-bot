const { LuisRecognizer } = require('botbuilder-ai');

// class created for recognize the intent of the user message

class UserIntentRecognizer {
    constructor(config) {
        const luisIsConfigured = config && config.applicationId && config.endpointKey && config.endpoint;
        if (luisIsConfigured) {
            // set the recognizer options depending on which endpoint version you want to use e.g v2 or v3.
            const recognizerOptions = {
                apiVersion: 'v3'
            };

            this.recognizer = new LuisRecognizer(config, recognizerOptions);
        }
    }

    get isConfigured() {
        return (this.recognizer !== undefined);
    }

    /**
     * Returns an object with preformatted LUIS results for the bot's dialogs to consume.
     * @param {TurnContext} context
     */
    async executeLuisQuery(context) {
        return await this.recognizer.recognize(context);
    }
}

module.exports.UserIntentRecognizer = UserIntentRecognizer;
