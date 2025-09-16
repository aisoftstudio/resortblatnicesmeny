/**
 * Hlavní inicializační soubor aplikace
 * Spouští všechny moduly a nastavuje globální proměnné
 */

// Globální proměnné aplikace
let currentUser = null;
let shifts = [];
let users = [];
let workplaces = [];
let automaticRules = [];
let selectedDate = null;
let currentWorkplaceFilter = 'all';

// Globální instance služeb
let firebaseService = null;
let kalendarSmenManager = null;
let spravaSmenManager = null;
let automatickeSmenyManager = null;
let spravaPracovistManager = null;
let spravaUzivateluManager = null;

/**
 * Inicializace aplikace
 */
async function initializeApp() {
    console.log('🚀 Spouštím MODULÁRNÍ VERZI aplikace!');
    console.log('📦 Všechny Admin sekce jsou migrovány do modulů');
    console.log('🔧 Manager třídy:', {
        KalendarSmenManager: typeof KalendarSmenManager,
        SpravaSmenManager: typeof SpravaSmenManager,
        AutomatickeSmenyManager: typeof AutomatickeSmenyManager,
        SpravaPracovistManager: typeof SpravaPracovistManager,
        SpravaUzivateluManager: typeof SpravaUzivateluManager
    });
    
    try {
        // Inicializace Firebase služby
        firebaseService = new FirebaseService();
        await firebaseService.inicializovat();
        
        // Inicializace prázdných polí
        shifts = [];
        users = [];
        workplaces = [];
        automaticRules = [];
        
        // Kontrola přihlášeného uživatele z localStorage
        const savedUser = localStorage.getItem('smeny-current-user');
        if (savedUser) {
            try {
                currentUser = JSON.parse(savedUser);
            } catch (error) {
                localStorage.removeItem('smeny-current-user');
                currentUser = null;
            }
        }
        
        // Načtení dat z Firebase
        await loadData();
        
        // Inicializace managerů
        kalendarSmenManager = new KalendarSmenManager(firebaseService);
        spravaSmenManager = new SpravaSmenManager(firebaseService);
        automatickeSmenyManager = new AutomatickeSmenyManager(firebaseService);
        spravaPracovistManager = new SpravaPracovistManager(firebaseService);
        spravaUzivateluManager = new SpravaUzivateluManager(firebaseService);
        
        // Nastavení globálních referencí
        window.kalendarSmenManager = kalendarSmenManager;
        window.spravaSmenManager = spravaSmenManager;
        window.automatickeSmenyManager = automatickeSmenyManager;
        window.spravaPracovistManager = spravaPracovistManager;
        window.spravaUzivateluManager = spravaUzivateluManager;
        
        // Zobrazení příslušného rozhraní
        if (currentUser) {
            showUserInterface();
        } else {
            showLoginPage();
        }
        
        console.log('✅ Aplikace úspěšně inicializována');
        
    } catch (error) {
        console.error('❌ Chyba při inicializaci aplikace:', error);
        showErrorMessage('Chyba při připojení k databázi. Zkontrolujte internetové připojení.');
        showLoginPage();
    }
}

/**
 * Načtení dat z Firebase
 */
async function loadData() {
    if (!firebaseService) {
        throw new Error('Firebase služba není inicializována');
    }
    
    try {
        // Načtení dat z Firebase
        const shiftsResult = await firebaseService.nacistSměny();
        const usersResult = await firebaseService.nacistUzivatele();
        const workplacesResult = await firebaseService.nacistPracoviste();
        const automaticRulesResult = await firebaseService.nacistAutomatickaPravidla();
        
        if (!shiftsResult.success) {
            throw new Error(`Chyba při načítání směn: ${shiftsResult.error}`);
        }
        if (!usersResult.success) {
            throw new Error(`Chyba při načítání uživatelů: ${usersResult.error}`);
        }
        if (!workplacesResult.success) {
            throw new Error(`Chyba při načítání pracovišť: ${workplacesResult.error}`);
        }
        if (!automaticRulesResult.success) {
            throw new Error(`Chyba při načítání automatických pravidel: ${automaticRulesResult.error}`);
        }
        
        // Nastavení dat
        shifts = shiftsResult.data || [];
        users = usersResult.data || [];
        workplaces = workplacesResult.data || [];
        automaticRules = automaticRulesResult.data || [];
        
        // Pokud nejsou žádní uživatelé, vytvoř admin účet
        if (users.length === 0) {
            const adminUser = {
                id: 'admin-1',
                pin: '12345',
                name: 'Admin',
                isAdmin: true
            };
            users.push(adminUser);
            await saveData(); // Uloží admin uživatele do Firebase
        }
        
        console.log('📊 Data úspěšně načtena:');
        console.log(`- Směny: ${shifts.length}`);
        console.log(`- Uživatelé: ${users.length}`);
        console.log(`- Pracoviště: ${workplaces.length}`);
        console.log(`- Automatická pravidla: ${automaticRules.length}`);
        
    } catch (error) {
        console.error('❌ Chyba při načítání dat:', error);
        throw error;
    }
}

/**
 * Uložení dat do Firebase
 */
async function saveData() {
    if (!firebaseService) {
        throw new Error('Firebase služba není inicializována');
    }
    
    try {
        // Synchronizace směn s Firebase
        for (const shift of shifts) {
            if (!shift.firebaseId) {
                // Nová směna - vytvoř v Firebase
                const result = await firebaseService.vytvoritSměnu(shift);
                if (result.success) {
                    shift.firebaseId = result.id;
                } else {
                    throw new Error(`Chyba při vytváření směny: ${result.error}`);
                }
            } else {
                // Existující směna - aktualizuj v Firebase
                const result = await firebaseService.aktualizovatSměnu(shift.firebaseId, shift);
                if (!result.success) {
                    throw new Error(`Chyba při aktualizaci směny: ${result.error}`);
                }
            }
        }
        
        // Synchronizace pracovišť s Firebase
        for (const workplace of workplaces) {
            if (!workplace.firebaseId) {
                // Nové pracoviště - vytvoř v Firebase
                const result = await firebaseService.vytvoritPracoviste(workplace);
                if (result.success) {
                    workplace.firebaseId = result.id;
                } else {
                    throw new Error(`Chyba při vytváření pracoviště: ${result.error}`);
                }
            } else {
                // Existující pracoviště - aktualizuj v Firebase
                const result = await firebaseService.aktualizovatPracoviste(workplace.firebaseId, workplace);
                if (!result.success) {
                    throw new Error(`Chyba při aktualizaci pracoviště: ${result.error}`);
                }
            }
        }
        
        // Synchronizace uživatelů s Firebase
        for (const user of users) {
            if (!user.firebaseId) {
                // Nový uživatel - vytvoř v Firebase
                const result = await firebaseService.vytvoritUzivatele(user);
                if (result.success) {
                    user.firebaseId = result.id;
                } else {
                    throw new Error(`Chyba při vytváření uživatele: ${result.error}`);
                }
            } else {
                // Existující uživatel - aktualizuj v Firebase
                const result = await firebaseService.aktualizovatUzivatele(user.firebaseId, user);
                if (!result.success) {
                    throw new Error(`Chyba při aktualizaci uživatele: ${result.error}`);
                }
            }
        }
        
        // Synchronizace automatických pravidel s Firebase
        for (const rule of automaticRules) {
            if (!rule.firebaseId) {
                // Nové pravidlo - vytvoř v Firebase
                const result = await firebaseService.vytvoritAutomatickePravidlo(rule);
                if (result.success) {
                    rule.firebaseId = result.id;
                } else {
                    throw new Error(`Chyba při vytváření automatického pravidla: ${result.error}`);
                }
            } else {
                // Existující pravidlo - aktualizuj v Firebase
                const result = await firebaseService.aktualizovatAutomatickePravidlo(rule.firebaseId, rule);
                if (!result.success) {
                    throw new Error(`Chyba při aktualizaci automatického pravidla: ${result.error}`);
                }
            }
        }
        
        console.log('💾 Data úspěšně uložena do Firebase');
    } catch (error) {
        console.error('❌ Chyba při ukládání dat:', error);
        throw error;
    }
}

/**
 * Zobrazení přihlašovací stránky
 */
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

/**
 * Zobrazení uživatelského rozhraní podle role
 */
function showUserInterface() {
    if (currentUser.isAdmin) {
        showAdminInterface();
    } else {
        showUserPage();
    }
}

/**
 * Zobrazení admin rozhraní
 */
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
    
    // Inicializace všech managerů
    if (kalendarSmenManager) {
        kalendarSmenManager.inicializovat();
    }
    if (spravaSmenManager) {
        spravaSmenManager.inicializovat();
    }
    if (automatickeSmenyManager) {
        automatickeSmenyManager.inicializovat();
    }
    if (spravaPracovistManager) {
        spravaPracovistManager.inicializovat();
    }
    if (spravaUzivateluManager) {
        spravaUzivateluManager.inicializovat();
    }
    
    // Inicializace prvního tabu (kalendář)
    switchAdminTab('calendar');
}

/**
 * Zobrazení uživatelské stránky
 */
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
    
    // TODO: Inicializace uživatelských komponent
    // renderCalendar('user-calendar');
    // updateUserShiftsList();
    // updateMyShiftsList();
    // updateMyShiftsCount();
}

/**
 * Přepnutí admin tabů
 */
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
        if (kalendarSmenManager) {
            kalendarSmenManager.renderKalendar();
            kalendarSmenManager.updateShiftsList();
        }
    } else if (tabName === 'shifts') {
        if (spravaSmenManager) {
            spravaSmenManager.aktualizovatData();
        }
    } else if (tabName === 'automatic') {
        if (automatickeSmenyManager) {
            automatickeSmenyManager.aktualizovatData();
        }
    } else if (tabName === 'workplaces') {
        if (spravaPracovistManager) {
            spravaPracovistManager.aktualizovatData();
        }
    } else if (tabName === 'users') {
        if (spravaUzivateluManager) {
            spravaUzivateluManager.aktualizovatData();
        }
    }
}

/**
 * Zobrazení chybové zprávy
 */
function showErrorMessage(message) {
    const errorMessage = document.getElementById('error-message');
    if (errorMessage) {
        errorMessage.textContent = message;
        errorMessage.style.display = 'block';
    } else {
        alert(message);
    }
}

// Globální funkce pro kompatibilitu s existujícím kódem
window.switchAdminTab = switchAdminTab;
window.showErrorMessage = showErrorMessage;

// Spuštění aplikace při načtení DOM
document.addEventListener('DOMContentLoaded', initializeApp);
