import { BOOKMAKERS } from '../constants.js';
import { OddsModel } from '../models/odds.js';

export const getOdds = async (req, res) => {
    try{
        const { eventUrl } = req.query
        if(!eventUrl) {
            return res.status(400).send('Missing required field: eventUrl');
        }
        if(eventUrl.includes(BOOKMAKERS.WILLIAMHILLS)){
            const odds = await OddsModel.getOdds({ eventUrl });
            return res.status(200).json(odds);
        } else{
            return res.status(400).send('Bookmaker not supported.');
        }
    } catch (error) {
        return res.status(500).send('Error getting odds.');
    }
}

