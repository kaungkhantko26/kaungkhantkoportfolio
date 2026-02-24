const STORAGE_KEY = "newsteps_data_v1";
const SESSION_HISTORY_KEY = "newsteps_session_history_v1";
const DAYS_PER_MONTH = 30;
const GROWTH_RATE = 0.05;

const ids = [
  "income",
  "goal",
  "timeframeType",
  "timeframeValue",
  "deadlineMonths",
  "snacks",
  "transport",
  "schoolFees",
  "mobile",
  "entertainment",
  "other",
  "snacksReduction",
  "transportReduction",
  "schoolFeesReduction",
  "mobileReduction",
  "entertainmentReduction",
  "otherReduction",
  "receiptAddMode"
];

const elements = Object.fromEntries(ids.map((id) => [id, document.getElementById(id)]));

const output = {
  currentTotalExpenses: document.getElementById("currentTotalExpenses"),
  currentMonthlySavings: document.getElementById("currentMonthlySavings"),
  currentYearlySavings: document.getElementById("currentYearlySavings"),
  currentTimeToGoal: document.getElementById("currentTimeToGoal"),
  reducedTotalExpenses: document.getElementById("reducedTotalExpenses"),
  reducedMonthlySavings: document.getElementById("reducedMonthlySavings"),
  reducedYearlySavings: document.getElementById("reducedYearlySavings"),
  reducedTimeToGoal: document.getElementById("reducedTimeToGoal"),
  adviceMessage: document.getElementById("adviceMessage"),
  lossAversionMessage: document.getElementById("lossAversionMessage"),
  smartGoalMessage: document.getElementById("smartGoalMessage"),
  moneyDrainMessage: document.getElementById("moneyDrainMessage"),
  needsWantsMessage: document.getElementById("needsWantsMessage"),
  personalityMessage: document.getElementById("personalityMessage"),
  behaviorTrendMessage: document.getElementById("behaviorTrendMessage"),
  receiptStatus: document.getElementById("receiptStatus"),
  goalProgress: document.getElementById("goalProgress"),
  goalProgressText: document.getElementById("goalProgressText"),
  projection1y: document.getElementById("projection1y"),
  projection3y: document.getElementById("projection3y"),
  projection5y: document.getElementById("projection5y"),
  compoundComparison: document.getElementById("compoundComparison")
};

const receiptDropZone = document.getElementById("receiptDropZone");
const receiptFileInput = document.getElementById("receiptFile");
const calculateBtn = document.getElementById("calculateBtn");
const resetBtn = document.getElementById("resetBtn");
const sessionId = `${Date.now()}-${Math.random().toString(16).slice(2)}`;
const defaultFormState = {};
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

let expenseChart;

function setAnimatedText(element, text) {
  if (!element) return;
  if (element.textContent === text) return;
  element.textContent = text;
  element.classList.remove("value-pulse");
  // Restart animation on every value change.
  void element.offsetWidth;
  element.classList.add("value-pulse");
}

function num(value) {
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : 0;
}

function formatCurrency(value) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "MMK",
    maximumFractionDigits: 0
  }).format(value);
}

function calculateBreakEvenMonths(goal, monthlySavings) {
  if (monthlySavings <= 0 || goal <= 0) return null;

  // Financial logic: break-even months = goal / monthly savings.
  return Math.ceil(goal / monthlySavings);
}

function renderBreakEven(goal, monthlySavings) {
  const months = calculateBreakEvenMonths(goal, monthlySavings);
  if (!months) {
    return "Goal cannot be reached with current spending pattern.";
  }
  if (months < 12) return `${months} month(s)`;

  const years = Math.floor(months / 12);
  const rem = months % 12;
  return rem ? `${years} year(s) ${rem} month(s)` : `${years} year(s)`;
}

function reducedExpense(baseExpense, reductionPercent) {
  // Financial logic: reduced spending = original spending * (1 - reduction rate).
  return baseExpense * (1 - reductionPercent / 100);
}

function getInputData() {
  return {
    dailyIncome: num(elements.income.value),
    goal: num(elements.goal.value),
    timeframeType: elements.timeframeType.value,
    timeframeValue: Math.max(1, Math.floor(num(elements.timeframeValue.value) || 1)),
    deadlineMonths: Math.max(1, Math.floor(num(elements.deadlineMonths.value) || 1)),
    snacks: num(elements.snacks.value),
    transport: num(elements.transport.value),
    schoolFees: num(elements.schoolFees.value),
    mobile: num(elements.mobile.value),
    entertainment: num(elements.entertainment.value),
    other: num(elements.other.value),
    snacksReduction: num(elements.snacksReduction.value),
    transportReduction: num(elements.transportReduction.value),
    schoolFeesReduction: num(elements.schoolFeesReduction.value),
    mobileReduction: num(elements.mobileReduction.value),
    entertainmentReduction: num(elements.entertainmentReduction.value),
    otherReduction: num(elements.otherReduction.value)
  };
}

function setReductionLabels(data) {
  document.getElementById("snacksReductionValue").textContent = `${data.snacksReduction}%`;
  document.getElementById("transportReductionValue").textContent = `${data.transportReduction}%`;
  document.getElementById("schoolFeesReductionValue").textContent = `${data.schoolFeesReduction}%`;
  document.getElementById("mobileReductionValue").textContent = `${data.mobileReduction}%`;
  document.getElementById("entertainmentReductionValue").textContent = `${data.entertainmentReduction}%`;
  document.getElementById("otherReductionValue").textContent = `${data.otherReduction}%`;
}

function styleAdvice(element, mode) {
  if (!element) return;

  if (mode === "bad") {
    element.style.borderColor = "#fecaca";
    element.style.background = "#fef2f2";
    return;
  }

  if (mode === "good") {
    element.style.borderColor = "#bbf7d0";
    element.style.background = "#f0fdf4";
    return;
  }

  element.style.borderColor = "#bfdbfe";
  element.style.background = "#eff6ff";
}

function updateAdvice(monthlySavings, monthlyIncome) {
  if (monthlyIncome <= 0) {
    output.adviceMessage.textContent = "Add daily pocket money to receive behavior feedback.";
    styleAdvice(output.adviceMessage, "neutral");
    return;
  }

  // Financial logic: savings rate = monthly savings / monthly income.
  const savingsRate = (monthlySavings / monthlyIncome) * 100;

  if (savingsRate < 10) {
    output.adviceMessage.textContent = "High consumption pattern detected. Try reducing flexible spending categories.";
    styleAdvice(output.adviceMessage, "bad");
  } else if (savingsRate > 30) {
    output.adviceMessage.textContent = "Strong saving discipline. Keep this momentum for long-term growth.";
    styleAdvice(output.adviceMessage, "good");
  } else {
    output.adviceMessage.textContent = "Balanced pattern. Small optimizations can accelerate your goal timeline.";
    styleAdvice(output.adviceMessage, "neutral");
  }
}

function updateLossAversion(monthlyIncome, currentMonthlyExpenses) {
  if (monthlyIncome <= 0) {
    output.lossAversionMessage.textContent = "Loss aversion insight appears after entering daily income and spending.";
    styleAdvice(output.lossAversionMessage, "neutral");
    return;
  }

  const spendingRate = (currentMonthlyExpenses / monthlyIncome) * 100;

  if (spendingRate > 70) {
    // Financial logic (Loss Aversion): Any spending above 70% is treated as avoidable loss.
    // Opportunity Cost Loss/year = (actual spending - 70% spending threshold) * 12.
    const thresholdSpending = monthlyIncome * 0.7;
    const opportunityCostLossYear = Math.max(0, (currentMonthlyExpenses - thresholdSpending) * 12);

    output.lossAversionMessage.textContent =
      `You are losing ${formatCurrency(opportunityCostLossYear)} per year that could have been saved.`;
    styleAdvice(output.lossAversionMessage, "bad");
  } else {
    output.lossAversionMessage.textContent = "Great control. Your spending is within the 70% safety range.";
    styleAdvice(output.lossAversionMessage, "good");
  }
}

function evaluateSmartGoal(goal, monthlySavings, deadlineMonths) {
  if (goal <= 0 || deadlineMonths <= 0) {
    output.smartGoalMessage.textContent = "SMART goal analysis appears after entering goal, monthly savings, and deadline.";
    styleAdvice(output.smartGoalMessage, "neutral");
    return;
  }

  // Financial logic (SMART - Achievability): reachable if savings*deadline >= goal.
  const projectedByDeadline = monthlySavings * deadlineMonths;
  const requiredMonthlySavings = goal / deadlineMonths;
  const adjustment = Math.max(0, requiredMonthlySavings - monthlySavings);

  if (projectedByDeadline >= goal) {
    output.smartGoalMessage.textContent =
      `SMART Goal: Achievable. Required monthly savings is ${formatCurrency(requiredMonthlySavings)}.`;
    styleAdvice(output.smartGoalMessage, "good");
  } else {
    output.smartGoalMessage.textContent =
      `SMART Goal: Not Achievable. Increase monthly savings by ${formatCurrency(adjustment)} (target ${formatCurrency(requiredMonthlySavings)}/month).`;
    styleAdvice(output.smartGoalMessage, "bad");
  }
}

function identifyHighestExpenseCategory(monthlyByCategory) {
  const entries = Object.entries(monthlyByCategory);
  const total = entries.reduce((sum, [, value]) => sum + value, 0);

  if (total <= 0) {
    output.moneyDrainMessage.textContent = "Main expense drain analysis appears after entering expenses.";
    styleAdvice(output.moneyDrainMessage, "neutral");
    return;
  }

  const [mainCategory, mainValue] = entries.reduce((top, current) => (current[1] > top[1] ? current : top), ["other", 0]);
  const percentage = (mainValue / total) * 100;
  const label = mainCategory === "schoolFees" ? "School Fees" : mainCategory.charAt(0).toUpperCase() + mainCategory.slice(1);

  if (percentage > 40) {
    output.moneyDrainMessage.textContent =
      `${label} is ${percentage.toFixed(1)}% of expenses. This category is your main money drain. Reducing it gives highest impact.`;
    styleAdvice(output.moneyDrainMessage, "bad");
  } else {
    output.moneyDrainMessage.textContent = `${label} is your largest category at ${percentage.toFixed(1)}% of expenses.`;
    styleAdvice(output.moneyDrainMessage, "neutral");
  }
}

function classifyNeedsVsWants(monthlyByCategory) {
  // Financial logic: needs = transport + school fees, wants = snacks + gaming/entertainment + flexible spending.
  const needs = monthlyByCategory.transport + monthlyByCategory.schoolFees;
  const wants = monthlyByCategory.snacks + monthlyByCategory.entertainment + monthlyByCategory.mobile + monthlyByCategory.other;
  const total = needs + wants;

  if (total <= 0) {
    output.needsWantsMessage.textContent = "Needs vs wants analysis appears after entering expenses.";
    styleAdvice(output.needsWantsMessage, "neutral");
    return;
  }

  const needsPct = (needs / total) * 100;
  const wantsPct = (wants / total) * 100;

  if (wantsPct > 50) {
    output.needsWantsMessage.textContent =
      `Needs ${needsPct.toFixed(1)}% vs Wants ${wantsPct.toFixed(1)}%. Spending pattern heavily focused on short-term pleasure.`;
    styleAdvice(output.needsWantsMessage, "bad");
  } else if (needsPct > 70) {
    output.needsWantsMessage.textContent =
      `Needs ${needsPct.toFixed(1)}% vs Wants ${wantsPct.toFixed(1)}%. Strong necessity-based spending.`;
    styleAdvice(output.needsWantsMessage, "good");
  } else {
    output.needsWantsMessage.textContent = `Needs ${needsPct.toFixed(1)}% vs Wants ${wantsPct.toFixed(1)}%.`; 
    styleAdvice(output.needsWantsMessage, "neutral");
  }
}

function updateFinancialPersonality(monthlySavings, monthlyIncome) {
  if (!output.personalityMessage) return;

  if (monthlyIncome <= 0) {
    output.personalityMessage.textContent = "Financial personality appears after entering income and expenses.";
    styleAdvice(output.personalityMessage, "neutral");
    return;
  }

  const savingsRate = (monthlySavings / monthlyIncome) * 100;

  if (savingsRate < 10) {
    output.personalityMessage.textContent =
      "The Spender: most cash flow is consumed quickly. Tip: cap snacks/entertainment and auto-save first each month.";
    styleAdvice(output.personalityMessage, "bad");
  } else if (savingsRate <= 30) {
    output.personalityMessage.textContent =
      "Balanced Consumer: spending and saving are in balance. Tip: raise savings by 5% and keep wants within a weekly limit.";
    styleAdvice(output.personalityMessage, "neutral");
  } else {
    output.personalityMessage.textContent =
      "Future Planner: strong long-term focus with high savings discipline. Tip: protect this habit with a fixed emergency and investment split.";
    styleAdvice(output.personalityMessage, "good");
  }
}

function updateProgress(goal, timeframeType, timeframeValue, currentMonthlySavings) {
  if (goal <= 0 || timeframeValue <= 0) {
    output.goalProgress.style.width = "0%";
    output.goalProgress.parentElement.setAttribute("aria-valuenow", "0");
    output.goalProgressText.textContent = "Set a goal and timeframe to track progress.";
    return;
  }

  // Financial logic: required monthly pace = goal / number of months in chosen timeframe.
  const timeframeMonths = timeframeType === "years" ? timeframeValue * 12 : timeframeValue;
  const requiredMonthly = goal / timeframeMonths;
  const progressPercent = Math.max(0, Math.min(100, (currentMonthlySavings / requiredMonthly) * 100));

  output.goalProgress.style.width = `${progressPercent.toFixed(1)}%`;
  output.goalProgress.parentElement.setAttribute("aria-valuenow", progressPercent.toFixed(1));
  output.goalProgressText.textContent = `${progressPercent.toFixed(1)}% of monthly goal pace achieved.`;
}

function projectWithGrowth(monthlySavings, years, annualRate) {
  let total = 0;

  // Financial logic: monthly savings rises each year by the annual growth rate.
  for (let year = 0; year < years; year += 1) {
    total += monthlySavings * 12 * Math.pow(1 + annualRate, year);
  }

  return total;
}

function updateProjection(monthlySavings) {
  // Financial logic: future value with no growth assumes constant monthly deposits.
  output.projection1y.textContent = formatCurrency(monthlySavings * 12);
  output.projection3y.textContent = formatCurrency(monthlySavings * 36);
  output.projection5y.textContent = formatCurrency(monthlySavings * 60);
}

function updateCompoundGrowthComparison(monthlySavings) {
  const years = [1, 3, 5];

  const rows = years.map((year) => {
    const noGrowth = monthlySavings * 12 * year;
    const growth = projectWithGrowth(monthlySavings, year, GROWTH_RATE);
    return { year, noGrowth, growth };
  });

  const maxValue = Math.max(...rows.flatMap((item) => [item.noGrowth, item.growth]), 1);

  output.compoundComparison.innerHTML = rows
    .map((row) => {
      const noWidth = Math.max(0, (row.noGrowth / maxValue) * 100);
      const growthWidth = Math.max(0, (row.growth / maxValue) * 100);

      return `
        <div class="compound-row">
          <div class="compound-row__head">
            <strong>${row.year} Year${row.year > 1 ? "s" : ""}</strong>
            <span>No Growth: ${formatCurrency(row.noGrowth)} | Growth: ${formatCurrency(row.growth)}</span>
          </div>
          <div class="compound-bars">
            <div class="compound-bar-track"><div class="compound-bar compound-bar--plain" style="width:${noWidth.toFixed(1)}%"></div></div>
            <div class="compound-bar-track"><div class="compound-bar compound-bar--growth" style="width:${growthWidth.toFixed(1)}%"></div></div>
          </div>
        </div>
      `;
    })
    .join("");
}

function updateChart(data) {
  const chartCanvas = document.getElementById("expenseChart");
  if (!chartCanvas || typeof Chart === "undefined") return;

  const labels = ["Snacks", "Transport", "School Fees", "Mobile", "Entertainment", "Other"];
  const values = [data.snacks, data.transport, data.schoolFees, data.mobile, data.entertainment, data.other];

  if (!expenseChart) {
    expenseChart = new Chart(chartCanvas, {
      type: "pie",
      data: {
        labels,
        datasets: [
          {
            data: values,
            backgroundColor: ["#14b8a6", "#0ea5e9", "#16a34a", "#22c55e", "#f59e0b", "#f43f5e"],
            borderColor: "#ffffff",
            borderWidth: 2
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: "bottom"
          }
        }
      }
    });
    return;
  }

  expenseChart.data.datasets[0].data = values;
  expenseChart.update();
}

function extractAmounts(line) {
  const matches = line.match(/\d{1,3}(?:[,\s]\d{3})+|\d+(?:\.\d+)?/g) || [];
  return matches
    .map((value) => Number(value.replace(/[\s,]/g, "")))
    .filter((value) => Number.isFinite(value) && value > 0);
}

function mapLineToCategory(line) {
  const categories = {
    snacks: ["snack", "coffee", "tea", "drink", "food", "bread", "cake", "juice", "noodle", "rice"],
    transport: ["bus", "taxi", "grab", "uber", "train", "metro", "transport", "ride", "fuel", "petrol"],
    schoolFees: ["school", "tuition", "fee", "class", "course", "academy", "lesson"],
    mobile: ["mobile", "topup", "top-up", "airtime", "sim", "data", "phone", "package"],
    entertainment: ["movie", "cinema", "game", "gaming", "spotify", "netflix", "music", "concert", "stream"]
  };

  for (const [category, keywords] of Object.entries(categories)) {
    if (keywords.some((keyword) => line.includes(keyword))) {
      return category;
    }
  }
  return "other";
}

function parseReceiptText(text) {
  const lines = text
    .split(/\r?\n/)
    .map((line) => line.trim().toLowerCase())
    .filter(Boolean);

  const ignoredKeywords = [
    "total",
    "subtotal",
    "tax",
    "balance",
    "change",
    "cash",
    "invoice",
    "receipt",
    "date",
    "time",
    "qty",
    "discount"
  ];

  const totals = {
    snacks: 0,
    transport: 0,
    schoolFees: 0,
    mobile: 0,
    entertainment: 0,
    other: 0
  };

  for (const line of lines) {
    if (ignoredKeywords.some((keyword) => line.includes(keyword))) continue;

    const amounts = extractAmounts(line);
    if (!amounts.length) continue;

    // OCR usually captures one line item with one dominant amount; use the largest number on that line.
    const amount = Math.max(...amounts);
    const category = mapLineToCategory(line);
    totals[category] += amount;
  }

  return totals;
}

function applyReceiptTotals(totals, shouldAdd) {
  const categories = ["snacks", "transport", "schoolFees", "mobile", "entertainment", "other"];

  categories.forEach((category) => {
    const current = num(elements[category].value);
    const incoming = Math.round(totals[category] || 0);
    elements[category].value = shouldAdd ? current + incoming : incoming;
  });
}

async function importReceipt(file) {
  if (!file) return;

  if (!file.type.startsWith("image/")) {
    output.receiptStatus.textContent = "Please upload an image receipt (JPG/PNG).";
    return;
  }

  if (!window.Tesseract) {
    output.receiptStatus.textContent = "OCR library not available. Refresh and try again.";
    return;
  }

  output.receiptStatus.textContent = "Scanning receipt...";

  try {
    const result = await Tesseract.recognize(file, "eng", {
      logger: (message) => {
        if (message.status === "recognizing text" && typeof message.progress === "number") {
          output.receiptStatus.textContent = `Scanning receipt... ${Math.round(message.progress * 100)}%`;
        }
      }
    });

    const totals = parseReceiptText(result.data.text || "");
    const estimatedTotal = Object.values(totals).reduce((sum, amount) => sum + amount, 0);

    if (estimatedTotal <= 0) {
      output.receiptStatus.textContent = "Could not detect item prices clearly. Try a clearer receipt image.";
      return;
    }

    applyReceiptTotals(totals, elements.receiptAddMode.checked);
    calculate();
    output.receiptStatus.textContent =
      `Imported estimated daily expenses: ${formatCurrency(estimatedTotal)} split across categories.`;
  } catch {
    output.receiptStatus.textContent = "Receipt scan failed. Try another image.";
  }
}

function setupReceiptImport() {
  if (!receiptDropZone || !receiptFileInput) return;

  const preventDefaults = (event) => {
    event.preventDefault();
    event.stopPropagation();
  };

  ["dragenter", "dragover", "dragleave", "drop"].forEach((eventName) => {
    receiptDropZone.addEventListener(eventName, preventDefaults);
  });

  ["dragenter", "dragover"].forEach((eventName) => {
    receiptDropZone.addEventListener(eventName, () => receiptDropZone.classList.add("is-dragging"));
  });

  ["dragleave", "drop"].forEach((eventName) => {
    receiptDropZone.addEventListener(eventName, () => receiptDropZone.classList.remove("is-dragging"));
  });

  receiptDropZone.addEventListener("drop", (event) => {
    const [file] = event.dataTransfer.files || [];
    importReceipt(file);
  });

  receiptDropZone.addEventListener("click", () => {
    receiptFileInput.click();
  });

  receiptDropZone.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      receiptFileInput.click();
    }
  });

  receiptFileInput.addEventListener("change", (event) => {
    const [file] = event.target.files || [];
    importReceipt(file);
  });
}

function getSessionHistory() {
  try {
    const raw = localStorage.getItem(SESSION_HISTORY_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function trackBehaviorChanges(snacksMonthly, monthlySavings) {
  const history = getSessionHistory();
  const index = history.findIndex((record) => record.sessionId === sessionId);
  const newRecord = {
    sessionId,
    snacksMonthly,
    monthlySavings,
    updatedAt: Date.now()
  };

  if (index >= 0) {
    history[index] = newRecord;
  } else {
    history.push(newRecord);
  }

  const trimmed = history.slice(-12);
  localStorage.setItem(SESSION_HISTORY_KEY, JSON.stringify(trimmed));

  const recent = trimmed.slice(-3);

  if (recent.length < 3 || !output.behaviorTrendMessage) {
    output.behaviorTrendMessage.textContent = "Behavior trend detection starts after at least 3 sessions.";
    styleAdvice(output.behaviorTrendMessage, "neutral");
    return;
  }

  const impulseTrend = recent[0].snacksMonthly < recent[1].snacksMonthly && recent[1].snacksMonthly < recent[2].snacksMonthly;
  const improvingTrend = recent[0].monthlySavings < recent[1].monthlySavings && recent[1].monthlySavings < recent[2].monthlySavings;

  if (impulseTrend) {
    output.behaviorTrendMessage.textContent = "Impulse Spending Trend: snack spending increased across 3 consecutive sessions.";
    styleAdvice(output.behaviorTrendMessage, "bad");
  } else if (improvingTrend) {
    output.behaviorTrendMessage.textContent = "Improving Financial Discipline: savings increased across recent sessions.";
    styleAdvice(output.behaviorTrendMessage, "good");
  } else {
    output.behaviorTrendMessage.textContent = "No strong behavior trend detected in recent sessions.";
    styleAdvice(output.behaviorTrendMessage, "neutral");
  }
}

function saveToStorage() {
  const data = {};
  ids.forEach((id) => {
    if (id === "receiptAddMode") {
      data[id] = elements[id].checked;
    } else {
      data[id] = elements[id].value;
    }
  });
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

function captureDefaultState() {
  ids.forEach((id) => {
    const element = elements[id];
    if (!element) return;
    defaultFormState[id] = id === "receiptAddMode" ? Boolean(element.checked) : element.value;
  });
}

function resetAllFields() {
  ids.forEach((id) => {
    const element = elements[id];
    if (!element) return;
    if (id === "receiptAddMode") {
      element.checked = Boolean(defaultFormState[id]);
    } else {
      element.value = defaultFormState[id] ?? "";
    }
  });

  localStorage.removeItem(STORAGE_KEY);
  localStorage.removeItem(SESSION_HISTORY_KEY);

  if (output.receiptStatus) {
    output.receiptStatus.textContent = "No receipt imported yet.";
  }

  calculate();
}

function loadFromStorage() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return;

  try {
    const data = JSON.parse(raw);
    ids.forEach((id) => {
      if (data[id] === undefined || !elements[id]) return;
      if (id === "receiptAddMode") {
        elements[id].checked = Boolean(data[id]);
      } else {
        elements[id].value = data[id];
      }
    });
  } catch {
    localStorage.removeItem(STORAGE_KEY);
  }
}

function calculate() {
  const data = getInputData();
  setReductionLabels(data);

  const dailyByCategory = {
    snacks: data.snacks,
    transport: data.transport,
    schoolFees: data.schoolFees,
    mobile: data.mobile,
    entertainment: data.entertainment,
    other: data.other
  };

  const dailyTotalExpenses = Object.values(dailyByCategory).reduce((sum, amount) => sum + amount, 0);

  // Financial logic: convert daily income/expenses to monthly values using 30 days.
  const monthlyIncome = data.dailyIncome * DAYS_PER_MONTH;
  const monthlyByCategory = Object.fromEntries(
    Object.entries(dailyByCategory).map(([key, value]) => [key, value * DAYS_PER_MONTH])
  );
  const currentTotalExpenses = dailyTotalExpenses * DAYS_PER_MONTH;

  // Financial logic: monthly savings = monthly income - monthly expenses.
  const currentMonthlySavings = monthlyIncome - currentTotalExpenses;
  const currentYearlySavings = currentMonthlySavings * 12;

  const reducedDailyByCategory = {
    snacks: reducedExpense(data.snacks, data.snacksReduction),
    transport: reducedExpense(data.transport, data.transportReduction),
    schoolFees: reducedExpense(data.schoolFees, data.schoolFeesReduction),
    mobile: reducedExpense(data.mobile, data.mobileReduction),
    entertainment: reducedExpense(data.entertainment, data.entertainmentReduction),
    other: reducedExpense(data.other, data.otherReduction)
  };

  const reducedDailyTotalExpenses = Object.values(reducedDailyByCategory).reduce((sum, amount) => sum + amount, 0);
  const reducedTotalExpenses = reducedDailyTotalExpenses * DAYS_PER_MONTH;
  const reducedMonthlySavings = monthlyIncome - reducedTotalExpenses;
  const reducedYearlySavings = reducedMonthlySavings * 12;

  setAnimatedText(output.currentTotalExpenses, formatCurrency(currentTotalExpenses));
  setAnimatedText(output.currentMonthlySavings, formatCurrency(currentMonthlySavings));
  setAnimatedText(output.currentYearlySavings, formatCurrency(currentYearlySavings));
  setAnimatedText(output.currentTimeToGoal, renderBreakEven(data.goal, currentMonthlySavings));

  setAnimatedText(output.reducedTotalExpenses, formatCurrency(reducedTotalExpenses));
  setAnimatedText(output.reducedMonthlySavings, formatCurrency(reducedMonthlySavings));
  setAnimatedText(output.reducedYearlySavings, formatCurrency(reducedYearlySavings));
  setAnimatedText(output.reducedTimeToGoal, renderBreakEven(data.goal, reducedMonthlySavings));

  updateAdvice(currentMonthlySavings, monthlyIncome);
  updateLossAversion(monthlyIncome, currentTotalExpenses);
  evaluateSmartGoal(data.goal, currentMonthlySavings, data.deadlineMonths);
  identifyHighestExpenseCategory(monthlyByCategory);
  classifyNeedsVsWants(monthlyByCategory);
  updateFinancialPersonality(currentMonthlySavings, monthlyIncome);
  updateProgress(data.goal, data.timeframeType, data.timeframeValue, currentMonthlySavings);
  updateProjection(currentMonthlySavings);
  updateCompoundGrowthComparison(currentMonthlySavings);
  trackBehaviorChanges(monthlyByCategory.snacks, currentMonthlySavings);
  updateChart(data);
  saveToStorage();
}

function attachListeners() {
  ids.forEach((id) => {
    const element = elements[id];
    if (!element) return;

    element.addEventListener("input", calculate);
    element.addEventListener("change", calculate);
  });

  if (calculateBtn) {
    calculateBtn.addEventListener("click", calculate);
  }

  if (resetBtn) {
    resetBtn.addEventListener("click", resetAllFields);
  }
}

function initRevealAnimations() {
  const revealTargets = [
    ...document.querySelectorAll(".hero__content > *"),
    ...document.querySelectorAll(".card")
  ];

  revealTargets.forEach((element, index) => {
    element.classList.add("ns-reveal");
    element.style.setProperty("--ns-delay", `${Math.min(index * 45, 360)}ms`);
  });

  if (prefersReducedMotion) {
    revealTargets.forEach((element) => element.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.14 }
  );

  revealTargets.forEach((element) => observer.observe(element));
}

captureDefaultState();
loadFromStorage();
attachListeners();
setupReceiptImport();
initRevealAnimations();
calculate();
