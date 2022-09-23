import g from './g'

export default {
    'down': function (e) {
        let x = Math.floor(e.offsetX / g.block)
        let y = Math.floor(e.offsetY / g.block)
        g.cursor.ox = (x * g.block) - e.offsetX;
        g.cursor.oy = (y * g.block) - e.offsetY;
        g.down(x, y)
    },
    'up': function (e) {
        let x = Math.floor(e.offsetX / g.block)
        let y = Math.floor(e.offsetY / g.block)
        g.up(x, y)
    },
    'move': function (e) {
        g.cursor.x = e.offsetX
        g.cursor.y = e.offsetY
    }
}