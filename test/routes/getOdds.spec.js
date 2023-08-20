import chai from 'chai';
import chaiHttp from 'chai-http';
import { OddsModel } from '../../models/odds.js';
import app from '../../app.js';

chai.use(chaiHttp);
const { expect } = chai;

jest.mock('../../models/odds.js', () => ({
    OddsModel: {
        getOdds: jest.fn()
    }
}));
    
describe("POST /odds ", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });
    
    it("should return token not present", done => {
        chai.request(app)
            .post(`/odds`)
            .end((err, res) => {
                expect(res).to.have.status(400);
                expect(res.text).to.equal('Token not present');
                done();
            });
    });    
    
    it("should return 400 for missing eventUrl", done => {
        chai.request(app)
            .post(`/odds`)
            .set('Authorization', 'Bearer token')
            .end((err, res) => {
                expect(res).to.have.status(400);
                expect(res.text).to.equal('Missing required field: eventUrl');
                done();
            });
    });

    it("should return 400 for unsupported bookmaker", done => {
        chai.request(app)
        .post('/odds?eventUrl=unsupportedUrl')
        .set('Authorization', 'Bearer token')
        .end((err, res) => {
            expect(res).to.have.status(400);
            expect(res.text).to.equal('Bookmaker not supported.');
            done();
        });
    });

    it("should return odds when bookmaker is supported", done => {
        const fakeOdds = [{ name: "Horse1", odds: "5/1" }];
        OddsModel.getOdds.mockResolvedValueOnce(fakeOdds);

        chai.request(app)
        .post('/odds?eventUrl=http://williamhills.com/race')
        .set('Authorization', 'Bearer token')
        .end((err, res) => {
            expect(res).to.have.status(200);
            expect(res.body).to.deep.equal(fakeOdds);
            done();
        });
    });

});
