# Systém správy směn - Resort Blatnice

Statická webová stránka pro správu směn v Resort Blatnice. Jednoduchý systém umožňující adminům vytvářet směny a uživatelům se na ně přihlašovat pomocí 5místného PINu.

## 🚀 Rychlý start

### Lokální spuštění
```bash
# Instalace závislostí
npm install

# Spuštění vývojového serveru
npm start
```

Aplikace bude dostupná na `http://localhost:3000`

### Git workflow
```bash
# Klonování repository
git clone https://github.com/resort-blatnice/smeny-web.git
cd smeny-web

# Instalace závislostí
npm install

# Spuštění aplikace
npm start
```

## 🚀 Funkce

### Pro Adminy
- **Kalendář směn** - přehled všech směn po dnech
- **Vytváření směn** - přidání nové směny s datem, časem a pozicí
- **Správa uživatelů** - vytvoření nového uživatele s vygenerovaným PINem
- **Přehled přihlášených** - zobrazení všech uživatelů přihlášených na směny
- **Odhlášení uživatelů** - možnost odhlásit uživatele ze směn

### Pro Uživatele
- **Kalendář směn** - zobrazení všech dostupných směn
- **Vzít směnu** - možnost si vzít libovolný počet směn
- **Moje směny** - seznam všech vlastních směn
- **Vrátit směnu** - možnost vrátit směnu zpět

## 📁 Struktura souborů

```
├── index.html          # Hlavní HTML soubor
├── styles.css          # CSS styly
├── script.js           # JavaScript funkcionalita
└── README.md           # Tato dokumentace
```

## 🔐 Testovací účty

### Admin
- **PIN:** `12345`
- **Přístup:** Admin rozhraní s plnými právy

### Uživatel
- **PIN:** `11111`
- **Přístup:** Uživatelské rozhraní

## 🖥️ Spuštění

1. **Stažení souborů**
   - Stáhněte všechny soubory do stejné složky

2. **Otevření stránky**
   - Dvojklikem na `index.html`
   - Nebo otevřete v prohlížeči

3. **Použití**
   - Zadejte testovací PIN
   - Systém automaticky rozpozná roli
   - Začněte používat aplikaci

## 📱 Použití

### Přihlášení
1. Zadejte váš 5místný PIN
2. Systém automaticky rozpozná, zda jste admin nebo uživatel
3. Budete přesměrováni na příslušné rozhraní

### Admin funkce
1. **Vytvoření směny:**
   - Klikněte na "Nová směna"
   - Vyplňte datum, čas a pozici
   - Směna se automaticky přidá do kalendáře

2. **Vytvoření uživatele:**
   - Klikněte na "Nový uživatel"
   - Zadejte jméno uživatele
   - Systém vygeneruje nový PIN

3. **Správa směn:**
   - Klikněte na den v kalendáři
   - Zobrazí se všechny směny pro daný den
   - Můžete odhlásit uživatele ze směn

### Uživatelské funkce
1. **Prohlížení směn:**
   - Kalendář zobrazuje všechny dostupné směny
   - Klikněte na den pro zobrazení směn

2. **Vzít směnu:**
   - Klikněte na "Vzít směnu" u požadované směny
   - Směna se přidá do vašich směn

3. **Správa směn:**
   - Přepněte na záložku "Moje směny"
   - Zobrazí se všechny vaše směny
   - Můžete vrátit směnu zpět

## 💾 Uložení dat

- Všechna data se ukládají do **localStorage** prohlížeče
- Data zůstávají zachována i po zavření prohlížeče
- Pro reset dat vymažte localStorage v prohlížeči

## 🎨 Design

- **Responzivní design** - funguje na všech zařízeních
- **Moderní vzhled** - čisté rozhraní s příjemnými barvami
- **Intuitivní navigace** - snadné použití
- **Font Awesome ikony** - vizuální zpřehlednění

## 🔧 Technologie

- **HTML5** - struktura stránky
- **CSS3** - styling a responzivní design
- **JavaScript (ES6+)** - funkcionalita aplikace
- **Font Awesome** - ikony
- **localStorage** - ukládání dat

## 📋 Pozice směn

Dostupné pozice:
- Wellness
- Bar
- Kuchyně
- Úklid
- Recepce
- Ostatní

## 🔧 Vývoj

### Git workflow
```bash
# Vytvoření nové větve pro feature
git checkout -b feature/nova-funkce

# Commit změn
git add .
git commit -m "feat: přidána nová funkce"

# Push do remote repository
git push origin feature/nova-funkce
```

### Struktura projektu
```
├── index.html          # Hlavní HTML soubor
├── styles.css          # CSS styly
├── script.js           # JavaScript funkcionalita
├── package.json        # NPM konfigurace
├── .gitignore          # Git ignore soubor
├── README.md           # Dokumentace
└── firebase.json       # Firebase konfigurace (po nastavení Firebase)
```

## 🚀 Rozšíření

Pro produkční použití doporučujeme:
- **Firebase Backend** pro ukládání dat ✅ (v plánu)
- **Firebase Authentication** pro bezpečnou autentizaci ✅ (v plánu)
- **Real-time synchronizace** dat mezi zařízeními ✅ (v plánu)
- **Email notifikace** pro směny
- **Export funkcí** pro reporty
- **PWA funkcionalita** pro mobilní použití

## 📄 Licence

Tento projekt je vytvořen pro Resort Blatnice a je určen pro interní použití.