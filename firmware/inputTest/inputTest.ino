const int ledPin = 4;
const int sensor = A0;


// these variables will change:
int sensorReading = 0;      // variable to store the value read from the sensor pin
int ledState = LOW;         // variable used to store the last LED status, to toggle the light

void setup() {
	pinMode(ledPin, OUTPUT);
//	Serial.begin(9600);
}

void loop() {
  // read the sensor and store it in the variable sensorReading:
  sensorReading = analogRead(sensor);    
  
  // if the sensor reading is greater than the threshold:
  if (sensorReading > 500) {
    // toggle the status of the ledPin:
    ledState = LOW;
    // update the LED pin itself:
  } else
  {
    ledState = HIGH;
  }
	digitalWrite(ledPin, ledState);
  
	delay(10);
}
