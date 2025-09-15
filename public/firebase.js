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

// Export funkcí pro globální použití
window.firebaseServices = {
    vytvoritSměnu,
    aktualizovatSměnu,
    nacistSměny,
    smazatSměnu,
    auth,
    db
};
