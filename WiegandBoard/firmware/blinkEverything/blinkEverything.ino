int pin0  = 0 ;
int pin1  = 1 ;
int pin2  = 2 ;
int pin3  = 3 ;
int pin4  = 4 ;
int pin5  = 5 ;
int pin6  = 6 ;
int pin7  = 7 ;
int pin8  = 8 ;
int pin9  = 9 ;
int pin10 = 10;
int pin11 = 11;
int pin12 = 12;
int pin13 = 13;

// the setup routine runs once when you press reset:
void setup() {                
  // initialize the digital pin as an output.
  pinMode(pin0 , OUTPUT);     
  pinMode(pin1 , OUTPUT);     
  pinMode(pin2 , OUTPUT);     
  pinMode(pin3 , OUTPUT);     
  pinMode(pin4 , OUTPUT);     
  pinMode(pin5 , OUTPUT);     
  pinMode(pin6 , OUTPUT);     
  pinMode(pin7 , OUTPUT);     
  pinMode(pin8 , OUTPUT);     
  pinMode(pin9 , OUTPUT);     
  pinMode(pin10, OUTPUT);     
  pinMode(pin11, OUTPUT);     
  pinMode(pin12, OUTPUT);     
  pinMode(pin13, OUTPUT);     
}

// the loop routine runs over and over again forever:
void loop() {
  digitalWrite(pin0 , HIGH);
  digitalWrite(pin1 , HIGH);
  digitalWrite(pin2 , HIGH);
  digitalWrite(pin3 , HIGH);
  digitalWrite(pin4 , HIGH);
  digitalWrite(pin5 , HIGH);
  digitalWrite(pin6 , HIGH);
  digitalWrite(pin7 , HIGH);
  digitalWrite(pin8 , HIGH);
  digitalWrite(pin9 , HIGH);
  digitalWrite(pin10, HIGH);
  digitalWrite(pin11, HIGH);
  digitalWrite(pin12, HIGH);
  digitalWrite(pin13, HIGH);
  delay(1000);               // wait for a second
  digitalWrite(pin0 , LOW);
  digitalWrite(pin1 , LOW);
  digitalWrite(pin2 , LOW);
  digitalWrite(pin3 , LOW);
  digitalWrite(pin4 , LOW);
  digitalWrite(pin5 , LOW);
  digitalWrite(pin6 , LOW);
  digitalWrite(pin7 , LOW);
  digitalWrite(pin8 , LOW);
  digitalWrite(pin9 , LOW);
  digitalWrite(pin10, LOW);
  digitalWrite(pin11, LOW);
  digitalWrite(pin12, LOW);
  digitalWrite(pin13, LOW);
  delay(1000);               // wait for a second
}