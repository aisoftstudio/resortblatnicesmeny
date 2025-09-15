#!/usr/bin/env node

/**
 * Skript pro kopírování souborů do složky public
 * Automaticky kopíruje hlavní soubory webové aplikace
 */

const fs = require('fs');
const path = require('path');

// Definice souborů, které se mají kopírovat
const filesToCopy = [
    'index.html',
    'script.js', 
    'styles.css',
    'firebase.js'
];

// Cílová složka
const publicDir = 'public';

/**
 * Funkce pro kopírování souboru
 * @param {string} sourceFile - Zdrojový soubor
 * @param {string} targetFile - Cílový soubor
 */
function copyFile(sourceFile, targetFile) {
    try {
        // Zkontroluj, zda zdrojový soubor existuje
        if (!fs.existsSync(sourceFile)) {
            console.log(`⚠️  Soubor ${sourceFile} neexistuje, přeskočuji...`);
            return false;
        }

        // Vytvoř cílový adresář, pokud neexistuje
        const targetDir = path.dirname(targetFile);
        if (!fs.existsSync(targetDir)) {
            fs.mkdirSync(targetDir, { recursive: true });
        }

        // Kopíruj soubor
        fs.copyFileSync(sourceFile, targetFile);
        console.log(`✅ Zkopírováno: ${sourceFile} → ${targetFile}`);
        return true;
    } catch (error) {
        console.error(`❌ Chyba při kopírování ${sourceFile}:`, error.message);
        return false;
    }
}

/**
 * Hlavní funkce pro kopírování všech souborů
 */
function copyAllFiles() {
    console.log('🚀 Spouštím kopírování souborů do složky public...\n');
    
    let successCount = 0;
    let totalCount = filesToCopy.length;

    filesToCopy.forEach(file => {
        const sourcePath = file;
        const targetPath = path.join(publicDir, file);
        
        if (copyFile(sourcePath, targetPath)) {
            successCount++;
        }
    });

    console.log(`\n📊 Dokončeno: ${successCount}/${totalCount} souborů zkopírováno úspěšně`);
    
    if (successCount === totalCount) {
        console.log('🎉 Všechny soubory byly úspěšně zkopírovány!');
        process.exit(0);
    } else {
        console.log('⚠️  Některé soubory se nepodařilo zkopírovat.');
        process.exit(1);
    }
}

// Spusť kopírování
copyAllFiles();
