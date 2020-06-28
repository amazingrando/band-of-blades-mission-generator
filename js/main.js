import { missionCount } from "./modules/missionCount.js";
import { missions } from "./modules/missions.js";
import { favors } from "./modules/favors.js";
import { specialistTypes } from "./modules/specialistTypes.js";
import {
  randomNumber,
  randomFromArray,
  randomKey,
} from "./modules/utilities.js";

const randomMission = (obj, cmdChoice) => {
  const { count, specialist, favor, specialMission } = obj;
  let missionList = [];

  const specialistMissionNumber = specialist ? randomNumber(1, count) : false;
  const favorMissionNumber = favor ? randomNumber(1, count) : false;

  const finalCount = cmdChoice ? count - 1 : count;

  for (let i = 0; i < finalCount; i++) {
    let missionType = randomKey(missions);

    const mission = missions[missionType];

    if (missionType == "gmChoice" || missionType == "commandersChoice") {
      const choice = missionType == "gmChoice" ? "GM" : "Commander";
      missionList[i] = {
        ...missionList,
        ...{ randomSpecialMission: true },
        ...{ choice: choice },
      };
    } else {
      const type = mission.type[(mission.type.length * Math.random()) | 0];
      const rewards =
        mission.rewards[(mission.rewards.length * Math.random()) | 0];
      const penalties =
        mission.penalties[(mission.penalties.length * Math.random()) | 0];
      missionList[i] = {
        ...missionList,
        ...{ missionType: missionType },
        ...{ type: type },
        ...{ rewards: rewards },
        ...{ penalties: penalties },
        ...{
          specialist: specialistMissionNumber === i ? true : false,
        },
        ...{ favor: favorMissionNumber === i ? true : false },
        ...{ specialMission: specialMission },
        ...{ choice: false },
      };
    }
  }
  return missionList;
};

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
  const type = randomFromArray(types);
};

const createMissions = () => {
  const availableMissionTypes = availableMissionTypeGenerator();
  const intelSpent = spendIntel.checked;
  const missionSetup = intelSpent ? 6 : randomKey(missionCount);
  const numberOfMissions = missionCount[missionSetup].count;
  const newMission = {};

  for (let i = 0; i < numberOfMissions; i++) {
    newMission[i] = singleMission(availableMissionTypes, intelSpent);
  }
  console.log(newMission);

  /* =================================== */

  const cmdChoice = document.getElementById("commandersFocus").value
    ? document.getElementById("commandersFocus").value
    : false;
  const key = cmdChoice ? "6" : randomKey(missionCount);
  const missions = randomMission(missionCount[key], cmdChoice);

  let template = "";
  missions.map((v) => {
    const extraSpecialist = v.specialist
      ? `<br/>This mission requires another specialist. Perhaps a ${randomFromArray(
          specialistTypes
        )}?`
      : "";
    const favor = v.favor
      ? `<br/>This mission gives ${randomFromArray(favors)} Favor.`
      : "";
    if (v.randomSpecialMission) {
      template += `<div class="col"><div class="card">
          <div class="card-body">
            <h5 class="card-title text-uppercase">Special Mission!</h5>
            <p class="card-text">
            ${v.choice} gets to choose the mission type.
            </p>
            </div>
        </div></div>`;
    } else {
      template += `<div class="col"><div class="card">
      <div class="card-body">
        <h5 class="card-title text-uppercase">${v.missionType}</h5>
        <p class="card-text">
          <strong>Type:</strong> ${v.type} <br/>
          <strong>Rewards:</strong> ${v.rewards}<br/>
          <strong>Penalties:</strong> ${v.penalties}
          ${extraSpecialist}
          ${favor}
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

generateMissionsButton.addEventListener("click", createMissions);
