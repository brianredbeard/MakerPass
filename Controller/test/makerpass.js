var _ = require( 'underscore' ),
    chai = require( 'chai' ),
    should = chai.should();

describe( 'makerpass', function() {

    var makerpass = require( '../lib/makerpass' );

    describe( '.nodes', function() {
        it( 'should be an array', function() {
            makerpass.should.have.property( 'nodes' );
            makerpass.nodes.should.be.an( 'array' ).with.length( 0 );
        } );
    } );
    describe( '.interfaces', function() {
        it( 'should be an array', function() {
            makerpass.should.have.property( 'interfaces' );
            makerpass.interfaces.should.be.an( 'array' ).with.length( 0 );
        } );
    } );
    describe( '.webserver', function() {
        it( 'should be a function', function() {
            makerpass.should.have.property( 'webserver' );
            makerpass.webserver.should.be.a( 'function' );
        } );
    } );
    describe( '.configloaded', function() {
        it( 'should be false', function() {
            makerpass.should.have.property( 'configloaded' );
            makerpass.configloaded.should.be.a( 'boolean' );
            makerpass.configloaded.should.be.false;
        } );
    } );
    describe( '.appdir', function() {
        it( 'should be a string', function() {
            makerpass.should.have.property( 'appdir' );
            makerpass.appdir.should.be.a( 'string' );
        } );
    } );
    describe( '.webport', function() {
        it( 'should be a number', function() {
            makerpass.should.have.property( 'webport' );
            makerpass.webport.should.be.a( 'number' );
            makerpass.webport.should.equal( 3000 );
        } );
    } );
    describe( '.start', function() {
        it( 'should be a function', function() {
            makerpass.should.have.property( 'start' );
            makerpass.start.should.be.a( 'function' );
        } );
    } );
    describe( '.loadconfig', function() {
        it( 'should be a function', function() {
            makerpass.should.have.property( 'loadconfig' );
            makerpass.loadconfig.should.be.a( 'function' );
        } );
        it( 'should load the test configs', function() {
            makerpass.loadconfig( __dirname + '/config' ).should.be.true;
        } );
        it( 'should load one interface', function() {
            makerpass.interfaces.should.have.length( 1 );
        } );
        it( 'should load one node', function() {
            makerpass.nodes.should.have.length( 1 );
        } );
    } );
} );
