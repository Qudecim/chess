import g from "../g";

export class Pawn {
    draw() {
        return {};
    }

    get_steps(color, h , v) {
        let steps = [];
        let step_line = (color? 1 : -1) + v

        if (g.board[step_line][h] === null) {
            steps.push({v: step_line, h:h})
        }

        for (let step of [-1, +1]) {
            let h_position = h + step
            if (h_position < 0 || h_position > 7) {
                continue
            }

            if (g.board[step_line][h_position] !== null && g.board[step_line][h_position].color !== color) {
                steps.push({v: step_line, h: h_position})
            }
        }

        return steps;
    }
}