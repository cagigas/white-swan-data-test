import { scrapeHorseRacingOdds } from '../utils.js';

export class OddsModel {
    static async getOdds ({ eventUrl }) {
        return await scrapeHorseRacingOdds(eventUrl);
    }
}