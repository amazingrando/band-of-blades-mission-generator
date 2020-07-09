import { missionCount } from "./modules/missionCount.js";
import {
  missions,
  availableMissionTypeGenerator,
  hasSpecialMission,
  gatherSpecialMissions,
} from "./modules/missions.js";
import { findFavor } from "./modules/favors.js";
import { findSpecialist } from "./modules/specialistTypes.js";
import { templateSetup } from "./modules/template.js";
import { randomFromArray, randomKey } from "./modules/utilities.js";

const singleMission = (types, kind, choice) => {
  if (kind == "") {
    kind = randomFromArray(types);
  }
  const type =
    missions[kind].type[(missions[kind].type.length * Math.random()) | 0];
  const rewards =
    missions[kind].rewards[(missions[kind].rewards.length * Math.random()) | 0];
  const penalties =
    missions[kind].penalties[
      (missions[kind].penalties.length * Math.random()) | 0
    ];
  return { kind, type, rewards, penalties, choice };
};

const createMissions = () => {
  const availableMissionTypes = availableMissionTypeGenerator();
  const selectedMissionCount = randomKey(missionCount);
  const specialMission = hasSpecialMission(
    missionCount[selectedMissionCount].specialMission
  );

  const numberOfMissions =
    specialMission.isSpecialMission == true
      ? 2
      : missionCount[selectedMissionCount].count;

  const specialist = findSpecialist(
    missionCount[selectedMissionCount].specialist,
    numberOfMissions
  );

  const favor = findFavor(
    missionCount[selectedMissionCount].favor,
    numberOfMissions
  );

  let { kind, choice } = gatherSpecialMissions();

  const missions = {};

  if (specialMission.isSpecialMission) {
    missions["specialMission"] = specialMission;
  }

  for (let i = 0; i < numberOfMissions; i++) {
    missions[i] = singleMission(availableMissionTypes, kind, choice);
    missions[i]["specialist"] =
      specialist.number == i ? specialist.type : false;
    missions[i]["favor"] = favor.number == i ? favor.type : false;
    if (choice != "" && i == 0) {
      kind = "";
      choice = "";
    }
  }

  return missions;
};

const addMissions = () => {
  const missionsHold = createMissions();
  const missions = Object.keys(missionsHold).map((key) => missionsHold[key]);
  let htmlToInsert = "";

  missions.map((v) => {
    htmlToInsert += templateSetup(v);
  });

  const missionSection = document.getElementById("missions");

  missionSection.innerHTML = htmlToInsert;
};

const generateMissionsButton = document.getElementById("generateMissions");
generateMissionsButton.addEventListener("click", addMissions);
