const missionCount = {
  1: {
    count: 3,
    specialist: false,
    favor: false,
    specialMission: false,
  },
  2: {
    count: 3,
    specialist: false,
    favor: false,
    specialMission: false,
  },
  3: {
    count: 3,
    specialist: true,
    favor: false,
    specialMission: false,
  },
  4: {
    count: 2,
    specialist: false,
    favor: false,
    specialMission: false,
  },
  5: {
    count: 3,
    specialist: false,
    favor: true,
    specialMission: false,
  },
  6: {
    count: 3,
    specialist: false,
    favor: false,
    specialMission: true,
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
};

const favors = ["Holy", "Mystic", "Glory", "Knowledge", "Mercy", "Wild"];

const specialistTypes = [
  "Heavy",
  "Medic",
  "Scout",
  "Sniper",
  "Officer",
  "Alchemist or Mercy",
];

const randomNumber = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max + 1);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
};

const randomFromArray = (array) => {
  return array[Math.floor(Math.random() * array.length)];
};

const randomKey = (obj) => {
  var keys = Object.keys(obj);
  return keys[(keys.length * Math.random()) << 0];
};

const randomMission = (obj, cmdChoice) => {
  const { count, specialist, favor, specialMission } = obj;
  let missionList = [];

  const specialistMissionNumber = specialist ? randomNumber(1, count) : false;
  const favorMissionNumber = favor ? randomNumber(1, count) : false;

  const finalCount = cmdChoice ? count - 1 : count;

  for (i = 0; i < finalCount; i++) {
    let missionType = randomKey(missions);
    let commandersFocus = false;
    let gmFocus = false;

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
      ...{
        specialist: specialistMissionNumber === i ? true : false,
      },
      ...{ favor: favorMissionNumber === i ? true : false },
    };
  }
  return missionList;
};

const createMissions = () => {
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
  });

  if (cmdChoice) {
    template += `<div class="col"><div class="card">
    <div class="card-body">
      <h5 class="card-title text-uppercase">Special Mission!</h5>
    </div>
  </div></div>`;
  }

  document.getElementById("missions").innerHTML = template;
};

const generateMissionsButton = document.getElementById("generateMissions");
generateMissionsButton.addEventListener("click", createMissions);

const commanderSpentIntelOnChange = () => {
  if (commanderSpentIntelInput.checked == true) {
    $("#commanderChooseType").collapse("show");
    if (commanderSelectedMission.value == "") {
      generateMissionsButton.disabled = true;
    }
  } else {
    $("#commanderChooseType").collapse("hide");
    generateMissionsButton.disabled = false;
    commanderSelectedMission.value = "";
  }
};

const commanderSpentIntelInput = document.getElementById("commanderSpentIntel");
commanderSpentIntelInput.addEventListener(
  "change",
  commanderSpentIntelOnChange
);

const commanderSelectedMissionHandler = () => {
  if (commanderSelectedMission.value == "") {
    generateMissionsButton.disabled = true;
  } else {
    generateMissionsButton.disabled = false;
  }
};

const commanderSelectedMission = document.getElementById("commandersFocus");
commanderSelectedMission.addEventListener(
  "change",
  commanderSelectedMissionHandler
);
