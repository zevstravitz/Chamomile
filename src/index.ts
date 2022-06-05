#!/usr/bin/env node
import yargs from "yargs";
import { preprocessCommand } from "./lib/utils/preprocess_commands";

preprocessCommand();
yargs(process.argv.slice(2))
  .help()
  .usage(
    ["Charcoal is an integrated CLI Tool for Graphite & Linear."].join("\n")
  )
  .strict()
  .commandDir("commands", {
    extensions: ["js", "ts"],
  })
  .demandCommand().argv;
