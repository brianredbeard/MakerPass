var MPNode = function( config ) {
    _.extend( this, config );
    console.log( this );
    // this.id
    // this.authid
    // this.inputs
    // this.outputs
    // this.variables
    // this.events
    // this.lastMessageTime
    // this.totalMessages
    // this.lastCardScanned
    this.connect();
};

MPNode.prototype.send = function send( msg ) {
    if ( this.socket ) {
        if ( this.pending ) {
            while ( this.pending.length > 0 ) {
                this.socket.emit( this.pending.shift() );
            }
        }
    } else {
        if ( ! this.pending ) this.pending = [];
        this.pending.push( msg );
    }
};

MPNode.prototype.parseMessage = function parseMessage( msg ) {
    var tokens = msg.split( ' ' );
    var target = tokens.shift();
    if ( ~ target.indexOf( '*' ) ) {
        console.log( 'wildcard!' );
    }
    console.log( tokens );
};

MPNode.prototype.connect = function connect() {
    var node = this;
    var socket = io.connect();
    socket.on( 'message', function( msg ) {
        node.parseMessage( msg );
    } );
    this.socket = socket;
};

MPNode.prototype.send = function send( msg ) {
    if ( this.socket ) {
        this.socket.emit( 'message', msg );
    } else {
        console.error( "Attempt to send message before connected" );
    }
};
