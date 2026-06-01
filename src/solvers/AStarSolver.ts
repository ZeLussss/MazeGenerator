import { Cell } from "../core/Cell";
import { NoPathFoundError } from "../errors/NoPathFoundError";
import { Maze } from "../maze/Maze";
import { MinHeap } from "../structures/MinHeap";
import { Solver } from "./Solver";

export class AStarSolver extends Solver
{
    private _visitedCount: number;
    private _visitedOrder: Cell[];

    constructor( maze: Maze )
    {
        super( maze );

        this._visitedCount = 0;
        this._visitedOrder = [];
    }

    solve( start: Cell, goal: Cell ): Cell[]
    {
        this._visitedCount = 0;
        this._visitedOrder = [];

        const gScore = new Map< Cell, number >();
        const came = new Map< Cell, Cell >();
        const visited = new Set< Cell >();
        const heap = new MinHeap< Cell >();

        gScore.set( start, 0 );
        heap.push( start, this._heuristic( start, goal ) );

        while( heap.size() > 0 )
        {
            const current = heap.pop();

            if( visited.has( current ) )
            {
                continue;
            }

            visited.add( current );
            this._visitedCount++;
            this._visitedOrder.push( current );

            if( current === goal )
            {
                return this._reconstruct( came, goal );
            }

            const currentG = gScore.get( current );

            if( currentG === undefined )
            {
                continue;
            }

            for( const neighbor of current.connections() )
            {
                if( visited.has( neighbor ) )
                {
                    continue;
                }

                const tentativeG = currentG + 1;
                const oldG = gScore.get( neighbor );

                if( oldG === undefined || tentativeG < oldG )
                {
                    came.set( neighbor, current );
                    gScore.set( neighbor, tentativeG );

                    const fScore = tentativeG + this._heuristic( neighbor, goal );

                    heap.push( neighbor, fScore );
                }
            }
        }

        throw new NoPathFoundError();
    }

    visitedCount(): number
    {
        return this._visitedCount;
    }

    visitedOrder(): Cell[]
    {
        return this._visitedOrder;
    }

    private _heuristic( a: Cell, b: Cell ): number
    {
        return Math.abs( a.x() - b.x() ) + Math.abs( a.y() - b.y() );
    }
}