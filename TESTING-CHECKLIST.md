# 🧪 Testovací checklist - Modulární migrace

## ✅ Build testování

### **Vygenerované soubory**
- [x] `public/script.js` - sloučené JavaScript moduly
- [x] `public/styles.css` - sloučené CSS moduly  
- [x] `public/index.html` - zkopírovaný HTML
- [x] `public/firebase.js` - zkopírovaný Firebase config

### **Obsah sloučených souborů**
- [x] Všechny Manager třídy jsou přítomny:
  - [x] `KalendarSmenManager`
  - [x] `SpravaSmenManager`
  - [x] `AutomatickeSmenyManager`
  - [x] `SpravaPracovistManager`
  - [x] `SpravaUzivateluManager`
- [x] Sdílené služby jsou přítomny:
  - [x] `FirebaseService`
  - [x] `DateUtils`
  - [x] `ValidationUtils`
- [x] CSS moduly jsou sloučeny:
  - [x] Kalendář směn styly
  - [x] Správa směn styly
  - [x] Automatické směny styly
  - [x] Správa pracovišť styly
  - [x] Správa uživatelů styly

## 🔍 Funkční testování

### **Admin rozhraní - Kalendář směn**
- [ ] Kalendář se správně zobrazuje
- [ ] Navigace mezi měsíci funguje
- [ ] Výběr datumu funguje
- [ ] Zobrazení směn pro vybraný den
- [ ] Odstranění uživatele ze směny

### **Admin rozhraní - Správa směn**
- [ ] Seznam všech směn se zobrazuje
- [ ] Filtrování podle pracovišť funguje
- [ ] Smazání směny funguje
- [ ] Odstranění uživatele ze směny

### **Admin rozhraní - Automatické směny**
- [ ] Seznam automatických pravidel
- [ ] Vytvoření nového pravidla
- [ ] Generování směn podle pravidel
- [ ] Smazání automatického pravidla

### **Admin rozhraní - Správa pracovišť**
- [ ] Seznam pracovišť se zobrazuje
- [ ] Vytvoření nového pracoviště
- [ ] Editace pracoviště
- [ ] Smazání pracoviště
- [ ] Pevné hodiny fungují

### **Admin rozhraní - Správa uživatelů**
- [ ] Seznam uživatelů se zobrazuje
- [ ] Vytvoření nového uživatele
- [ ] Generování PINu
- [ ] Kopírování PINu
- [ ] Smazání uživatele

## 🚀 Nasazení

### **Příprava na commit**
- [x] Všechny moduly jsou migrovány
- [x] Build skript funguje
- [x] Produkční soubory jsou vygenerovány
- [x] Dokumentace je aktualizována

### **Git commit**
- [ ] `git add .` - přidat všechny změny
- [ ] `git commit -m "feat: Migrace na modulární architekturu - Admin sekce"`
- [ ] `git push` - odeslat na GitHub

### **Firebase deploy**
- [ ] `npm run deploy` - nasazení na Firebase
- [ ] Testování v produkci

## 📋 Poznámky k testování

### **Co testovat prioritně:**
1. **Přihlášení admina** - základní funkcionalita
2. **Kalendář směn** - hlavní funkcionalita
3. **Správa směn** - CRUD operace
4. **Automatické směny** - komplexní logika
5. **Správa pracovišť** - závislosti na směnách
6. **Správa uživatelů** - závislosti na směnách

### **Možné problémy:**
- Event listenery nemusí být správně nastaveny
- Globální proměnné mohou chybět
- Firebase inicializace může selhat
- CSS styly mohou být neúplné

### **Řešení problémů:**
- Zkontrolovat console pro chyby
- Ověřit, že všechny moduly jsou načteny
- Testovat postupně každou sekci
- Porovnat s původní funkcionalitou
