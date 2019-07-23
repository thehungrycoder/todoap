import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../src/index';
// Configure chai
chai.use(chaiHttp);
chai.should();

describe("Tasks", () => {
  describe("GET /tasks", () => {
    it("should get all tasks", (done) => {
      chai.request(app)
        .get('/tasks')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          done();
        });
    });
  });
});
