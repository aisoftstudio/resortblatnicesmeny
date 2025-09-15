#!/usr/bin/env node

/**
 * Watch skript pro automatické kopírování souborů při změnách
 * Sleduje změny v hlavních souborech a automaticky je kopíruje do public
 */

const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

// Definice souborů, které se mají sledovat
const filesToWatch = [
    'index.html',
    'script.js', 
    'styles.css',
    'firebase.js'
];

// Cílová složka
const publicDir = 'public';

/**
 * Funkce pro spuštění kopírování
 */
function runCopyScript() {
    return new Promise((resolve, reject) => {
        exec('node copy-files.js', (error, stdout, stderr) => {
            if (error) {
                console.error('❌ Chyba při kopírování:', error);
                reject(error);
                return;
            }
            
            // Zobraz výstup pouze při změnách (ne při startu)
            if (stdout.includes('✅ Zkopírováno:')) {
                console.log(stdout);
            }
            resolve();
        });
    });
}

/**
 * Funkce pro nastavení sledování souborů
 */
function setupFileWatchers() {
    console.log('👀 Nastavuji sledování souborů...\n');
    
    filesToWatch.forEach(file => {
        if (fs.existsSync(file)) {
            console.log(`📁 Sleduji: ${file}`);
            
            fs.watchFile(file, { interval: 1000 }, (curr, prev) => {
                if (curr.mtime !== prev.mtime) {
                    console.log(`\n🔄 Detekována změna v souboru: ${file}`);
                    console.log(`⏰ Čas změny: ${new Date().toLocaleString('cs-CZ')}`);
                    
                    runCopyScript().catch(error => {
                        console.error('❌ Chyba při automatickém kopírování:', error);
                    });
                }
            });
        } else {
            console.log(`⚠️  Soubor ${file} neexistuje, přeskočuji sledování...`);
        }
    });
}

/**
 * Funkce pro inicializaci watch módu
 */
async function initializeWatch() {
    console.log('🚀 Spouštím watch mód pro automatické kopírování...\n');
    
    // Nejdříve zkopíruj všechny soubory
    console.log('📋 Provádím počáteční kopírování všech souborů...');
    await runCopyScript();
    
    console.log('\n✅ Počáteční kopírování dokončeno!');
    console.log('👀 Nyní sleduji změny v souborech...\n');
    console.log('💡 Pro ukončení stiskni Ctrl+C\n');
    
    // Nastav sledování souborů
    setupFileWatchers();
}

/**
 * Funkce pro graceful shutdown
 */
function setupGracefulShutdown() {
    process.on('SIGINT', () => {
        console.log('\n\n👋 Ukončuji watch mód...');
        console.log('✅ Watch mód byl úspěšně ukončen.');
        process.exit(0);
    });
    
    process.on('SIGTERM', () => {
        console.log('\n\n👋 Ukončuji watch mód...');
        process.exit(0);
    });
}

// Spusť watch mód
setupGracefulShutdown();
initializeWatch().catch(error => {
    console.error('❌ Chyba při inicializaci watch módu:', error);
    process.exit(1);
});
