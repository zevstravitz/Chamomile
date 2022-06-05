#!/usr/bin/env node
import yargs from "yargs";
import { preprocessCommand } from "./lib/utils/preprocess_commands";

preprocessCommand();
// eslint-disable-next-line @typescript-eslint/no-floating-promises
yargs(process.argv.slice(2))
  .help()
  .usage(
    [
      "🧘‍♀️ Charcoal simplifies issue and git tracking from the command line.",
    ].join("\n")
  )
  .strict()
  .commandDir("commands", {
    extensions: ["js"],
  })
  .demandCommand().argv;
