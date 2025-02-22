console.log('Iniciando 🚀🚀🚀');

import { join, dirname } from 'path';
import { createRequire } from 'module';
import { fileURLToPath } from 'url';
import { setupMaster, fork } from 'cluster';
import { watchFile, unwatchFile } from 'fs';
import cfonts from 'cfonts';
import { createInterface } from 'readline';
import yargs from 'yargs';
import QRCode from 'qrcode-terminal';  // مكتبة لعرض الباركود في الترمينال

const __dirname = dirname(fileURLToPath(import.meta.url));
const require = createRequire(__dirname);
const { name, author } = require(join(__dirname, './package.json'));
const { say } = cfonts;

say('LoliBot-MD', { font: 'chrome', align: 'center', gradient: ['red', 'magenta'] });
say('by: elrebelde21', { font: 'console', align: 'center', gradient: ['red', 'magenta'] });

let isRunning = false;

function start(file) {
    if (isRunning) return;
    isRunning = true;
    const args = [join(__dirname, file), ...process.argv.slice(2)];

    setupMaster({ exec: args[0], args: args.slice(1) });
    const p = fork();

    p.on('message', (data) => {
        switch (data) {
            case 'reset':
                p.process.kill();
                isRunning = false;
                start.apply(this, arguments);
                break;
            case 'uptime':
                p.send(process.uptime());
                break;
        }
    });

    p.on('exit', (_, code) => {
        isRunning = false;
        console.error('⚠️ Error Inesperado ⚠️', code);
        p.process.kill();
        isRunning = false;
        start.apply(this, arguments);

        if (process.env.pm_id) {
            process.exit(1);
        } else {
            process.exit();
        }
    });

    const opts = new Object(yargs(process.argv.slice(2)).exitProcess(false).parse());

    if (!opts['test']) {
        if (!rl.listenerCount()) {
            rl.on('line', (line) => {
                p.emit('message', line.trim());
            });
        }
    }
}

console.log('\n\n╭⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ 》');
console.log('┊ MÉTODO DE VINCULACIÓN');
console.log('┊ Opción 1: Código QR.');
console.log('┊ Conectando automáticamente mediante código QR...\n╰⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯ ⋯');

console.log('Generando código QR...');

// هنا نقوم بتوليد الباركود (QR Code) وعرضه مباشرة في الترمينال
const data = 'https://example.com'; // يمكنك تغيير الرابط أو البيانات هنا
QRCode.generate(data, { small: true }, (qrCode) => {
    console.log('تم إنشاء الباركود وعرضه في الـ Shell!');
    console.log(qrCode); // هنا يتم عرض الباركود في الـ terminal
});

// بدء الملف
start('main.js');
