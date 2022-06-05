import { Team } from "@linear/sdk";
import { SKIP_ID } from "../../constants";

const fetchTeamCycleOptions = async (
  issueTeam: Team,
  withSkip: boolean
): Promise<{ title: string; value: string }[]> => {
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

const fetchTeamProjectOptions = async (
  issueTeam: Team,
  withSkip: boolean
): Promise<{ title: string; value: string }[]> => {
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

export { fetchTeamCycleOptions, fetchTeamProjectOptions };
