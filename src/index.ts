import { Cell } from "./core/Cell";
import { DisjointSet } from "./structures/DisjointSet";

const a = new Cell( 0, 0 );
const b = new Cell( 1, 0 );
const c = new Cell( 0, 1 );

const ds = new DisjointSet< Cell >();

ds.makeSet( a );
ds.makeSet( b );
ds.makeSet( c );

console.log( ds.find( a ) === a );
console.log( ds.find( b ) === b );
console.log( ds.find( c ) === c );

console.log( ds.union( a, b ) );
console.log( ds.find( a ) === ds.find( b ) );

console.log( ds.union( a, b ) );

console.log( ds.union( b, c ) );
console.log( ds.find( a ) === ds.find( c ) );