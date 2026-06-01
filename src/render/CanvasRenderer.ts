import { Cell } from "../core/Cell";
import { Maze } from "../maze/Maze";

export class CanvasRenderer
{
    protected _ctx: CanvasRenderingContext2D;
    protected _cellSize: number;

    constructor( ctx: CanvasRenderingContext2D, cellSize: number )
    {
        this._ctx = ctx;
        this._cellSize = cellSize;
    }

    draw( maze: Maze, path: Cell[] = [], visited: Cell[] = [] ): void
    {
        const width = maze.width() * this._cellSize;
        const height = maze.height() * this._cellSize;

        this._ctx.canvas.width = width + 1;
        this._ctx.canvas.height = height + 1;

        this._ctx.clearRect( 0, 0, this._ctx.canvas.width, this._ctx.canvas.height );

        this._ctx.fillStyle = "#ffffff";
        this._ctx.fillRect( 0, 0, this._ctx.canvas.width, this._ctx.canvas.height );

        for( const cell of visited )
        {
            this._drawCell( cell, "#fde68a" );
        }

        for( const cell of path )
        {
            this._drawCell( cell, "#f97316" );
        }

        if( path.length > 0 )
        {
            this._drawCell( path[ 0 ], "#22c55e" );
            this._drawCell( path[ path.length - 1 ], "#ef4444" );
        }

        this._drawWalls( maze );
    }

    protected _drawCell( cell: Cell, color: string ): void
    {
        const padding = Math.max( 2, Math.floor( this._cellSize * 0.18 ) );

        const x = cell.x() * this._cellSize + padding;
        const y = cell.y() * this._cellSize + padding;
        const size = this._cellSize - padding * 2;

        this._ctx.fillStyle = color;
        this._ctx.fillRect( x, y, size, size );
    }

    protected _drawWalls( maze: Maze ): void
    {
        this._ctx.strokeStyle = "#111827";
        this._ctx.lineWidth = 2;
        this._ctx.beginPath();

        for( let y = 0; y < maze.height(); y++ )
        {
            for( let x = 0; x < maze.width(); x++ )
            {
                const cell = maze.cell( x, y );

                const px = x * this._cellSize;
                const py = y * this._cellSize;

                const topExists =
                    y === 0 || !cell.connections().has( maze.cell( x, y - 1 ) );

                const rightExists =
                    x === maze.width() - 1 || !cell.connections().has( maze.cell( x + 1, y ) );

                const bottomExists =
                    y === maze.height() - 1 || !cell.connections().has( maze.cell( x, y + 1 ) );

                const leftExists =
                    x === 0 || !cell.connections().has( maze.cell( x - 1, y ) );

                if( topExists )
                {
                    this._ctx.moveTo( px, py );
                    this._ctx.lineTo( px + this._cellSize, py );
                }

                if( rightExists )
                {
                    this._ctx.moveTo( px + this._cellSize, py );
                    this._ctx.lineTo( px + this._cellSize, py + this._cellSize );
                }

                if( bottomExists )
                {
                    this._ctx.moveTo( px, py + this._cellSize );
                    this._ctx.lineTo( px + this._cellSize, py + this._cellSize );
                }

                if( leftExists )
                {
                    this._ctx.moveTo( px, py );
                    this._ctx.lineTo( px, py + this._cellSize );
                }
            }
        }

        this._ctx.stroke();
    }
}