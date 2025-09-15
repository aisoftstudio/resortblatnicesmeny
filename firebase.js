// Firebase konfigurace pro Resort Blatnice - Systém směn
// Jednodušší verze pro kompatibilitu s prohlížečem

// Firebase konfigurace
const firebaseConfig = {
  apiKey: "AIzaSyCUHp-pGkTdTkDbjGv5c4KJXaWdy5p9lqM",
  authDomain: "resort-blatnice-smeny.firebaseapp.com",
  projectId: "resort-blatnice-smeny",
  storageBucket: "resort-blatnice-smeny.firebasestorage.app",
  messagingSenderId: "958523831758",
  appId: "1:958523831758:web:ba35dad729026e8bc6a79f"
};

// Inicializace Firebase
let app, db, auth;

try {
    // Zkusíme získat existující app nebo vytvořit novou
    try {
        app = firebase.app(); // Zkusíme získat existující app
    } catch (e) {
        app = firebase.initializeApp(firebaseConfig); // Vytvoříme novou
    }
    
    // Inicializace služeb
    db = firebase.firestore();
    auth = firebase.auth();
} catch (error) {
    console.error('Chyba při inicializaci Firebase:', error);
}

// ===== FIRESTORE SERVICES =====

/**
 * Vytvoření nové směny v Firebase
 */
async function vytvoritSměnu(směnaData) {
    if (!db) {
        return { success: false, error: 'Firestore není inicializováno' };
    }
    
    try {
        const docRef = await db.collection('shifts').add(směnaData);
        return { success: true, id: docRef.id };
    } catch (error) {
        console.error('Chyba při vytváření směny:', error);
        return { success: false, error: error.message };
    }
}

/**
 * Aktualizace směny v Firebase
 */
async function aktualizovatSměnu(id, směnaData) {
    if (!db) {
        return { success: false, error: 'Firestore není inicializováno' };
    }
    
    try {
        await db.collection('shifts').doc(id).update(směnaData);
        return { success: true };
    } catch (error) {
        console.error('Chyba při aktualizaci směny:', error);
        return { success: false, error: error.message };
    }
}

/**
 * Načtení všech směn z Firebase
 */
async function nacistSměny() {
    if (!db) {
        return { success: false, error: 'Firestore není inicializováno' };
    }
    
    try {
        const querySnapshot = await db.collection('shifts').get();
        const směny = [];
        querySnapshot.forEach((doc) => {
            směny.push({ id: doc.id, ...doc.data() });
        });
        return { success: true, data: směny };
    } catch (error) {
        console.error('Chyba při načítání směn:', error);
        return { success: false, error: error.message };
    }
}

/**
 * Smazání směny z Firebase
 */
async function smazatSměnu(id) {
    if (!db) {
        return { success: false, error: 'Firestore není inicializováno' };
    }
    
    try {
        await db.collection('shifts').doc(id).delete();
        return { success: true };
    } catch (error) {
        console.error('Chyba při mazání směny:', error);
        return { success: false, error: error.message };
    }
}

/**
 * Vytvoření nového pracoviště v Firebase
 */
async function vytvoritPracoviste(pracovisteData) {
    if (!db) {
        return { success: false, error: 'Firestore není inicializováno' };
    }
    
    try {
        const docRef = await db.collection('workplaces').add(pracovisteData);
        return { success: true, id: docRef.id };
    } catch (error) {
        console.error('Chyba při vytváření pracoviště:', error);
        return { success: false, error: error.message };
    }
}

/**
 * Aktualizace pracoviště v Firebase
 */
async function aktualizovatPracoviste(id, pracovisteData) {
    if (!db) {
        return { success: false, error: 'Firestore není inicializováno' };
    }
    
    try {
        await db.collection('workplaces').doc(id).update(pracovisteData);
        return { success: true };
    } catch (error) {
        console.error('Chyba při aktualizaci pracoviště:', error);
        return { success: false, error: error.message };
    }
}

/**
 * Načtení všech pracovišť z Firebase
 */
async function nacistPracoviste() {
    if (!db) {
        return { success: false, error: 'Firestore není inicializováno' };
    }
    
    try {
        const querySnapshot = await db.collection('workplaces').get();
        const pracoviste = [];
        querySnapshot.forEach((doc) => {
            pracoviste.push({ id: doc.id, ...doc.data() });
        });
        return { success: true, data: pracoviste };
    } catch (error) {
        console.error('Chyba při načítání pracovišť:', error);
        return { success: false, error: error.message };
    }
}

/**
 * Smazání pracoviště z Firebase
 */
async function smazatPracoviste(id) {
    if (!db) {
        return { success: false, error: 'Firestore není inicializováno' };
    }
    
    try {
        await db.collection('workplaces').doc(id).delete();
        return { success: true };
    } catch (error) {
        console.error('Chyba při mazání pracoviště:', error);
        return { success: false, error: error.message };
    }
}

/**
 * Vytvoření nového uživatele v Firebase
 */
async function vytvoritUzivatele(uzivatelData) {
    if (!db) {
        return { success: false, error: 'Firestore není inicializováno' };
    }
    
    try {
        const docRef = await db.collection('users').add(uzivatelData);
        return { success: true, id: docRef.id };
    } catch (error) {
        console.error('Chyba při vytváření uživatele:', error);
        return { success: false, error: error.message };
    }
}

/**
 * Aktualizace uživatele v Firebase
 */
async function aktualizovatUzivatele(id, uzivatelData) {
    if (!db) {
        return { success: false, error: 'Firestore není inicializováno' };
    }
    
    try {
        await db.collection('users').doc(id).update(uzivatelData);
        return { success: true };
    } catch (error) {
        console.error('Chyba při aktualizaci uživatele:', error);
        return { success: false, error: error.message };
    }
}

/**
 * Načtení všech uživatelů z Firebase
 */
async function nacistUzivatele() {
    if (!db) {
        return { success: false, error: 'Firestore není inicializováno' };
    }
    
    try {
        const querySnapshot = await db.collection('users').get();
        const uzivatele = [];
        querySnapshot.forEach((doc) => {
            uzivatele.push({ id: doc.id, ...doc.data() });
        });
        return { success: true, data: uzivatele };
    } catch (error) {
        console.error('Chyba při načítání uživatelů:', error);
        return { success: false, error: error.message };
    }
}

/**
 * Smazání uživatele z Firebase
 */
async function smazatUzivatele(id) {
    if (!db) {
        return { success: false, error: 'Firestore není inicializováno' };
    }
    
    try {
        await db.collection('users').doc(id).delete();
        return { success: true };
    } catch (error) {
        console.error('Chyba při mazání uživatele:', error);
        return { success: false, error: error.message };
    }
}

/**
 * Vytvoření nového automatického pravidla v Firebase
 */
async function vytvoritAutomatickePravidlo(pravidloData) {
    if (!db) {
        return { success: false, error: 'Firestore není inicializováno' };
    }
    
    try {
        const docRef = await db.collection('automaticRules').add(pravidloData);
        return { success: true, id: docRef.id };
    } catch (error) {
        console.error('Chyba při vytváření automatického pravidla:', error);
        return { success: false, error: error.message };
    }
}

/**
 * Aktualizace automatického pravidla v Firebase
 */
async function aktualizovatAutomatickePravidlo(id, pravidloData) {
    if (!db) {
        return { success: false, error: 'Firestore není inicializováno' };
    }
    
    try {
        await db.collection('automaticRules').doc(id).update(pravidloData);
        return { success: true };
    } catch (error) {
        console.error('Chyba při aktualizaci automatického pravidla:', error);
        return { success: false, error: error.message };
    }
}

/**
 * Načtení všech automatických pravidel z Firebase
 */
async function nacistAutomatickaPravidla() {
    if (!db) {
        return { success: false, error: 'Firestore není inicializováno' };
    }
    
    try {
        const querySnapshot = await db.collection('automaticRules').get();
        const pravidla = [];
        querySnapshot.forEach((doc) => {
            pravidla.push({ id: doc.id, ...doc.data() });
        });
        return { success: true, data: pravidla };
    } catch (error) {
        console.error('Chyba při načítání automatických pravidel:', error);
        return { success: false, error: error.message };
    }
}

/**
 * Smazání automatického pravidla z Firebase
 */
async function smazatAutomatickePravidlo(id) {
    if (!db) {
        return { success: false, error: 'Firestore není inicializováno' };
    }
    
    try {
        await db.collection('automaticRules').doc(id).delete();
        return { success: true };
    } catch (error) {
        console.error('Chyba při mazání automatického pravidla:', error);
        return { success: false, error: error.message };
    }
}

// Export funkcí pro globální použití
window.firebaseServices = {
    // Směny
    vytvoritSměnu,
    aktualizovatSměnu,
    nacistSměny,
    smazatSměnu,
    // Pracoviště
    vytvoritPracoviste,
    aktualizovatPracoviste,
    nacistPracoviste,
    smazatPracoviste,
    // Uživatelé
    vytvoritUzivatele,
    aktualizovatUzivatele,
    nacistUzivatele,
    smazatUzivatele,
    // Automatická pravidla
    vytvoritAutomatickePravidlo,
    aktualizovatAutomatickePravidlo,
    nacistAutomatickaPravidla,
    smazatAutomatickePravidlo,
    // Firebase služby
    auth,
    db
};
