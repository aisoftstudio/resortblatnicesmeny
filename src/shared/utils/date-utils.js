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
