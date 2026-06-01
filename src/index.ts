import { Maze } from "./maze/Maze";

class TestMaze extends Maze
{
    generate(): void
    {
    }
}

const maze = new TestMaze( 3, 2 );

console.log( maze.width() );
console.log( maze.height() );

console.log( maze.cell( 0, 0 ).x(), maze.cell( 0, 0 ).y() );
console.log( maze.cell( 2, 1 ).x(), maze.cell( 2, 1 ).y() );