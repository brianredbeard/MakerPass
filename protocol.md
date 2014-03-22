MakerPass Serial Communications Protocol
========================================
MakerPass uses a simple text-based communications protocol.  Every message sent
by either the controller or the individual nodes is in this format:

07 STATUS I1=1 I2=0 I3=0 I4=0 O1=1 O2=1 O3=1 O4=0\n
ID CMD    PAYLOAD

Each message consists of two or more words (space-separated) terminated with a
newline.

ID: Node Identifier
------------------------
Each message starts with a two-digit node identifier.
Nodes can be numbered 01-89.
Node Identifiers 00 and 90-99 are reserved.

00 - Unidentified - Message addressed to any node without an assigned Node ID.
99 - Broadcast - Message addressed to all listening nodes.

CMD: Command
------------------------
The second word in each message is a command identifier.

PAYLOAD: Message Payload
------------------------
The most common payload type is one or more input/output value indicators.

    I1=0 I2=1023 I3=1023 I4=46 O1=1 O2=0 O3=0 O4=1

In this case the part of each word before the = sign indicates an input (I#)
or output (O#) pin.  The right hand side of the word indicates the value (or
desired value) of each pin.

When the controller is sending commands to the slave, it will send

Commands
========
STATUS
---------
Report status.

When sent by the controller will have no payload, in this case it's a request
to the node or nodes to report their status.

When sent by a node the payload is 

RATE
---------

CHANGE
---------
