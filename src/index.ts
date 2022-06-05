import yargs from "yargs";

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
