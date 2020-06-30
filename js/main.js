import { missionCount } from "./modules/missionCount.js";
import { missions } from "./modules/missions.js";
import { findFavor } from "./modules/favors.js";
import { findSpecialist } from "./modules/specialistTypes.js";
import { randomFromArray, randomKey } from "./modules/utilities.js";

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
  const commandersChoice = document.getElementById("commandersFocus").value;
  const gmChoice = document.getElementById("GMFocus").value;
  const allTypes = [];
  allTypes.push("commander", "gm");
  let kind = randomFromArray(allTypes);
  let choice = "";

  if (kind == "commander" && commandersChoice != "") {
    kind = commandersChoice;
    choice = "commander";
  } else {
    kind = randomFromArray(types);
  }

  if (kind == "gm" && gmChoice != "") {
    kind = gmChoice;
    choice = "gm";
  } else {
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

const hasSpecialMission = (value) => {
  console.log(`hasSpecialMission ${value}`);
  console.log(`spendIntel.checked ${spendIntel.checked}`);
  if (value) {
    return { isSpecialMission: true };
  } else if (spendIntel.checked) {
    return { isSpecialMission: true };
  } else {
    return { isSpecialMission: false };
  }
};

const createMissions = () => {
  const availableMissionTypes = availableMissionTypeGenerator();
  const selectedMissionCount = randomKey(missionCount);
  const specialMission = hasSpecialMission(
    missionCount[selectedMissionCount].specialMission
  );
  console.log(
    `specialMission.isSpecialMission ${specialMission.isSpecialMission}`
  );

  console.log(
    `missionCount[selectedMissionCount].count ${missionCount[selectedMissionCount].count}`
  );

  const numberOfMissions =
    specialMission.isSpecialMission == true
      ? 2
      : missionCount[selectedMissionCount].count;
  console.log(`numberOfMissions ${numberOfMissions}`);

  const specialist = findSpecialist(
    missionCount[selectedMissionCount].specialist,
    numberOfMissions
  );
  const favor = findFavor(
    missionCount[selectedMissionCount].favor,
    numberOfMissions
  );

  const missions = {};

  missions["specialMission"] = specialMission;

  for (let i = 0; i < numberOfMissions; i++) {
    missions[i] = singleMission(availableMissionTypes);
    missions[i]["specialist"] =
      specialist.number == i ? specialist.type : false;
    missions[i]["favor"] = favor.number == i ? favor.type : false;
  }

  return missions;
};

const templateSetup = (v) => {
  console.log("v is ");
  console.log(v);
  const specialist = v.specialist
    ? `<p>This mission requires a specialist. Maybe a ${v.specialist}</p>`
    : "";
  const favor = v.favor ? `<p>This mission gives ${v.favor} favor</p>` : "";
  const choice = v.choice ? `This was the ${v.choice}'s mission.` : "";
  return `<div class="col"><div class="card">
        <div class="card-body">
          <h5 class="card-title text-uppercase">${v.kind}${choice}</h5>
          <p class="card-text">
            <strong>Type:</strong> ${v.type} <br/>
            <strong>Rewards:</strong> ${v.rewards}<br/>
            <strong>Penalties:</strong> ${v.penalties}
            ${favor}${specialist}
          </p>
        </div>
      </div></div>`;
};

const addMissions = () => {
  const missionsHold = createMissions();
  const missions = Object.keys(missionsHold).map((key) => missionsHold[key]);
  let htmlToInsert = "";

  missions.map((v) => {
    if (v.isSpecialMission !== true) {
      htmlToInsert += templateSetup(v);
    }
  });

  document.getElementById("missions").innerHTML = htmlToInsert;
};

const generateMissionsButton = document.getElementById("generateMissions");
const spendIntel = document.getElementById("commanderSpentIntel");
const availableMissions = document.querySelectorAll(
  "[data-available-mission-type]"
);

generateMissionsButton.addEventListener("click", addMissions);
