export class DisjointSet< T >
{
    private _parent: Map< T, T >;
    private _rank: Map< T, number >;

    constructor()
    {
        this._parent = new Map< T, T >();
        this._rank = new Map< T, number >();
    }

    makeSet( x: T ): void
    {
        this._parent.set( x, x );
        this._rank.set( x, 0 );
    }

    find( x: T ): T
    {
        const parent = this._parent.get( x );

        if( parent === undefined )
        {
            throw new Error( "Element not found in DisjointSet" ); 
        }
        
        if( parent !== x )
        {
            const root = this.find( parent );
            this._parent.set( x, root );

            return root;
        }
        
        return parent;
    }

    union( a: T, b: T ): boolean 
    {
        const rootA = this.find( a );
        const rootB = this.find( b );

        if( rootA === rootB )
        {
            return false;
        }

        const rankA = this._rank.get( rootA );
        const rankB = this._rank.get( rootB );

        if( rankA === undefined || rankB === undefined )
        {
            throw new Error( " Rank not found in DisjointSet" );
        }

        if( rankA < rankB )
        {
            this._parent.set( rootA, rootB );
        }
        else if( rankA > rankB )
        {
            this._parent.set( rootB, rootA );
        }
        else
        {
            this._parent.set( rootB, rootA );
            this._rank.set( rootA, rankA + 1 );
        }

        return true;
    }
}