import { Cell } from "./Cell";

export class Wall
{
    private _a: Cell;
    private _b: Cell;

    constructor( a: Cell, b: Cell )
    {
        this._a = a;
        this._b = b;
    }

    a(): Cell
    {
        return this._a;
    }

    b(): Cell
    {
        return this._b;
    }
}