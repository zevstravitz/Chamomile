import { execSync } from "child_process";
import open from "open";
import prompts from "prompts";
import yargs from "yargs";
import { SKIP_ID } from "../../lib/constants";
import { getLinearClient } from "../../lib/linear";
import { promptIssueDetails } from "../../lib/linear/prompt/issue_details";
import { logLinear } from "../../lib/utils/log";

const args = {} as const;

export const command = "create";
export const aliases = ["c"];
export const builder = args;
export const canonical = "create issue";
export const description =
  "Create linear issue while simultaneously generating git branch.";

type argsT = yargs.Arguments<yargs.InferredOptionTypes<typeof args>>;

export async function handler(_argv: argsT): Promise<void> {
  const linearClient = getLinearClient();
  const me = await linearClient.viewer;
  const organization = await me.organization;
  const teams = await organization.teams();

  const issueTeamSelection = await prompts(
    [
      {
        type: "select",
        name: "teamId",
        message: "Select team",
        choices: teams.nodes.map(({ name, id }) => ({
          title: name,
          value: id,
        })),
      },
    ],
    {
      onCancel: () => {
        console.log("Cancelled");
        process.exit(0);
      },
    }
  );

  const issueTeam = teams.nodes.find(
    (team) => team.id === issueTeamSelection.teamId
  );

  if (!issueTeam) {
    console.log("Team not found");
    return process.exit(1);
  }

  const issueDetails = await promptIssueDetails(linearClient, issueTeam);

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
    await open(url);
  }
  logLinear(`Linear Issue URL: ${url}`);

  return process.exit(0);
}
