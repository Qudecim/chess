import g from './g'
import control from "./control";

g.start()
g.canvas.addEventListener("mousedown", control.down);
g.canvas.addEventListener("mouseup", control.up);
g.canvas.addEventListener("mousemove", control.move);

function tic() {
	g.tic()

	setTimeout(tic, 1000/30)
}

tic()