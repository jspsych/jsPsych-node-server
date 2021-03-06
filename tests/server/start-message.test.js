var server = require('../../server');
var io = require('socket.io-client');

const SERVER_URL = 'http://localhost:8080';

describe('start message', function(){

  beforeAll(function(){
    server.start();
  });

  afterAll(function(){
    server.stop();
  });

  test('is received correctly, only one time', function(done){

    var client1 = io.connect(SERVER_URL);
    var client2 = io.connect(SERVER_URL);

    client1.emit('join', {experiment_id: 'test', participants: 2});
    client2.emit('join', {experiment_id: 'test', participants: 2});

    client1.on('ready-check', function(data){
      setTimeout(function(){
        client1.emit('ready-reply');
      }, 100);
    })

    client2.on('ready-check', function(data){
      setTimeout(function(){
        client2.emit('ready-reply');
      }, 200);
    })

    const m = jest.fn();

    client2.on('start', function(d){
      m();
      setTimeout(function(){
        expect(m.mock.calls.length).toBe(1);
        client1.disconnect();
        client2.disconnect();
        done();
      }, 200);
    });

  });

});
