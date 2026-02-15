import { FACULTIES, CATEGORY_LABELS } from "./data.js";

const facultyModal = document.getElementById("facultyModal");
const facultyButtonGrid = document.getElementById("facultyButtonGrid");
const facultyControlWrap = document.getElementById("facultyControlWrap");
const facultySelect = document.getElementById("facultySelect");
const programWrap = document.getElementById("programWrap");
const programSelect = document.getElementById("programSelect");
const inputsArea = document.getElementById("inputsArea");

const ctValueEl = document.getElementById("ctValue");
const ctRawValueEl = document.getElementById("ctRawValue");
const secondaryValueEl = document.getElementById("secondaryValue");
const totalValueEl = document.getElementById("totalValue");
const ratioValueEl = document.getElementById("ratioValue");
const barFillEl = document.getElementById("barFill");
const ctFloatValueEl = document.getElementById("ctFloatValue");
const secondaryFloatValueEl = document.getElementById("secondaryFloatValue");
const totalFloatValueEl = document.getElementById("totalFloatValue");
let currentCtInputMode = "detail";

const toFixed2 = (num) => num.toLocaleString("ja-JP", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function bindStepHold(button, applyDelta) {
  let timeoutId = null;
  let intervalId = null;

  const stop = () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
      timeoutId = null;
    }
    if (intervalId) {
      clearInterval(intervalId);
      intervalId = null;
    }
  };

  button.addEventListener("pointerdown", (event) => {
    event.preventDefault();
    applyDelta();
    timeoutId = setTimeout(() => {
      intervalId = setInterval(applyDelta, 60);
    }, 260);
  });

  button.addEventListener("pointerup", stop);
  button.addEventListener("pointerleave", stop);
  button.addEventListener("pointercancel", stop);
  button.addEventListener("lostpointercapture", stop);
}

function splitByCount(subject, section) {
  const count = subject.count ?? 1;
  const totalWeighted = section === "ct" ? subject.weight : subject.max;
  if (section === "ct" && subject.id === "foreign") {
    const readingRatio = subject.readingRatio ?? 0.75;
    const listeningRatio = 1 - readingRatio;
    return [
      {
        key: "foreign-reading",
        label: "英語リーディング",
        rawMax: 100,
        weightedMax: totalWeighted * readingRatio
      },
      {
        key: "foreign-listening",
        label: "英語リスニング",
        rawMax: 100,
        weightedMax: totalWeighted * listeningRatio
      }
    ];
  }
  const partRawMax = subject.rawMax / count;
  const partWeightedMax = totalWeighted / count;
  const baseLabel = CATEGORY_LABELS[subject.id] ?? subject.id;

  return Array.from({ length: count }).map((_, idx) => ({
    key: `${subject.id}-${idx + 1}`,
    label: count > 1 ? `${baseLabel}${idx + 1}` : baseLabel,
    rawMax: partRawMax,
    weightedMax: partWeightedMax
  }));
}

function getSelectedFaculty() {
  return FACULTIES.find((f) => f.id === facultySelect.value);
}

function getSelectedProgram() {
  const faculty = getSelectedFaculty();
  if (!faculty) return null;
  return faculty.programs.find((p) => p.id === programSelect.value) ?? faculty.programs[0];
}

function renderFacultyOptions() {
  FACULTIES.forEach((f) => {
    const opt = document.createElement("option");
    opt.value = f.id;
    opt.textContent = f.name;
    facultySelect.appendChild(opt);
  });
}

function renderFacultyButtons() {
  facultyButtonGrid.innerHTML = "";
  FACULTIES.forEach((f) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "faculty-button";
    btn.textContent = f.name;
    btn.addEventListener("click", () => {
      facultySelect.value = f.id;
      facultyControlWrap.hidden = false;
      closeFacultyModal();
      renderProgramOptions();
      renderInputs();
    });
    facultyButtonGrid.appendChild(btn);
  });
}

function closeFacultyModal() {
  facultyModal.classList.add("is-hidden");
  facultyModal.hidden = true;
}

function renderProgramOptions() {
  const faculty = getSelectedFaculty();
  programSelect.innerHTML = "";
  if (!faculty) {
    programWrap.hidden = true;
    return;
  }

  if (faculty.programs.length === 1) {
    programWrap.hidden = true;
    programSelect.value = faculty.programs[0].id;
    return;
  }

  programWrap.hidden = false;
  faculty.programs.forEach((p) => {
    const opt = document.createElement("option");
    opt.value = p.id;
    opt.textContent = p.name;
    programSelect.appendChild(opt);
  });
}

function createInputRow({ sectionKey, subject, subjectKey, rawMax, weightedMax, caption }) {
  const row = document.createElement("label");
  row.className = "input-row";

  const label = document.createElement("span");
  label.className = "input-label";
  label.textContent = subject;

  const scoreInputs = document.createElement("div");
  scoreInputs.className = "score-inputs";

  const minusBtn = document.createElement("button");
  minusBtn.type = "button";
  minusBtn.className = "step-btn";
  minusBtn.textContent = "−";

  const rangeInput = document.createElement("input");
  rangeInput.type = "range";
  rangeInput.min = "0";
  rangeInput.max = String(rawMax);
  rangeInput.step = "1";
  rangeInput.value = "0";
  rangeInput.className = "score-range";
  rangeInput.dataset.section = sectionKey;
  rangeInput.dataset.subject = subjectKey;
  rangeInput.dataset.rawMax = String(rawMax);
  rangeInput.dataset.weightedMax = String(weightedMax);
  rangeInput.dataset.role = "slider";

  const plusBtn = document.createElement("button");
  plusBtn.type = "button";
  plusBtn.className = "step-btn";
  plusBtn.textContent = "+";

  const value = document.createElement("span");
  value.className = "score-value";
  value.dataset.valueFor = `${sectionKey}:${subjectKey}`;
  value.textContent = `0/${Math.round(rawMax)}`;

  const meta = document.createElement("span");
  meta.className = "score-meta";
  meta.dataset.meta = `${sectionKey}:${subjectKey}`;
  meta.textContent = caption;

  const applyValue = (next) => {
    const max = Number(rangeInput.max);
    const safe = Math.round(clamp(next, 0, max));
    rangeInput.value = String(safe);
    value.textContent = `${safe}/${Math.round(max)}`;
    calculate();
  };

  bindStepHold(minusBtn, () => applyValue(Number(rangeInput.value) - 1));
  bindStepHold(plusBtn, () => applyValue(Number(rangeInput.value) + 1));
  rangeInput.addEventListener("input", () => applyValue(Number(rangeInput.value)));

  scoreInputs.append(minusBtn, rangeInput, plusBtn, value);
  row.append(label, scoreInputs, meta);
  return row;
}

function createWeightedInputRow({ sectionKey, subject, subjectKey, weightedMax }) {
  const row = document.createElement("label");
  row.className = "input-row";

  const label = document.createElement("span");
  label.className = "input-label";
  label.textContent = `${subject}（傾斜後満点 ${toFixed2(weightedMax)}）`;

  const scoreInputs = document.createElement("div");
  scoreInputs.className = "score-inputs";

  const minusBtn = document.createElement("button");
  minusBtn.type = "button";
  minusBtn.className = "step-btn";
  minusBtn.textContent = "−";

  const input = document.createElement("input");
  input.type = "range";
  input.min = "0";
  input.max = String(Math.floor(weightedMax));
  input.step = "1";
  input.value = "0";
  input.className = "score-range";
  input.dataset.section = sectionKey;
  input.dataset.subject = subjectKey;
  input.dataset.weightedMax = String(weightedMax);
  input.dataset.role = "slider";

  const plusBtn = document.createElement("button");
  plusBtn.type = "button";
  plusBtn.className = "step-btn";
  plusBtn.textContent = "+";

  const value = document.createElement("span");
  value.className = "score-value";
  value.dataset.valueFor = `${sectionKey}:${subjectKey}`;
  value.textContent = `0/${Math.round(weightedMax)}`;

  const applyValue = (next) => {
    const max = Number(input.max);
    const safe = Math.round(clamp(next, 0, max));
    input.value = String(safe);
    value.textContent = `${safe}/${Math.round(max)}`;
    calculate();
  };

  bindStepHold(minusBtn, () => applyValue(Number(input.value) - 1));
  bindStepHold(plusBtn, () => applyValue(Number(input.value) + 1));
  input.addEventListener("input", () => applyValue(Number(input.value)));

  scoreInputs.append(minusBtn, input, plusBtn, value);
  row.append(label, scoreInputs);
  return row;
}

function renderInputs() {
  const program = getSelectedProgram();
  inputsArea.innerHTML = "";
  if (!program) return;
  currentCtInputMode = "detail";
  const ctParts = program.ctSubjects.flatMap((s) => splitByCount(s, "ct"));

  const ctCard = document.createElement("section");
  ctCard.className = "panel";
  ctCard.innerHTML = `<h3>共通テスト</h3>`;

  const tabWrap = document.createElement("div");
  tabWrap.className = "ct-tabs";
  tabWrap.innerHTML = `
    <button type="button" class="ct-tab is-active" data-mode="detail">科目別 素点</button>
    <button type="button" class="ct-tab" data-mode="weighted">傾斜 合計点</button>
  `;
  ctCard.appendChild(tabWrap);

  const detailPane = document.createElement("div");
  detailPane.className = "input-mode-pane";
  detailPane.dataset.pane = "detail";
  ctParts.forEach((s) => {
    detailPane.appendChild(
      createInputRow({
        sectionKey: "ct-detail",
        subject: s.label,
        rawMax: s.rawMax,
        weightedMax: s.weightedMax,
        caption: `傾斜後 0.0 / ${s.weightedMax}`,
        subjectKey: s.key
      })
    );
  });

  const weightedPane = document.createElement("div");
  weightedPane.className = "input-mode-pane";
  weightedPane.dataset.pane = "weighted";
  weightedPane.hidden = true;
  weightedPane.appendChild(
    createWeightedInputRow({
      sectionKey: "ct-weighted-total",
      subject: `共通テスト合計（傾斜後）`,
      weightedMax: program.totals.ct,
      subjectKey: "ct-total"
    })
  );

  tabWrap.querySelectorAll(".ct-tab").forEach((btn) => {
    btn.addEventListener("click", () => {
      const mode = btn.dataset.mode;
      currentCtInputMode = mode;
      tabWrap.querySelectorAll(".ct-tab").forEach((b) => b.classList.toggle("is-active", b === btn));
      detailPane.hidden = mode !== "detail";
      weightedPane.hidden = mode !== "weighted";
      calculate();
    });
  });

  ctCard.append(detailPane, weightedPane);

  const secondaryCard = document.createElement("section");
  secondaryCard.className = "panel";
  secondaryCard.innerHTML = `<h3>二次試験</h3>`;
  program.secondarySubjects
    .map((s) => ({ ...s, rawMax: s.rawMax ?? s.max }))
    .flatMap((s) => splitByCount(s, "secondary"))
    .forEach((s) => {
    secondaryCard.appendChild(
      createInputRow({
        sectionKey: "secondary",
        subject: s.label,
        rawMax: s.rawMax,
        weightedMax: s.weightedMax,
        caption: `傾斜後 0.0 / ${s.weightedMax}`,
        subjectKey: s.key
      })
    );
  });

  inputsArea.append(ctCard, secondaryCard);

  calculate();
}

function calculate() {
  const program = getSelectedProgram();
  if (!program) return;
  const ctParts = program.ctSubjects.flatMap((s) => splitByCount(s, "ct"));

  const byKey = (section, key) =>
    inputsArea.querySelector(`input[data-role="slider"][data-section="${section}"][data-subject="${key}"]`);

  let ctRawScore = 0;
  const ctRawMax = ctParts.reduce((sum, s) => sum + s.rawMax, 0);
  let ctScore = 0;
  if (currentCtInputMode === "weighted") {
    const input = byKey("ct-weighted-total", "ct-total");
    ctScore = clamp(Number(input?.value || 0), 0, program.totals.ct);
    ctParts.forEach((s) => {
      const detailInput = byKey("ct-detail", s.key);
      ctRawScore += Math.round(clamp(Number(detailInput?.value || 0), 0, s.rawMax));
    });
  } else {
    let ctRawWeighted = 0;
    ctParts.forEach((s) => {
      const input = byKey("ct-detail", s.key);
      const score = Math.round(clamp(Number(input?.value || 0), 0, s.rawMax));
      ctRawScore += score;
      const weighted = (score / s.rawMax) * s.weightedMax;
      ctRawWeighted += weighted;
      const meta = inputsArea.querySelector(`[data-meta="ct-detail:${s.key}"]`);
      if (meta) meta.textContent = `傾斜後 ${toFixed2(weighted)} / ${toFixed2(s.weightedMax)}`;
    });
    ctScore = program.ctScale
      ? (ctRawWeighted / program.ctScale.from) * program.ctScale.to
      : ctRawWeighted;
  }

  let secondary = 0;
  program.secondarySubjects
    .map((s) => ({ ...s, rawMax: s.rawMax ?? s.max }))
    .flatMap((s) => splitByCount(s, "secondary"))
    .forEach((s) => {
    const input = byKey("secondary", s.key);
    const rawScore = Math.round(clamp(Number(input?.value || 0), 0, s.rawMax));
    const weighted = (rawScore / s.rawMax) * s.weightedMax;
    secondary += weighted;
    const meta = inputsArea.querySelector(`[data-meta="secondary:${s.key}"]`);
    if (meta) meta.textContent = `傾斜後 ${toFixed2(weighted)} / ${toFixed2(s.weightedMax)}`;
  });

  const total = ctScore + secondary;
  const ratio = (total / program.totals.overall) * 100;

  ctValueEl.textContent = `${toFixed2(ctScore)} / ${toFixed2(program.totals.ct)}`;
  ctRawValueEl.textContent = `${Math.round(ctRawScore)} / ${Math.round(ctRawMax)}`;
  secondaryValueEl.textContent = `${toFixed2(secondary)} / ${toFixed2(program.totals.secondary)}`;
  totalValueEl.textContent = `${toFixed2(total)} / ${toFixed2(program.totals.overall)}`;
  ratioValueEl.textContent = `${toFixed2(ratio)}%`;
  barFillEl.style.width = `${Math.min(100, Math.max(0, ratio))}%`;

  ctFloatValueEl.textContent = toFixed2(ctScore);
  secondaryFloatValueEl.textContent = toFixed2(secondary);
  totalFloatValueEl.textContent = toFixed2(total);
}

facultySelect.addEventListener("change", () => {
  renderProgramOptions();
  renderInputs();
});
programSelect.addEventListener("change", renderInputs);

renderFacultyOptions();
renderFacultyButtons();
