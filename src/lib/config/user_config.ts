import * as t from "@withgraphite/retype";
import { composeConfig } from "./compose_config";

const schema = t.shape({
  linearAuthToken: t.optional(t.string),
  tips: t.optional(t.boolean),
  editor: t.optional(t.string),
  experimental: t.optional(t.boolean),
});

export const userConfigFactory = composeConfig({
  schema,
  defaultLocations: [
    {
      relativePath: ".chamomile_user_config",
      relativeTo: "USER_HOME",
    },
  ],
  initialize: () => {
    return {};
  },
  helperFunctions: () => {
    return {};
  },
});
