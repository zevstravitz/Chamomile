import { execSync } from "child_process";
import open from "open";
import prompts from "prompts";
import yargs from "yargs";
import { linearClient } from "../../lib/linear";

const args = {} as const;

export const command = "issue";
export const aliases = ["i"];
export const builder = args;
export const canonical = "create issue";
export const description =
  "Create linear issue while simultaneously generating git branch.";

type argsT = yargs.Arguments<yargs.InferredOptionTypes<typeof args>>;

export const handler = async (argv: argsT): Promise<void> => {
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
    process.exit(1);
  }
  const teamStatuses = await issueTeam.states();
  const teamLabels = await issueTeam.labels();

  const issueDetails = await prompts([
    {
      type: "text",
      name: "title",
      message: "Issue Title",
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
  ]);

  const issueCreate = await linearClient.issueCreate({
    title: issueDetails.title,
    teamId: issueTeam.id,
    assigneeId: me.id,
    labelIds: issueDetails.labels,
    stateId: issueDetails.state,
    estimate: issueTeam.defaultIssueEstimate,
  });

  const issue = await issueCreate.issue;
  if (issue === undefined) {
    process.exit(1);
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

  process.exit(0);
};
