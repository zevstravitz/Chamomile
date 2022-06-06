import { Argv } from "yargs";

export const command = "auth <command>";
export const desc = "Authenticate Charcoal with a Provider";

export const aliases = ["a"];
export const builder = function (yargs: Argv): Argv {
  return yargs
    .commandDir("auth-commands", {
      extensions: ["js"],
    })
    .strict()
    .demandCommand();
};
