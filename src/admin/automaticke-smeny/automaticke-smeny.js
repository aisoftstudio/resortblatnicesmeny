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
            
            // Najdeme všechny směny vygenerované tímto pravidlem
            const shiftsToDelete = this.shifts.filter(shift => shift.ruleId === ruleId);
            
            // Smazání všech směn vygenerovaných tímto pravidlem z Firebase
            for (const shift of shiftsToDelete) {
                if (shift.firebaseId) {
                    try {
                        await this.firebaseService.smazatSměnu(shift.firebaseId);
                    } catch (error) {
                        console.error(`Chyba při mazání směny ${shift.id} z Firebase:`, error);
                    }
                }
            }
            
            // Smazání všech směn vygenerovaných tímto pravidlem z lokálního pole
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
