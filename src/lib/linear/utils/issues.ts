import { Team } from "@linear/sdk";
import { SKIP_ID } from "../../constants";

const getTeamCycleOptions = async (
  issueTeam: Team,
  withSkip: boolean = false
) => {
  const teamCycles = await issueTeam.cycles();

  const cycleOptions = teamCycles.nodes
    .filter((cycle) => cycle.name)
    .map(({ name, id }) => ({
      title: name!,
      value: id,
    }));
  if (withSkip) {
    cycleOptions.unshift({
      title: "Skip (default)",
      value: SKIP_ID,
    });
  }
  return cycleOptions;
};

const getTeamProjectOptions = async (
  issueTeam: Team,
  withSkip: boolean = false
) => {
  const teamProjects = await issueTeam.projects();

  const projectOptions = teamProjects.nodes.map(({ name, id }) => ({
    title: name,
    value: id,
  }));
  if (withSkip) {
    projectOptions.unshift({
      title: "Skip (no project)",
      value: SKIP_ID,
    });
  }
  return projectOptions;
};

export { getTeamCycleOptions, getTeamProjectOptions };
