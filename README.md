# Lexi

A vocabulary trainer built as a single self-contained HTML file. No build step,
no dependencies to install — open `lexi.html` and it runs.

## What it does

Four decks, each testing a different skill rather than mixing them into one
undifferentiated quiz:

| Deck | The verb |
|---|---|
| **Vocabulary** | context fill, letter-bank recall, typed recall |
| **Phrases** | pick the sentence that uses it correctly |
| **Concepts** | name the pattern from a scene |
| **Quotes** | finish the line |

Entries move through three ranks — **New → Known → Used**. Ranks only ever go
up; a word you missed simply comes back sooner. A word reaches *Used* when you
tell the app you said or wrote it somewhere real, and it then drops out of
rotation.

**The queue** is where words go when you meet one in the wild. Add a word, pick
its kind, optionally note where you found it. It appears on the wall
immediately as New and stays out of the games until someone writes its
definition, example sentence and register note — the detail the games are
built from. *Copy the queue* exports the pending words as JSON.

## The wall

The background is the glass wall at Incheon airport, in `Style/`. Each lobe is
a warped lattice printed in colour on backlit white glass — the white is the
gaps between threads, not paint over them, so overlaps multiply rather than
occlude. The palette is sampled off the panels: ultramarine, cyan, amber,
stone, cream, and the navy beam that caps every bay.

It renders as 64 parametric nets in real perspective. The shape is solved in a
vertex shader each frame rather than baked into the geometry, so the standing
waves travel and each body swells and draws back on its own phase — cloth in
slow air, which is what a hanging woven panel does. A 2D canvas mural stands in
where WebGL is unavailable.

The wall is deliberately **not** driven by your progress. A score tracker that
is also the wallpaper makes both a worse chart and a worse wall, and the room
you study in should not look like a progress bar.

## State

Everything is local to the browser, in `localStorage`:

| Key | Holds |
|---|---|
| `lexi.ranks.v2` | current rank per entry |
| `lexi.streak.v1` | the dates you completed a run |
| `lexi.inbox.v1` | the queue of caught words |
| `lexi.best.v1` | best run score, per deck |
| `lexi.used.v1` | when you used a word, and where |

The streak is stored as actual dates, never a counter — a counter cannot tell a
missed day from a clock change, and would happily keep a streak you had broken.

## Accessibility

Honours `prefers-reduced-motion`: entrances collapse, the wall holds still, and
nothing bounces or overshoots. Animations are never the only thing between the
reader and the content — anything that fades in is force-settled on a timer in
case the ticker stalls in a background tab. Full keyboard control: `1`–`4` pick
an answer, `Enter` advances, `Escape` leaves.

## Credits

The glass-wall photographs in `Style/` are the author's own, and their metadata
has been stripped. Everything else is original.
