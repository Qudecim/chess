import ws from './ws'
import ctrl from './ctrl'
import game from './game';
import res from './res'
import gui from './gui/gui'

console.log('Start');

res.start()
gui.init()
game.init()
ctrl.start()
ws.start()

game.start()


setInterval(() => {
    game.tic()
}, 100)