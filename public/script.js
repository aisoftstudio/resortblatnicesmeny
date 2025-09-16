
/* === src/shared/services/firebase-service.js === */
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


/* === src/shared/utils/date-utils.js === */
/**
 * Date Utils - Pomocné funkce pro práci s daty
 * Obsahuje utility funkce pro formátování a manipulaci s daty
 */

class DateUtils {
    /**
     * Formátování data do ISO stringu (YYYY-MM-DD)
     */
    static formatDate(date) {
        return date.toISOString().split('T')[0];
    }

    /**
     * Kontrola, zda jsou dvě data stejná (pouze datum, bez času)
     */
    static isSameDate(date1, date2) {
        return this.formatDate(date1) === this.formatDate(date2);
    }

    /**
     * Získání českého názvu měsíce
     */
    static getCzechMonthName(monthIndex) {
        const monthNames = [
            'Leden', 'Únor', 'Březen', 'Duben', 'Květen', 'Červen',
            'Červenec', 'Srpen', 'Září', 'Říjen', 'Listopad', 'Prosinec'
        ];
        return monthNames[monthIndex];
    }

    /**
     * Získání českých názvů dnů v týdnu
     */
    static getCzechWeekDays() {
        return ['Po', 'Út', 'St', 'Čt', 'Pá', 'So', 'Ne'];
    }

    /**
     * Formátování data pro zobrazení v češtině
     */
    static formatDateCzech(date) {
        return date.toLocaleDateString('cs-CZ', { 
            day: 'numeric', 
            month: 'long', 
            year: 'numeric' 
        });
    }

    /**
     * Získání prvního dne měsíce
     */
    static getFirstDayOfMonth(year, month) {
        return new Date(year, month, 1);
    }

    /**
     * Získání posledního dne měsíce
     */
    static getLastDayOfMonth(year, month) {
        return new Date(year, month + 1, 0);
    }

    /**
     * Získání prvního pondělí v kalendářním týdnu
     */
    static getFirstMondayOfWeek(firstDay) {
        const startDate = new Date(firstDay);
        startDate.setDate(startDate.getDate() - firstDay.getDay() + 1);
        return startDate;
    }

    /**
     * Získání poslední neděle v kalendářním týdnu
     */
    static getLastSundayOfWeek(lastDay) {
        const endDate = new Date(lastDay);
        endDate.setDate(endDate.getDate() + (7 - lastDay.getDay()));
        return endDate;
    }

    /**
     * Kontrola, zda je datum v minulosti
     */
    static isPastDate(date) {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return date < today;
    }

    /**
     * Kontrola, zda je datum dnes
     */
    static isToday(date) {
        return this.isSameDate(date, new Date());
    }

    /**
     * Přidání dnů k datu
     */
    static addDays(date, days) {
        const result = new Date(date);
        result.setDate(result.getDate() + days);
        return result;
    }

    /**
     * Přidání měsíců k datu
     */
    static addMonths(date, months) {
        const result = new Date(date);
        result.setMonth(result.getMonth() + months);
        return result;
    }

    /**
     * Získání dne v týdnu (0 = neděle, 1 = pondělí, ...)
     */
    static getDayOfWeek(date) {
        return date.getDay();
    }

    /**
     * Generování pole dat mezi dvěma daty
     */
    static generateDateRange(startDate, endDate) {
        const dates = [];
        const current = new Date(startDate);
        
        while (current <= endDate) {
            dates.push(new Date(current));
            current.setDate(current.getDate() + 1);
        }
        
        return dates;
    }

    /**
     * Kontrola, zda je rok přestupný
     */
    static isLeapYear(year) {
        return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
    }

    /**
     * Získání počtu dnů v měsíci
     */
    static getDaysInMonth(year, month) {
        return new Date(year, month + 1, 0).getDate();
    }

    /**
     * Formátování času (HH:MM)
     */
    static formatTime(date) {
        return date.toTimeString().slice(0, 5);
    }

    /**
     * Parsování času z stringu (HH:MM)
     */
    static parseTime(timeString) {
        const [hours, minutes] = timeString.split(':').map(Number);
        const date = new Date();
        date.setHours(hours, minutes, 0, 0);
        return date;
    }

    /**
     * Výpočet rozdílu v hodinách mezi dvěma časy
     */
    static getHoursDifference(startTime, endTime) {
        const start = this.parseTime(startTime);
        const end = this.parseTime(endTime);
        
        // Pokud je konec před začátkem, přidej den
        if (end < start) {
            end.setDate(end.getDate() + 1);
        }
        
        return (end - start) / (1000 * 60 * 60);
    }

    /**
     * Kontrola, zda je časový rozsah platný
     */
    static isValidTimeRange(startTime, endTime) {
        const hours = this.getHoursDifference(startTime, endTime);
        return hours > 0 && hours <= 24;
    }
}

// Export pro globální použití
window.DateUtils = DateUtils;


/* === src/shared/utils/validation-utils.js === */
/**
 * Validation Utils - Pomocné funkce pro validaci
 * Obsahuje utility funkce pro validaci formulářů a dat
 */

class ValidationUtils {
    /**
     * Validace PINu (5 číslic)
     */
    static validatePin(pin) {
        const pinRegex = /^\d{5}$/;
        return pinRegex.test(pin);
    }

    /**
     * Validace emailu
     */
    static validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    /**
     * Validace data
     */
    static validateDate(dateString) {
        const date = new Date(dateString);
        return date instanceof Date && !isNaN(date);
    }

    /**
     * Validace času (HH:MM)
     */
    static validateTime(timeString) {
        const timeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;
        return timeRegex.test(timeString);
    }

    /**
     * Validace časového rozsahu
     */
    static validateTimeRange(startTime, endTime) {
        if (!this.validateTime(startTime) || !this.validateTime(endTime)) {
            return false;
        }
        
        const start = this.parseTimeToMinutes(startTime);
        const end = this.parseTimeToMinutes(endTime);
        
        return end > start;
    }

    /**
     * Parsování času na minuty
     */
    static parseTimeToMinutes(timeString) {
        const [hours, minutes] = timeString.split(':').map(Number);
        return hours * 60 + minutes;
    }

    /**
     * Validace názvu (ne prázdný, max délka)
     */
    static validateName(name, maxLength = 100) {
        return name && name.trim().length > 0 && name.trim().length <= maxLength;
    }

    /**
     * Validace popisu (volitelný, max délka)
     */
    static validateDescription(description, maxLength = 500) {
        return !description || description.trim().length <= maxLength;
    }

    /**
     * Validace formuláře pro novou směnu
     */
    static validateShiftForm(formData) {
        const errors = [];
        
        if (!this.validateDate(formData.date)) {
            errors.push('Neplatné datum');
        }
        
        if (!this.validateTime(formData.startTime)) {
            errors.push('Neplatný čas začátku');
        }
        
        if (!this.validateTime(formData.endTime)) {
            errors.push('Neplatný čas konce');
        }
        
        if (!this.validateTimeRange(formData.startTime, formData.endTime)) {
            errors.push('Čas konce musí být po čase začátku');
        }
        
        if (!this.validateName(formData.position)) {
            errors.push('Neplatné pracoviště');
        }
        
        return {
            isValid: errors.length === 0,
            errors: errors
        };
    }

    /**
     * Validace formuláře pro nového uživatele
     */
    static validateUserForm(formData) {
        const errors = [];
        
        if (!this.validateName(formData.name)) {
            errors.push('Neplatné jméno uživatele');
        }
        
        return {
            isValid: errors.length === 0,
            errors: errors
        };
    }

    /**
     * Validace formuláře pro pracoviště
     */
    static validateWorkplaceForm(formData) {
        const errors = [];
        
        if (!this.validateName(formData.name)) {
            errors.push('Neplatný název pracoviště');
        }
        
        if (!this.validateDescription(formData.description)) {
            errors.push('Popis je příliš dlouhý');
        }
        
        if (formData.hasFixedHours) {
            if (!this.validateTime(formData.startTime)) {
                errors.push('Neplatný čas začátku');
            }
            
            if (!this.validateTime(formData.endTime)) {
                errors.push('Neplatný čas konce');
            }
            
            if (!this.validateTimeRange(formData.startTime, formData.endTime)) {
                errors.push('Čas konce musí být po čase začátku');
            }
        }
        
        return {
            isValid: errors.length === 0,
            errors: errors
        };
    }

    /**
     * Validace formuláře pro automatické směny
     */
    static validateAutomaticShiftsForm(formData) {
        const errors = [];
        
        if (!this.validateName(formData.workplace)) {
            errors.push('Neplatné pracoviště');
        }
        
        if (!formData.weekdays || formData.weekdays.length === 0) {
            errors.push('Vyberte alespoň jeden den v týdnu');
        }
        
        if (!this.validateTime(formData.startTime)) {
            errors.push('Neplatný čas začátku');
        }
        
        if (!this.validateTime(formData.endTime)) {
            errors.push('Neplatný čas konce');
        }
        
        if (!this.validateTimeRange(formData.startTime, formData.endTime)) {
            errors.push('Čas konce musí být po čase začátku');
        }
        
        if (!this.validateDate(formData.endDate)) {
            errors.push('Neplatné koncové datum');
        }
        
        return {
            isValid: errors.length === 0,
            errors: errors
        };
    }

    /**
     * Sanitizace textu (odstranění nebezpečných znaků)
     */
    static sanitizeText(text) {
        if (!text) return '';
        return text.trim().replace(/[<>]/g, '');
    }

    /**
     * Kontrola, zda je datum v budoucnosti
     */
    static isFutureDate(dateString) {
        const date = new Date(dateString);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return date >= today;
    }

    /**
     * Kontrola, zda je datum v minulosti
     */
    static isPastDate(dateString) {
        const date = new Date(dateString);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return date < today;
    }

    /**
     * Generování chybové zprávy
     */
    static formatErrors(errors) {
        if (errors.length === 0) return '';
        return errors.join(', ');
    }
}

// Export pro globální použití
window.ValidationUtils = ValidationUtils;


/* === src/admin/kalendar-smen/kalendar-smen.js === */
/**
 * Kalendář směn - Admin sekce
 * Obsahuje logiku pro zobrazení a správu kalendáře směn
 */

class KalendarSmenManager {
    constructor(firebaseService) {
        this.firebaseService = firebaseService;
        this.currentDate = new Date();
        this.selectedDate = null;
        this.shifts = [];
        this.users = [];
    }

    /**
     * Inicializace kalendáře směn
     */
    async inicializovat() {
        try {
            await this.nacistData();
            this.nastavitEventListeners();
            this.renderKalendar();
        } catch (error) {
            console.error('Chyba při inicializaci kalendáře směn:', error);
        }
    }

    /**
     * Načtení dat z Firebase
     */
    async nacistData() {
        const shiftsResult = await this.firebaseService.nacistSměny();
        const usersResult = await this.firebaseService.nacistUzivatele();
        
        if (shiftsResult.success) {
            this.shifts = shiftsResult.data || [];
        }
        if (usersResult.success) {
            this.users = usersResult.data || [];
        }
    }

    /**
     * Nastavení event listenerů
     */
    nastavitEventListeners() {
        // Event listenery pro kalendář budou přidány zde
    }

    /**
     * Renderování kalendáře
     */
    renderKalendar() {
        const calendar = document.getElementById('calendar');
        if (!calendar) return;

        const year = this.currentDate.getFullYear();
        const month = this.currentDate.getMonth();
        
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
                    <button onclick="kalendarSmenManager.previousMonth()">
                        <i class="fas fa-chevron-left"></i>
                    </button>
                    <button onclick="kalendarSmenManager.nextMonth()">
                        <i class="fas fa-chevron-right"></i>
                    </button>
                </div>
            </div>
            <div class="calendar-weekdays">
                ${weekDays.map(day => `<div class="calendar-weekday">${day}</div>`).join('')}
            </div>
            <div class="calendar-days">
                ${this.generateCalendarDays(startDate, endDate, year, month)}
            </div>
        `;
    }

    /**
     * Generování kalendářních dnů
     */
    generateCalendarDays(startDate, endDate, year, month) {
        const days = [];
        const current = new Date(startDate);
        
        while (current <= endDate) {
            const dateStr = this.formatDate(current);
            const isCurrentMonth = current.getMonth() === month;
            const isToday = this.isSameDate(current, new Date());
            const isSelected = this.selectedDate && this.isSameDate(current, new Date(this.selectedDate));
            
            const shiftsCount = this.shifts.filter(shift => shift.date === dateStr).length;
            
            let dayClass = 'calendar-day';
            if (!isCurrentMonth) dayClass += ' other-month';
            if (isToday) dayClass += ' today';
            if (isSelected) dayClass += ' selected';
            
            days.push(`
                <div class="${dayClass}" onclick="kalendarSmenManager.selectDate('${dateStr}')">
                    <div class="calendar-day-number">${current.getDate()}</div>
                    ${shiftsCount > 0 ? `<div class="shift-indicator">${shiftsCount} směn</div>` : ''}
                </div>
            `);
            
            current.setDate(current.getDate() + 1);
        }
        
        return days.join('');
    }

    /**
     * Výběr data
     */
    selectDate(dateStr) {
        this.selectedDate = dateStr;
        this.renderKalendar();
        this.updateShiftsList();
    }

    /**
     * Předchozí měsíc
     */
    previousMonth() {
        this.currentDate.setMonth(this.currentDate.getMonth() - 1);
        this.renderKalendar();
    }

    /**
     * Další měsíc
     */
    nextMonth() {
        this.currentDate.setMonth(this.currentDate.getMonth() + 1);
        this.renderKalendar();
    }

    /**
     * Aktualizace seznamu směn
     */
    updateShiftsList() {
        const shiftsList = document.getElementById('shifts-list');
        const title = document.getElementById('selected-date-title');
        
        if (!selectedDate) {
            title.textContent = 'Vyberte den v kalendáři';
            shiftsList.innerHTML = '';
            return;
        }
        
        const dayShifts = this.shifts.filter(shift => shift.date === this.selectedDate);
        const date = new Date(this.selectedDate);
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
                                const user = this.users.find(u => u.id === userId);
                                return `
                                    <div class="user-tag">
                                        ${user ? user.name : 'Neznámý uživatel'}
                                        <button class="remove-btn" onclick="kalendarSmenManager.removeUserFromShift('${shift.id}', '${userId}')">
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

    /**
     * Odstranění uživatele ze směny
     */
    async removeUserFromShift(shiftId, userId) {
        const shift = this.shifts.find(s => s.id === shiftId);
        if (shift) {
            try {
                shift.users = shift.users.filter(id => id !== userId);
                await this.firebaseService.aktualizovatSměnu(shift.firebaseId, shift);
                this.updateShiftsList();
            } catch (error) {
                console.error('Chyba při odstranění uživatele ze směny:', error);
                alert('Chyba při odstranění uživatele ze směny. Zkuste to znovu.');
                shift.users.push(userId);
            }
        }
    }

    /**
     * Pomocné funkce
     */
    formatDate(date) {
        return date.toISOString().split('T')[0];
    }

    isSameDate(date1, date2) {
        return this.formatDate(date1) === this.formatDate(date2);
    }
}

// Export pro globální použití
window.KalendarSmenManager = KalendarSmenManager;


/* === src/admin/sprava-smen/sprava-smen.js === */
/**
 * Správa směn - Admin sekce
 * Obsahuje logiku pro správu a zobrazení všech směn v admin rozhraní
 */

class SpravaSmenManager {
    constructor(firebaseService) {
        this.firebaseService = firebaseService;
        this.currentWorkplaceFilter = 'all';
        this.shifts = [];
        this.users = [];
        this.workplaces = [];
    }

    /**
     * Inicializace správy směn
     */
    async inicializovat() {
        try {
            await this.nacistData();
            this.nastavitEventListeners();
            this.updateWorkplaceFilterButtons();
            this.updateAdminShiftsList();
        } catch (error) {
            console.error('Chyba při inicializaci správy směn:', error);
        }
    }

    /**
     * Načtení dat z globálních proměnných
     */
    nacistData() {
        // Data se načítají z globálních proměnných v app.js
        this.shifts = window.shifts || [];
        this.users = window.users || [];
        this.workplaces = window.workplaces || [];
    }

    /**
     * Nastavení event listenerů
     */
    nastavitEventListeners() {
        // Event listenery budou nastaveny v updateWorkplaceFilterButtons
    }

    /**
     * Aktualizace seznamu směn v admin rozhraní
     */
    updateAdminShiftsList() {
        const shiftsList = document.getElementById('admin-shifts-list');
        if (!shiftsList) return;
        
        // Filtrování směn podle pracoviště
        let filteredShifts = this.shifts;
        if (this.currentWorkplaceFilter !== 'all') {
            filteredShifts = this.shifts.filter(shift => shift.position === this.currentWorkplaceFilter);
        }
        
        if (filteredShifts.length === 0) {
            const message = this.currentWorkplaceFilter === 'all' 
                ? 'Zatím nebyly vytvořeny žádné směny. Klikněte na "Nová směna" pro vytvoření první směny.'
                : `Žádné směny pro pracoviště "${this.currentWorkplaceFilter}".`;
            
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
            const shiftUsers = this.users.filter(user => shift.users.includes(user.id));
            const shiftDate = new Date(shift.date);
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            const isPast = shiftDate < today;
            
            return `
                <div class="shift-card ${isPast ? 'past-shift' : ''}">
                    <div class="shift-info">
                        <div class="shift-date">
                            <i class="fas fa-calendar"></i>
                            ${DateUtils.formatDate(shiftDate)}
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
                                        <button class="btn btn-sm btn-outline" onclick="spravaSmenManager.removeUserFromShift('${shift.id}', '${user.id}')" title="Odstranit ze směny">
                                            <i class="fas fa-times"></i>
                                        </button>
                                    </div>
                                `).join('')
                            }
                        </div>
                    </div>
                    
                    <div class="shift-actions">
                        <button class="btn btn-danger btn-sm" onclick="spravaSmenManager.deleteShift('${shift.id}')" title="Smazat směnu">
                            <i class="fas fa-trash"></i> Smazat
                        </button>
                    </div>
                </div>
            `;
        }).join('');
    }

    /**
     * Aktualizace tlačítek pro filtrování podle pracoviště
     */
    updateWorkplaceFilterButtons() {
        const filterButtonsContainer = document.getElementById('workplace-filter-buttons');
        if (!filterButtonsContainer) return;
        
        // Vytvoření tlačítek pro všechna pracoviště
        const workplaceButtons = this.workplaces.map(workplace => 
            `<button class="filter-btn" data-workplace="${workplace.name}">
                <i class="fas fa-building"></i> ${workplace.name}
            </button>`
        ).join('');
        
        filterButtonsContainer.innerHTML = `
            <button class="filter-btn ${this.currentWorkplaceFilter === 'all' ? 'active' : ''}" data-workplace="all">
                <i class="fas fa-th"></i> Vše
            </button>
            ${workplaceButtons}
        `;
        
        // Přidání event listenerů
        filterButtonsContainer.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                // Odstranění active třídy ze všech tlačítek
                filterButtonsContainer.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
                
                // Přidání active třídy na kliknuté tlačítko
                e.target.classList.add('active');
                
                // Nastavení aktuálního filtru
                this.currentWorkplaceFilter = e.target.dataset.workplace;
                
                // Aktualizace seznamu směn
                this.updateAdminShiftsList();
            });
        });
    }

    /**
     * Odstranění uživatele ze směny
     */
    async removeUserFromShift(shiftId, userId) {
        const shift = this.shifts.find(s => s.id === shiftId);
        if (shift) {
            try {
                shift.users = shift.users.filter(id => id !== userId);
                
                // Aktualizace v Firebase
                if (shift.firebaseId) {
                    await this.firebaseService.aktualizovatSměnu(shift.firebaseId, shift);
                }
                
                // Aktualizace globálních proměnných
                window.shifts = this.shifts;
                
                this.updateAdminShiftsList();
                
                // Aktualizace ostatních komponent
                if (window.kalendarSmenManager) {
                    window.kalendarSmenManager.updateShiftsList();
                }
                
            } catch (error) {
                console.error('Chyba při odstranění uživatele ze směny:', error);
                alert('Chyba při odstranění uživatele ze směny. Zkuste to znovu.');
                // Vrácení uživatele zpět do směny při chybě
                shift.users.push(userId);
            }
        }
    }

    /**
     * Smazání směny
     */
    async deleteShift(shiftId) {
        if (!confirm('Opravdu chcete smazat tuto směnu? Tato akce je nevratná.')) {
            return;
        }
        
        try {
            // Najdeme směnu pro získání Firebase ID
            const shift = this.shifts.find(s => s.id === shiftId);
            
            // Odstranění směny z pole
            this.shifts = this.shifts.filter(s => s.id !== shiftId);
            
            // Aktualizace globálních proměnných
            window.shifts = this.shifts;
            
            // Odstranění směny z Firebase (pokud má Firebase ID)
            if (shift && shift.firebaseId) {
                await this.firebaseService.smazatSměnu(shift.firebaseId);
            }
            
            // Aktualizace zobrazení
            this.updateAdminShiftsList();
            
            // Aktualizace ostatních komponent
            if (window.kalendarSmenManager) {
                window.kalendarSmenManager.renderKalendar();
                window.kalendarSmenManager.updateShiftsList();
            }
            
        } catch (error) {
            console.error('Chyba při mazání směny:', error);
            alert('Chyba při mazání směny. Zkuste to znovu.');
        }
    }

    /**
     * Aktualizace dat z globálních proměnných
     */
    aktualizovatData() {
        this.nacistData();
        this.updateAdminShiftsList();
    }

    /**
     * Nastavení filtru pracoviště
     */
    setWorkplaceFilter(workplaceName) {
        this.currentWorkplaceFilter = workplaceName;
        this.updateAdminShiftsList();
    }

    /**
     * Získání aktuálního filtru pracoviště
     */
    getCurrentFilter() {
        return this.currentWorkplaceFilter;
    }

    /**
     * Získání počtu směn podle filtru
     */
    getFilteredShiftsCount() {
        if (this.currentWorkplaceFilter === 'all') {
            return this.shifts.length;
        }
        return this.shifts.filter(shift => shift.position === this.currentWorkplaceFilter).length;
    }

    /**
     * Získání směn podle filtru
     */
    getFilteredShifts() {
        if (this.currentWorkplaceFilter === 'all') {
            return this.shifts;
        }
        return this.shifts.filter(shift => shift.position === this.currentWorkplaceFilter);
    }
}

// Export pro globální použití
window.SpravaSmenManager = SpravaSmenManager;


/* === src/admin/automaticke-smeny/automaticke-smeny.js === */
/**
 * Automatické směny - Admin sekce
 * Obsahuje logiku pro vytváření a správu automatických pravidel pro generování směn
 */

class AutomatickeSmenyManager {
    constructor(firebaseService) {
        this.firebaseService = firebaseService;
        this.automaticRules = [];
        this.shifts = [];
        this.workplaces = [];
    }

    /**
     * Inicializace automatických směn
     */
    async inicializovat() {
        try {
            await this.nacistData();
            this.nastavitEventListeners();
            this.updateAutomaticShiftsList();
        } catch (error) {
            console.error('Chyba při inicializaci automatických směn:', error);
        }
    }

    /**
     * Načtení dat z globálních proměnných
     */
    nacistData() {
        this.automaticRules = window.automaticRules || [];
        this.shifts = window.shifts || [];
        this.workplaces = window.workplaces || [];
    }

    /**
     * Nastavení event listenerů
     */
    nastavitEventListeners() {
        // Event listenery pro modaly budou nastaveny v hlavní aplikaci
    }

    /**
     * Aktualizace seznamu automatických pravidel
     */
    updateAutomaticShiftsList() {
        const automaticShiftsList = document.getElementById('automatic-shifts-list');
        if (!automaticShiftsList) return;
        
        if (this.automaticRules.length === 0) {
            automaticShiftsList.innerHTML = `
                <div class="empty-workplaces">
                    <i class="fas fa-magic"></i>
                    <h3>Žádná automatická pravidla</h3>
                    <p>Zatím nebyla vytvořena žádná automatická pravidla pro generování směn.</p>
                </div>
            `;
            return;
        }
        
        automaticShiftsList.innerHTML = this.automaticRules.map(rule => {
            const dayNames = ['Ne', 'Po', 'Út', 'St', 'Čt', 'Pá', 'So'];
            const selectedDays = rule.weekdays.map(day => dayNames[day]);
            const generatedShifts = this.shifts.filter(shift => 
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
                            <button class="btn btn-danger btn-sm" onclick="automatickeSmenyManager.deleteAutomaticRule('${rule.id}')" title="Smazat pravidlo">
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

    /**
     * Zobrazení modalu pro vytvoření automatických směn
     */
    showAutomaticShiftsModal() {
        const modal = document.getElementById('automatic-shifts-modal');
        if (!modal) return;
        
        modal.classList.add('active');
        
        // Naplnění selectu pracovišť
        const workplaceSelect = document.getElementById('auto-workplace');
        if (workplaceSelect) {
            workplaceSelect.innerHTML = '<option value="">Vyberte pracoviště</option>' + 
                this.workplaces.map(workplace => `<option value="${workplace.name}">${workplace.name}</option>`).join('');
        }
        
        // Nastavení koncového data na konec roku
        const endDateInput = document.getElementById('auto-end-date');
        if (endDateInput) {
            const currentYear = new Date().getFullYear();
            endDateInput.value = `${currentYear}-12-31`;
        }
        
        // Reset formuláře
        const form = document.getElementById('automatic-shifts-form');
        if (form) {
            form.reset();
            if (endDateInput) {
                endDateInput.value = `${new Date().getFullYear()}-12-31`;
            }
        }
    }

    /**
     * Skrytí modalu pro automatické směny
     */
    hideAutomaticShiftsModal() {
        const modal = document.getElementById('automatic-shifts-modal');
        if (modal) {
            modal.classList.remove('active');
        }
        
        const form = document.getElementById('automatic-shifts-form');
        if (form) {
            form.reset();
        }
    }

    /**
     * Zpracování formuláře pro automatické směny
     */
    async handleAutomaticShifts(e) {
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
        
        // Validace časového rozsahu
        if (!ValidationUtils.validateTimeRange(startTime, endTime)) {
            alert('Čas konce musí být po čase začátku');
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
        
        try {
            // Přidání pravidla
            this.automaticRules.push(rule);
            
            // Aktualizace globálních proměnných
            window.automaticRules = this.automaticRules;
            
            // Generování směn
            const generatedCount = this.generateShiftsFromRule(rule);
            
            // Uložení do Firebase
            await this.firebaseService.vytvoritAutomatickePravidlo(rule);
            
            // Aktualizace zobrazení
            this.updateAutomaticShiftsList();
            
            // Aktualizace ostatních komponent
            if (window.spravaSmenManager) {
                window.spravaSmenManager.aktualizovatData();
                window.spravaSmenManager.updateAdminShiftsList();
            }
            
            if (window.kalendarSmenManager) {
                window.kalendarSmenManager.renderKalendar();
            }
            
            this.hideAutomaticShiftsModal();
            
            alert(`Úspěšně vytvořeno pravidlo a vygenerovány ${generatedCount} směn pro ${workplace}!`);
            
        } catch (error) {
            console.error('Chyba při vytváření automatických směn:', error);
            alert('Chyba při vytváření automatických směn. Zkuste to znovu.');
            // Odstranění pravidla a směn při chybě
            this.automaticRules.pop();
            // Odstranění vygenerovaných směn
            this.shifts = this.shifts.filter(shift => !shift.ruleId || shift.ruleId !== rule.id);
            window.shifts = this.shifts;
        }
    }

    /**
     * Generování směn z pravidla
     */
    generateShiftsFromRule(rule) {
        const startDate = new Date();
        const endDate = new Date(rule.endDate);
        const dayNames = ['Ne', 'Po', 'Út', 'St', 'Čt', 'Pá', 'So'];
        
        let generatedCount = 0;
        
        // Procházení každého dne od dnes do koncového data
        for (let date = new Date(startDate); date <= endDate; date.setDate(date.getDate() + 1)) {
            const dayOfWeek = date.getDay();
            
            // Kontrola, zda je tento den vybraný v pravidle
            if (rule.weekdays.includes(dayOfWeek)) {
                const dateStr = DateUtils.formatDate(date);
                
                // Kontrola, zda už neexistuje směna na tento den a pracoviště
                const existingShift = this.shifts.find(shift => 
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
                    
                    this.shifts.push(newShift);
                    generatedCount++;
                }
            }
        }
        
        // Aktualizace globálních proměnných
        window.shifts = this.shifts;
        
        return generatedCount;
    }

    /**
     * Smazání automatického pravidla
     */
    async deleteAutomaticRule(ruleId) {
        if (!confirm('Opravdu chcete smazat toto automatické pravidlo? Všechny vygenerované směny budou také smazány.')) {
            return;
        }
        
        try {
            // Najdeme pravidlo pro získání Firebase ID
            const rule = this.automaticRules.find(r => r.id === ruleId);
            
            // Smazání všech směn vygenerovaných tímto pravidlem
            this.shifts = this.shifts.filter(shift => shift.ruleId !== ruleId);
            window.shifts = this.shifts;
            
            // Smazání pravidla
            this.automaticRules = this.automaticRules.filter(r => r.id !== ruleId);
            window.automaticRules = this.automaticRules;
            
            // Smazání pravidla z Firebase (pokud má Firebase ID)
            if (rule && rule.firebaseId) {
                await this.firebaseService.smazatAutomatickePravidlo(rule.firebaseId);
            }
            
            // Aktualizace zobrazení
            this.updateAutomaticShiftsList();
            
            // Aktualizace ostatních komponent
            if (window.spravaSmenManager) {
                window.spravaSmenManager.aktualizovatData();
                window.spravaSmenManager.updateAdminShiftsList();
            }
            
            if (window.kalendarSmenManager) {
                window.kalendarSmenManager.renderKalendar();
            }
            
        } catch (error) {
            console.error('Chyba při mazání automatického pravidla:', error);
            alert('Chyba při mazání automatického pravidla. Zkuste to znovu.');
        }
    }

    /**
     * Aktualizace dat z globálních proměnných
     */
    aktualizovatData() {
        this.nacistData();
        this.updateAutomaticShiftsList();
    }

    /**
     * Získání počtu pravidel
     */
    getRulesCount() {
        return this.automaticRules.length;
    }

    /**
     * Získání počtu vygenerovaných směn
     */
    getGeneratedShiftsCount() {
        return this.shifts.filter(shift => shift.autoGenerated).length;
    }
}

// Export pro globální použití
window.AutomatickeSmenyManager = AutomatickeSmenyManager;


/* === src/admin/sprava-pracovist/sprava-pracovist.js === */
/**
 * Správa pracovišť - Admin sekce
 * Obsahuje logiku pro správu a zobrazení pracovišť
 */

class SpravaPracovistManager {
    constructor(firebaseService) {
        this.firebaseService = firebaseService;
        this.workplaces = [];
        this.shifts = [];
    }

    /**
     * Inicializace správy pracovišť
     */
    async inicializovat() {
        try {
            await this.nacistData();
            this.nastavitEventListeners();
            this.updateWorkplacesList();
        } catch (error) {
            console.error('Chyba při inicializaci správy pracovišť:', error);
        }
    }

    /**
     * Načtení dat z globálních proměnných
     */
    nacistData() {
        this.workplaces = window.workplaces || [];
        this.shifts = window.shifts || [];
    }

    /**
     * Nastavení event listenerů
     */
    nastavitEventListeners() {
        // Event listenery pro modaly budou nastaveny v hlavní aplikaci
    }

    /**
     * Aktualizace seznamu pracovišť
     */
    updateWorkplacesList() {
        const workplacesList = document.getElementById('workplaces-list');
        if (!workplacesList) return;
        
        if (this.workplaces.length === 0) {
            workplacesList.innerHTML = `
                <div class="empty-workplaces">
                    <i class="fas fa-building"></i>
                    <h3>Žádná pracoviště</h3>
                    <p>Zatím nebyla vytvořena žádná pracoviště. Klikněte na "Nové pracoviště" pro vytvoření prvního pracoviště.</p>
                </div>
            `;
            return;
        }
        
        workplacesList.innerHTML = this.workplaces.map(workplace => {
            const workplaceShifts = this.shifts.filter(shift => shift.position === workplace.name);
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
                            <button class="btn btn-primary btn-sm" onclick="spravaPracovistManager.editWorkplace('${workplace.id}')" title="Upravit pracoviště">
                                <i class="fas fa-edit"></i>
                            </button>
                            <button class="btn btn-danger btn-sm" onclick="spravaPracovistManager.deleteWorkplace('${workplace.id}')" title="Smazat pracoviště">
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

    /**
     * Zobrazení modalu pro nové pracoviště
     */
    showNewWorkplaceModal() {
        const modal = document.getElementById('workplace-modal');
        if (!modal) return;
        
        modal.classList.add('active');
        
        const title = document.getElementById('workplace-modal-title');
        if (title) {
            title.textContent = 'Nové pracoviště';
        }
        
        // Reset formuláře
        const form = document.getElementById('workplace-form');
        if (form) {
            form.reset();
            form.removeAttribute('data-edit-id');
        }
        
        // Skrytí sekce s hodinami
        const hoursSection = document.getElementById('workplace-hours-section');
        if (hoursSection) {
            hoursSection.style.display = 'none';
        }
    }

    /**
     * Skrytí modalu pro pracoviště
     */
    hideWorkplaceModal() {
        const modal = document.getElementById('workplace-modal');
        if (modal) {
            modal.classList.remove('active');
        }
        
        const form = document.getElementById('workplace-form');
        if (form) {
            form.reset();
            form.removeAttribute('data-edit-id');
        }
        
        const hoursSection = document.getElementById('workplace-hours-section');
        if (hoursSection) {
            hoursSection.style.display = 'none';
        }
    }

    /**
     * Editace pracoviště
     */
    editWorkplace(workplaceId) {
        const workplace = this.workplaces.find(w => w.id === workplaceId);
        if (!workplace) return;
        
        const modal = document.getElementById('workplace-modal');
        if (!modal) return;
        
        modal.classList.add('active');
        
        const title = document.getElementById('workplace-modal-title');
        if (title) {
            title.textContent = 'Upravit pracoviště';
        }
        
        // Vyplnění formuláře
        const nameInput = document.getElementById('workplace-name');
        const descriptionInput = document.getElementById('workplace-description');
        const hasFixedHoursCheckbox = document.getElementById('workplace-has-fixed-hours');
        
        if (nameInput) nameInput.value = workplace.name;
        if (descriptionInput) descriptionInput.value = workplace.description || '';
        if (hasFixedHoursCheckbox) hasFixedHoursCheckbox.checked = workplace.hasFixedHours;
        
        const hoursSection = document.getElementById('workplace-hours-section');
        if (hoursSection) {
            hoursSection.style.display = workplace.hasFixedHours ? 'block' : 'none';
        }
        
        if (workplace.hasFixedHours) {
            const startTimeInput = document.getElementById('workplace-start-time');
            const endTimeInput = document.getElementById('workplace-end-time');
            
            if (startTimeInput) startTimeInput.value = workplace.startTime;
            if (endTimeInput) endTimeInput.value = workplace.endTime;
        }
        
        // Uložení ID pro editaci
        const form = document.getElementById('workplace-form');
        if (form) {
            form.dataset.editId = workplaceId;
        }
    }

    /**
     * Zpracování formuláře pro pracoviště
     */
    async handleWorkplace(e) {
        e.preventDefault();
        
        const nameInput = document.getElementById('workplace-name');
        const descriptionInput = document.getElementById('workplace-description');
        const hasFixedHoursCheckbox = document.getElementById('workplace-has-fixed-hours');
        const startTimeInput = document.getElementById('workplace-start-time');
        const endTimeInput = document.getElementById('workplace-end-time');
        const form = document.getElementById('workplace-form');
        
        if (!nameInput || !hasFixedHoursCheckbox || !form) return;
        
        const name = nameInput.value;
        const description = descriptionInput ? descriptionInput.value : '';
        const hasFixedHours = hasFixedHoursCheckbox.checked;
        const startTime = startTimeInput ? startTimeInput.value : '';
        const endTime = endTimeInput ? endTimeInput.value : '';
        const editId = form.dataset.editId;
        
        // Validace
        if (!ValidationUtils.validateName(name)) {
            alert('Prosím zadejte název pracoviště');
            return;
        }
        
        if (!ValidationUtils.validateDescription(description)) {
            alert('Popis je příliš dlouhý');
            return;
        }
        
        if (hasFixedHours && (!startTime || !endTime)) {
            alert('Prosím zadejte čas od a do pro pevné hodiny');
            return;
        }
        
        if (hasFixedHours && !ValidationUtils.validateTimeRange(startTime, endTime)) {
            alert('Čas konce musí být po čase začátku');
            return;
        }
        
        const workplaceData = {
            name: ValidationUtils.sanitizeText(name),
            description: ValidationUtils.sanitizeText(description),
            hasFixedHours: hasFixedHours,
            startTime: hasFixedHours ? startTime : null,
            endTime: hasFixedHours ? endTime : null
        };
        
        try {
            if (editId) {
                // Editace existujícího pracoviště
                const workplace = this.workplaces.find(w => w.id === editId);
                if (workplace) {
                    Object.assign(workplace, workplaceData);
                    
                    // Aktualizace v Firebase
                    if (workplace.firebaseId) {
                        await this.firebaseService.aktualizovatPracoviste(workplace.firebaseId, workplace);
                    }
                }
            } else {
                // Vytvoření nového pracoviště
                const newWorkplace = {
                    id: 'workplace-' + Date.now(),
                    ...workplaceData
                };
                
                // Vytvoření v Firebase
                const result = await this.firebaseService.vytvoritPracoviste(newWorkplace);
                if (result.success) {
                    newWorkplace.firebaseId = result.id;
                }
                
                this.workplaces.push(newWorkplace);
            }
            
            // Aktualizace globálních proměnných
            window.workplaces = this.workplaces;
            
            this.updateWorkplacesList();
            this.updateWorkplaceSelect();
            this.hideWorkplaceModal();
            
        } catch (error) {
            console.error('Chyba při ukládání pracoviště:', error);
            alert('Chyba při ukládání pracoviště. Zkuste to znovu.');
            // Odstranění pracoviště z pole při chybě (pokud bylo nové)
            if (!editId) {
                this.workplaces.pop();
            }
        }
    }

    /**
     * Smazání pracoviště
     */
    async deleteWorkplace(workplaceId) {
        if (!confirm('Opravdu chcete smazat toto pracoviště? Tato akce je nevratná.')) {
            return;
        }
        
        try {
            // Kontrola, zda pracoviště není používáno ve směnách
            const workplace = this.workplaces.find(w => w.id === workplaceId);
            const usedInShifts = this.shifts.some(shift => shift.position === workplace.name);
            
            if (usedInShifts) {
                alert('Toto pracoviště je používáno ve směnách. Nejprve smažte nebo upravte směny.');
                return;
            }
            
            // Odstranění pracoviště z pole
            this.workplaces = this.workplaces.filter(w => w.id !== workplaceId);
            
            // Aktualizace globálních proměnných
            window.workplaces = this.workplaces;
            
            // Odstranění pracoviště z Firebase (pokud má Firebase ID)
            if (workplace && workplace.firebaseId) {
                await this.firebaseService.smazatPracoviste(workplace.firebaseId);
            }
            
            // Aktualizace zobrazení
            this.updateWorkplacesList();
            this.updateWorkplaceSelect();
            
        } catch (error) {
            console.error('Chyba při mazání pracoviště:', error);
            alert('Chyba při mazání pracoviště. Zkuste to znovu.');
        }
    }

    /**
     * Aktualizace selectu pracovišť pro nové směny
     */
    updateWorkplaceSelect() {
        const select = document.getElementById('shift-position');
        if (!select) return;
        
        select.innerHTML = this.workplaces.map(workplace => 
            `<option value="${workplace.name}">${workplace.name}</option>`
        ).join('');
    }

    /**
     * Aktualizace dat z globálních proměnných
     */
    aktualizovatData() {
        this.nacistData();
        this.updateWorkplacesList();
    }

    /**
     * Získání počtu pracovišť
     */
    getWorkplacesCount() {
        return this.workplaces.length;
    }

    /**
     * Získání pracoviště podle ID
     */
    getWorkplaceById(id) {
        return this.workplaces.find(w => w.id === id);
    }

    /**
     * Získání pracoviště podle názvu
     */
    getWorkplaceByName(name) {
        return this.workplaces.find(w => w.name === name);
    }

    /**
     * Kontrola, zda pracoviště existuje
     */
    workplaceExists(name) {
        return this.workplaces.some(w => w.name === name);
    }
}

// Export pro globální použití
window.SpravaPracovistManager = SpravaPracovistManager;


/* === src/admin/sprava-uzivatelu/sprava-uzivatelu.js === */
/**
 * Správa uživatelů - Admin sekce
 * Obsahuje logiku pro správu a zobrazení uživatelů
 */

class SpravaUzivateluManager {
    constructor(firebaseService) {
        this.firebaseService = firebaseService;
        this.users = [];
        this.shifts = [];
    }

    /**
     * Inicializace správy uživatelů
     */
    async inicializovat() {
        try {
            await this.nacistData();
            this.nastavitEventListeners();
            this.updateUsersList();
        } catch (error) {
            console.error('Chyba při inicializaci správy uživatelů:', error);
        }
    }

    /**
     * Načtení dat z globálních proměnných
     */
    nacistData() {
        this.users = window.users || [];
        this.shifts = window.shifts || [];
    }

    /**
     * Nastavení event listenerů
     */
    nastavitEventListeners() {
        // Event listenery pro modaly budou nastaveny v hlavní aplikaci
    }

    /**
     * Aktualizace seznamu uživatelů
     */
    updateUsersList() {
        const usersList = document.getElementById('users-list');
        if (!usersList) return;
        
        if (this.users.length === 0) {
            usersList.innerHTML = `
                <div class="empty-users">
                    <i class="fas fa-users"></i>
                    <h3>Žádní uživatelé</h3>
                    <p>Zatím nebyli vytvořeni žádní uživatelé. Klikněte na "Nový uživatel" pro vytvoření prvního uživatele.</p>
                </div>
            `;
            return;
        }
        
        usersList.innerHTML = this.users.map(user => {
            const userShifts = this.shifts.filter(shift => shift.users.includes(user.id));
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
                            <button class="btn btn-danger btn-sm" onclick="spravaUzivateluManager.deleteUser('${user.id}')" title="Smazat uživatele">
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

    /**
     * Zobrazení modalu pro nového uživatele
     */
    showNewUserModal() {
        const modal = document.getElementById('new-user-modal');
        if (!modal) return;
        
        modal.classList.add('active');
        
        const formContainer = document.getElementById('new-user-form-container');
        const resultContainer = document.getElementById('new-user-result');
        
        if (formContainer) formContainer.style.display = 'block';
        if (resultContainer) resultContainer.style.display = 'none';
        
        const form = document.getElementById('new-user-form');
        if (form) {
            form.reset();
        }
    }

    /**
     * Skrytí modalu pro nového uživatele
     */
    hideNewUserModal() {
        const modal = document.getElementById('new-user-modal');
        if (modal) {
            modal.classList.remove('active');
        }
    }

    /**
     * Zpracování formuláře pro nového uživatele
     */
    async handleNewUser(e) {
        e.preventDefault();
        
        const formData = new FormData(e.target);
        const userName = formData.get('user-name-input');
        
        if (!ValidationUtils.validateName(userName)) {
            alert('Prosím zadejte platné jméno uživatele');
            return;
        }
        
        const newPin = this.generatePin();
        
        const newUser = {
            id: 'user-' + Date.now(),
            pin: newPin,
            name: ValidationUtils.sanitizeText(userName),
            isAdmin: false
        };
        
        try {
            // Vytvoření uživatele v Firebase
            const result = await this.firebaseService.vytvoritUzivatele(newUser);
            if (result.success) {
                newUser.firebaseId = result.id;
            }
            
            this.users.push(newUser);
            
            // Aktualizace globálních proměnných
            window.users = this.users;
            
            // Aktualizace seznamu uživatelů
            this.updateUsersList();
            
            // Zobrazení výsledku
            const formContainer = document.getElementById('new-user-form-container');
            const resultContainer = document.getElementById('new-user-result');
            const createdUserName = document.getElementById('created-user-name');
            const newUserPin = document.getElementById('new-user-pin');
            
            if (formContainer) formContainer.style.display = 'none';
            if (resultContainer) resultContainer.style.display = 'block';
            if (createdUserName) createdUserName.textContent = userName;
            if (newUserPin) newUserPin.textContent = newPin;
            
        } catch (error) {
            console.error('Chyba při vytváření uživatele:', error);
            alert('Chyba při ukládání uživatele. Zkuste to znovu.');
            // Odstranění uživatele z pole při chybě
            this.users.pop();
        }
    }

    /**
     * Kopírování PINu
     */
    copyPin() {
        const pinElement = document.getElementById('new-user-pin');
        if (!pinElement) return;
        
        const pin = pinElement.textContent;
        
        if (navigator.clipboard) {
            navigator.clipboard.writeText(pin).then(() => {
                this.showCopySuccess();
            }).catch(() => {
                this.fallbackCopyPin(pin);
            });
        } else {
            this.fallbackCopyPin(pin);
        }
    }

    /**
     * Fallback kopírování PINu
     */
    fallbackCopyPin(pin) {
        const textArea = document.createElement('textarea');
        textArea.value = pin;
        document.body.appendChild(textArea);
        textArea.select();
        
        try {
            document.execCommand('copy');
            this.showCopySuccess();
        } catch (err) {
            alert('PIN: ' + pin);
        }
        
        document.body.removeChild(textArea);
    }

    /**
     * Zobrazení úspěšného kopírování
     */
    showCopySuccess() {
        const btn = document.getElementById('copy-pin-btn');
        if (!btn) return;
        
        const originalText = btn.innerHTML;
        btn.innerHTML = '<i class="fas fa-check"></i> Zkopírováno';
        btn.style.background = '#10b981';
        
        setTimeout(() => {
            btn.innerHTML = originalText;
            btn.style.background = '';
        }, 2000);
    }

    /**
     * Smazání uživatele
     */
    async deleteUser(userId) {
        if (!confirm('Opravdu chcete smazat tohoto uživatele? Tato akce je nevratná.')) {
            return;
        }
        
        try {
            // Najdeme uživatele pro získání Firebase ID
            const user = this.users.find(u => u.id === userId);
            
            // Odstranění uživatele ze všech směn
            this.shifts.forEach(shift => {
                shift.users = shift.users.filter(id => id !== userId);
            });
            
            // Odstranění uživatele ze seznamu
            this.users = this.users.filter(u => u.id !== userId);
            
            // Aktualizace globálních proměnných
            window.users = this.users;
            window.shifts = this.shifts;
            
            // Odstranění uživatele z Firebase (pokud má Firebase ID)
            if (user && user.firebaseId) {
                await this.firebaseService.smazatUzivatele(user.firebaseId);
            }
            
            // Aktualizace zobrazení
            this.updateUsersList();
            
            // Aktualizace ostatních komponent
            if (window.spravaSmenManager) {
                window.spravaSmenManager.aktualizovatData();
                window.spravaSmenManager.updateAdminShiftsList();
            }
            
            if (window.kalendarSmenManager) {
                window.kalendarSmenManager.updateShiftsList();
            }
            
        } catch (error) {
            console.error('Chyba při mazání uživatele:', error);
            alert('Chyba při mazání uživatele. Zkuste to znovu.');
        }
    }

    /**
     * Generování PINu
     */
    generatePin() {
        return Math.floor(10000 + Math.random() * 90000).toString();
    }

    /**
     * Aktualizace dat z globálních proměnných
     */
    aktualizovatData() {
        this.nacistData();
        this.updateUsersList();
    }

    /**
     * Získání počtu uživatelů
     */
    getUsersCount() {
        return this.users.length;
    }

    /**
     * Získání počtu adminů
     */
    getAdminsCount() {
        return this.users.filter(u => u.isAdmin).length;
    }

    /**
     * Získání počtu běžných uživatelů
     */
    getRegularUsersCount() {
        return this.users.filter(u => !u.isAdmin).length;
    }

    /**
     * Získání uživatele podle ID
     */
    getUserById(id) {
        return this.users.find(u => u.id === id);
    }

    /**
     * Získání uživatele podle PINu
     */
    getUserByPin(pin) {
        return this.users.find(u => u.pin === pin);
    }

    /**
     * Kontrola, zda PIN existuje
     */
    pinExists(pin) {
        return this.users.some(u => u.pin === pin);
    }
}

// Export pro globální použití
window.SpravaUzivateluManager = SpravaUzivateluManager;


/* === src/app.js === */
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

