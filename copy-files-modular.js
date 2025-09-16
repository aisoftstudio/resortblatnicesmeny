#!/usr/bin/env node

/**
 * Modulární kopírovací skript pro sloučení souborů do produkční verze
 * Automaticky sloučí všechny moduly do hlavních souborů pro public složku
 */

const fs = require('fs');
const path = require('path');

// Definice modulů pro sloučení
const modulesToMerge = {
    'script.js': [
        'script.js', // Původní script.js s inicializací
        'src/shared/services/firebase-service.js',
        'src/shared/utils/date-utils.js',
        'src/shared/utils/validation-utils.js',
        'src/admin/kalendar-smen/kalendar-smen.js',
        'src/admin/sprava-smen/sprava-smen.js',
        'src/admin/automaticke-smeny/automaticke-smeny.js',
        'src/admin/sprava-pracovist/sprava-pracovist.js',
        'src/admin/sprava-uzivatelu/sprava-uzivatelu.js',
        // src/app.js se nepřidává, protože inicializace je už v původním script.js
    ],
    // styles.css se nekopíruje, protože se kopíruje přímo
};

// Cílová složka
const publicDir = 'public';

/**
 * Funkce pro sloučení souborů do jednoho
 * @param {string[]} files - Pole cest k souborům
 * @param {string} outputFile - Výstupní soubor
 */
function mergeFiles(files, outputFile) {
    let content = '';
    let mergedCount = 0;
    
    files.forEach(file => {
        if (fs.existsSync(file)) {
            content += `\n/* === ${file} === */\n`;
            content += fs.readFileSync(file, 'utf8');
            content += '\n';
            mergedCount++;
            console.log(`✅ Přidáno: ${file}`);
        } else {
            console.log(`⚠️  Soubor ${file} neexistuje, přeskočuji...`);
        }
    });
    
    // Vytvoř cílový adresář, pokud neexistuje
    const targetDir = path.dirname(outputFile);
    if (!fs.existsSync(targetDir)) {
        fs.mkdirSync(targetDir, { recursive: true });
    }
    
    // Zapiš sloučený obsah
    fs.writeFileSync(outputFile, content);
    console.log(`📄 Sloučeno: ${mergedCount} souborů → ${outputFile}`);
}

/**
 * Funkce pro kopírování jednotlivého souboru
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

        // Speciální úprava pro index.html - odstranění duplicitních script tagů
        if (sourceFile === 'index.html') {
            let content = fs.readFileSync(sourceFile, 'utf8');
            
            // Odstranění script tagů pro moduly, které jsou už sloučené
            content = content.replace(/<script src="src\/shared\/utils\/validation-utils\.js"><\/script>\s*/g, '');
            
            fs.writeFileSync(targetFile, content);
            console.log(`✅ Zkopírováno a upraveno: ${sourceFile} → ${targetFile}`);
        } else {
            // Kopíruj soubor normálně
            fs.copyFileSync(sourceFile, targetFile);
            console.log(`✅ Zkopírováno: ${sourceFile} → ${targetFile}`);
        }
        return true;
    } catch (error) {
        console.error(`❌ Chyba při kopírování ${sourceFile}:`, error.message);
        return false;
    }
}

/**
 * Hlavní funkce pro sestavení produkční verze
 */
function buildProduction() {
    console.log('🚀 Sestavuji produkční verzi z modulární struktury...\n');
    
    let totalSuccess = 0;
    let totalFiles = 0;
    
    // Sloučení JavaScript souborů
    console.log('📦 Slučuji JavaScript moduly...');
    mergeFiles(modulesToMerge['script.js'], path.join(publicDir, 'script.js'));
    totalSuccess++;
    totalFiles++;
    
    // CSS soubory se nekopírují, protože se kopírují přímo
    
    // Kopírování ostatních souborů
    console.log('\n📋 Kopíruji ostatní soubory...');
    const filesToCopy = ['index.html', 'firebase.js', 'styles.css'];
    filesToCopy.forEach(file => {
        totalFiles++;
        if (copyFile(file, path.join(publicDir, file))) {
            totalSuccess++;
        }
    });
    
    // Poznámka: script.js se nekopíruje, protože je nahrazen sloučeným souborem
    
    console.log(`\n📊 Dokončeno: ${totalSuccess}/${totalFiles} operací úspěšných`);
    
    if (totalSuccess === totalFiles) {
        console.log('🎉 Produkční verze úspěšně sestavena!');
        console.log('📁 Všechny soubory jsou připraveny v složce public/');
        process.exit(0);
    } else {
        console.log('⚠️  Některé operace se nepodařily.');
        process.exit(1);
    }
}

// Spusť sestavení
buildProduction();
