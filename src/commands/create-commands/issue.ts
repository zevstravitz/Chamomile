import yargs from "yargs";

const args = {} as const;

export const command = "issue";
export const aliases = ["i"];
export const builder = args;
export const canonical = "create issue";
export const description =
  "Create linear issue while simultaneously generating git branch.";

type argsT = yargs.Arguments<yargs.InferredOptionTypes<typeof args>>;

export const handler = async (argv: argsT): Promise<void> => {
  console.log("argv");
};
