const missionCount = {
  1: {
    number: 3,
    specialist: 0,
    favor: 0,
    specialMission: 0,
  },
  2: {
    number: 3,
    specialist: 0,
    favor: 0,
    specialMission: 0,
  },
  3: {
    number: 3,
    specialist: 1,
    favor: 0,
    specialMission: 0,
  },
  4: {
    number: 2,
    specialist: 0,
    favor: 0,
    specialMission: 0,
  },
  5: {
    number: 3,
    specialist: 0,
    favor: 1,
    specialMission: 0,
  },
  6: {
    number: 3,
    specialist: 0,
    favor: 0,
    specialMission: 1,
  },
};

const missions = {
  assualt: {
    type: [
      "People.",
      "The Wild.",
      "Undead.",
      "Undead.",
      "Powerful Undead.",
      "Powerful Undead.",
    ],
    rewards: [
      "+2 Morale.",
      "+3 Morale.",
      "+4 Morale.",
      "+2 Morale. +1 Support.",
      "+2 Morale. +1 Intel.",
      "+2 Morale. -1 Time.",
    ],
    penalties: [
      "+1 Pressure. +1 Time.",
      "+1 Time.",
      "-1 Supply.",
      "+1 Pressure.",
      "+1 Pressure.",
      "+1 Pressure.",
    ],
  },
  recon: {
    type: [
      "Area Recon.",
      "Route Recon.",
      "Troop Recon.",
      "Infiltration.",
      "Exfiltration.",
      "Pick above + Danger.",
    ],
    rewards: [
      "+2 Intel.",
      "+2 Intel.",
      "Asset. +1 Intel.",
      "Asset or Troops. +1 Intel.",
      "+1 Intel. -1 Time.",
      "+3 Intel.",
    ],
    penalties: [
      "+1 Time.",
      "2 Deaths.",
      "1 Death.",
      "+1 Pressure.",
      "+1 Pressure.",
      "None.",
    ],
  },
  religious: {
    type: [
      "Escort.",
      "Cleansing.",
      "Defense.",
      "Unearth.",
      "Pick Above + Favor.",
      "Pick Above + Favor.",
    ],
    rewards: [
      "-1 Time. + 2 xp.",
      "+2 Morale. +10 Points.",
      "+1 Intel. +2 Morale.",
      "Fine Asset.",
      "Exceptional Asset.",
      "Specialist.",
    ],
    penalties: [
      "-1 Morale. +1 Pressure.",
      "+1 Pressure.",
      "+1 Pressure.",
      "-1 Morale.",
      "-1 Morale.",
      "None.",
    ],
  },
  supply: {
    type: [
      "Scrounge or Trade.",
      "Scrounge or Trade.",
      "Rescue Supplies.",
      "Rescue Supplies.",
      "Mercenary Work.",
      "Mercenary Work.",
    ],
    rewards: [
      "Asset. +1 Supply.",
      "Asset. +1 Supply.",
      "+2 Supply.",
      "Asset. +2 Supply.",
      "+3 Supply.",
      "+3 Supply.",
    ],
    penalties: [
      "-1 Morale. -1 Supply.",
      "-1 Supply.",
      "-1 Morale.",
      "-1 Morale",
      "None.",
      "None.",
    ],
  },
  commandersChoice: {},
  gmChoice: {},
};

const randomKey = function (obj) {
  var keys = Object.keys(obj);
  return keys[(keys.length * Math.random()) << 0];
};

const commandersChoice = () => {
  const cmdchoice = document.getElementById("commandersFocus");
  return cmdchoice.value;
};

const gmChoice = () => {
  const gmChoice = document.getElementById("gmChoice");
  return gmChoice.value;
};

const randomMission = (count) => {
  let missionList = [];

  for (i = 0; i < count; i++) {
    let missionType = randomKey(missions);
    let commandersFocus = false;
    let gmFocus = false;

    if (missionType == "commandersChoice") {
      missionType = commandersChoice();
      commandersFocus = true;
    } else if (missionType == "gmChoice") {
      missionType = gmChoice();
      gmFocus = true;
    }
    const mission = missions[missionType];

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
      ...{ commandersFocus: commandersFocus },
      ...{ gmFocus: gmFocus },
    };
  }
  return missionList;
};

const createMissions = () => {
  const numberOfMissions = missionCount[randomKey(missionCount)].number;
  const missions = randomMission(numberOfMissions);

  let i = 0;
  let template = "";
  missions.map((v, i) => {
    const focus = v.commandersFocus
      ? `<span class="badge badge-primary">Focus</span>`
      : "";
    const gmFocus = v.gmFocus
      ? `<span class="badge badge-danger">GM Choice</span>`
      : "";
    template += `<div class="col"><div class="card">
    <div class="card-body">
      <h5 class="card-title text-uppercase">${v.missionType} ${focus}${gmFocus}</h5>
      <p class="card-text">
        <strong>Type:</strong> ${v.type} <br/>
        <strong>Rewards:</strong> ${v.rewards}<br/>
        <strong>Penalties:</strong> ${v.penalties}
      </p>
    </div>
  </div></div>`;
    i++;
  });
  document.getElementById("missions").innerHTML = template;
};

const activateButton = () => {
  if (gmChoiceButton.value !== "" && commandersFocusButton.value != "") {
    generateMissionsButton.disabled = false;
  }
};

const gmChoiceButton = document.getElementById("gmChoice");
gmChoiceButton.addEventListener("change", activateButton);
const commandersFocusButton = document.getElementById("commandersFocus");
commandersFocusButton.addEventListener("change", activateButton);

const generateMissionsButton = document.getElementById("generateMissions");
generateMissionsButton.addEventListener("click", createMissions);
