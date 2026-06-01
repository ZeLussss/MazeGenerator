import { Cell } from "../core/Cell";
import { Wall } from "../core/Wall";

export abstract class Maze
{
    protected _width: number;
    protected _height: number;
    protected _grid: Cell[][];

    constructor( width: number, height: number )
    {
        if( width <= 0 || height <= 0 )
        {
            throw new Error( "Maze dimensions must be greater than zero" );
        }

        this._width = width;
        this._height = height;
        this._grid = [];

        this._initGrid();
    }

    width(): number
    {
        return this._width;
    }

    height(): number
    {
        return this._height;
    }

    cell( x: number, y: number ): Cell
    {
        if( x < 0 || x >= this._width || y < 0 || y >= this._height )
        {
            throw new Error( "Cell out of bounds" );
        }

        const row = this._grid[ y ];

        if( row === undefined )
        {
            throw new Error( "Cell row does not exist" );
        }

        const cell = row[ x ];

        if( cell === undefined )
        {
            throw new Error( "Cell does not exist" );
        }

        return cell;
    }

    abstract generate(): void;

    protected _initGrid(): void
    {
        this._grid = [];

        for( let y = 0; y < this._height; y++ )
        {
            const row: Cell[] = [];

            for( let x = 0; x < this._width; x++ )
            {
                const cell = new Cell( x, y );

                row.push( cell );
            }

            this._grid.push( row );
        }
    }

    protected _buildWalls(): Wall[]
    {
        const walls: Wall[] = [];

        for( let y = 0; y < this._height; y++ )
        {
            for( let x = 0; x < this._width; x++ )
            {
                const current = this.cell( x, y );

                if( x + 1 < this._width )
                {
                    const right = this.cell( x + 1, y );
                    walls.push( new Wall( current, right ) );
                }

                if( y + 1 < this._height )
                {
                    const bottom = this.cell( x, y + 1 );
                    walls.push( new Wall( current, bottom ) );
                }
            }
        }

        return walls;
    }

    protected _shuffle< T >( arr: T[] ): void
    {
        for( let i = arr.length - 1; i > 0; i-- )
        {
            const j = Math.floor( Math.random() * ( i + 1 ) );

            const temp = arr[ i ];
            arr[ i ] = arr[ j ];
            arr[ j ] = temp;
        }
    }
}