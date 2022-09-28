export default {

    join(show) {
        if (show) {
            document.getElementById('join').style.display = 'block'
        } else {
            document.getElementById('join').style.display = 'none'
        }
        
    },

    wait(show) {
        if (show) {
            document.getElementById('wait').style.display = 'block'
        } else {
            document.getElementById('wait').style.display = 'none'
        }
    }

}