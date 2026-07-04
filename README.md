# Super Small Stuff

Non-dedicated storage for small, self-contained Python (and the occasional HTML) projects — command-line games, a from-scratch math library, a hand-rolled linked list, and a few odds and ends. Nothing here is part of a bigger app; each file/folder stands on its own.

## What's Inside

| File / Folder | Description |
|---|---|
| [`BlackJack.py`](./BlackJack.py) | A command-line Blackjack game against a dealer with a bit of an attitude. Handles betting, hits/stands, aces-as-1-or-11 scoring, and dealer AI that plays out its hand after you. |
| [`Hangman.py`](./Hangman.py) | my first ever python game. Two-player, terminal-based Hangman. Player 1 enters a secret word (validated for length/letters-only), Player 2 guesses letters until they win or run out of lives. |
| [`CustomMath.py`](./CustomMath.py) | A math library built from first principles — no `math` module shortcuts. Includes Taylor-series trig (`sine`, `cosine`, `tan`, `arcsin`, `arctan`, ...), numerical integration (left/right/midpoint/trapezoidal/Simpson's rule), a natural log implementation via arctanh expansion, the Gamma function (Lanczos approximation), primality/factor/GCF/LCM utilities, floating-point error correction, and custom base conversion (including arbitrary symbol-key bases and Base62). |
| [`LinkedList.py`](./LinkedList.py) | A fully-featured singly linked list class: insert/delete by index, filtering, mapping, deduplication, slicing (including negative steps), merging sorted lists, shuffling, and multiple sorting algorithms (bubble, selection, merge sort, plus a Timsort comparison) with a built-in benchmarking function (`TimeItTests`) to compare their speed. |
| [`linked_list.md`](./linked_list.md) | Notes/documentation accompanying `LinkedList.py`. |
| [`SystemsOfEquationsGen.py`](./SystemsOfEquationsGen.py) | Generates a random 3-variable system of linear equations (with guaranteed integer solutions) and pretty-prints it in ASCII art, solutions included. |
| [`buckshot-solver/`](./buckshot-solver) | A solver/calculator for the roblox game *Buckshot* — helps work out odds and optimal moves from a given game state. |
| [`donations.html`](./donations.html) | A simple donations page. my first ever html file|

## Requirements

- Python 3.10+ (several scripts use `match` statements)
- No external dependencies — everything is written using the standard library only (by design, in the case of `CustomMath.py` and `LinkedList.py`)

## Running the Scripts

Each Python file is standalone. Just run it directly:

```bash
python BlackJack.py
python Hangman.py
python SystemsOfEquationsGen.py
```

`CustomMath.py` and `LinkedList.py` are meant to be imported and used rather than run directly:

```python
from CustomMath import sine, ln, gamma
from LinkedList import linked_list
```

## License

```
Copyright (c) 2026 Crown-Matrix. All Rights Reserved.

No part of this software may be used, modified, distributed,
or otherwise exploited without the prior written consent
of the copyright holder.
```

See [`LICENSE`](./LICENSE) for the full text.
