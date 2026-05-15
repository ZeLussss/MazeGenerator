export class Cell
{
    private _x: number;
    private _y: number;
    private _connections: Set< Cell >;

    constructor( x: number, y: number )
    {
        this._x = x;
        this._y = y;
        this._connections = new Set< Cell >();
    }

    x(): number 
    {
        return this._x;
    }

    y(): number 
    {
        return this._y;
    }

    connections(): Set< Cell >
    {
        return this._connections;
    }

    connect( other: Cell ): void
    {
        if( other === this )
        {
            return;
        }
       
        if( this._connections.has( other ) )
        {
            return;
        }
        
        this._connections.add( other );
        other.connections().add( this );
    }
}