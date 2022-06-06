# Chamomile

<img width="1012" alt="Screen Shot 2022-06-05 at 6 12 42 PM" src="https://user-images.githubusercontent.com/32420166/172079062-73076548-18ff-48aa-a7f1-091cd6575378.png">

## What is Chamomile?

Chamomile simplifies issue and git tracking from the command line. As of now the focus is bridging workflows involving Graphite and Linear.

## Installing Chamomile

To use chamomile, you first have to have [Graphite](https://docs.graphite.dev/) installed.

To install chamomile, run `npm install -g chamomile-cli`.

Then to get started, run

```
cl auth linear -t <token>
chamomile issue create
```

## Getting a Linear Token

Get a linear token from the Linear App under **Settings > Account > API > Personal API Keys**. Generate a key and copy it, and substitute the token with the token variable up above.

## Shortcuts

Shortcuts are available for the following commands:
| Command | Shortcut |
| ----------- | ----------- |
| chamomile | cl |
| auth linear | al |
| issue create | ic |

So, for example, you can run `cl ic` to create a new issue.

## Running Locally

To run Chamomile locally, you will want to first get a linear ticket as described above.

Then run:

```
pnpm install
pnpm develop
cl auth linear -t <token>
cl ic
```

To test out issue creation.
