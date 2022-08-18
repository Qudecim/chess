import g from './g'

export default {
    'click': function (e) {
        let x = Math.floor(e.offsetX / g.block)
        let y = Math.floor(e.offsetY / g.block)

        g.set_active(x, y)
    }
}