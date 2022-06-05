# Charcoal

## What is Charcoal?

Charcoal simplifies issue and git tracking from the command line.

As of now the focus is bridging workflows involving Graphite and Linear.

## Running Locally

To run Charcoal locally, you will want to first get a linear token from the linear app under **Settings > Account > API > Personal API Keys**. Generate a key and place it into the linear client under `src/lib/linear/client`. I'm working on a solution to persist the key. For now be sure not to push this in your PR.

Then run:

```
pnpm dev create issue
```

To test out issue creation.
