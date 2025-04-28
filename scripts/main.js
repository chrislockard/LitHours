// Define Canonical Hours with time ranges (24-hour format)
const canonicalHours = [
  { name: "Compline", start: 0, end: 2 },
  { name: "Vigil", start: 2, end: 3 },
  { name: "Matins", start: 3, end: 6 },
  { name: "Lauds", start: 6, end: 9 },
  { name: "Prime", start: 9, end: 12 },
  { name: "Terce", start: 12, end: 15 },
  { name: "Sext", start: 15, end: 18 },
  { name: "None", start: 18, end: 21 },
  { name: "Vespers", start: 21, end: 24 }
];

// State for time mode and view
let useUTC = false;
let isBasicView = false;

// Get current Canonical Hour based on hour of the day
function getCanonicalHour(hour) {
  for (const hourInfo of canonicalHours) {
    if (hour >= hourInfo.start && hour < hourInfo.end) {
      return hourInfo.name;
    }
  }
  return "Vespers"; // Fallback for 24:00 (midnight edge case)
}

// Format date as MM-DD for prayers.json lookup
function formatDate(date) {
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return { month, day };
}

// Format time for display (local or UTC)
function formatTime(date, useUTC) {
  if (useUTC) {
    const hours = String(date.getUTCHours()).padStart(2, "0");
    const minutes = String(date.getUTCMinutes()).padStart(2, "0");
    return `${hours}:${minutes} UTC`;
  } else {
    return date.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
  }
}

// Fetch and display prayer
async function displayPrayer() {
  try {
    // Get current time
    const now = new Date();
    const hour = useUTC ? now.getUTCHours() : now.getHours();
    const { month, day } = formatDate(useUTC ? new Date(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()) : now);

    // Determine Canonical Hour
    const hourName = getCanonicalHour(hour);
    const timeDisplay = formatTime(now, useUTC);
    document.getElementById("hour-name").textContent = `${hourName} (${timeDisplay})`;

    // Fetch prayers.json
    const response = await fetch("data/prayers.json");
    if (!response.ok) {
      throw new Error("Failed to fetch prayers.json");
    }
    const prayers = await response.json();

    // Get prayer for current date and hour
    const prayer = prayers[month]?.[day]?.[hourName] || "Prayer not found";
    document.getElementById("prayer-text").textContent = prayer;
  } catch (error) {
    console.error("Error displaying prayer:", error);
    document.getElementById("prayer-text").textContent = "Error loading prayer";
  }
}

// Toggle between local and UTC time
document.getElementById("time-toggle").addEventListener("click", () => {
  useUTC = !useUTC;
  document.getElementById("time-toggle").textContent = useUTC ? "Switch to Local Time" : "Switch to UTC";
  displayPrayer();
});

// Toggle between stylized and basic views
document.getElementById("view-toggle").addEventListener("click", () => {
  isBasicView = !isBasicView;
  const stylesheet = document.getElementById("theme-stylesheet");
  stylesheet.href = isBasicView ? "styles/basic.css" : "styles/stylized.css";
  document.getElementById("view-toggle").textContent = isBasicView ? "Switch to Stylized View" : "Switch to Basic View";
});

// Initial display
displayPrayer();
