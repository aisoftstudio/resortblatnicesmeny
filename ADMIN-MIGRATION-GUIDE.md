# 🔄 Průvodce migrací administrátorského účtu

## 📋 Co bylo implementováno

### 1. **Automatická migrace PINu**
- Systém automaticky najde existujícího admina s PINem `12345`
- Aktualizuje jeho PIN na `0125`
- Uloží změny do Firebase

### 2. **Ochrana před smazáním**
- Administrátorský účet nelze smazat
- V UI se zobrazuje ikona štítu místo tlačítka "Smazat"
- Chybová zpráva při pokusu o smazání

### 3. **Firebase synchronizace**
- Všechny změny se automaticky ukládají do Firebase
- Přihlášení funguje přes Firebase data

## 🚀 Jak postupovat

### **Krok 1: Obnovení stránky**
1. Zavři aplikaci
2. Otevři znovu `index.html`
3. Systém automaticky načte data z Firebase

### **Krok 2: Kontrola migrace**
1. Otevři Developer Tools (F12)
2. V konzoli spusť: `testAdminMigration()`
3. Zkontroluj výstup

### **Krok 3: Přihlášení**
1. Zkus se přihlásit s PINem `0125`
2. Pokud se nepřihlásíš, zkus starý PIN `12345`
3. Po úspěšném přihlášení se PIN automaticky aktualizuje

### **Krok 4: Ověření ochrany**
1. Jdi do "Správa uživatelů"
2. U administrátorského účtu by měla být ikona štítu
3. Zkus kliknout na ikonu - měla by se zobrazit chybová zpráva

## 🔧 Řešení problémů

### **Problém: Admin se nepřihlásí**
**Řešení:**
1. Zkontroluj konzoli prohlížeče
2. Spusť `testAdminMigration()` pro diagnostiku
3. Pokud je problém s Firebase, zkontroluj internetové připojení

### **Problém: Starý PIN stále funguje**
**Řešení:**
1. To je normální - migrace proběhne při příštím načtení
2. Nebo spusť `testAdminMigration()` pro okamžitou aktualizaci

### **Problém: Admin lze smazat**
**Řešení:**
1. Obnov stránku (F5)
2. Zkontroluj, že máš nejnovější verzi kódu
3. Zkontroluj konzoli pro chyby

## 📊 Očekávané výsledky

### **Před migrací:**
- Admin PIN: `12345`
- Admin lze smazat
- Tlačítko "Smazat" je viditelné

### **Po migraci:**
- Admin PIN: `0125`
- Admin nelze smazat
- Ikona štítu místo tlačítka "Smazat"
- Chybová zpráva při pokusu o smazání

## 🎯 Testování

Spusť v konzoli prohlížeče:
```javascript
testAdminMigration()
```

Očekávaný výstup:
```
🧪 Testování migrace administrátorského účtu...
📊 Načtení uživatelé: [...]
👑 Nalezený administrátor: {id: "admin-1", pin: "0125", name: "Admin", isAdmin: true}
✅ Administrátor má správný PIN: 0125
🛡️ Administrátorský účet je chráněn před smazáním
✅ Test dokončen
```

## 📞 Podpora

Pokud máš problémy:
1. Zkontroluj konzoli prohlížeče
2. Spusť testovací skript
3. Obnov stránku a zkus znovu
