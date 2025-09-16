# 🚀 Průvodce refaktoringem - Modulární struktura

## 📋 Přehled změn

Projekt byl refaktorován z monolitické struktury na modulární architekturu pro lepší udržitelnost a škálovatelnost.

## 🗂️ Nová struktura projektu

```
Smeny-web/
├── src/                          # Vývojové moduly
│   ├── admin/                    # Admin sekce
│   │   ├── kalendar-smen/        # ✅ Kalendář směn
│   │   │   ├── kalendar-smen.js
│   │   │   └── kalendar-smen.css
│   │   ├── sprava-smen/          # ✅ Správa směn
│   │   ├── automaticke-smeny/    # ✅ Automatické směny
│   │   ├── sprava-pracovist/     # ✅ Správa pracovišť
│   │   └── sprava-uzivatelu/     # ✅ Správa uživatelů
│   ├── shared/                   # Sdílené komponenty
│   │   ├── services/
│   │   │   └── firebase-service.js ✅
│   │   └── utils/
│   │       ├── date-utils.js     ✅
│   │       └── validation-utils.js ✅
│   ├── user/                     # Uživatelské sekce
│   │   ├── kalendar-smen/        # 🔄 Kalendář směn (TODO)
│   │   └── moje-smeny/           # 🔄 Moje směny (TODO)
│   └── app.js                    # ✅ Hlavní inicializace
├── public/                       # Produkční soubory (generované)
│   ├── index.html
│   ├── script.js                 # Sloučené moduly
│   ├── styles.css                # Sloučené styly
│   └── firebase.js
├── copy-files-modular.js         # ✅ Nový build skript
├── copy-files.js                 # Původní build skript
└── package.json                  # ✅ Aktualizované skripty
```

## 🎯 Implementované změny

### ✅ Dokončeno

1. **Základní struktura složek**
   - Vytvořena `src/` struktura
   - Rozdělení na admin/user/shared sekce

2. **Kalendář směn modul**
   - `KalendarSmenManager` třída
   - Oddělená logika a styly
   - Integrace s Firebase službou

3. **Sdílené služby**
   - `FirebaseService` - centralizovaná Firebase logika
   - `DateUtils` - pomocné funkce pro práci s daty
   - `ValidationUtils` - validace formulářů

4. **Build systém**
   - `copy-files-modular.js` - automatické slučování modulů
   - Aktualizované npm skripty
   - Zachování původního build procesu

5. **Hlavní aplikace**
   - `app.js` - centralizovaná inicializace
   - Globální proměnné a služby
   - Kompatibilita s existujícím kódem

### 🔄 V plánu

1. **Zbývající admin moduly**
   - Správa směn
   - Automatické směny
   - Správa pracovišť
   - Správa uživatelů

2. **Uživatelské moduly**
   - Kalendář směn (uživatel)
   - Moje směny

3. **Sdílené komponenty**
   - Modal komponenta
   - Button komponenta
   - Loading spinner

## 🚀 Jak používat novou strukturu

### Vývoj

```bash
# Spuštění s modulární strukturou
npm run dev:modular

# Nebo klasické kopírování
npm run copy:watch
```

### Build

```bash
# Nový modulární build
npm run build

# Původní build
npm run build:legacy
```

### Deploy

```bash
# Automatický build + deploy
npm run deploy
```

## 📝 Migrace zbývajících sekcí

### Postup migrace:

1. **Vytvoření modulu**
   ```bash
   mkdir src/admin/sprava-smen
   ```

2. **Extrakce funkcí**
   - Identifikovat funkce z `script.js`
   - Přesunout do nového modulu
   - Vytvořit třídu pro logiku

3. **Aktualizace build procesu**
   - Přidat modul do `copy-files-modular.js`
   - Otestovat slučování

4. **Integrace**
   - Aktualizovat `app.js`
   - Přidat inicializaci modulu

### Příklad migrace - Správa směn:

```javascript
// src/admin/sprava-smen/sprava-smen.js
class SpravaSmenManager {
    constructor(firebaseService) {
        this.firebaseService = firebaseService;
        this.currentWorkplaceFilter = 'all';
    }
    
    async inicializovat() {
        await this.nacistData();
        this.nastavitEventListeners();
        this.updateAdminShiftsList();
    }
    
    // ... další metody
}
```

## 🔧 Výhody nové struktury

### Pro vývojáře:
- ✅ **Jasné oddělení zodpovědností**
- ✅ **Snadná údržba** jednotlivých sekcí
- ✅ **Možnost paralelního vývoje**
- ✅ **Lepší testovatelnost**

### Pro projekt:
- ✅ **Škálovatelnost** - snadné přidávání funkcí
- ✅ **Udržitelnost** - menší soubory, jasná struktura
- ✅ **Kompatibilita** - zachování původního workflow
- ✅ **Flexibilita** - možnost postupného migrování

## 🚨 Důležité poznámky

1. **Kompatibilita**: Původní `script.js` zůstává funkční
2. **Postupná migrace**: Můžete migrovat sekce postupně
3. **Rollback**: Vždy můžete se vrátit k původní struktuře
4. **Testing**: Každý modul by měl být otestován před integrací

## 📞 Další kroky

1. **Migrace Správa směn** - nejvyšší priorita
2. **Migrace Automatické směny** - střední priorita  
3. **Migrace Správa pracovišť** - střední priorita
4. **Migrace Správa uživatelů** - nízká priorita
5. **Migrace Uživatelské sekce** - nízká priorita

---

**Status**: ✅ Základní struktura dokončena, připraveno k migraci dalších sekcí
