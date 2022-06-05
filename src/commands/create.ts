import { Argv } from "yargs";

export const command = "create <command>";
export const desc = "Create a new issue";

//  process.env.NODE_ENV === "development" ? ["js", "ts"] : ["js"],

export const aliases = ["c"];
export const builder = function (yargs: Argv): Argv {
  return yargs
    .commandDir("create-commands", {
      extensions: ["js", "ts"],
    })
    .strict()
    .demandCommand();
};
