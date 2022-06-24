const { ActivityHandler } = require('botbuilder');

class DialogBot extends ActivityHandler {
    /**
     * @param {ConversationState} conversationState
     * @param {UserState} userState
     * @param {Dialog} dialog
     */
    constructor(conversationState, userState, dialog) {
        super();
        // check if the conversation and the user state exist
        if (!conversationState) throw new Error('[DialogBot]: Missing parameter. conversationState is required');
        if (!userState) throw new Error('[DialogBot]: Missing parameter. userState is required');
        if (!dialog) throw new Error('[DialogBot]: Missing parameter. dialog is required');

        // setting parameters
        this.conversationState = conversationState;
        this.userState = userState;
        this.dialog = dialog;
        this.dialogState = this.conversationState.createProperty('DialogState');

        // at each received message the dialog is executed 
        this.onMessage(async (context, next) => {
            console.log('Running dialog with Message Activity.');

            // run the Dialog with the new message Activity.
            await this.dialog.run(context, this.dialogState);

            // by calling next() you ensure that the next BotHandler is run.
            await next();
        });

        // save all states during dialog execution
        this.onDialog(async (context, next) => {
            // save any state changes. The load happened during the execution of the Dialog.
            await this.conversationState.saveChanges(context, false);
            await this.userState.saveChanges(context, false);

            // By calling next() you ensure that the next BotHandler is run.
            await next();
        });
    }
}

module.exports.DialogBot = DialogBot;
