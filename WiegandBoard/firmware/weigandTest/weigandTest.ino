template<class T> inline Print &operator <<(Print &obj, T arg) { 
  obj.print(arg); 
  return obj; 
}

// NTP time stamp is in the first 48 bytes of the message
const int NTP_PACKET_SIZE= 48; 

long previousMillis = 0;
// timeout interval in ms to assume we're done receiving weigand bits from the badge reader
int interval = 1000;

// RFID cards have a facility number, and a card serial number.
unsigned int facility = 0;
unsigned int serialnum = 0;

volatile unsigned long bit_holder = 0;
volatile int bit_count = 0;

char MAKERPASS_STATUS_LED = 4;
char STATUS_LED = 5;
char PROX_BEEPER = 6;
char PROX_GRN_LED = 7;
char STRIKE_BASE = 8;

// interrupt handler for 0 pulse line
void DATA0(void) {
  bit_count++;
  bit_holder = bit_holder << 1;
}

// interrupt handler for 1 pulse line
void DATA1(void) {
  bit_count++;
  bit_holder = bit_holder << 1;
  bit_holder |= 1;
}

// arduino initialization stuff
// this is run once when the arduino is powered on
void setup()  {
  Serial.begin(9600);
  Serial.println("Hi, starting up.");
  clearinterrupts();

  // Serial.println("Beginning ethernet.");
  // Ethernet.begin(mac,ip);

  // Serial.println("Beginning UDP.");
  // Udp.begin(localPort);

  pinMode(PROX_BEEPER, OUTPUT);
  digitalWrite(PROX_BEEPER,HIGH);

  pinMode(STATUS_LED, OUTPUT);
  digitalWrite(STATUS_LED,LOW);

  pinMode(PROX_GRN_LED, OUTPUT);
  digitalWrite(PROX_GRN_LED,HIGH);


  // Serial.println("Beginning SDCard.");
  // if (!SD.begin(SDCARD_SELECT)) {
    // Serial.println("SD initialization failed!");  
  // }

  Serial.println("Attaching interrupts.");

  // interrupt 0 works with arduino pin digital 2
  attachInterrupt(0, DATA0, RISING);
  
  // interrupt 1 works with arduino pin digital 3
  attachInterrupt(1, DATA1, RISING);

  delay(10);

  // lets beep the beeper for 50ms
  Serial.println("Beep!");
  digitalWrite(PROX_BEEPER,LOW); // beeper
  delay(50);
  digitalWrite(PROX_BEEPER,HIGH);

  digitalWrite(STATUS_LED, HIGH); // show Arduino has finished initilisation by turning on in-built LED
  Serial.println("READER_0001");
}


void loop() {

  if (millis() - previousMillis > interval) {
    bit_count = 0; 
    bit_holder = 0;
    previousMillis = millis();
  }

  // our HID cards hold 26 bits
  if (bit_count == 26) {
    previousMillis = millis();

	Serial.println(bit_holder, BIN);
    // remove prefix/postfix parity bits
    bit_holder = bit_holder & 0x1fffffe;
    bit_holder = bit_holder >> 1;
    // shift off the serial number (16bits)
    facility = (bit_holder >> 16);
    serialnum = bit_holder & 0xffff;
    Serial << "CARD: F: " << facility << " ID: " << serialnum << "\n";
    if (facility == 59 && (serialnum > 900 && serialnum < 1001) ) {
      // authorized user
      // show HID green led
      digitalWrite(PROX_GRN_LED,LOW);
      // show status LED
	  digitalWrite(MAKERPASS_STATUS_LED,LOW);
      // send power to the electric strike
      digitalWrite(STRIKE_BASE,HIGH);
      // pause for effect
      delay(2000);
      // hide status LED
	  digitalWrite(MAKERPASS_STATUS_LED,LOW);
      // hide HID green led
      digitalWrite(PROX_GRN_LED,HIGH);
      // stop sending power to the electric strike
      digitalWrite(STRIKE_BASE,LOW);
    }

    // clear badge reader variables
    bit_count = 0;
    bit_holder = 0;
  }
  delay(50);
}


void clearinterrupts () {
  // the interrupt in the Atmel processor mises out the first negitave pulse as the inputs are already high,
  // so this gives a pulse to each reader input line to get the interrupts working properly.
  // Then clear out the reader variables.
  // The readers are open collector sitting normally at a one so this is OK
  for(int i = 2; i<4; i++){
    pinMode(i, OUTPUT);
    digitalWrite(i, HIGH); // enable internal pull up causing a one
    digitalWrite(i, LOW); // disable internal pull up causing zero and thus an interrupt
    pinMode(i, INPUT);
    digitalWrite(i, HIGH); // enable internal pull up
  }
  bit_count = 0; 
  bit_holder = 0;
  delay(10);
}

