/* =====================================================
   MAUSAM APP — script.js
   ===================================================== */

/* ---------- 1. Live clock hands ---------- */
function updateClockHands() {
  const now = new Date();

  // Extract hours, minutes, and seconds for Indian Standard Time
  const formatter = new Intl.DateTimeFormat('en-US', {
    timeZone: 'Asia/Kolkata',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    hour12: false
  });

  const parts = formatter.formatToParts(now);
  const getPart = (type) => parseInt(parts.find(p => p.type === type).value, 10);

  const hours = getPart('hour') % 12; // Handles 0-23 (and 24) cleanly into 0-11
  const minutes = getPart('minute');
  const seconds = getPart('second');

  // Calculate degrees with fractional progression
  const hourDeg = (hours * 30) + (minutes * 0.5) + 180;
  const minuteDeg = (minutes * 6) + (seconds * 0.1) + 180;

  // Apply rotations
  document.getElementById('hourHand').style.transform = `rotate(${hourDeg}deg)`;
  document.getElementById('minuteHand').style.transform = `rotate(${minuteDeg}deg)`;
}

updateClockHands();
setInterval(updateClockHands, 1000);
/* ---------- 2. Side menu ---------- */
const menuBtn = document.getElementById('menuBtn');
const closeMenuBtn = document.getElementById('closeMenuBtn');
const sideMenu = document.getElementById('sideMenu');
const overlay = document.getElementById('overlay');

function openMenu() {
    sideMenu.classList.add('show');
    overlay.classList.add('show');
}
function closeMenu() {
    sideMenu.classList.remove('show');
    overlay.classList.remove('show');
}

menuBtn.addEventListener('click', openMenu);
closeMenuBtn.addEventListener('click', closeMenu);
overlay.addEventListener('click', () => {
    closeMenu();
    closeAiPopup();
});


/* ---------- 3. Current on-screen weather data ---------- */
const currentWeather = {
    location: "Amalner, Jalgaon",
    tempC: 31,
    highC: 32,
    lowC: 25,
    feelsLikeC: 36,
    condition: "mostly cloudy",
    humidity: 64,
    windKmh: 18,
    windDir: "NE",
    uvIndex: 5,
    uvLabel: "Moderate",
    rainChance: 60,
    soilMoisture: 68,
    sunrise: "6:00",
    sunset: "6:58",
    umbrellaAdvice: "Rain expected within the next 1 hour."
};


/* ---------- 4. Bhashini AI popup open/close ---------- */
const aiBtn = document.getElementById('aiBtn');
const aiPopup = document.getElementById('aiPopup');
const aiCloseBtn = document.getElementById('aiCloseBtn');
const aiChat = document.getElementById('aiChat');
const aiForm = document.getElementById('aiForm');
const aiInput = document.getElementById('aiInput');

function openAiPopup() {
    aiPopup.classList.add('show');
    aiInput.focus();
}
function closeAiPopup() {
    aiPopup.classList.remove('show');
}

aiBtn.addEventListener('click', () => {
    closeAllFloatWidgets();
    openAiPopup();
});
aiCloseBtn.addEventListener('click', closeAiPopup);
aiPopup.addEventListener('click', (e) => {
    if (e.target === aiPopup) closeAiPopup();
});


/* ---------- 5. Chat rendering ---------- */
async function askWeatherAI(question) {
    // --- LOCAL STUB (remove once Gemma 2B + Bhashini are wired up) ---
    const q = question.toLowerCase();
    const w = currentWeather;

    if (/umbrella|rain/.test(q)) {
        return w.rainChance >= 50
            ? `Yes, worth carrying one — ${w.rainChance}% rain chance today. ${w.umbrellaAdvice}`
            : `Should be fine — only a ${w.rainChance}% chance of rain today in ${w.location}.`;
    }
    if (/hot|temperature|degree|feels/.test(q)) {
        return `It's ${w.tempC}° right now (feels like ${w.feelsLikeC}°), with a high of ${w.highC}° and a low of ${w.lowC}°.`;
    }
    if (/wind/.test(q)) {
        return `Wind is coming from the ${w.windDir} at ${w.windKmh} km/h.`;
    }
    if (/humid/.test(q)) {
        return `Humidity is at ${w.humidity}% right now.`;
    }
    if (/uv/.test(q)) {
        return `UV index is ${w.uvIndex} (${w.uvLabel}) — sun protection is a good idea if you're out midday.`;
    }
    if (/soil/.test(q)) {
        return `Soil moisture is reading ${w.soilMoisture}%.`;
    }
    if (/sunrise|sunset/.test(q)) {
        return `Sunrise is at ${w.sunrise} and sunset is at ${w.sunset}.`;
    }
    if (/water|irrigat|crop|spray|farm/.test(q)) {
        return w.rainChance >= 50
            ? `With a ${w.rainChance}% rain chance and ${w.soilMoisture}% soil moisture, you can likely hold off on irrigation and spraying today.`
            : `Soil moisture is at ${w.soilMoisture}% with low rain chance — irrigation is probably worth planning for.`;
    }

    return `Right now in ${w.location} it's ${w.tempC}° and ${w.condition}, with ${w.rainChance}% chance of rain. Ask me about wind, humidity, UV, soil moisture, or sunrise/sunset for more.`;
}


/* ---------- 6. Ask handler ---------- */
async function askWeatherAI(question) {
    const q = question.toLowerCase();
    const w = currentWeather;

    if (/umbrella|rain/.test(q)) {
        return w.rainChance >= 50
            ? `Yes, worth carrying one — ${w.rainChance}% rain chance today. ${w.umbrellaAdvice}`
            : `Should be fine — only a ${w.rainChance}% chance of rain today in ${w.location}.`;
    }
    if (/hot|temperature|degree|feels/.test(q)) {
        return `It's ${w.tempC}° right now (feels like ${w.feelsLikeC}°), with a high of ${w.highC}° and a low of ${w.lowC}°.`;
    }
    if (/wind/.test(q)) {
        return `Wind is coming from the ${w.windDir} at ${w.windKmh} km/h.`;
    }
    if (/humid/.test(q)) {
        return `Humidity is at ${w.humidity}% right now.`;
    }
    if (/uv/.test(q)) {
        return `UV index is ${w.uvIndex} (${w.uvLabel}) — sun protection is a good idea if you're out midday.`;
    }
    if (/soil/.test(q)) {
        return `Soil moisture is reading ${w.soilMoisture}%.`;
    }
    if (/sunrise|sunset/.test(q)) {
        return `Sunrise is at ${w.sunrise} and sunset is at ${w.sunset}.`;
    }
    if (/water|irrigat|crop|spray|farm/.test(q)) {
        return w.rainChance >= 50
            ? `With a ${w.rainChance}% rain chance and ${w.soilMoisture}% soil moisture, you can likely hold off on irrigation and spraying today.`
            : `Soil moisture is at ${w.soilMoisture}% with low rain chance — irrigation is probably worth planning for.`;
    }

    return `Right now in ${w.location} it's ${w.tempC}° and ${w.condition}, with ${w.rainChance}% chance of rain. Ask me about wind, humidity, UV, soil moisture, or sunrise/sunset for more.`;
}


/* ---------- 7. Form submit ---------- */
aiForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const question = aiInput.value.trim();
    if (!question) return;

    addMessage(question, 'user');
    aiInput.value = '';
    aiInput.disabled = true;

    const thinking = document.createElement('div');
    thinking.className = 'ai-msg bot';
    thinking.textContent = '…';
    aiChat.appendChild(thinking);
    aiChat.scrollTop = aiChat.scrollHeight;

    try {
        const answer = await askWeatherAI(question);
        thinking.textContent = answer;
    } catch (err) {
        thinking.textContent = "Sorry, I couldn't reach the weather AI just now.";
    } finally {
        aiInput.disabled = false;
        aiInput.focus();
    }
});


/* ---------- 8. Live date in header ---------- */
(function setDate() {
    const el = document.getElementById('todayDate');
    if (!el) return;
    const opts = { day: 'numeric', month: 'long', year: 'numeric', weekday: 'long' };
     el.textContent = new Date().toLocaleDateString('en-IN', opts);
})();


/* ---------- 9. Floating layer-picker widgets ---------- */
const navItems = document.querySelectorAll('.bottom-item[data-panel]');
const floatWidgets = document.querySelectorAll('.float-widget');
const fwToast = createToastEl();

function createToastEl() {
    const el = document.createElement('div');
    el.className = 'fw-toast';
    document.body.appendChild(el);
    return el;
}

let toastTimer = null;
function showToast(html) {
    fwToast.innerHTML = html;
    fwToast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => fwToast.classList.remove('show'), 2600);
}

function closeAllFloatWidgets() {
    floatWidgets.forEach(w => w.classList.remove('show'));
}

function setActiveNav(activeBtn) {
    navItems.forEach(btn => btn.classList.remove('active'));
    if (activeBtn) activeBtn.classList.add('active');
}

/* Position a panel horizontally centered above the nav button
   that opened it, clamped so it never runs off-screen. */
function positionPanelOverButton(panel, btn) {
    const btnRect = btn.getBoundingClientRect();
    const centerX = btnRect.left + btnRect.width / 2;

    // Let the browser lay the panel out first so we know its width.
    panel.style.setProperty('--fw-left', `${centerX}px`);

    requestAnimationFrame(() => {
        const panelRect = panel.getBoundingClientRect();
        const margin = 12;
        let clampedCenter = centerX;

        const halfWidth = panelRect.width / 2;
        const minCenter = margin + halfWidth;
        const maxCenter = window.innerWidth - margin - halfWidth;

        if (clampedCenter < minCenter) clampedCenter = minCenter;
        if (clampedCenter > maxCenter) clampedCenter = maxCenter;

        panel.style.setProperty('--fw-left', `${clampedCenter}px`);
    });
}

/* ---- Per-section, per-label data + real actions ----
   Swap the values / behavior below for live API calls,
   map layer toggles, routing calls, etc. as needed. */
const panelActions = {
    kisan: {
        'Soil Moisture': () => {
            showToast(`🌱 <strong>Soil Moisture:</strong> ${currentWeather.soilMoisture}% — adequate for most crops right now.`);
        },
        'Pollen Count': () => {
            showToast(`🌾 <strong>Pollen Count:</strong> Moderate today — sensitive crops may show early stress signs.`);
        },
        'Rain Chance': () => {
            showToast(`☂️ <strong>Rain Chance:</strong> ${currentWeather.rainChance}% today — plan spraying/irrigation accordingly.`);
        },
        'Frost Alert': () => {
            showToast(`❄️ <strong>Frost Alert:</strong> No frost risk expected in the next 48 hours.`);
        },
        'Meghdoot': () => {
            showToast(`☁️ <strong>Meghdoot Advisory:</strong> Opening latest crop-specific advisory bulletin…`);
        }
    },
    samudra: {
        'Wave Height': () => {
            showToast(`🌊 <strong>Wave Height:</strong> 1.2 m, moderate sea state.`);
        },
        'Tide Times': () => {
            showToast(`🕒 <strong>Tide Times:</strong> High tide 11:40, low tide 17:55.`);
        },
        'Water Temperature': () => {
            showToast(`🌡️ <strong>Water Temperature:</strong> 27°C at the surface.`);
        },
        'Wind Speed': () => {
            showToast(`〰️ <strong>Wind Speed:</strong> ${currentWeather.windKmh} km/h from the ${currentWeather.windDir}.`);
        },
        'Samudra': () => {
            showToast(`🐟 <strong>Samudra:</strong> Opening ocean &amp; fishing zone overview…`);
        }
    },
    safar: {
        'Visibility': () => {
            showToast(`🌫️ <strong>Visibility:</strong> 6 km, clear driving conditions.`);
        },
        'Traffic Update': () => {
            showToast(`🚦 <strong>Traffic Update:</strong> Normal flow on main routes near you.`);
        },
        'Storm Chance': () => {
            showToast(`⛈️ <strong>Storm Chance:</strong> ${currentWeather.rainChance}% — carry rain gear if travelling this evening.`);
        },
        'Fog': () => {
            showToast(`🌁 <strong>Fog:</strong> Light fog possible after sunset, clearing by morning.`);
        }
    },
    raksha: {
        'Radar Map': () => {
            showToast(`📡 <strong>Radar Map:</strong> Loading live precipitation radar…`);
        },
        'Cyclone': () => {
            showToast(`🌀 <strong>Cyclone:</strong> No active cyclonic system tracking toward this region.`);
        },
        'Heatwave': () => {
            showToast(`🔥 <strong>Heatwave Alert:</strong> No heatwave warning currently in effect for your area.`);
        }
    }
};

navItems.forEach(btn => {
    const key = btn.dataset.panel;
    const panel = document.getElementById(`panel-${key}`);
    if (!panel) return;

    btn.addEventListener('click', () => {
        const isOpen = panel.classList.contains('show');

        closeAllFloatWidgets();
        closeAiPopup();

        if (isOpen) {
            setActiveNav(null);
        } else {
            positionPanelOverButton(panel, btn);
            panel.classList.add('show');
            setActiveNav(btn);
        }
    });
});

floatWidgets.forEach(panel => {
    const key = panel.id.replace('panel-', '');
    const actions = panelActions[key] || {};

    panel.querySelectorAll('.fw-item').forEach(item => {
        item.addEventListener('click', () => {
            panel.querySelectorAll('.fw-item').forEach(i => i.classList.remove('fw-selected'));
            item.classList.add('fw-selected');

            const label = item.dataset.label;
            const action = actions[label];
            if (action) {
                action();
            } else {
                showToast(`Selected <strong>${label}</strong>.`);
            }
        });
    });

    const closeBtn = panel.querySelector('.fw-close');
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            panel.classList.remove('show');
            setActiveNav(null);
        });
    }
});

overlay.addEventListener('click', closeAllFloatWidgets);

// Re-anchor an open panel above its button on resize/orientation change.
window.addEventListener('resize', () => {
    navItems.forEach(btn => {
        const key = btn.dataset.panel;
        const panel = document.getElementById(`panel-${key}`);
        if (panel && panel.classList.contains('show')) {
            positionPanelOverButton(panel, btn);
        }
    });
});
