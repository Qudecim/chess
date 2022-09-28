import ws from './ws'
import dom from './gui/dom'

export default {
    
    create(name) {
        ws.createRoom(name)
        dom.join(false)
        dom.wait(true)
    },
    
    join(name) {
        ws.joinRoom(name)
        dom.join(false)
        dom.wait(true)
    }
    
}