import chai, {expect} from 'chai';
import chaiHttp from 'chai-http';
import app from '../../src/index';
import Task from '../../src/models/task';
chai.use(chaiHttp);

describe("Tasks", () => {
  describe("GET /tasks", () => {
    before((done) => {
      const task = {
        "name": "Task 1",
        "description": "Task 1 Desc",
        "due_date": "2019-08-20T03:40:18.240-04:00"
      }

      chai
        .request(app)
        .post('/tasks')
        .set('content-type', 'application/json')
        .send(task)
        .end(done);
    });

    after((done) => {
      Task.deleteMany({}, done);

    });

    it("should get all tasks", (done) => {
      chai.request(app)
        .get('/tasks')
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.a('array');
          expect(res.body.length).to.equal(1);
          done();
        });
    });
  });

  describe("POST /tasks", () => {
    after((done) => {
      Task.deleteMany({}, done);
    });

    it("should create the task with given task info", (done) => {
      chai.request(app)
        .post('/tasks')
        .set('content-type', 'application/json')
        .send({name: 'POST test', description: 'Testing POST verb', due_date: 'tomorrow'})
        .end((err, res) => {
          expect(res).to.have.status(201);
          expect(res.body).to.be.a('object');
          expect(res.body.id).to.exist;
          done();
        });
    });
  });

  describe("PUT /tasks/<id>", () => {
    let taskId;
    before((done) => {
      chai
        .request(app)
        .post('/tasks')
        .set('content-type', 'application/json')
        .send({name: 'POST test', description: 'Testing PUT verb', due_date: 'tomorrow'})
        .end((err, res) => {
          taskId = res.body.id;
          done();
        });
    });
    after((done) => {
      Task.deleteMany({}, done);

    });

    it("should update task status", (done) => {
      chai.request(app)
        .put(`/tasks/${taskId}`)
        .set('content-type', 'application/json')
        .send({status: 'completed'})
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.a('object');
          expect(res.body.id).to.equal(taskId);
          expect(res.body.status).to.equal('completed');
          done();
        });
    });
  });

  describe("DELETE /tasks/<id>", () => {
    let taskId;
    before((done) => {
      chai
        .request(app)
        .post('/tasks')
        .set('content-type', 'application/json')
        .send({name: 'POST test', description: 'Testing DELETE verb', due_date: 'tomorrow'})
        .end((err, res) => {
          taskId = res.body.id;
          done();
        });
    });

    after((done) => {
      Task.deleteMany({}, done);
    });

    it("should update task status", (done) => {
      chai.request(app)
        .delete(`/tasks/${taskId}`)
        .send()
        .end((err, res) => {
          expect(res).to.have.status(204);
          done();
        });
    });
  });

});
