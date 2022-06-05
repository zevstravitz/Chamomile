import { execSync } from "child_process";
import open from "open";
import prompts from "prompts";
import yargs from "yargs";
import { SKIP_ID } from "../../lib/constants";
import { linearClient } from "../../lib/linear";
import {
  getTeamCycleOptions,
  getTeamProjectOptions,
} from "../../lib/linear/utils/issues";

const args = {} as const;

export const command = "create";
export const aliases = ["c"];
export const builder = args;
export const canonical = "create issue";
export const description =
  "Create linear issue while simultaneously generating git branch.";

type argsT = yargs.Arguments<yargs.InferredOptionTypes<typeof args>>;

export const handler = async (_argv: argsT): Promise<void> => {
  const me = await linearClient.viewer;
  const organization = await me.organization;
  const teams = await organization.teams();

  const issueTeamSelection = await prompts([
    {
      type: "select",
      name: "teamId",
      message: "Select team",
      choices: teams.nodes.map(({ name, id }) => ({
        title: name,
        value: id,
      })),
    },
  ]);

  const issueTeam = teams.nodes.find(
    (team) => team.id === issueTeamSelection.teamId
  );

  if (!issueTeam) {
    console.log("Team not found");
    return process.exit(1);
  }
  const teamStatuses = await issueTeam.states();
  const teamLabels = await issueTeam.labels();
  const priorityValues = await linearClient.issuePriorityValues;

  const teamCycleOptions = await getTeamCycleOptions(issueTeam, true);
  const teamProjectOptions = await getTeamProjectOptions(issueTeam, true);

  const issueDetails = await prompts([
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

  const issueCreate = await linearClient.issueCreate({
    title: issueDetails.title,
    teamId: issueTeam.id,
    assigneeId: me.id,
    priority: issueDetails.priority,
    labelIds: issueDetails.labels,
    stateId: issueDetails.state,
    estimate: issueTeam.defaultIssueEstimate,
    projectId:
      issueDetails.project === SKIP_ID ? undefined : issueDetails.project,
    cycleId: issueDetails.cycle === SKIP_ID ? undefined : issueDetails.cycle,
  });

  const issue = await issueCreate.issue;
  if (issue === undefined) {
    return process.exit(1);
  }
  const { branchName, title, url } = issue;

  const createBranch = await prompts([
    {
      type: "confirm",
      name: "createBranch",
      message: "Create Branch?",
      initial: true,
    },
  ]);

  if (createBranch.createBranch) {
    execSync(`gt bc ${branchName} -m "${title}"`);
  }

  const openIssue = await prompts([
    {
      type: "confirm",
      name: "open",
      message: "Open Issue in Linear?",
    },
  ]);

  if (openIssue.open) {
    open(url);
  }

  return process.exit(0);
};
