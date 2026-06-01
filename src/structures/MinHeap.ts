export class MinHeap< T >
{
    private _data: Array< { item: T, priority: number } >;

    constructor()
    {
        this._data = [];
    }

    size(): number
    {
        return this._data.length;
    }

    push( item: T, priority: number ): void
    {
        this._data.push( { item, priority } );
        this._siftUp( this._data.length - 1 );
    }

    pop(): T
    {
        if( this._data.length === 0 )
        {
            throw new Error( "Heap is empty" );
        }

        const root = this._data[ 0 ];
        const last = this._data.pop();

        if( last !== undefined && this._data.length > 0 )
        {
            this._data[ 0 ] = last;
            this._siftDown( 0 );
        }

        return root.item;
    }

    protected _siftUp( i: number ): void
    {
        while( i > 0 )
        {
            const parent = Math.floor( ( i - 1 ) / 2 );

            if( this._data[ parent ].priority <= this._data[ i ].priority )
            {
                break;
            }

            const temp = this._data[ parent ];
            this._data[ parent ] = this._data[ i ];
            this._data[ i ] = temp;

            i = parent;
        }
    }

    protected _siftDown( i: number ): void
    {
        while( true )
        {
            const left = 2 * i + 1;
            const right = 2 * i + 2;
            let smallest = i;

            if(
                left < this._data.length &&
                this._data[ left ].priority < this._data[ smallest ].priority
            )
            {
                smallest = left;
            }

            if(
                right < this._data.length &&
                this._data[ right ].priority < this._data[ smallest ].priority
            )
            {
                smallest = right;
            }

            if( smallest === i )
            {
                break;
            }

            const temp = this._data[ i ];
            this._data[ i ] = this._data[ smallest ];
            this._data[ smallest ] = temp;

            i = smallest;
        }
    }
}