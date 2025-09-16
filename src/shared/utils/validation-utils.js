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
