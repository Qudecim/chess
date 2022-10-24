import game from './../game'

export class Bishop {
    
    sprite = 2

    getSteps(color, v, h, isCheck) {
        let result = []
        let steps = [
            {
                h: 1,
                v: 1,
                a: true
            },
            {
                h: -1,
                v: -1,
                a: true
            },
            {
                h: 1,
                v: -1,
                a: true
            }, {
                h: -1,
                v: 1,
                a: true
            },
        ];

        for (let i = 1; i < 8; i++) {
            for (let s = 0; s < 4; s++) {
                let step = steps[s]
                if (step.a) {
                    let n_h = h + (step.h * i);
                    let n_v = v + (step.v * i);
                    if (n_h > 7 || n_h < 0) { continue }
                    if (n_v > 7 || n_v < 0) { continue }
                    if (game.board[n_v][n_h] === null) {
                        result.push({ v: n_v, h: n_h, pawnPass: false })
                    } else {
                        if (game.board[n_v][n_h] === undefined) {
                            continue;
                        }
                        if (game.board[n_v][n_h].color !== color) {
                            result.push({ v: n_v, h: n_h, pawnPass: false })
                        }
                        step.a = false
                    }
                }
            }
        }
        return result;
    }

}