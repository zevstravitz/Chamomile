# Chamomile

## What is Chamomile?

Chamomile simplifies issue and git tracking from the command line.

<img width="1012" alt="Screen Shot 2022-06-05 at 6 12 42 PM" src="https://user-images.githubusercontent.com/32420166/172079062-73076548-18ff-48aa-a7f1-091cd6575378.png">

As of now the focus is bridging workflows involving Graphite and Linear.

## Running Locally

To run Chamomile locally, you will want to first get a linear token from the linear app under **Settings > Account > API > Personal API Keys**. Generate a key and place it into the linear client under `src/lib/linear/client`. I'm working on a solution to persist the key. For now be sure not to push this in your PR.

Then run:

```
pnpm install
pnpm develop
cl ic
```

To test out issue creation.
