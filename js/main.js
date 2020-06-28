import { missionCount } from "./modules/missionCount.js";
import { missions } from "./modules/missions.js";
import { favors, findFavor } from "./modules/favors.js";
import { specialistTypes, findSpecialist } from "./modules/specialistTypes.js";
import {
  randomNumber,
  randomFromArray,
  randomKey,
} from "./modules/utilities.js";

const availableMissionTypeGenerator = () => {
  let availableMissionArray = Array.from(availableMissions);
  availableMissionArray = availableMissionArray.map((mission) => {
    if (mission.checked == true) {
      return mission.dataset.availableMissionType;
    }
  });
  availableMissionArray = availableMissionArray.filter(
    (mission) => typeof mission !== "undefined"
  );
  return availableMissionArray;
};

const singleMission = (types) => {
  const kind = randomFromArray(types);
  const type =
    missions[kind].type[(missions[kind].type.length * Math.random()) | 0];
  const rewards =
    missions[kind].rewards[(missions[kind].rewards.length * Math.random()) | 0];
  const penalties =
    missions[kind].penalties[
      (missions[kind].penalties.length * Math.random()) | 0
    ];
  return { kind, type, rewards, penalties };
};

const createMissions = () => {
  const availableMissionTypes = availableMissionTypeGenerator();
  const intelSpent = spendIntel.checked;
  const selectedMissionCount = randomKey(missionCount);
  const specialMission = missionCount[selectedMissionCount].specialMission;
  const missionSetup = intelSpent || specialMission ? 6 : selectedMissionCount;
  const numberOfMissions =
    missionSetup == 6 ? 2 : missionCount[selectedMissionCount].count;

  const specialist = findSpecialist(
    missionCount[selectedMissionCount].specialist,
    numberOfMissions
  );
  const favor = findFavor(
    missionCount[selectedMissionCount].favor,
    numberOfMissions
  );

  const missions = {};

  if (specialMission || intelSpent) {
    missions["specialMission"] = true;
  }

  for (let i = 1; i < numberOfMissions + 1; i++) {
    missions[i] = singleMission(availableMissionTypes);
    missions[i]["specialist"] =
      specialist.number == i ? specialist.type : false;
    missions[i]["favor"] = favor.number == i ? favor.type : false;
  }

  return missions;
};

const addMissions = () => {
  const missionsHold = createMissions();
  const missions = Object.keys(missionsHold).map((key) => missionsHold[key]);

  let template = "";

  missions.map((v) => {
    if (v === true) {
      template += "Specialist mission!";
    } else {
      const specialist = v.specialist
        ? `<p>This mission requires a specialist. Maybe a ${v.specialist}</p>`
        : "";
      const favor = v.favor ? `<p>This mission gives ${v.favor} favor</p>` : "";
      template += `<div class="col"><div class="card">
        <div class="card-body">
          <h5 class="card-title text-uppercase">${v.kind}</h5>
          <p class="card-text">
            <strong>Type:</strong> ${v.type} <br/>
            <strong>Rewards:</strong> ${v.rewards}<br/>
            <strong>Penalties:</strong> ${v.penalties}
            ${favor}${specialist}
          </p>
        </div>
      </div></div>`;
    }
  });

  document.getElementById("missions").innerHTML = template;
};

const generateMissionsButton = document.getElementById("generateMissions");
const spendIntel = document.getElementById("commanderSpentIntel");
const commanderSelectedMission = document.getElementById("commandersFocus");
const availableMissions = document.querySelectorAll(
  "[data-available-mission-type]"
);

generateMissionsButton.addEventListener("click", addMissions);
