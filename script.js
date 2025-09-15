// Systém správy směn - Resort Blatnice
// JavaScript funkcionalita pro webovou stránku

// Globální proměnné
let currentUser = null;
let shifts = [];
let users = [];
let workplaces = [];
let automaticRules = [];
let currentDate = new Date();
let selectedDate = null;
let currentWorkplaceFilter = 'all';

// Inicializace aplikace
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    setupEventListeners();
    loadData();
});

// Inicializace aplikace
function initializeApp() {
    // Načtení dat z localStorage
    const savedShifts = localStorage.getItem('smeny-shifts');
    const savedUsers = localStorage.getItem('smeny-users');
    const savedWorkplaces = localStorage.getItem('smeny-workplaces');
    const savedAutomaticRules = localStorage.getItem('smeny-automatic-rules');
    
    if (savedShifts) {
        shifts = JSON.parse(savedShifts);
    } else {
        // Výchozí testovací směny
        shifts = [
            {
                id: 'shift-1',
                date: '2024-01-15',
                startTime: '08:00',
                endTime: '16:00',
                position: 'Wellness',
                users: ['user-1', 'user-2']
            },
            {
                id: 'shift-2',
                date: '2024-01-15',
                startTime: '16:00',
                endTime: '24:00',
                position: 'Bar',
                users: ['user-3']
            },
            {
                id: 'shift-3',
                date: '2024-01-16',
                startTime: '06:00',
                endTime: '14:00',
                position: 'Kuchyně',
                users: []
            },
            {
                id: 'shift-4',
                date: '2024-01-16',
                startTime: '14:00',
                endTime: '22:00',
                position: 'Úklid',
                users: ['user-1']
            }
        ];
    }
    
    if (savedUsers) {
        users = JSON.parse(savedUsers);
    } else {
        // Výchozí testovací uživatelé
        users = [
            {
                id: 'admin-1',
                pin: '12345',
                name: 'Admin',
                isAdmin: true
            },
            {
                id: 'user-1',
                pin: '11111',
                name: 'Jan Novák',
                isAdmin: false
            },
            {
                id: 'user-2',
                pin: '22222',
                name: 'Marie Svobodová',
                isAdmin: false
            },
            {
                id: 'user-3',
                pin: '33333',
                name: 'Petr Dvořák',
                isAdmin: false
            }
        ];
    }
    
    if (savedWorkplaces) {
        workplaces = JSON.parse(savedWorkplaces);
    } else {
        // Výchozí pracoviště
        workplaces = [
            {
                id: 'workplace-1',
                name: 'Wellness',
                description: 'Relaxační a wellness služby',
                hasFixedHours: true,
                startTime: '08:00',
                endTime: '20:00'
            },
            {
                id: 'workplace-2',
                name: 'Bar',
                description: 'Obsluha baru a nápojů',
                hasFixedHours: true,
                startTime: '16:00',
                endTime: '24:00'
            },
            {
                id: 'workplace-3',
                name: 'Kuchyně',
                description: 'Příprava jídel',
                hasFixedHours: true,
                startTime: '06:00',
                endTime: '22:00'
            },
            {
                id: 'workplace-4',
                name: 'Úklid',
                description: 'Úklidové služby',
                hasFixedHours: false,
                startTime: null,
                endTime: null
            },
            {
                id: 'workplace-5',
                name: 'Recepce',
                description: 'Recepční služby',
                hasFixedHours: true,
                startTime: '07:00',
                endTime: '23:00'
            }
        ];
    }
    
    if (savedAutomaticRules) {
        automaticRules = JSON.parse(savedAutomaticRules);
    } else {
        // Výchozí automatická pravidla (prázdné)
        automaticRules = [];
    }
    
    // Kontrola přihlášeného uživatele
    const savedUser = localStorage.getItem('smeny-current-user');
    if (savedUser) {
        try {
            currentUser = JSON.parse(savedUser);
            showUserInterface();
        } catch (error) {
            localStorage.removeItem('smeny-current-user');
            showLoginPage();
        }
    } else {
        showLoginPage();
    }
}

// Nastavení event listenerů
function setupEventListeners() {
    // Přihlašovací formulář
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
    
    // PIN input - pouze číslice
    document.getElementById('pin').addEventListener('input', function(e) {
        e.target.value = e.target.value.replace(/\D/g, '');
    });
    
    // Logout tlačítka
    const logoutBtn = document.getElementById('logout-btn');
    const userLogoutBtn = document.getElementById('user-logout-btn');
    
    if (logoutBtn) logoutBtn.addEventListener('click', logout);
    if (userLogoutBtn) userLogoutBtn.addEventListener('click', logout);
    
    // Admin tlačítka
    document.getElementById('new-shift-btn').addEventListener('click', showNewShiftModal);
    document.getElementById('new-shift-btn-2').addEventListener('click', showNewShiftModal);
    document.getElementById('create-automatic-shifts-btn').addEventListener('click', showAutomaticShiftsModal);
    document.getElementById('new-workplace-btn').addEventListener('click', showNewWorkplaceModal);
    document.getElementById('new-user-btn-2').addEventListener('click', showNewUserModal);
    
    // Uživatelské taby
    document.getElementById('calendar-tab').addEventListener('click', () => switchTab('calendar'));
    document.getElementById('my-shifts-tab').addEventListener('click', () => switchTab('my-shifts'));
    
    // Modaly
    setupModalListeners();
}

// Nastavení modal listenerů
function setupModalListeners() {
    // Nová směna modal
    const newShiftModal = document.getElementById('new-shift-modal');
    const newShiftForm = document.getElementById('new-shift-form');
    
    newShiftForm.addEventListener('submit', handleNewShift);
    newShiftModal.querySelector('.close-btn').addEventListener('click', hideNewShiftModal);
    newShiftModal.querySelector('.btn-secondary').addEventListener('click', hideNewShiftModal);
    
    // Nový uživatel modal
    const newUserModal = document.getElementById('new-user-modal');
    const newUserForm = document.getElementById('new-user-form');
    
    newUserForm.addEventListener('submit', handleNewUser);
    newUserModal.querySelector('.close-btn').addEventListener('click', hideNewUserModal);
    newUserModal.querySelector('.btn-secondary').addEventListener('click', hideNewUserModal);
    document.getElementById('close-user-modal').addEventListener('click', hideNewUserModal);
    document.getElementById('copy-pin-btn').addEventListener('click', copyPin);
    
    // Zavření modalů při kliknutí mimo
    newShiftModal.addEventListener('click', function(e) {
        if (e.target === newShiftModal) hideNewShiftModal();
    });
    
    // Workplace modal event listenery
    const workplaceModal = document.getElementById('workplace-modal');
    const workplaceForm = document.getElementById('workplace-form');
    
    workplaceForm.addEventListener('submit', handleWorkplace);
    workplaceModal.querySelector('.close-btn').addEventListener('click', hideWorkplaceModal);
    workplaceModal.querySelector('.btn-secondary').addEventListener('click', hideWorkplaceModal);
    
    // Checkbox pro zobrazení/skrytí hodin
    document.getElementById('workplace-has-fixed-hours').addEventListener('change', function() {
        const hoursSection = document.getElementById('workplace-hours-section');
        hoursSection.style.display = this.checked ? 'block' : 'none';
    });
    
    // Select pracoviště pro automatické načtení času
    document.getElementById('shift-position').addEventListener('change', function() {
        const selectedWorkplaceName = this.value;
        const workplace = workplaces.find(w => w.name === selectedWorkplaceName);
        const startTimeInput = document.getElementById('shift-start');
        const endTimeInput = document.getElementById('shift-end');
        
        if (workplace && workplace.hasFixedHours) {
            // Automatické načtení času z pracoviště
            startTimeInput.value = workplace.startTime;
            endTimeInput.value = workplace.endTime;
            
            // Vizuální indikace automatického načtení
            startTimeInput.classList.add('auto-filled');
            endTimeInput.classList.add('auto-filled');
            
            // Odstranění třídy po 2 sekundách
            setTimeout(() => {
                startTimeInput.classList.remove('auto-filled');
                endTimeInput.classList.remove('auto-filled');
            }, 2000);
        } else {
            // Vyčištění času pro pracoviště bez pevných hodin
            startTimeInput.value = '';
            endTimeInput.value = '';
        }
    });
    
    workplaceModal.addEventListener('click', function(e) {
        if (e.target === workplaceModal) hideWorkplaceModal();
    });
    
    // Automatic shifts modal event listenery
    const automaticShiftsModal = document.getElementById('automatic-shifts-modal');
    const automaticShiftsForm = document.getElementById('automatic-shifts-form');
    
    automaticShiftsForm.addEventListener('submit', handleAutomaticShifts);
    automaticShiftsModal.querySelector('.close-btn').addEventListener('click', hideAutomaticShiftsModal);
    automaticShiftsModal.querySelector('.btn-secondary').addEventListener('click', hideAutomaticShiftsModal);
    
    // Select pracoviště pro automatické načtení času
    document.getElementById('auto-workplace').addEventListener('change', function() {
        const selectedWorkplaceName = this.value;
        const workplace = workplaces.find(w => w.name === selectedWorkplaceName);
        const startTimeInput = document.getElementById('auto-start-time');
        const endTimeInput = document.getElementById('auto-end-time');
        
        if (workplace && workplace.hasFixedHours) {
            // Automatické načtení času z pracoviště
            startTimeInput.value = workplace.startTime;
            endTimeInput.value = workplace.endTime;
            
            // Vizuální indikace automatického načtení
            startTimeInput.classList.add('auto-filled');
            endTimeInput.classList.add('auto-filled');
            
            // Odstranění třídy po 2 sekundách
            setTimeout(() => {
                startTimeInput.classList.remove('auto-filled');
                endTimeInput.classList.remove('auto-filled');
            }, 2000);
        } else {
            // Vyčištění času pro pracoviště bez pevných hodin
            startTimeInput.value = '';
            endTimeInput.value = '';
        }
    });
    
    automaticShiftsModal.addEventListener('click', function(e) {
        if (e.target === automaticShiftsModal) hideAutomaticShiftsModal();
    });
    
    newUserModal.addEventListener('click', function(e) {
        if (e.target === newUserModal) hideNewUserModal();
    });
}

// Zobrazení přihlašovací stránky
function showLoginPage() {
    // Vynutí skrytí všech stránek
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
        page.style.display = 'none';
    });
    
    // Zobraz přihlašovací stránku
    const loginPage = document.getElementById('login-page');
    if (loginPage) {
        loginPage.classList.add('active');
        loginPage.style.display = 'block';
        loginPage.style.zIndex = '999';
    }
}

// Zobrazení uživatelského rozhraní podle role
function showUserInterface() {
    if (currentUser.isAdmin) {
        showAdminInterface();
    } else {
        showUserPage();
    }
}

// Zobrazení admin rozhraní
function showAdminInterface() {
    // Vynutí skrytí všech stránek
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
        page.style.display = 'none';
    });
    
    // Zobraz admin stránku
    const adminPage = document.getElementById('admin-page');
    if (adminPage) {
        adminPage.classList.add('active');
        adminPage.style.display = 'block';
        adminPage.style.zIndex = '999';
    }
    
    document.getElementById('admin-name').textContent = currentUser.name;
    
    // Inicializace selectu pracovišť
    updateWorkplaceSelect();
    
    // Inicializace prvního tabu (kalendář)
    switchAdminTab('calendar');
}

// Zobrazení uživatelské stránky
function showUserPage() {
    // Vynutí skrytí všech stránek
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
        page.style.display = 'none';
    });
    
    // Zobraz uživatelskou stránku
    const userPage = document.getElementById('user-page');
    if (userPage) {
        userPage.classList.add('active');
        userPage.style.display = 'block';
        userPage.style.zIndex = '999';
    }
    
    document.getElementById('user-name').textContent = currentUser.name;
    
    // Nastavení dnešního data jako výchozího pro uživatele
    const today = new Date();
    const todayStr = today.toISOString().split('T')[0];
    selectedDate = todayStr;
    
    renderCalendar('user-calendar');
    updateUserShiftsList();
    updateMyShiftsList();
    updateMyShiftsCount();
}

// Přihlášení
function handleLogin(e) {
    e.preventDefault();
    
    const pin = document.getElementById('pin').value;
    const errorMessage = document.getElementById('error-message');
    const loginBtn = document.querySelector('.login-btn');
    const btnText = loginBtn.querySelector('.btn-text');
    const btnLoading = loginBtn.querySelector('.btn-loading');
    
    // Zobrazení loading stavu
    btnText.style.display = 'none';
    btnLoading.style.display = 'inline-flex';
    loginBtn.disabled = true;
    
    // Simulace načítání
    setTimeout(() => {
        const user = users.find(u => u.pin === pin);
        
        if (user) {
            currentUser = user;
            localStorage.setItem('smeny-current-user', JSON.stringify(user));
            showUserInterface();
        } else {
            errorMessage.textContent = 'Neplatný PIN. Zkuste to znovu.';
            errorMessage.style.display = 'block';
        }
        
        // Skrytí loading stavu
        btnText.style.display = 'inline';
        btnLoading.style.display = 'none';
        loginBtn.disabled = false;
    }, 500);
}

// Odhlášení
function logout() {
    currentUser = null;
    localStorage.removeItem('smeny-current-user');
    document.getElementById('pin').value = '';
    document.getElementById('error-message').style.display = 'none';
    showLoginPage();
}

// Přepnutí tabů
function switchTab(tabName) {
    // Aktualizace tabů
    document.querySelectorAll('.tab').forEach(tab => tab.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
    
    if (tabName === 'calendar') {
        document.getElementById('calendar-tab').classList.add('active');
        document.getElementById('calendar-content').classList.add('active');
        updateUserShiftsList();
    } else {
        document.getElementById('my-shifts-tab').classList.add('active');
        document.getElementById('my-shifts-content').classList.add('active');
        updateMyShiftsList();
    }
}

// Přepnutí admin tabů
function switchAdminTab(tabName) {
    // Aktualizace admin tabů
    document.querySelectorAll('#admin-page .tab').forEach(tab => tab.classList.remove('active'));
    document.querySelectorAll('#admin-page .tab-content').forEach(content => content.classList.remove('active'));
    
    // Aktivace vybraného tabu
    const activeTab = document.getElementById(`admin-${tabName}-tab`);
    const activeContent = document.getElementById(`admin-${tabName}-content`);
    
    if (activeTab) activeTab.classList.add('active');
    if (activeContent) activeContent.classList.add('active');
    
    // Aktualizace obsahu podle tabu
    if (tabName === 'calendar') {
        renderCalendar('calendar');
        updateShiftsList();
    } else if (tabName === 'shifts') {
        updateWorkplaceFilterButtons();
        updateAdminShiftsList();
    } else if (tabName === 'automatic') {
        updateAutomaticShiftsList();
    } else if (tabName === 'workplaces') {
        updateWorkplacesList();
    } else if (tabName === 'users') {
        updateUsersList();
    }
}

// Renderování kalendáře
function renderCalendar(calendarId) {
    const calendar = document.getElementById(calendarId);
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    
    // Vytvoření kalendáře
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay() + 1); // Začátek od pondělí
    
    const endDate = new Date(lastDay);
    endDate.setDate(endDate.getDate() + (7 - lastDay.getDay())); // Konec do neděle
    
    const monthNames = [
        'Leden', 'Únor', 'Březen', 'Duben', 'Květen', 'Červen',
        'Červenec', 'Srpen', 'Září', 'Říjen', 'Listopad', 'Prosinec'
    ];
    
    const weekDays = ['Po', 'Út', 'St', 'Čt', 'Pá', 'So', 'Ne'];
    
    calendar.innerHTML = `
        <div class="calendar-header">
            <div class="calendar-title">
                <i class="fas fa-calendar-alt"></i>
                ${monthNames[month]} ${year}
            </div>
            <div class="calendar-nav">
                <button onclick="previousMonth()">
                    <i class="fas fa-chevron-left"></i>
                </button>
                <button onclick="nextMonth()">
                    <i class="fas fa-chevron-right"></i>
                </button>
            </div>
        </div>
        <div class="calendar-weekdays">
            ${weekDays.map(day => `<div class="calendar-weekday">${day}</div>`).join('')}
        </div>
        <div class="calendar-days">
            ${generateCalendarDays(startDate, endDate, year, month)}
        </div>
    `;
}

// Generování kalendářních dnů
function generateCalendarDays(startDate, endDate, year, month) {
    const days = [];
    const current = new Date(startDate);
    
    while (current <= endDate) {
        const dateStr = formatDate(current);
        const isCurrentMonth = current.getMonth() === month;
        const isToday = isSameDate(current, new Date());
        const isSelected = selectedDate && isSameDate(current, new Date(selectedDate));
        
        const shiftsCount = shifts.filter(shift => shift.date === dateStr).length;
        
        let dayClass = 'calendar-day';
        if (!isCurrentMonth) dayClass += ' other-month';
        if (isToday) dayClass += ' today';
        if (isSelected) dayClass += ' selected';
        
        days.push(`
            <div class="${dayClass}" onclick="selectDate('${dateStr}')">
                <div class="calendar-day-number">${current.getDate()}</div>
                ${shiftsCount > 0 ? `<div class="shift-indicator">${shiftsCount} směn</div>` : ''}
            </div>
        `);
        
        current.setDate(current.getDate() + 1);
    }
    
    return days.join('');
}

// Výběr data
function selectDate(dateStr) {
    selectedDate = dateStr;
    
    // Aktualizace kalendáře
    renderCalendar('calendar');
    renderCalendar('user-calendar');
    
    // Aktualizace seznamu směn
    updateShiftsList();
    updateUserShiftsList();
}

// Předchozí měsíc
function previousMonth() {
    currentDate.setMonth(currentDate.getMonth() - 1);
    renderCalendar('calendar');
    renderCalendar('user-calendar');
}

// Další měsíc
function nextMonth() {
    currentDate.setMonth(currentDate.getMonth() + 1);
    renderCalendar('calendar');
    renderCalendar('user-calendar');
}

// Aktualizace seznamu směn (admin)
function updateShiftsList() {
    const shiftsList = document.getElementById('shifts-list');
    const title = document.getElementById('selected-date-title');
    
    if (!selectedDate) {
        title.textContent = 'Vyberte den v kalendáři';
        shiftsList.innerHTML = '';
        return;
    }
    
    const dayShifts = shifts.filter(shift => shift.date === selectedDate);
    const date = new Date(selectedDate);
    const dateStr = date.toLocaleDateString('cs-CZ', { 
        day: 'numeric', 
        month: 'long', 
        year: 'numeric' 
    });
    
    title.textContent = `Směny pro ${dateStr}`;
    
    if (dayShifts.length === 0) {
        shiftsList.innerHTML = `
            <div class="shift-card">
                <div style="text-align: center; color: #9ca3af; padding: 40px;">
                    <i class="fas fa-clock" style="font-size: 48px; margin-bottom: 16px;"></i>
                    <h3>Žádné směny</h3>
                    <p>V tento den nejsou naplánované žádné směny.</p>
                </div>
            </div>
        `;
        return;
    }
    
    shiftsList.innerHTML = dayShifts.map(shift => `
        <div class="shift-card">
            <div class="shift-header">
                <div class="shift-info">
                    <h4><i class="fas fa-map-marker-alt"></i> ${shift.position}</h4>
                    <div class="shift-time">
                        <i class="fas fa-clock"></i>
                        ${shift.startTime} - ${shift.endTime}
                    </div>
                </div>
            </div>
            <div class="shift-users">
                <div class="shift-users-header">
                    <i class="fas fa-users"></i>
                    Přihlášení (${shift.users.length})
                </div>
                <div class="users-list">
                    ${shift.users.length > 0 ? 
                        shift.users.map(userId => {
                            const user = users.find(u => u.id === userId);
                            return `
                                <div class="user-tag">
                                    ${user ? user.name : 'Neznámý uživatel'}
                                    <button class="remove-btn" onclick="removeUserFromShift('${shift.id}', '${userId}')">
                                        <i class="fas fa-times"></i>
                                    </button>
                                </div>
                            `;
                        }).join('') : 
                        '<span class="no-users">Zatím se nikdo nepřihlásil</span>'
                    }
                </div>
            </div>
        </div>
    `).join('');
}

// Aktualizace seznamu směn (uživatel)
function updateUserShiftsList() {
    const shiftsList = document.getElementById('user-shifts-list');
    const title = document.getElementById('user-selected-date-title');
    
    if (!selectedDate) {
        title.textContent = 'Vyberte den v kalendáři';
        shiftsList.innerHTML = '';
        return;
    }
    
    const dayShifts = shifts.filter(shift => shift.date === selectedDate);
    const date = new Date(selectedDate);
    const dateStr = date.toLocaleDateString('cs-CZ', { 
        day: 'numeric', 
        month: 'long', 
        year: 'numeric' 
    });
    
    title.textContent = `Směny pro ${dateStr}`;
    
    if (dayShifts.length === 0) {
        shiftsList.innerHTML = `
            <div class="shift-card">
                <div style="text-align: center; color: #9ca3af; padding: 40px;">
                    <i class="fas fa-clock" style="font-size: 48px; margin-bottom: 16px;"></i>
                    <h3>Žádné směny</h3>
                    <p>V tento den nejsou naplánované žádné směny.</p>
                </div>
            </div>
        `;
        return;
    }
    
    shiftsList.innerHTML = dayShifts.map(shift => {
        const isSignedUp = shift.users.includes(currentUser.id);
        const isOccupied = shift.users.length > 0;
        const occupiedBy = isOccupied ? users.find(u => u.id === shift.users[0]) : null;
        
        return `
            <div class="shift-card ${isOccupied && !isSignedUp ? 'occupied' : ''}">
                <div class="shift-header">
                    <div class="shift-info">
                        <h4><i class="fas fa-map-marker-alt"></i> ${shift.position}</h4>
                        <div class="shift-time">
                            <i class="fas fa-clock"></i>
                            ${shift.startTime} - ${shift.endTime}
                        </div>
                    </div>
                    <div class="shift-actions">
                        ${isSignedUp ? 
                            `<button class="btn btn-danger" onclick="unsubscribeFromShift('${shift.id}')">
                                <i class="fas fa-undo"></i> Vrátit směnu
                            </button>` :
                            isOccupied ?
                                `<button class="btn btn-secondary" disabled>
                                    <i class="fas fa-lock"></i> Obsazeno
                                </button>` :
                                `<button class="btn btn-primary" onclick="subscribeToShift('${shift.id}')">
                                    <i class="fas fa-hand-paper"></i> Vzít směnu
                                </button>`
                        }
                    </div>
                </div>
                <div class="shift-users">
                    <div class="shift-users-header">
                        <i class="fas fa-user"></i>
                        ${isOccupied ? 'Obsazeno' : 'Volné'}
                    </div>
                    <div class="users-list">
                        ${isOccupied ? 
                            `<div class="user-tag">${occupiedBy ? occupiedBy.name : 'Neznámý uživatel'}</div>` :
                            '<span class="no-users">Směna je volná</span>'
                        }
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

// Aktualizace mých směn
function updateMyShiftsList() {
    const myShiftsList = document.getElementById('my-shifts-list');
    const myShifts = shifts.filter(shift => shift.users.includes(currentUser.id));
    
    if (myShifts.length === 0) {
        myShiftsList.innerHTML = `
            <div class="shift-card">
                <div style="text-align: center; color: #9ca3af; padding: 40px;">
                    <i class="fas fa-hand-paper" style="font-size: 48px; margin-bottom: 16px;"></i>
                    <h3>Žádné směny</h3>
                    <p>Zatím jste si nevzali žádnou směnu.</p>
                </div>
            </div>
        `;
        return;
    }
    
    myShiftsList.innerHTML = myShifts.map(shift => {
        const date = new Date(shift.date);
        const dateStr = date.toLocaleDateString('cs-CZ', { 
            day: 'numeric', 
            month: 'long', 
            year: 'numeric' 
        });
        
        return `
            <div class="shift-card">
                <div class="shift-header">
                    <div class="shift-info">
                        <h4><i class="fas fa-map-marker-alt"></i> ${shift.position}</h4>
                        <div class="shift-time">
                            <i class="fas fa-calendar"></i> ${dateStr}
                        </div>
                        <div class="shift-time">
                            <i class="fas fa-clock"></i>
                            ${shift.startTime} - ${shift.endTime}
                        </div>
                    </div>
                    <div class="shift-actions">
                        <button class="btn btn-danger" onclick="unsubscribeFromShift('${shift.id}')">
                            <i class="fas fa-undo"></i> Vrátit směnu
                        </button>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

// Aktualizace počtu mých směn
function updateMyShiftsCount() {
    const count = shifts.filter(shift => shift.users.includes(currentUser.id)).length;
    document.getElementById('my-shifts-count').textContent = count;
}

// Přihlášení na směnu
function subscribeToShift(shiftId) {
    const shift = shifts.find(s => s.id === shiftId);
    if (!shift) return;
    
    // Kontrola, zda už je směna obsazená
    if (shift.users.length > 0) {
        alert('Tato směna je již obsazená jiným zaměstnancem.');
        return;
    }
    
    // Kontrola, zda uživatel už není přihlášen
    if (shift.users.includes(currentUser.id)) {
        alert('Již jste přihlášen na tuto směnu.');
        return;
    }
    
    // Přihlášení na směnu
    shift.users.push(currentUser.id);
    saveData();
    updateUserShiftsList();
    updateMyShiftsList();
    updateMyShiftsCount();
    updateShiftsList();
    updateAdminShiftsList();
}

// Odhlášení ze směny
function unsubscribeFromShift(shiftId) {
    const shift = shifts.find(s => s.id === shiftId);
    if (shift) {
        shift.users = shift.users.filter(id => id !== currentUser.id);
        saveData();
        updateUserShiftsList();
        updateMyShiftsList();
        updateMyShiftsCount();
        updateShiftsList();
        updateAdminShiftsList();
    }
}

// Odstranění uživatele ze směny (admin)
function removeUserFromShift(shiftId, userId) {
    const shift = shifts.find(s => s.id === shiftId);
    if (shift) {
        shift.users = shift.users.filter(id => id !== userId);
        saveData();
        updateShiftsList();
    }
}

// Zobrazení modalu pro novou směnu
function showNewShiftModal() {
    document.getElementById('new-shift-modal').classList.add('active');
    
    // Nastavení dnešního data jako výchozího
    const today = new Date();
    const todayStr = today.toISOString().split('T')[0];
    document.getElementById('shift-date').value = todayStr;
    
    // Reset ostatních polí
    document.getElementById('shift-start').value = '';
    document.getElementById('shift-end').value = '';
    document.getElementById('shift-position').value = '';
}

// Skrytí modalu pro novou směnu
function hideNewShiftModal() {
    document.getElementById('new-shift-modal').classList.remove('active');
    document.getElementById('new-shift-form').reset();
}

// Vytvoření nové směny
function handleNewShift(e) {
    e.preventDefault();
    
    // Získání hodnot přímo z inputů podle ID
    const date = document.getElementById('shift-date').value;
    const startTime = document.getElementById('shift-start').value;
    const endTime = document.getElementById('shift-end').value;
    const position = document.getElementById('shift-position').value;
    
    // Validace
    if (!date || !startTime || !endTime || !position) {
        alert('Prosím vyplňte všechna pole');
        return;
    }
    
    const newShift = {
        id: 'shift-' + Date.now(),
        date: date,
        startTime: startTime,
        endTime: endTime,
        position: position,
        users: []
    };
    
    shifts.push(newShift);
    saveData();
    
    hideNewShiftModal();
    
    // Aktualizace všech zobrazení
    renderCalendar('calendar');
    renderCalendar('user-calendar');
    updateShiftsList();
    updateUserShiftsList();
    updateAdminShiftsList();
}

// Zobrazení modalu pro nového uživatele
function showNewUserModal() {
    document.getElementById('new-user-modal').classList.add('active');
    document.getElementById('new-user-form-container').style.display = 'block';
    document.getElementById('new-user-result').style.display = 'none';
    document.getElementById('new-user-form').reset();
}

// Skrytí modalu pro nového uživatele
function hideNewUserModal() {
    document.getElementById('new-user-modal').classList.remove('active');
}

// Vytvoření nového uživatele
function handleNewUser(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const userName = formData.get('user-name-input');
    const newPin = generatePin();
    
    const newUser = {
        id: 'user-' + Date.now(),
        pin: newPin,
        name: userName,
        isAdmin: false
    };
    
    users.push(newUser);
    saveData();
    
    // Aktualizace seznamu uživatelů
    updateUsersList();
    
    // Zobrazení výsledku
    document.getElementById('new-user-form-container').style.display = 'none';
    document.getElementById('new-user-result').style.display = 'block';
    document.getElementById('created-user-name').textContent = userName;
    document.getElementById('new-user-pin').textContent = newPin;
}

// Kopírování PINu
function copyPin() {
    const pin = document.getElementById('new-user-pin').textContent;
    navigator.clipboard.writeText(pin).then(() => {
        const btn = document.getElementById('copy-pin-btn');
        const originalText = btn.innerHTML;
        btn.innerHTML = '<i class="fas fa-check"></i> Zkopírováno';
        btn.style.background = '#10b981';
        
        setTimeout(() => {
            btn.innerHTML = originalText;
            btn.style.background = '';
        }, 2000);
    });
}

// Generování PINu
function generatePin() {
    return Math.floor(10000 + Math.random() * 90000).toString();
}

// Uložení dat
function saveData() {
    localStorage.setItem('smeny-shifts', JSON.stringify(shifts));
    localStorage.setItem('smeny-users', JSON.stringify(users));
    localStorage.setItem('smeny-workplaces', JSON.stringify(workplaces));
    localStorage.setItem('smeny-automatic-rules', JSON.stringify(automaticRules));
}

// Načtení dat
function loadData() {
    // Data jsou již načtena v initializeApp()
}

// Pomocné funkce
function formatDate(date) {
    return date.toISOString().split('T')[0];
}

function isSameDate(date1, date2) {
    return formatDate(date1) === formatDate(date2);
}

// Správa uživatelů
function updateUsersList() {
    const usersList = document.getElementById('users-list');
    if (!usersList) return;
    
    if (users.length === 0) {
        usersList.innerHTML = `
            <div class="empty-users">
                <i class="fas fa-users"></i>
                <h3>Žádní uživatelé</h3>
                <p>Zatím nebyli vytvořeni žádní uživatelé. Klikněte na "Nový uživatel" pro vytvoření prvního uživatele.</p>
            </div>
        `;
        return;
    }
    
    usersList.innerHTML = users.map(user => {
        const userShifts = shifts.filter(shift => shift.users.includes(user.id));
        const totalShifts = userShifts.length;
        
        return `
            <div class="user-card">
                <div class="user-header">
                    <div class="user-info">
                        <div class="user-name">${user.name}</div>
                        <div class="user-role ${user.isAdmin ? 'admin' : 'user'}">
                            <i class="fas fa-${user.isAdmin ? 'crown' : 'user'}"></i>
                            ${user.isAdmin ? 'Admin' : 'Uživatel'}
                        </div>
                    </div>
                    <div class="user-actions">
                        <button class="btn btn-danger btn-sm" onclick="deleteUser('${user.id}')" title="Smazat uživatele">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
                
                <div class="user-pin">
                    <span class="user-pin-label">PIN:</span>
                    <span class="user-pin-code">${user.pin}</span>
                </div>
                
                <div class="user-stats">
                    <div class="user-stats-item">
                        <div class="user-stats-value">${totalShifts}</div>
                        <div class="user-stats-label">Celkem směn</div>
                    </div>
                    <div class="user-stats-item">
                        <div class="user-stats-value">${userShifts.filter(shift => {
                            const shiftDate = new Date(shift.date);
                            const today = new Date();
                            today.setHours(0, 0, 0, 0);
                            return shiftDate >= today;
                        }).length}</div>
                        <div class="user-stats-label">Budoucí směny</div>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

function updateAdminShiftsList() {
    const shiftsList = document.getElementById('admin-shifts-list');
    if (!shiftsList) return;
    
    // Filtrování směn podle pracoviště
    let filteredShifts = shifts;
    if (currentWorkplaceFilter !== 'all') {
        filteredShifts = shifts.filter(shift => shift.position === currentWorkplaceFilter);
    }
    
    if (filteredShifts.length === 0) {
        const message = currentWorkplaceFilter === 'all' 
            ? 'Zatím nebyly vytvořeny žádné směny. Klikněte na "Nová směna" pro vytvoření první směny.'
            : `Žádné směny pro pracoviště "${currentWorkplaceFilter}".`;
        
        shiftsList.innerHTML = `
            <div class="empty-shifts">
                <i class="fas fa-clock"></i>
                <h3>Žádné směny</h3>
                <p>${message}</p>
            </div>
        `;
        return;
    }
    
    // Seřazení směn podle data
    const sortedShifts = [...filteredShifts].sort((a, b) => new Date(a.date) - new Date(b.date));
    
    shiftsList.innerHTML = sortedShifts.map(shift => {
        const shiftUsers = users.filter(user => shift.users.includes(user.id));
        const shiftDate = new Date(shift.date);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const isPast = shiftDate < today;
        
        return `
            <div class="shift-card ${isPast ? 'past-shift' : ''}">
                <div class="shift-info">
                    <div class="shift-date">
                        <i class="fas fa-calendar"></i>
                        ${formatDate(shiftDate)}
                    </div>
                    <div class="shift-time">
                        <i class="fas fa-clock"></i>
                        ${shift.startTime} - ${shift.endTime}
                    </div>
                    <div class="shift-position">
                        <i class="fas fa-map-marker-alt"></i>
                        ${shift.position}
                    </div>
                </div>
                
                <div class="shift-users">
                    <div class="users-header">
                        <span class="users-count">${shiftUsers.length} uživatel${shiftUsers.length === 1 ? '' : shiftUsers.length < 5 ? 'é' : 'ů'}</span>
                    </div>
                    <div class="users-list">
                        ${shiftUsers.length === 0 ? 
                            '<div class="no-users">Žádní přihlášení uživatelé</div>' :
                            shiftUsers.map(user => `
                                <div class="user-item">
                                    <span class="user-name">${user.name}</span>
                                    <button class="btn btn-sm btn-outline" onclick="removeUserFromShift('${shift.id}', '${user.id}')" title="Odstranit ze směny">
                                        <i class="fas fa-times"></i>
                                    </button>
                                </div>
                            `).join('')
                        }
                    </div>
                </div>
                
                <div class="shift-actions">
                    <button class="btn btn-danger btn-sm" onclick="deleteShift('${shift.id}')" title="Smazat směnu">
                        <i class="fas fa-trash"></i> Smazat
                    </button>
                </div>
            </div>
        `;
    }).join('');
}

function deleteUser(userId) {
    if (!confirm('Opravdu chcete smazat tohoto uživatele? Tato akce je nevratná.')) {
        return;
    }
    
    // Odstranění uživatele ze všech směn
    shifts.forEach(shift => {
        shift.users = shift.users.filter(id => id !== userId);
    });
    
    // Odstranění uživatele ze seznamu
    users = users.filter(user => user.id !== userId);
    
    // Uložení změn
    localStorage.setItem('smeny-users', JSON.stringify(users));
    localStorage.setItem('smeny-shifts', JSON.stringify(shifts));
    
    // Aktualizace zobrazení
    updateUsersList();
    updateAdminShiftsList();
    updateShiftsList();
    updateUserShiftsList();
}

function deleteShift(shiftId) {
    if (!confirm('Opravdu chcete smazat tuto směnu? Tato akce je nevratná.')) {
        return;
    }
    
    // Odstranění směny
    shifts = shifts.filter(shift => shift.id !== shiftId);
    
    // Uložení změn
    localStorage.setItem('smeny-shifts', JSON.stringify(shifts));
    
    // Aktualizace zobrazení
    updateAdminShiftsList();
    updateShiftsList();
    updateUserShiftsList();
    renderCalendar('calendar');
    renderCalendar('user-calendar');
}

// Správa pracovišť
function updateWorkplacesList() {
    const workplacesList = document.getElementById('workplaces-list');
    if (!workplacesList) return;
    
    if (workplaces.length === 0) {
        workplacesList.innerHTML = `
            <div class="empty-workplaces">
                <i class="fas fa-building"></i>
                <h3>Žádná pracoviště</h3>
                <p>Zatím nebyla vytvořena žádná pracoviště. Klikněte na "Nové pracoviště" pro vytvoření prvního pracoviště.</p>
            </div>
        `;
        return;
    }
    
    workplacesList.innerHTML = workplaces.map(workplace => {
        const workplaceShifts = shifts.filter(shift => shift.position === workplace.name);
        const totalShifts = workplaceShifts.length;
        
        return `
            <div class="workplace-card">
                <div class="workplace-header">
                    <div class="workplace-info">
                        <div class="workplace-name">${workplace.name}</div>
                        <div class="workplace-description">${workplace.description || 'Bez popisu'}</div>
                        ${workplace.hasFixedHours ? `
                            <div class="workplace-hours">
                                <span class="workplace-hours-label">Pevné hodiny:</span>
                                <span class="workplace-hours-time">${workplace.startTime} - ${workplace.endTime}</span>
                            </div>
                        ` : ''}
                    </div>
                    <div class="workplace-actions">
                        <button class="btn btn-primary btn-sm" onclick="editWorkplace('${workplace.id}')" title="Upravit pracoviště">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="btn btn-danger btn-sm" onclick="deleteWorkplace('${workplace.id}')" title="Smazat pracoviště">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
                
                <div class="workplace-stats">
                    <div class="workplace-stats-item">
                        <div class="workplace-stats-value">${totalShifts}</div>
                        <div class="workplace-stats-label">Celkem směn</div>
                    </div>
                    <div class="workplace-stats-item">
                        <div class="workplace-stats-value">${workplaceShifts.filter(shift => {
                            const shiftDate = new Date(shift.date);
                            const today = new Date();
                            today.setHours(0, 0, 0, 0);
                            return shiftDate >= today;
                        }).length}</div>
                        <div class="workplace-stats-label">Budoucí směny</div>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

function showNewWorkplaceModal() {
    document.getElementById('workplace-modal').classList.add('active');
    document.getElementById('workplace-modal-title').textContent = 'Nové pracoviště';
    
    // Reset formuláře
    document.getElementById('workplace-form').reset();
    document.getElementById('workplace-hours-section').style.display = 'none';
}

function hideWorkplaceModal() {
    document.getElementById('workplace-modal').classList.remove('active');
    document.getElementById('workplace-form').reset();
    document.getElementById('workplace-hours-section').style.display = 'none';
}

function editWorkplace(workplaceId) {
    const workplace = workplaces.find(w => w.id === workplaceId);
    if (!workplace) return;
    
    document.getElementById('workplace-modal').classList.add('active');
    document.getElementById('workplace-modal-title').textContent = 'Upravit pracoviště';
    
    // Vyplnění formuláře
    document.getElementById('workplace-name').value = workplace.name;
    document.getElementById('workplace-description').value = workplace.description || '';
    document.getElementById('workplace-has-fixed-hours').checked = workplace.hasFixedHours;
    
    const hoursSection = document.getElementById('workplace-hours-section');
    hoursSection.style.display = workplace.hasFixedHours ? 'block' : 'none';
    
    if (workplace.hasFixedHours) {
        document.getElementById('workplace-start-time').value = workplace.startTime;
        document.getElementById('workplace-end-time').value = workplace.endTime;
    }
    
    // Uložení ID pro editaci
    document.getElementById('workplace-form').dataset.editId = workplaceId;
}

function handleWorkplace(e) {
    e.preventDefault();
    
    const name = document.getElementById('workplace-name').value;
    const description = document.getElementById('workplace-description').value;
    const hasFixedHours = document.getElementById('workplace-has-fixed-hours').checked;
    const startTime = document.getElementById('workplace-start-time').value;
    const endTime = document.getElementById('workplace-end-time').value;
    const editId = document.getElementById('workplace-form').dataset.editId;
    
    // Validace
    if (!name) {
        alert('Prosím zadejte název pracoviště');
        return;
    }
    
    if (hasFixedHours && (!startTime || !endTime)) {
        alert('Prosím zadejte čas od a do pro pevné hodiny');
        return;
    }
    
    const workplaceData = {
        name: name,
        description: description,
        hasFixedHours: hasFixedHours,
        startTime: hasFixedHours ? startTime : null,
        endTime: hasFixedHours ? endTime : null
    };
    
    if (editId) {
        // Editace existujícího pracoviště
        const workplace = workplaces.find(w => w.id === editId);
        if (workplace) {
            Object.assign(workplace, workplaceData);
        }
    } else {
        // Vytvoření nového pracoviště
        const newWorkplace = {
            id: 'workplace-' + Date.now(),
            ...workplaceData
        };
        workplaces.push(newWorkplace);
    }
    
    saveData();
    updateWorkplacesList();
    updateWorkplaceSelect();
    hideWorkplaceModal();
}

function deleteWorkplace(workplaceId) {
    if (!confirm('Opravdu chcete smazat toto pracoviště? Tato akce je nevratná.')) {
        return;
    }
    
    // Kontrola, zda pracoviště není používáno ve směnách
    const workplace = workplaces.find(w => w.id === workplaceId);
    const usedInShifts = shifts.some(shift => shift.position === workplace.name);
    
    if (usedInShifts) {
        alert('Toto pracoviště je používáno ve směnách. Nejprve smažte nebo upravte směny.');
        return;
    }
    
    // Odstranění pracoviště
    workplaces = workplaces.filter(w => w.id !== workplaceId);
    
    // Uložení změn
    localStorage.setItem('smeny-workplaces', JSON.stringify(workplaces));
    
    // Aktualizace zobrazení
    updateWorkplacesList();
    updateWorkplaceSelect();
}

function updateWorkplaceSelect() {
    const select = document.getElementById('shift-position');
    if (!select) return;
    
    select.innerHTML = workplaces.map(workplace => 
        `<option value="${workplace.name}">${workplace.name}</option>`
    ).join('');
}

function updateWorkplaceFilterButtons() {
    const filterButtonsContainer = document.getElementById('workplace-filter-buttons');
    if (!filterButtonsContainer) return;
    
    // Vytvoření tlačítek pro všechna pracoviště
    const workplaceButtons = workplaces.map(workplace => 
        `<button class="filter-btn" data-workplace="${workplace.name}">
            <i class="fas fa-building"></i> ${workplace.name}
        </button>`
    ).join('');
    
    filterButtonsContainer.innerHTML = `
        <button class="filter-btn ${currentWorkplaceFilter === 'all' ? 'active' : ''}" data-workplace="all">
            <i class="fas fa-th"></i> Vše
        </button>
        ${workplaceButtons}
    `;
    
    // Přidání event listenerů
    filterButtonsContainer.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            // Odstranění active třídy ze všech tlačítek
            filterButtonsContainer.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            
            // Přidání active třídy na kliknuté tlačítko
            this.classList.add('active');
            
            // Nastavení aktuálního filtru
            currentWorkplaceFilter = this.dataset.workplace;
            
            // Aktualizace seznamu směn
            updateAdminShiftsList();
        });
    });
}

// Automatické směny
function updateAutomaticShiftsList() {
    const automaticShiftsList = document.getElementById('automatic-shifts-list');
    if (!automaticShiftsList) return;
    
    if (automaticRules.length === 0) {
        automaticShiftsList.innerHTML = `
            <div class="empty-workplaces">
                <i class="fas fa-magic"></i>
                <h3>Žádná automatická pravidla</h3>
                <p>Zatím nebyla vytvořena žádná automatická pravidla pro generování směn.</p>
            </div>
        `;
        return;
    }
    
    automaticShiftsList.innerHTML = automaticRules.map(rule => {
        const dayNames = ['Ne', 'Po', 'Út', 'St', 'Čt', 'Pá', 'So'];
        const selectedDays = rule.weekdays.map(day => dayNames[day]);
        const generatedShifts = shifts.filter(shift => 
            shift.position === rule.workplace && 
            shift.startTime === rule.startTime && 
            shift.endTime === rule.endTime
        );
        
        return `
            <div class="automatic-rule-card">
                <div class="automatic-rule-header">
                    <div class="automatic-rule-info">
                        <div class="automatic-rule-workplace">${rule.workplace}</div>
                        <div class="automatic-rule-days">
                            ${selectedDays.map(day => `<span class="automatic-day-tag">${day}</span>`).join('')}
                        </div>
                        <div class="automatic-rule-time">
                            <span class="automatic-rule-time-label">Čas:</span>
                            <span class="automatic-rule-time-value">${rule.startTime} - ${rule.endTime}</span>
                        </div>
                        <div class="automatic-rule-period">
                            <i class="fas fa-calendar"></i> Do: ${new Date(rule.endDate).toLocaleDateString('cs-CZ')}
                        </div>
                    </div>
                    <div class="automatic-rule-actions">
                        <button class="btn btn-danger btn-sm" onclick="deleteAutomaticRule('${rule.id}')" title="Smazat pravidlo">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
                
                <div class="automatic-rule-stats">
                    <div class="automatic-rule-stats-item">
                        <div class="automatic-rule-stats-value">${generatedShifts.length}</div>
                        <div class="automatic-rule-stats-label">Vygenerované směny</div>
                    </div>
                    <div class="automatic-rule-stats-item">
                        <div class="automatic-rule-stats-value">${generatedShifts.filter(shift => {
                            const shiftDate = new Date(shift.date);
                            const today = new Date();
                            today.setHours(0, 0, 0, 0);
                            return shiftDate >= today;
                        }).length}</div>
                        <div class="automatic-rule-stats-label">Budoucí směny</div>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

function showAutomaticShiftsModal() {
    document.getElementById('automatic-shifts-modal').classList.add('active');
    
    // Naplnění selectu pracovišť
    const workplaceSelect = document.getElementById('auto-workplace');
    workplaceSelect.innerHTML = '<option value="">Vyberte pracoviště</option>' + 
        workplaces.map(workplace => `<option value="${workplace.name}">${workplace.name}</option>`).join('');
    
    // Nastavení koncového data na konec roku
    const endDateInput = document.getElementById('auto-end-date');
    const currentYear = new Date().getFullYear();
    endDateInput.value = `${currentYear}-12-31`;
    
    // Reset formuláře
    document.getElementById('automatic-shifts-form').reset();
    endDateInput.value = `${currentYear}-12-31`;
}

function hideAutomaticShiftsModal() {
    document.getElementById('automatic-shifts-modal').classList.remove('active');
    document.getElementById('automatic-shifts-form').reset();
}

function handleAutomaticShifts(e) {
    e.preventDefault();
    
    const workplace = document.getElementById('auto-workplace').value;
    const startTime = document.getElementById('auto-start-time').value;
    const endTime = document.getElementById('auto-end-time').value;
    const endDate = document.getElementById('auto-end-date').value;
    
    // Získání vybraných dnů
    const selectedWeekdays = Array.from(document.querySelectorAll('input[name="weekdays"]:checked'))
        .map(checkbox => parseInt(checkbox.value));
    
    // Validace
    if (!workplace) {
        alert('Prosím vyberte pracoviště');
        return;
    }
    
    if (selectedWeekdays.length === 0) {
        alert('Prosím vyberte alespoň jeden den v týdnu');
        return;
    }
    
    if (!startTime || !endTime) {
        alert('Prosím zadejte čas od a do');
        return;
    }
    
    if (!endDate) {
        alert('Prosím zadejte koncové datum');
        return;
    }
    
    // Vytvoření pravidla
    const rule = {
        id: 'rule-' + Date.now(),
        workplace: workplace,
        weekdays: selectedWeekdays,
        startTime: startTime,
        endTime: endTime,
        endDate: endDate,
        createdAt: new Date().toISOString()
    };
    
    // Přidání pravidla
    automaticRules.push(rule);
    
    // Generování směn
    generateShiftsFromRule(rule);
    
    // Uložení
    saveData();
    
    // Aktualizace zobrazení
    updateAutomaticShiftsList();
    updateAdminShiftsList();
    updateShiftsList();
    updateUserShiftsList();
    renderCalendar('calendar');
    renderCalendar('user-calendar');
    
    hideAutomaticShiftsModal();
    
    alert(`Úspěšně vytvořeno pravidlo a vygenerovány směny pro ${workplace}!`);
}

function generateShiftsFromRule(rule) {
    const startDate = new Date();
    const endDate = new Date(rule.endDate);
    const dayNames = ['Ne', 'Po', 'Út', 'St', 'Čt', 'Pá', 'So'];
    
    let generatedCount = 0;
    
    // Procházení každého dne od dnes do koncového data
    for (let date = new Date(startDate); date <= endDate; date.setDate(date.getDate() + 1)) {
        const dayOfWeek = date.getDay();
        
        // Kontrola, zda je tento den vybraný v pravidle
        if (rule.weekdays.includes(dayOfWeek)) {
            const dateStr = date.toISOString().split('T')[0];
            
            // Kontrola, zda už neexistuje směna na tento den a pracoviště
            const existingShift = shifts.find(shift => 
                shift.date === dateStr && 
                shift.position === rule.workplace &&
                shift.startTime === rule.startTime &&
                shift.endTime === rule.endTime
            );
            
            if (!existingShift) {
                const newShift = {
                    id: 'shift-' + Date.now() + '-' + generatedCount,
                    date: dateStr,
                    startTime: rule.startTime,
                    endTime: rule.endTime,
                    position: rule.workplace,
                    users: [],
                    autoGenerated: true,
                    ruleId: rule.id
                };
                
                shifts.push(newShift);
                generatedCount++;
            }
        }
    }
    
    return generatedCount;
}

function deleteAutomaticRule(ruleId) {
    if (!confirm('Opravdu chcete smazat toto automatické pravidlo? Všechny vygenerované směny budou také smazány.')) {
        return;
    }
    
    // Smazání všech směn vygenerovaných tímto pravidlem
    shifts = shifts.filter(shift => shift.ruleId !== ruleId);
    
    // Smazání pravidla
    automaticRules = automaticRules.filter(rule => rule.id !== ruleId);
    
    // Uložení změn
    saveData();
    
    // Aktualizace zobrazení
    updateAutomaticShiftsList();
    updateAdminShiftsList();
    updateShiftsList();
    updateUserShiftsList();
    renderCalendar('calendar');
    renderCalendar('user-calendar');
}

// Globální funkce pro kalendář
window.previousMonth = previousMonth;
window.nextMonth = nextMonth;
window.selectDate = selectDate;
window.subscribeToShift = subscribeToShift;
window.unsubscribeFromShift = unsubscribeFromShift;
window.removeUserFromShift = removeUserFromShift;
window.switchAdminTab = switchAdminTab;
window.deleteUser = deleteUser;
window.deleteShift = deleteShift;
window.showNewWorkplaceModal = showNewWorkplaceModal;
window.hideWorkplaceModal = hideWorkplaceModal;
window.editWorkplace = editWorkplace;
window.deleteWorkplace = deleteWorkplace;
window.showAutomaticShiftsModal = showAutomaticShiftsModal;
window.hideAutomaticShiftsModal = hideAutomaticShiftsModal;
window.deleteAutomaticRule = deleteAutomaticRule;

