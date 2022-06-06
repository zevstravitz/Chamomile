import { LinearClient } from "@linear/sdk";
import { userConfigFactory } from "../config/user_config";

const getLinearClient = (): LinearClient => {
  const userConfig = userConfigFactory.load();
  const linearClient = new LinearClient({
    apiKey: userConfig.data.linearAuthToken,
  });
  return linearClient;
};

export { getLinearClient };
