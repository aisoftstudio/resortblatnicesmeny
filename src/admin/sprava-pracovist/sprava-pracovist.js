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
