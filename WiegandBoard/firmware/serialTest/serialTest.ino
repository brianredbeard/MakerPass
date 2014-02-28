void setup() {
  Serial.begin(9600);
  // make the pushbutton's pin an input:
  // pinMode(pushButton, INPUT);
}

// the loop routine runs over and over again forever:
void loop() {
  // int buttonState = digitalRead(pushButton);
  Serial.println("abcdefghijklmnopqrstuvwxyz");
  delay(1000);        // delay in between reads for stability
}


