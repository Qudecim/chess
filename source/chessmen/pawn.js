export class Pawn {

    draw() {
        return {
            sprite: 5
        };
    }

    getMoves(color, v, h) {
        return []
    }

    getSteps(color, h, v) {
        return [{h:3, v:3}]
    }

}