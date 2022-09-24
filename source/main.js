import ws from './ws'
import ctrl from './ctrl'
import game from './game';

console.log('Start');

game.init()
ctrl.start()
ws.start()

game.start()


setTimeout(() => {
    game.tic()
}, 1000)