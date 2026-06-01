import { MazeError } from "./MazeError";

export class CellOutOfBoundsError extends MazeError
{
    constructor( x: number, y: number )
    {
        super(
            `Cell out of bounds: x=${ x }, y=${ y }`,
            "CELL_OUT_OF_BOUNDS"
        );

        this.name = "CellOutOfBoundsError";
    }
}