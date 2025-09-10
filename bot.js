const { Client, GatewayIntentBits } = require('discord.js');
const puppeteer = require('puppeteer');
const fs = require('fs');
require('dotenv').config();

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

client.once('clientReady', () => {
    console.log('Bot is online!');
    console.log(`Logged in as ${client.user.tag}`);
});

// Functie om een vertraging te creëren
const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));

client.on('messageCreate', async message => {
    // Zorg ervoor dat de bot niet reageert op zijn eigen berichten
    if (message.author.bot) return;

    // Negeer berichten die geen commando zijn
    if (!message.content.startsWith('!')) return;

    // Controleer of het commando '!screenshot' is
    if (message.content.startsWith('!pd')) {
        const args = message.content.split(' ');
        const code = args[1]; // Neem de code uit het bericht

        if (!code || code.length !== 9) {
            await message.channel.send('Voer een geldige 9-cijferige/letterige code in na !screenshot.');
            return;
        }

        console.log(`!screenshot command received with code: ${code}`);

        try {
            console.log('Starting Puppeteer...');
            const browser = await puppeteer.launch({
                headless: true,
                args: ['--no-sandbox', '--disable-setuid-sandbox']
            });
            console.log('Puppeteer launched successfully.');

            const page = await browser.newPage();
            const url = `http://localhost:3000/user/${code}`; // Pas deze URL aan naar je eigen applicatie
            console.log(`Navigating to: ${url}`);
            const response = await page.goto(url, { waitUntil: 'networkidle2' });
            console.log('Page loaded with status:', response.status());

            if (response.status() !== 200) {
                await message.channel.send('De pagina kon niet worden geladen. Controleer de code en probeer het opnieuw.');
                await browser.close();
                return;
            }

            await page.setViewport({ width: 1920, height: 1080 });
            const elementSelector = '.userpage-container';
            await page.waitForSelector(elementSelector, { timeout: 5000 });
            await wait(2000); // Extra wachten voor stabiliteit

            const screenshotPath = 'screenshot.png'; // Locatie waar je de screenshot opslaat
            await page.screenshot({ path: screenshotPath });
            console.log('Screenshot taken.');
            await browser.close();

            await message.channel.send({
                content: `Hier zijn de gegevens van user met code: ${code}`,
                files: [{
                    attachment: screenshotPath,
                    name: 'screenshot.png'
                }]
            });

            // Verwijder het screenshot-bestand na het verzenden
            fs.unlinkSync(screenshotPath);

        } catch (error) {
            console.error('Error taking screenshot:', error);
            await message.channel.send('Er ging iets mis bij het maken van de screenshot.');
        }
    }
});

// Log in met de token
const TOKEN = process.env.DISCORD_BOT_TOKEN; // Zorg ervoor dat je token correct is in .env
client.login(TOKEN);
