import ws from './ws'
import ctrl from './ctrl'
import game from './game';
import res from './res'
import draw from './gui/draw'
import dom from './gui/dom'

res.init()
draw.init()
game.init()
ctrl.init()
ws.init()
dom.resize()


setInterval(() => {
    game.tic()
}, 100)