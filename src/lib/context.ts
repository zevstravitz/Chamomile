import { userConfigFactory } from "./config/user_config";

export type TContext = {
  userConfig: ReturnType<typeof userConfigFactory.load>;
};

export function initContext(): TContext {
  const userConfig = userConfigFactory.load();
  return {
    userConfig,
  };
}
