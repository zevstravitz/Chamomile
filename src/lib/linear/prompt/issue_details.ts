import { LinearClient, Team } from "@linear/sdk";
import prompts from "prompts";
import {
  fetchTeamCycleOptions,
  fetchTeamProjectOptions,
} from "../utils/issues";

export async function promptIssueDetails(
  linearClient: LinearClient,
  issueTeam: Team
): Promise<
  prompts.Answers<
    "title" | "priority" | "state" | "labels" | "cycle" | "project"
  >
> {
  const teamStatuses = await issueTeam.states();
  const teamLabels = await issueTeam.labels();
  const priorityValues = await linearClient.issuePriorityValues;
  const teamCycleOptions = await fetchTeamCycleOptions(issueTeam, true);
  const teamProjectOptions = await fetchTeamProjectOptions(issueTeam, true);

  return await prompts([
    {
      type: "text",
      name: "title",
      message: "Issue Title",
    },
    {
      type: "select",
      name: "priority",
      message: "Select issue priority",
      choices: priorityValues.map((priorityValue) => ({
        title: priorityValue.label,
        value: priorityValue.priority,
      })),
    },
    {
      type: "select",
      name: "state",
      message: "Select issue state",
      choices: teamStatuses.nodes.map(({ name, id }) => ({
        title: name,
        value: id,
      })),
    },
    {
      type: "multiselect",
      name: "labels",
      message: "Select issue label",
      choices: teamLabels.nodes.map(({ name, id }) => ({
        title: name,
        value: id,
      })),
    },
    {
      type: "select",
      name: "cycle",
      message: "Select issue cycle",
      choices: teamCycleOptions,
      initial: 0,
    },
    {
      type: "select",
      name: "project",
      message: "Select issue project",
      choices: teamProjectOptions,
      initial: 0,
    },
  ]);
}
