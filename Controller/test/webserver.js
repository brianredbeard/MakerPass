var _ = require( 'underscore' ),
    chai = require( 'chai' ),
    should = chai.should(),
    request = require( 'supertest' );

var TEST_PORT = 4321;

/*
request(app)
  .get('/user')
  .expect('Content-Type', /json/)
  .expect('Content-Length', '20')
  .expect(200)
  .end(function(err, res){
    if (err) throw err;
  });
*/


describe( 'makerpass.webserver', function() {

    var makerpass = require( '../lib/makerpass' );
    makerpass.webport = TEST_PORT;
    makerpass.start();

    var ws = makerpass.webserver;

    request = request( 'http://localhost:' + TEST_PORT + '/' );

    describe( '.dir', function() {
        it( 'should be a string', function() {
            ws.should.have.property( 'dir' );
            ws.dir.should.be.a( 'string' );
        } );
    } );
    describe( '.port', function() {
        it( 'should be a number', function() {
            ws.should.have.property( 'port' );
            ws.port.should.be.a( 'number' );
        } );
    } );
    describe( '.server', function() {
        it( 'should be an object', function() {
            ws.should.have.property( 'server' );
            ws.server.should.be.an( 'object' );
        } );
    } );

} );
