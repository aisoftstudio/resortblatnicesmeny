# Contributing to Systém směn - Resort Blatnice

Děkujeme za váš zájem o přispívání do tohoto projektu!

## 🚀 Jak začít

### 1. Fork a Clone
```bash
# Fork repository na GitHub
# Pak klonujte váš fork
git clone https://github.com/VASE-USERNAME/smeny-web.git
cd smeny-web

# Přidejte upstream remote
git remote add upstream https://github.com/resort-blatnice/smeny-web.git
```

### 2. Instalace závislostí
```bash
npm install
```

### 3. Spuštění aplikace
```bash
npm start
```

## 📝 Workflow pro přispívání

### 1. Vytvoření větve
```bash
git checkout -b feature/nazev-funkce
# nebo
git checkout -b fix/nazev-opravy
```

### 2. Vývoj
- Proveďte své změny
- Testujte lokálně
- Ujistěte se, že aplikace funguje správně

### 3. Commit
```bash
git add .
git commit -m "feat: přidána nová funkce pro správu směn"
```

### 4. Push a Pull Request
```bash
git push origin feature/nazev-funkce
```

Pak vytvořte Pull Request na GitHub.

## 📋 Pravidla pro commit zprávy

Používejte následující formát:
```
<typ>: <stručný popis>

<dlouhý popis, pokud je potřeba>
```

### Typy:
- `feat`: nová funkce
- `fix`: oprava bugu
- `docs`: dokumentace
- `style`: formátování
- `refactor`: refaktoring
- `test`: testy
- `chore`: údržba

### Příklady:
```
feat: přidána možnost exportu směn do CSV
fix: oprava chyby při mazání uživatele
docs: aktualizace README s novými funkcemi
```

## 🧪 Testování

Před odesláním PR prosím:
1. Otestujte všechny funkce aplikace
2. Zkontrolujte, že aplikace funguje v různých prohlížečích
3. Ověřte responzivní design na mobilních zařízeních

## 📱 Testovací účty

Pro testování použijte tyto PINy:
- **Admin**: `12345`
- **Uživatel**: `11111`

## 🐛 Reportování bugů

Při reportování bugů uveďte:
1. Popis problému
2. Kroky k reprodukci
3. Očekávané chování
4. Použitý prohlížeč a verzi
5. Screenshoty (pokud jsou relevantní)

## 💡 Návrhy na vylepšení

Pro návrhy na nové funkce:
1. Zkontrolujte existující issues
2. Vytvořte nový issue s popisem
3. Diskutujte s ostatními přispěvateli

## 📞 Kontakt

Pro otázky kontaktujte:
- Email: info@resort-blatnice.cz
- GitHub Issues: [Issues](https://github.com/resort-blatnice/smeny-web/issues)

Děkujeme za váš přínos! 🎉
