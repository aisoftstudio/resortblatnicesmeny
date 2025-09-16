/**
 * Firebase Service - Sdílená služba pro práci s Firebase
 * Obsahuje všechny Firebase operace pro aplikaci
 */

class FirebaseService {
    constructor() {
        this.db = null;
        this.auth = null;
        this.initialized = false;
    }

    /**
     * Inicializace Firebase služeb
     */
    async inicializovat() {
        try {
            if (window.firebaseServices) {
                this.db = window.firebaseServices.db;
                this.auth = window.firebaseServices.auth;
                this.initialized = true;
                console.log('Firebase služby úspěšně inicializovány');
            } else {
                throw new Error('Firebase služby nejsou dostupné');
            }
        } catch (error) {
            console.error('Chyba při inicializaci Firebase:', error);
            throw error;
        }
    }

    /**
     * Vytvoření nové směny v Firebase
     */
    async vytvoritSměnu(směnaData) {
        if (!this.initialized) {
            return { success: false, error: 'Firebase není inicializováno' };
        }
        
        try {
            const result = await window.firebaseServices.vytvoritSměnu(směnaData);
            return result;
        } catch (error) {
            console.error('Chyba při vytváření směny:', error);
            return { success: false, error: error.message };
        }
    }

    /**
     * Aktualizace směny v Firebase
     */
    async aktualizovatSměnu(id, směnaData) {
        if (!this.initialized) {
            return { success: false, error: 'Firebase není inicializováno' };
        }
        
        try {
            const result = await window.firebaseServices.aktualizovatSměnu(id, směnaData);
            return result;
        } catch (error) {
            console.error('Chyba při aktualizaci směny:', error);
            return { success: false, error: error.message };
        }
    }

    /**
     * Načtení všech směn z Firebase
     */
    async nacistSměny() {
        if (!this.initialized) {
            return { success: false, error: 'Firebase není inicializováno' };
        }
        
        try {
            const result = await window.firebaseServices.nacistSměny();
            return result;
        } catch (error) {
            console.error('Chyba při načítání směn:', error);
            return { success: false, error: error.message };
        }
    }

    /**
     * Smazání směny z Firebase
     */
    async smazatSměnu(id) {
        if (!this.initialized) {
            return { success: false, error: 'Firebase není inicializováno' };
        }
        
        try {
            const result = await window.firebaseServices.smazatSměnu(id);
            return result;
        } catch (error) {
            console.error('Chyba při mazání směny:', error);
            return { success: false, error: error.message };
        }
    }

    /**
     * Vytvoření nového pracoviště v Firebase
     */
    async vytvoritPracoviste(pracovisteData) {
        if (!this.initialized) {
            return { success: false, error: 'Firebase není inicializováno' };
        }
        
        try {
            const result = await window.firebaseServices.vytvoritPracoviste(pracovisteData);
            return result;
        } catch (error) {
            console.error('Chyba při vytváření pracoviště:', error);
            return { success: false, error: error.message };
        }
    }

    /**
     * Aktualizace pracoviště v Firebase
     */
    async aktualizovatPracoviste(id, pracovisteData) {
        if (!this.initialized) {
            return { success: false, error: 'Firebase není inicializováno' };
        }
        
        try {
            const result = await window.firebaseServices.aktualizovatPracoviste(id, pracovisteData);
            return result;
        } catch (error) {
            console.error('Chyba při aktualizaci pracoviště:', error);
            return { success: false, error: error.message };
        }
    }

    /**
     * Načtení všech pracovišť z Firebase
     */
    async nacistPracoviste() {
        if (!this.initialized) {
            return { success: false, error: 'Firebase není inicializováno' };
        }
        
        try {
            const result = await window.firebaseServices.nacistPracoviste();
            return result;
        } catch (error) {
            console.error('Chyba při načítání pracovišť:', error);
            return { success: false, error: error.message };
        }
    }

    /**
     * Smazání pracoviště z Firebase
     */
    async smazatPracoviste(id) {
        if (!this.initialized) {
            return { success: false, error: 'Firebase není inicializováno' };
        }
        
        try {
            const result = await window.firebaseServices.smazatPracoviste(id);
            return result;
        } catch (error) {
            console.error('Chyba při mazání pracoviště:', error);
            return { success: false, error: error.message };
        }
    }

    /**
     * Vytvoření nového uživatele v Firebase
     */
    async vytvoritUzivatele(uzivatelData) {
        if (!this.initialized) {
            return { success: false, error: 'Firebase není inicializováno' };
        }
        
        try {
            const result = await window.firebaseServices.vytvoritUzivatele(uzivatelData);
            return result;
        } catch (error) {
            console.error('Chyba při vytváření uživatele:', error);
            return { success: false, error: error.message };
        }
    }

    /**
     * Aktualizace uživatele v Firebase
     */
    async aktualizovatUzivatele(id, uzivatelData) {
        if (!this.initialized) {
            return { success: false, error: 'Firebase není inicializováno' };
        }
        
        try {
            const result = await window.firebaseServices.aktualizovatUzivatele(id, uzivatelData);
            return result;
        } catch (error) {
            console.error('Chyba při aktualizaci uživatele:', error);
            return { success: false, error: error.message };
        }
    }

    /**
     * Načtení všech uživatelů z Firebase
     */
    async nacistUzivatele() {
        if (!this.initialized) {
            return { success: false, error: 'Firebase není inicializováno' };
        }
        
        try {
            const result = await window.firebaseServices.nacistUzivatele();
            return result;
        } catch (error) {
            console.error('Chyba při načítání uživatelů:', error);
            return { success: false, error: error.message };
        }
    }

    /**
     * Smazání uživatele z Firebase
     */
    async smazatUzivatele(id) {
        if (!this.initialized) {
            return { success: false, error: 'Firebase není inicializováno' };
        }
        
        try {
            const result = await window.firebaseServices.smazatUzivatele(id);
            return result;
        } catch (error) {
            console.error('Chyba při mazání uživatele:', error);
            return { success: false, error: error.message };
        }
    }

    /**
     * Vytvoření nového automatického pravidla v Firebase
     */
    async vytvoritAutomatickePravidlo(pravidloData) {
        if (!this.initialized) {
            return { success: false, error: 'Firebase není inicializováno' };
        }
        
        try {
            const result = await window.firebaseServices.vytvoritAutomatickePravidlo(pravidloData);
            return result;
        } catch (error) {
            console.error('Chyba při vytváření automatického pravidla:', error);
            return { success: false, error: error.message };
        }
    }

    /**
     * Aktualizace automatického pravidla v Firebase
     */
    async aktualizovatAutomatickePravidlo(id, pravidloData) {
        if (!this.initialized) {
            return { success: false, error: 'Firebase není inicializováno' };
        }
        
        try {
            const result = await window.firebaseServices.aktualizovatAutomatickePravidlo(id, pravidloData);
            return result;
        } catch (error) {
            console.error('Chyba při aktualizaci automatického pravidla:', error);
            return { success: false, error: error.message };
        }
    }

    /**
     * Načtení všech automatických pravidel z Firebase
     */
    async nacistAutomatickaPravidla() {
        if (!this.initialized) {
            return { success: false, error: 'Firebase není inicializováno' };
        }
        
        try {
            const result = await window.firebaseServices.nacistAutomatickaPravidla();
            return result;
        } catch (error) {
            console.error('Chyba při načítání automatických pravidel:', error);
            return { success: false, error: error.message };
        }
    }

    /**
     * Smazání automatického pravidla z Firebase
     */
    async smazatAutomatickePravidlo(id) {
        if (!this.initialized) {
            return { success: false, error: 'Firebase není inicializováno' };
        }
        
        try {
            const result = await window.firebaseServices.smazatAutomatickePravidlo(id);
            return result;
        } catch (error) {
            console.error('Chyba při mazání automatického pravidla:', error);
            return { success: false, error: error.message };
        }
    }
}

// Export pro globální použití
window.FirebaseService = FirebaseService;
