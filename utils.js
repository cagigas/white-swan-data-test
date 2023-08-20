import { launch } from 'puppeteer';

export async function scrapeHorseRacingOdds(eventUrl) {
    const browser = await launch();
    const page = await browser.newPage();
    await page.goto(eventUrl);

    const data = await page.evaluate(() => {
        let horses = Array.from(document.querySelectorAll('.racecard-runner__name'));
        let odds = Array.from(document.querySelectorAll('.racecard-button__price'));
        return horses.map((horse, index) => {
            return {
                name: horse.textContent.trim(),
                odds: odds[index].getAttribute("data-odds").trim()
            };
        });
    });

    await browser.close();

    return data;
}
