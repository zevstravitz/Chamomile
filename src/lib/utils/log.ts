import chalk from "chalk";

const log = console.log;

export const logLinear = (message: string): void => {
  log(chalk.bgHex("#323DA2")(message));
};
