import chalk from "chalk";
import yargs from "yargs";
import { userConfigFactory } from "../../lib/config/user_config";

const args = {
  token: {
    type: "string",
    alias: "t",
    describe: "Auth token.",
    demandOption: false,
  },
} as const;
type argsT = yargs.Arguments<yargs.InferredOptionTypes<typeof args>>;

export const USER_CONFIG_OVERRIDE_ENV = "CHARCOAL_USER_CONFIG_PATH" as const;

export const command = "linear";
export const description =
  "Add your auth token to enable Charcoal CLI to integrate with Linear.";
export const builder = args;
export const canonical = "Linear Auth";

export const handler = async (argv: argsT): Promise<void> => {
  const userConfig = userConfigFactory.load();

  if (argv.token) {
    userConfig.update((data) => (data.linearAuthToken = argv.token));
    chalk.green(`🔐 Saved auth token to "${userConfig.path}"`);
    return;
  }
  userConfig.data.linearAuthToken ?? "No auth token set.";
};
