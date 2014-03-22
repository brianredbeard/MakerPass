var _ = require( 'underscore' ),
    serialport = require( 'serialport' ),
    SerialPort = serialport.SerialPort;

exports.defaults = {
    path        : '/dev/ttyS0', // TODO - search for serial devices
    baudrate    : 9600,
    databits    : 8,
    stopbits    : 1,
    parity      : 'none',
    flowcontrol : false,
};

exports.openstream = function openstream() {
    var self = this;
    var sp = self.port = new SerialPort( self.path, {
        baudrate                : self.baudrate,
        databits                : self.databits,
        stopbits                : self.stopbits,
        parity                  : self.parity,
        flowcontrol             : self.flowcontrol,
        buffersize              : 512,
        parser                  : serialport.parsers.readline( "\n" ),
        dataCallback            : self.onData,
        disconnectedCallback    : self.onClose,
        // rtscts, xon, xoff, xany
    }, true, function( err ) {
        if ( err ) {
            self.seterror( err );
        } else {
            sp.on( 'data', self.onData, self );
            sp.on( 'close', self.onClose, self );
            sp.on( 'error', self.onError, self );
        }
    } );
};

exports.write = function write( string ) {
    this.port.write( string + "\n", function( err, results ) {
        console.log( 'err: ' + err );
        console.log( 'results: ' + results );
    } );
};

exports.name = function name() { return 'Serial Interface on ' + this.path; };
