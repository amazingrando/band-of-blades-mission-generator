import { randomNumber } from "./utilities.js";

const missions = {
  assault: {
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

const availableMissionTypeGenerator = () => {
  const availableMissions = document.querySelectorAll(
    "[data-available-mission-type]"
  );
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

const hasSpecialMission = (value) => {
  const spendIntel = document.getElementById("commanderSpentIntel");
  if (value) {
    return { isSpecialMission: true };
  } else if (spendIntel.checked) {
    return { isSpecialMission: true };
  } else {
    return { isSpecialMission: false };
  }
};

const gatherSpecialMissions = () => {
  const commandersChoice = document.getElementById("commandersFocus").value;
  const gmChoice = document.getElementById("GMFocus").value;

  const d6 = randomNumber(1, 6);
  let kind = "";
  let choice = "";
  if (d6 == 5 && commandersChoice != "") {
    kind = commandersChoice;
    choice = "commander";
  } else if (d6 == 6 && gmChoice != "") {
    kind = gmChoice;
    choice = "gm";
  }
  return { kind, choice };
};

export {
  missions,
  availableMissionTypeGenerator,
  hasSpecialMission,
  gatherSpecialMissions,
};
