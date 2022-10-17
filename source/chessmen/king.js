import game from './../game'

export class King {

    sprite = 0

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
            {
                h: 1,
                v: 0,
                a: true
            },
            {
                h: -1,
                v: 0,
                a: true
            },
            {
                h: 0,
                v: 1,
                a: true
            },
            {
                h: 0,
                v: -1,
                a: true
            },
        ];

        for (let i = 1; i < 2; i++) {
            for (let s = 0; s < 8; s++) {
                let step = steps[s]
                if (step.a) {
                    let n_h = h + (step.h * i);
                    let n_v = v + (step.v * i);
                    if (n_h > 7 || n_h < 0) { continue }
                    if (n_v > 7 || n_v < 0) { continue }
                    if (game.board[n_v][n_h] === null) {
                        result.push({ v: n_v, h: n_h })
                    } else {
                        if (game.board[n_v][n_h] === undefined) {
                            continue;
                        }
                        if (game.board[n_v][n_h].color !== color) {
                            result.push({ v: n_v, h: n_h })
                        }
                        step.a = false
                    }
                }
            }
        }

        // Рокировка
        // game.isCheck(game.color)
        if (!isCheck) {
            if (!game.board[v][h].moved) {

                if (!game.board[v][0].moved) {
                    let havePiece = false
                    for (let i = h - 1; i > 0; i--) {
                        if (game.board[v][i] !== null) {
                            havePiece = true
                        }
                    }
                    if (!havePiece) {
                        result.push({ v: v, h: h - 2 })
                    }
                }
    
                if (!game.board[v][7].moved) {
                    let havePiece = false
                    for (let i = h + 1; i < 7; i++) {
                        if (game.board[v][i] !== null) {
                            havePiece = true
                        }
                    }
                    if (!havePiece) {
                        result.push({ v: v, h: h + 2 })
                    }
                }
    
            }
        }


        return result;
    }

}