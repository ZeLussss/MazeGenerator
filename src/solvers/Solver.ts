import { Cell } from "../core/Cell";
import { Maze } from "../maze/Maze";

export abstract class Solver
{
    protected _maze: Maze;

    constructor( maze: Maze )
    {
        this._maze = maze;
    }

    abstract solve( start: Cell, goal: Cell ): Cell[];

    protected _reconstruct( came: Map< Cell, Cell >, end: Cell ): Cell[]
    {
        const path: Cell[] = [];

        let current = end;

        path.push( current );

        while( came.has( current ) )
        {
            const previous = came.get( current );

            if( previous === undefined )
            {
                break;
            }

            current = previous;
            path.push( current );
        }

        path.reverse();

        return path;
    }
}