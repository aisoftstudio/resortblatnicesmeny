/**
 * Správa směn - Admin sekce
 * Obsahuje logiku pro správu a zobrazení všech směn v admin rozhraní
 */

class SpravaSmenManager {
    constructor(firebaseService) {
        this.firebaseService = firebaseService;
        this.currentWorkplaceFilter = 'all';
        this.currentEmployeeFilter = 'all';
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
            this.updateFilterSelects();
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
     * Aktualizace select elementů pro filtrování
     */
    updateFilterSelects() {
        this.updateWorkplaceSelect();
        this.updateEmployeeSelect();
        this.nastavitFilterEventListeners();
    }

    /**
     * Aktualizace select elementu pro pracoviště
     */
    updateWorkplaceSelect() {
        const workplaceSelect = document.getElementById('workplace-filter-select');
        if (!workplaceSelect) return;
        
        // Vytvoření option elementů pro všechna pracoviště
        const workplaceOptions = this.workplaces.map(workplace => 
            `<option value="${workplace.name}">${workplace.name}</option>`
        ).join('');
        
        workplaceSelect.innerHTML = `
            <option value="all">Všechna pracoviště</option>
            ${workplaceOptions}
        `;
        
        // Nastavení aktuální hodnoty
        workplaceSelect.value = this.currentWorkplaceFilter;
    }

    /**
     * Aktualizace select elementu pro zaměstnance
     */
    updateEmployeeSelect() {
        const employeeSelect = document.getElementById('employee-filter-select');
        if (!employeeSelect) return;
        
        // Vytvoření option elementů pro všechny zaměstnance
        const employeeOptions = this.users.map(user => 
            `<option value="${user.id}">${user.name}</option>`
        ).join('');
        
        employeeSelect.innerHTML = `
            <option value="all">Všichni zaměstnanci</option>
            ${employeeOptions}
        `;
        
        // Nastavení aktuální hodnoty
        employeeSelect.value = this.currentEmployeeFilter;
    }

    /**
     * Nastavení event listenerů pro select elementy
     */
    nastavitFilterEventListeners() {
        const workplaceSelect = document.getElementById('workplace-filter-select');
        const employeeSelect = document.getElementById('employee-filter-select');
        
        if (workplaceSelect) {
            workplaceSelect.addEventListener('change', (e) => {
                this.currentWorkplaceFilter = e.target.value;
                this.updateAdminShiftsList();
            });
        }
        
        if (employeeSelect) {
            employeeSelect.addEventListener('change', (e) => {
                this.currentEmployeeFilter = e.target.value;
                this.updateAdminShiftsList();
            });
        }
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
        this.updateFilterSelects();
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
        return this.getFilteredShifts().length;
    }

    /**
     * Získání směn podle filtru
     */
    getFilteredShifts() {
        let filteredShifts = this.shifts;
        
        // Filtrování podle pracoviště
        if (this.currentWorkplaceFilter !== 'all') {
            filteredShifts = filteredShifts.filter(shift => shift.position === this.currentWorkplaceFilter);
        }
        
        // Filtrování podle zaměstnance
        if (this.currentEmployeeFilter !== 'all') {
            filteredShifts = filteredShifts.filter(shift => 
                shift.assignedUsers && shift.assignedUsers.includes(this.currentEmployeeFilter)
            );
        }
        
        return filteredShifts;
    }
}

// Export pro globální použití
window.SpravaSmenManager = SpravaSmenManager;
