/*
  Makerpass led test
  Send the name of the LED you want to toggle
  ex: 4
  ex: 1
*/

// buffer for serial capture
//char serialBuffer[];
// pins for the LEDs:
byte outputPins[] = {4, 5, 6, 7, 8, 9, 10};
// used all over
byte thisPin = 0;

void setup() {
	// initialize serial
	Serial.begin(9600);

	Serial.print("prepping ");
	Serial.print(sizeof(outputPins),DEC);
	Serial.println(" pins");
	// make the pins into outputs
	for (thisPin = 4; thisPin <= sizeof(outputPins)+4; thisPin++)
	{
		pinMode(thisPin, OUTPUT);
		digitalWrite(thisPin, LOW);
		Serial.print(thisPin, DEC);
		Serial.print(" on. ");
	}
		Serial.println(" ");
}

void loop() {
  // if there's any serial available, read it:
  while (Serial.available() > 0) {
//    Serial.readBytesUntil('\n', serialBuffer);
	thisPin = Serial.parseInt();
	Serial.println(thisPin, DEC);
	if (Serial.read() == '\n') {
		digitalWrite(thisPin, !digitalRead(thisPin));
	}
  }
}







