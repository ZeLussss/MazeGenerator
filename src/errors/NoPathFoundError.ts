import { MazeError } from "./MazeError";

export class NoPathFoundError extends MazeError
{
    constructor()
    {
        super( "No path found between start and goal", "NO_PATH_FOUND" );

        this.name = "NoPathFoundError";
    }
}