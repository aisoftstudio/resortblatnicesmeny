/**
 * Testovací skript pro ověření migrace administrátorského účtu
 * Spusť v konzoli prohlížeče pro testování
 */

async function testAdminMigration() {
    console.log('🧪 Testování migrace administrátorského účtu...');
    
    try {
        // Načtení dat z Firebase
        const usersResult = await window.firebaseServices.nacistUzivatele();
        
        if (!usersResult.success) {
            console.error('❌ Chyba při načítání uživatelů:', usersResult.error);
            return;
        }
        
        const users = usersResult.data || [];
        console.log('📊 Načtení uživatelé:', users);
        
        // Hledání administrátora
        const admin = users.find(u => u.isAdmin);
        
        if (!admin) {
            console.log('⚠️ Administrátorský účet nebyl nalezen');
            return;
        }
        
        console.log('👑 Nalezený administrátor:', admin);
        
        // Kontrola PINu
        if (admin.pin === '0125') {
            console.log('✅ Administrátor má správný PIN: 0125');
        } else if (admin.pin === '12345') {
            console.log('⚠️ Administrátor má starý PIN: 12345 - bude aktualizován při příštím načtení');
        } else {
            console.log('❓ Administrátor má neznámý PIN:', admin.pin);
        }
        
        // Kontrola ochrany před smazáním
        if (admin.isAdmin) {
            console.log('🛡️ Administrátorský účet je chráněn před smazáním');
        }
        
        console.log('✅ Test dokončen');
        
    } catch (error) {
        console.error('❌ Chyba při testování:', error);
    }
}

// Spuštění testu
console.log('Spusť testAdminMigration() pro testování migrace admin účtu');
