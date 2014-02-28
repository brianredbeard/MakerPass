#include <Wiegand.h>

WIEGAND reader;

void setup() {
	Serial.begin(9600);  
	reader.begin();
}

void loop() {
	if(reader.available())
	{
		Serial.print("Wiegand HEX = ");
		Serial.print(reader.getCode(),HEX);
		Serial.print(", DECIMAL = ");
		Serial.print(reader.getCode());
		Serial.print(", Type W");
		Serial.println(reader.getWiegandType());    
	}
}