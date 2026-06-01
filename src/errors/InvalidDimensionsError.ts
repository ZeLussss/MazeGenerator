import { MazeError } from "./MazeError";

export class InvalidDimensionsError extends MazeError
{
    constructor( width: number, height: number )
    {
        super(
            `Invalid maze dimensions: width=${ width }, height=${ height }`,
            "INVALID_DIMENSIONS"
        );

        this.name = "InvalidDimensionsError";
    }
}