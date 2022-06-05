import { Argv } from "yargs";

export const command = "issue <command>";
export const desc = "Work with linear issues";

//  process.env.NODE_ENV === "development" ? ["js", "ts"] : ["js"],

export const aliases = ["i"];
export const builder = function (yargs: Argv): Argv {
  return yargs
    .commandDir("issue-commands", {
      extensions: ["js", "ts"],
    })
    .strict()
    .demandCommand();
};
