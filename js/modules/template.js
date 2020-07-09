export const templateSetup = (v) => {
  if (v.isSpecialMission == true) {
    return `<div class="ol-md-6 col-lg-4"><div class="card card--parchment">
    <div class="card-body">
    <h5 class="card-title text-uppercase text-center" style="line-height: 0.7">Special Mission</h5>
    <p class="h1 mt-4 text-center" style="font-size:6rem;"><i class="fas fa-fist-raised"></i></p>
    </div>
    </div></div>`;
  } else {
    const specialist = v.specialist
      ? `<p class="card-text"><em>This mission requires a specialist. Maybe a ${v.specialist}?</em></p>`
      : "";
    const favor = v.favor
      ? `<p class="card-text"><em>This mission gives ${v.favor} favor</em></p>`
      : "";
    const choice = v.choice
      ? `<p><em>This was the ${v.choice}'s mission.</em></p>`
      : "";
    return `<div class="col-md-6 col-lg-4"><div class="card card--parchment">
    <div class="card-body">
    <h5 class="card-title text-uppercase text-center">
      <img src="${`images/${v.kind}.svg`}" alt="${v.kind} Icon">
      <span class="d-block mt-1">${v.kind}</span>
    </h5>
    <p class="card-text mb-1">
      ${choice}
    </p>
    <p class="card-text mb-1">
      <i class="fas fa-scroll-old"></i>
      <strong>Type:</strong> ${v.type}
    </p>
    <p class="card-text mb-1">
      <i class="fas fa-sword"></i>
      <strong>Rewards:</strong> ${v.rewards}
    </p>
    <p class="card-text mb-1">
      <i class="fas fa-skull-crossbones"></i>
      <strong>Penalties:</strong> ${v.penalties}
    </p>
    ${favor}${specialist}
    </div>
    </div></div>`;
  }
};
