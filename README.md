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
| **EMBA Forever** | name the pattern, place the move, spot the miss, complete the set |
| **Quotes** | finish the line |

Entries move through three ranks — **New → Known → Used**. Ranks only ever go
up; a word you missed simply comes back sooner. A word reaches *Used* when you
tell the app you said or wrote it somewhere real, and it then drops out of
rotation.

## EMBA Forever

Concepts and course frameworks share a deck, because a named pattern and a
named checklist are both things you either see in front of you or you do not.
What differs is the question, and the entry chooses it.

A framework is an
**enumeration** — a checklist you have to be able to produce whole and then
apply — so nobody ever fails by confusing the 4 P's with Occam's razor. The
interesting failures are forgetting there were four, and thinking **Place**
means a shop rather than the whole distribution channel. The deck therefore
asks four different things of a framework, and its distractors are that
framework's own legs:

| Verb | The question |
|---|---|
| **Place the move** | a scene → which leg of the framework is this? |
| **Spot the miss** | a plan that ignored one leg → which one did they skip? |
| **Complete the set** | the legs shown with one blanked → type it |
| **Which lens** | a situation → which framework applies |
| **Name the pattern** | a scene → which concept is this? (the concept entries) |

*Which lens* stays dormant while there are fewer than four frameworks, because
picking between two is a coin toss. It switches itself on at the fourth.

Two frameworks among fourteen entries would leave most runs with no framework
at all, so a run that draws none is dealt one. A deck called EMBA Forever that
never asks an EMBA question is a deck that lied about its name.

Every entry carries a class, and the home screen has a checkbox per class
controlling what the deck draws from. Classes are a registry, not a string
copied onto each entry:

```js
const CLASSES=[
 {id:'mktg411', n:'411 · Marketing Management', short:'411 Marketing', prof:'Prof. Zeithammer'}
];
```

Adding a course is one row there plus a `cls` tag on its entries — the
checkbox, the citation under every answer and the filter all follow. The
selection is stored as the ids that are **off**, so a course added next term is
on by default for anyone who has opened the app before. Unticking everything
gives you every class rather than an empty deck: a deck switched entirely off
is a dead end, not a filter.

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
stone, iris, cream, and the navy beam that caps every bay.

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
| `lexi.classes.v1` | which classes the MBA deck is switched *off* for |

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
