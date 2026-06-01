export class MazeError extends Error
{
    protected _code: string;

    constructor( message: string, code: string )
    {
        super( message );

        this.name = "MazeError";
        this._code = code;
    }

    code(): string
    {
        return this._code;
    }
}