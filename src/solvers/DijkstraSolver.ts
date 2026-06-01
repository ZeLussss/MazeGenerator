import { Cell } from "../core/Cell";
import { NoPathFoundError } from "../errors/NoPathFoundError";
import { Maze } from "../maze/Maze";
import { MinHeap } from "../structures/MinHeap";
import { Solver } from "./Solver";

export class DijkstraSolver extends Solver
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

        const distances = new Map< Cell, number >();
        const came = new Map< Cell, Cell >();
        const visited = new Set< Cell >();
        const heap = new MinHeap< Cell >();

        distances.set( start, 0 );
        heap.push( start, 0 );

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

            const currentDistance = distances.get( current );

            if( currentDistance === undefined )
            {
                continue;
            }

            for( const neighbor of current.connections() )
            {
                if( visited.has( neighbor ) )
                {
                    continue;
                }

                const newDistance = currentDistance + 1;
                const oldDistance = distances.get( neighbor );

                if( oldDistance === undefined || newDistance < oldDistance )
                {
                    distances.set( neighbor, newDistance );
                    came.set( neighbor, current );
                    heap.push( neighbor, newDistance );
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
}