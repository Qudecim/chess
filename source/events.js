export default {

    run(message) {
        switch(message.action) {
            case 'move':
                console.log('move')
                this.move(message.from, message.to)
                break;
            default:
                console.error('Event didnt find')
        }
    },

    start(color) {

    },

    end(isWin) {

    },

    move(from, to) {
        console.log(['Moooove', from, to])
    },

}