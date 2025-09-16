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
