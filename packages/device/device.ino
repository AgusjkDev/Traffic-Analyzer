#define TRIG_PIN 16
#define ECHO_PIN 17
#define MIC_PIN 36

#define MAX_DISTANCE 500

int get_ultrasonic_distance(void) {
    digitalWrite(TRIG_PIN, LOW);
    delayMicroseconds(2);
    digitalWrite(TRIG_PIN, HIGH);
    delayMicroseconds(10);
    digitalWrite(TRIG_PIN, LOW);

    long duration = pulseIn(ECHO_PIN, HIGH);
    int distance = duration * 0.034 / 2;

    return distance > MAX_DISTANCE ? -1 : distance;
}

int get_mic_voltage(void) {
    int mic_voltage = analogRead(MIC_PIN);

    return mic_voltage;
}

void setup() {
    Serial.begin(9600);

    pinMode(TRIG_PIN, OUTPUT);
    pinMode(ECHO_PIN, INPUT);
    pinMode(MIC_PIN, INPUT);
}

void loop() {
    int distance = get_ultrasonic_distance();
    Serial.printf("Distance: %d cm\n", distance);

    /* TODO:
    Investigar sobre subirle la ganancia al micrófono.
    Por ahora siempre devuelve el mismo valor entre 1300-1400.

    int mic_voltage = get_mic_voltage();
    Serial.printf("MIC Voltage: %d\n", mic_voltage);
    */

    delay(500);
}
