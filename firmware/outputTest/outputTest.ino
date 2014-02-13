byte pinStatusLED = 4;
byte outputPin_1 = 5;
byte outputPin_2 = 6;
byte outputPin_3 = 7;
byte outputPin_4 = 8;
byte outputPin_5 = 9;
byte outputPin_6 = 10;
const int sensor = A0; // input3 on makerspass


// these variables will change:
byte sensorReading = 0;          // sensor value
unsigned int stateStatusLED = LOW;     // status led status
unsigned int stateOutput_1 = HIGH; // output status

void setup() {
	pinMode(pinStatusLED, OUTPUT);
	pinMode(outputPin_5, OUTPUT);
	Serial.begin(9600);
}

void loop() {
  // read the sensor and store it in the variable sensorReading:
  sensorReading = analogRead(sensor);    
  
  // if the sensor reading is greater than the threshold:
  if (sensorReading > 200) {
    // toggle the status of the pinStatusLED:
    stateStatusLED = LOW;
	stateOutput_1 = LOW;
  } else
  {
    stateStatusLED = HIGH;
    stateOutput_1 = HIGH;
  }
	digitalWrite(pinStatusLED, stateStatusLED);
	digitalWrite(outputPin_5, stateOutput_1);
	Serial.println(sensorReading);
  
	delay(100);
}
