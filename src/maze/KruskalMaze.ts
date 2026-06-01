import { Cell } from "../core/Cell";
import { DisjointSet } from "../structures/DisjointSet";
import { Maze } from "./Maze";

export class KruskalMaze extends Maze
{
    private _ds: DisjointSet< Cell >;

    constructor( width: number, height: number )
    {
        super( width, height );

        this._ds = new DisjointSet< Cell >();
    }

    generate(): void
    {
        this._initGrid();

        const walls = this._buildWalls();

        this._shuffle( walls );

        this._ds = new DisjointSet< Cell >();

        for( let y = 0; y < this.height(); y++ )
        {
            for( let x = 0; x < this.width(); x++ )
            {
                this._ds.makeSet( this.cell( x, y ) );
            }
        }

        for( const wall of walls )
        {
            const a = wall.a();
            const b = wall.b();

            if( this._ds.union( a, b ) )
            {
                a.connect( b );
            }
        }
    }
}