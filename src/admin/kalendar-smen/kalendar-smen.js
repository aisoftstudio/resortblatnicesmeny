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
