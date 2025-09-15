# Automatické kopírování souborů do složky public

## Přehled
Tento projekt obsahuje automatizované řešení pro kopírování hlavních souborů webové aplikace do složky `public`. Systém podporuje jak jednorázové kopírování, tak automatické kopírování při změnách souborů.

## Dostupné příkazy

### Jednorázové kopírování
```bash
npm run copy
```
- Zkopíruje všechny hlavní soubory (`index.html`, `script.js`, `styles.css`, `firebase.js`) do složky `public`
- Zobrazí přehled úspěšně zkopírovaných souborů

### Automatické kopírování při změnách
```bash
npm run copy:watch
```
nebo
```bash
npm run dev:watch
```
- Spustí watch mód, který sleduje změny v hlavních souborech
- Automaticky zkopíruje změněné soubory do složky `public`
- Při prvním spuštění provede počáteční kopírování všech souborů
- Pro ukončení stiskni `Ctrl+C`

## Sledované soubory
- `index.html` - Hlavní HTML soubor
- `script.js` - JavaScript funkcionalita
- `styles.css` - CSS styly
- `firebase.js` - Firebase konfigurace

## Jak to funguje

### copy-files.js
- Hlavní skript pro kopírování souborů
- Kontroluje existenci zdrojových souborů
- Vytváří cílovou složku, pokud neexistuje
- Poskytuje detailní výstup o průběhu kopírování

### watch-files.js
- Sleduje změny v hlavních souborech pomocí `fs.watchFile`
- Automaticky spouští kopírování při detekci změn
- Podporuje graceful shutdown (Ctrl+C)
- Zobrazuje časové razítko změn

## Použití ve vývoji

### Doporučený workflow:
1. **Pro vývoj s automatickým kopírováním:**
   ```bash
   npm run dev:watch
   ```
   - Spustí watch mód v jednom terminálu
   - Edituj soubory v kořenové složce
   - Změny se automaticky zkopírují do `public`

2. **Pro jednorázové kopírování:**
   ```bash
   npm run copy
   ```
   - Užitečné před nasazením nebo při manuálním kopírování

3. **Pro spuštění aplikace:**
   ```bash
   npm start
   ```
   - Spustí HTTP server pro testování

## Výhody automatizace

- ✅ **Žádné manuální kopírování** - soubory se kopírují automaticky
- ✅ **Okamžité aktualizace** - změny se projeví okamžitě v `public` složce
- ✅ **Bezpečnost** - kontrola existence souborů před kopírováním
- ✅ **Přehlednost** - detailní výstup o průběhu operací
- ✅ **Flexibilita** - podpora jak jednorázového, tak automatického kopírování

## Řešení problémů

### Soubor se nekopíruje
- Zkontroluj, zda soubor existuje v kořenové složce
- Zkontroluj oprávnění k zápisu do složky `public`

### Watch mód nefunguje
- Ujisti se, že máš Node.js verze 14 nebo vyšší
- Restartuj watch mód pomocí `Ctrl+C` a znovu spusť `npm run dev:watch`

### Chyby při kopírování
- Zkontroluj, zda není soubor otevřený v jiném programu
- Ujisti se, že máš dostatečná oprávnění pro čtení/zápis souborů
