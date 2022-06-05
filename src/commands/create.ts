import { Argv } from "yargs";

export const command = "create <command>";
export const desc = "Create a new issue";

export const aliases = ["c"];
export const builder = function (yargs: Argv): Argv {
  console.log("here!!");

  return yargs
    .commandDir("create-commands", {
      extensions: ["js", "ts"],
    })
    .strict()
    .demandCommand();
};
