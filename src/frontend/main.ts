import "./style.css";

import { Cell } from "../core/Cell";
import { KruskalMaze } from "../maze/KruskalMaze";
import { Maze } from "../maze/Maze";
import { CanvasRenderer } from "../render/CanvasRenderer";
import { AStarSolver } from "../solvers/AStarSolver";
import { DijkstraSolver } from "../solvers/DijkstraSolver";

type SolverResult = {
    path: Cell[];
    visitedOrder: Cell[];
    visited: number;
    time: number;
};

const widthInput = document.getElementById( "widthInput" ) as HTMLInputElement;
const heightInput = document.getElementById( "heightInput" ) as HTMLInputElement;

const generateButton = document.getElementById( "generateButton" ) as HTMLButtonElement;
const animateAStarButton = document.getElementById( "animateAStarButton" ) as HTMLButtonElement;
const animateDijkstraButton = document.getElementById( "animateDijkstraButton" ) as HTMLButtonElement;
const compareButton = document.getElementById( "compareButton" ) as HTMLButtonElement;
const downloadButton = document.getElementById( "downloadButton" ) as HTMLButtonElement;

const astarLength = document.getElementById( "astarLength" ) as HTMLElement;
const astarVisited = document.getElementById( "astarVisited" ) as HTMLElement;
const astarTime = document.getElementById( "astarTime" ) as HTMLElement;

const dijkstraLength = document.getElementById( "dijkstraLength" ) as HTMLElement;
const dijkstraVisited = document.getElementById( "dijkstraVisited" ) as HTMLElement;
const dijkstraTime = document.getElementById( "dijkstraTime" ) as HTMLElement;

const differenceText = document.getElementById( "differenceText" ) as HTMLElement;

const astarCanvas = document.getElementById( "astarCanvas" ) as HTMLCanvasElement;
const dijkstraCanvas = document.getElementById( "dijkstraCanvas" ) as HTMLCanvasElement;

const astarCtx = astarCanvas.getContext( "2d" );
const dijkstraCtx = dijkstraCanvas.getContext( "2d" );

if( astarCtx === null || dijkstraCtx === null )
{
    throw new Error( "Canvas context is not available" );
}

const astarContext: CanvasRenderingContext2D = astarCtx;
const dijkstraContext: CanvasRenderingContext2D = dijkstraCtx;

let maze: Maze;
let astarRenderer: CanvasRenderer;
let dijkstraRenderer: CanvasRenderer;

let astarLastResult: SolverResult | null = null;
let dijkstraLastResult: SolverResult | null = null;

let animationToken = 0;

function getCellSize( width: number, height: number ): number
{
    const maxDimension = Math.max( width, height );

    if( maxDimension <= 20 )
    {
        return 22;
    }

    if( maxDimension <= 40 )
    {
        return 13;
    }

    return 9;
}

function setButtonsDisabled( disabled: boolean ): void
{
    generateButton.disabled = disabled;
    animateAStarButton.disabled = disabled;
    animateDijkstraButton.disabled = disabled;
    compareButton.disabled = disabled;
    downloadButton.disabled = disabled;
}

function resetStats(): void
{
    astarLength.textContent = "—";
    astarVisited.textContent = "—";
    astarTime.textContent = "—";

    dijkstraLength.textContent = "—";
    dijkstraVisited.textContent = "—";
    dijkstraTime.textContent = "—";

    differenceText.textContent = "Brak danych.";

    astarLastResult = null;
    dijkstraLastResult = null;
}

function drawEmpty(): void
{
    astarRenderer.draw( maze, [], [] );
    dijkstraRenderer.draw( maze, [], [] );
}

function createMaze(): void
{
    animationToken++;

    const width = Number( widthInput.value );
    const height = Number( heightInput.value );

    maze = new KruskalMaze( width, height );
    maze.generate();

    const cellSize = getCellSize( width, height );

    astarRenderer = new CanvasRenderer( astarContext, cellSize );
    dijkstraRenderer = new CanvasRenderer( dijkstraContext, cellSize );

    resetStats();
    drawEmpty();
}

function solveAStar(): SolverResult
{
    const solver = new AStarSolver( maze );

    const start = maze.cell( 0, 0 );
    const goal = maze.cell( maze.width() - 1, maze.height() - 1 );

    const timeStart = performance.now();
    const path = solver.solve( start, goal );
    const timeEnd = performance.now();

    return {
        path: path,
        visitedOrder: solver.visitedOrder(),
        visited: solver.visitedCount(),
        time: timeEnd - timeStart
    };
}

function solveDijkstra(): SolverResult
{
    const solver = new DijkstraSolver( maze );

    const start = maze.cell( 0, 0 );
    const goal = maze.cell( maze.width() - 1, maze.height() - 1 );

    const timeStart = performance.now();
    const path = solver.solve( start, goal );
    const timeEnd = performance.now();

    return {
        path: path,
        visitedOrder: solver.visitedOrder(),
        visited: solver.visitedCount(),
        time: timeEnd - timeStart
    };
}

function showAStarResult( result: SolverResult ): void
{
    astarLength.textContent = result.path.length.toString();
    astarVisited.textContent = result.visited.toString();
    astarTime.textContent = `${ result.time.toFixed( 3 ) } ms`;
}

function showDijkstraResult( result: SolverResult ): void
{
    dijkstraLength.textContent = result.path.length.toString();
    dijkstraVisited.textContent = result.visited.toString();
    dijkstraTime.textContent = `${ result.time.toFixed( 3 ) } ms`;
}

function showDifferenceIfPossible(): void
{
    if( astarLastResult === null || dijkstraLastResult === null )
    {
        differenceText.textContent = "Uruchom oba algorytmy, aby zobaczyć różnicę.";
        return;
    }

    const astar = astarLastResult;
    const dijkstra = dijkstraLastResult;

    const visitedDifference = dijkstra.visited - astar.visited;
    const timeDifference = dijkstra.time - astar.time;

    let text = "";

    if( astar.path.length === dijkstra.path.length )
    {
        text += `Ta sama długość ścieżki: ${ astar.path.length }. `;
    }
    else
    {
        text += `A*: ${ astar.path.length }, Dijkstra: ${ dijkstra.path.length }. `;
    }

    if( visitedDifference > 0 )
    {
        text += `A* odwiedził o ${ visitedDifference } mniej komórek. `;
    }
    else if( visitedDifference < 0 )
    {
        text += `Dijkstra odwiedził o ${ Math.abs( visitedDifference ) } mniej komórek. `;
    }
    else
    {
        text += "Oba algorytmy odwiedziły tyle samo komórek. ";
    }

    if( timeDifference > 0 )
    {
        text += `A* był szybszy o ${ timeDifference.toFixed( 3 ) } ms.`;
    }
    else if( timeDifference < 0 )
    {
        text += `Dijkstra był szybszy o ${ Math.abs( timeDifference ).toFixed( 3 ) } ms.`;
    }
    else
    {
        text += "Czas wykonania był taki sam.";
    }

    differenceText.textContent = text;
}

function animateSingle(
    renderer: CanvasRenderer,
    result: SolverResult,
    token: number,
    onFinish: () => void
): void
{
    const visitedCells: Cell[] = [];
    let index = 0;

    function step(): void
    {
        if( token !== animationToken )
        {
            return;
        }

        if( index < result.visitedOrder.length )
        {
            visitedCells.push( result.visitedOrder[ index ] );

            renderer.draw( maze, [], visitedCells );

            index++;

            setTimeout( step, 12 );
        }
        else
        {
            renderer.draw( maze, result.path, visitedCells );

            onFinish();
        }
    }

    step();
}

function animateBoth(
    astar: SolverResult,
    dijkstra: SolverResult,
    token: number
): void
{
    const astarVisitedCells: Cell[] = [];
    const dijkstraVisitedCells: Cell[] = [];

    let index = 0;

    const maxLength = Math.max(
        astar.visitedOrder.length,
        dijkstra.visitedOrder.length
    );

    function step(): void
    {
        if( token !== animationToken )
        {
            return;
        }

        if( index < maxLength )
        {
            if( index < astar.visitedOrder.length )
            {
                astarVisitedCells.push( astar.visitedOrder[ index ] );
            }

            if( index < dijkstra.visitedOrder.length )
            {
                dijkstraVisitedCells.push( dijkstra.visitedOrder[ index ] );
            }

            astarRenderer.draw( maze, [], astarVisitedCells );
            dijkstraRenderer.draw( maze, [], dijkstraVisitedCells );

            index++;

            setTimeout( step, 5 );
        }
        else
        {
            astarRenderer.draw( maze, astar.path, astarVisitedCells );
            dijkstraRenderer.draw( maze, dijkstra.path, dijkstraVisitedCells );

            setButtonsDisabled( false );
        }
    }

    step();
}

function downloadComparison(): void
{
    const padding = 20;
    const labelHeight = 32;

    const width = astarCanvas.width + dijkstraCanvas.width + padding * 3;
    const height = Math.max( astarCanvas.height, dijkstraCanvas.height ) + padding * 2 + labelHeight;

    const output = document.createElement( "canvas" );

    output.width = width;
    output.height = height;

    const outputCtx = output.getContext( "2d" );

    if( outputCtx === null )
    {
        throw new Error( "Canvas context is not available" );
    }

    outputCtx.fillStyle = "#ffffff";
    outputCtx.fillRect( 0, 0, width, height );

    outputCtx.fillStyle = "#111827";
    outputCtx.font = "20px Arial";

    outputCtx.fillText( "A*", padding, padding + 20 );
    outputCtx.fillText( "Dijkstra", astarCanvas.width + padding * 2, padding + 20 );

    outputCtx.drawImage( astarCanvas, padding, padding + labelHeight );
    outputCtx.drawImage(
        dijkstraCanvas,
        astarCanvas.width + padding * 2,
        padding + labelHeight
    );

    const link = document.createElement( "a" );

    link.href = output.toDataURL( "image/png" );
    link.download = `maze-comparison-${ maze.width() }x${ maze.height() }.png`;

    link.click();
}

generateButton.addEventListener( "click", () =>
{
    createMaze();
} );

animateAStarButton.addEventListener( "click", () =>
{
    animationToken++;

    const token = animationToken;
    const astarResult = solveAStar();

    astarLastResult = astarResult;

    showAStarResult( astarResult );
    showDifferenceIfPossible();

    astarRenderer.draw( maze, [], [] );

    setButtonsDisabled( true );

    animateSingle( astarRenderer, astarResult, token, () =>
    {
        setButtonsDisabled( false );
        showDifferenceIfPossible();
    } );
} );

animateDijkstraButton.addEventListener( "click", () =>
{
    animationToken++;

    const token = animationToken;
    const dijkstraResult = solveDijkstra();

    dijkstraLastResult = dijkstraResult;

    showDijkstraResult( dijkstraResult );
    showDifferenceIfPossible();

    dijkstraRenderer.draw( maze, [], [] );

    setButtonsDisabled( true );

    animateSingle( dijkstraRenderer, dijkstraResult, token, () =>
    {
        setButtonsDisabled( false );
        showDifferenceIfPossible();
    } );
} );

compareButton.addEventListener( "click", () =>
{
    animationToken++;

    const token = animationToken;

    const astarResult = solveAStar();
    const dijkstraResult = solveDijkstra();

    astarLastResult = astarResult;
    dijkstraLastResult = dijkstraResult;

    showAStarResult( astarResult );
    showDijkstraResult( dijkstraResult );
    showDifferenceIfPossible();

    setButtonsDisabled( true );

    animateBoth( astarResult, dijkstraResult, token );
} );

downloadButton.addEventListener( "click", () =>
{
    downloadComparison();
} );

createMaze();