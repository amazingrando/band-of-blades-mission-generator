export const templateSetup = (v) => {
  if (v.isSpecialMission == true) {
    return `<div class="col"><div class="card">
    <div class="card-body">
    <h5 class="card-title text-uppercase">Special Mission!</h5>
    </div>
    </div></div>`;
  } else {
    const specialist = v.specialist
      ? `<p>This mission requires a specialist. Maybe a ${v.specialist}</p>`
      : "";
    const favor = v.favor ? `<p>This mission gives ${v.favor} favor</p>` : "";
    const choice = v.choice ? `This was the ${v.choice}'s mission.` : "";
    return `<div class="col"><div class="card card--parchment">
    <div class="card-body">
    <h5 class="card-title text-uppercase text-center">
      <img src="${`images/${v.kind}.svg`}" alt="${v.kind} Icon">
      <span class="d-block mt-1">${v.kind} ${choice}</span>
    </h5>
    <p class="card-text">
    <strong>Type:</strong> ${v.type} <br/>
    <strong>Rewards:</strong> ${v.rewards}<br/>
    <strong>Penalties:</strong> ${v.penalties}
    ${favor}${specialist}
    </p>
    </div>
    </div></div>`;
  }
};
