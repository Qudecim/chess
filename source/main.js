import ws from './ws'
import ctrl from './ctrl'
import game from './game';
import res from './res'

console.log('Start');

res.start()
game.init()
ctrl.start()
ws.start()

game.start()


setInterval(() => {
    game.tic()
}, 100)