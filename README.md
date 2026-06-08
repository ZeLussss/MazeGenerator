# MazeGenerator

Projekt **MazeGenerator** to aplikacja napisana w TypeScript, która umożliwia generowanie i rozwiązywanie labiryntów.

Projekt został przygotowany w ramach przedmiotu **Metody Programowania**.

**Autorzy:**

- Ksawery Zelek
- Bartłomiej Mróz

**Politechnika Krakowska, 2026**

---

## Strona Internetowa

https://zelussss.github.io/MazeGenerator/

---

## Opis projektu

Aplikacja pozwala na generowanie labiryntów oraz porównywanie działania dwóch algorytmów znajdowania najkrótszej ścieżki:

- A*
- Dijkstra

Labirynt generowany jest za pomocą zrandomizowanego algorytmu Kruskala. Przed rozpoczęciem głównej pętli algorytmu lista wszystkich ścian jest tasowana algorytmem Fishera-Yatesa.

Aplikacja posiada prosty interfejs graficzny oparty o HTML, CSS oraz Canvas API. Użytkownik może wygenerować labirynt, uruchomić animację działania algorytmu A*, uruchomić animację działania algorytmu Dijkstry, porównać oba algorytmy równolegle oraz pobrać wynik jako plik PNG.

---

## Funkcjonalności

- Generowanie labiryntu algorytmem Kruskala.
- Tasowanie ścian algorytmem Fishera-Yatesa.
- Zoptymalizowana struktura Disjoint-Set z kompresją ścieżki i łączeniem według rangi.
- Rozwiązywanie labiryntu algorytmem A*.
- Rozwiązywanie labiryntu algorytmem Dijkstry.
- Animacja kolejności odwiedzania komórek przez oba algorytmy.
- Równoległe porównanie działania A* i Dijkstry.
- Wyświetlanie liczby odwiedzonych komórek.
- Wyświetlanie długości znalezionej ścieżki.
- Wyświetlanie czasu działania algorytmów.
- Pobieranie widoku porównania jako pliku PNG.

---

## Technologie

Projekt wykorzystuje:

- TypeScript
- Vite
- HTML
- CSS
- Canvas API

---

## Struktura projektu

```text
src/
├─ core/
│  ├─ Cell.ts
│  └─ Wall.ts
│
├─ errors/
│  ├─ MazeError.ts
│  ├─ InvalidDimensionsError.ts
│  ├─ CellOutOfBoundsError.ts
│  └─ NoPathFoundError.ts
│
├─ frontend/
│  ├─ main.ts
│  └─ style.css
│
├─ maze/
│  ├─ Maze.ts
│  └─ KruskalMaze.ts
│
├─ render/
│  └─ CanvasRenderer.ts
│
├─ solvers/
│  ├─ Solver.ts
│  ├─ AStarSolver.ts
│  └─ DijkstraSolver.ts
│
├─ structures/
│  ├─ DisjointSet.ts
│  └─ MinHeap.ts
│
└─ vite-env.d.ts
