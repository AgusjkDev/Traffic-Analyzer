#include <WiFi.h>
#include <HTTPClient.h>
#include <ArduinoJson.h>

#include "secrets.h"

#define TRIG_PIN 16
#define ECHO_PIN 17
#define MIC_PIN 36

#define MAX_DISTANCE 500    // cm
#define DEFAULT_INTERVAL 5  // minutes

HTTPClient httpClient;
DynamicJsonDocument device(1024);

void initWifi(void) {
  Serial.println("Establishing WiFi connection...");
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);

  while (WiFi.status() != WL_CONNECTED) { delay(100); }

  Serial.println("WiFi connection established.");
}

int getDeviceData(DynamicJsonDocument& device) {
  httpClient.begin(SUPABASE_URL + "/rest/v1/devices?select=*&id=eq." + DEVICE_ID);
  httpClient.addHeader("Authorization", "Bearer " + SUPABASE_TOKEN);
  httpClient.addHeader("apikey", SUPABASE_TOKEN);
  httpClient.addHeader("Accept", "application/vnd.pgrst.object+json");

  int statusCode = httpClient.GET();
  String jsonString = httpClient.getString();
  httpClient.end();

  if (statusCode != 200) return 1;

  DeserializationError error = deserializeJson(device, jsonString);

  return error ? 1 : 0;
}

int sendTrafficReport(int recognitions) {
  httpClient.begin(SUPABASE_URL + "/rest/v1/traffic");
  httpClient.addHeader("Authorization", "Bearer " + SUPABASE_TOKEN);
  httpClient.addHeader("apikey", SUPABASE_TOKEN);
  httpClient.addHeader("Content-Type", "application/json");

  String jsonString = "{\"device_id\":\"" + DEVICE_ID + "\",\"street_id\":\"" + device["street_id"].as<String>() + "\",\"recognitions\":" + recognitions + ",\"interval\":" + device["interval"].as<int>() + ",\"street_number\":" + device["street_number"].as<int>() + "}";
  Serial.println(jsonString);

  int statusCode = httpClient.POST(jsonString);
  Serial.println(statusCode);
  Serial.println(httpClient.getString());
  httpClient.end();

  return statusCode == 201 ? 0 : 1;
}

int getUltrasonicDistance(void) {
  digitalWrite(TRIG_PIN, LOW);
  delayMicroseconds(2);
  digitalWrite(TRIG_PIN, HIGH);
  delayMicroseconds(10);
  digitalWrite(TRIG_PIN, LOW);

  long duration = pulseIn(ECHO_PIN, HIGH);
  int distance = duration * 0.034 / 2;

  return distance > MAX_DISTANCE ? -1 : distance;
}

int getMicVoltage(void) {
  int micVoltage = analogRead(MIC_PIN);

  return micVoltage;
}

int recognition_loop() {
  int recognitions = 0;

  unsigned long startTime = millis();
  int waitTime = device["interval"].as<int>() * 60000;  // millis = minutes * 60000
  while (millis() - startTime < waitTime) {
    int distance = getUltrasonicDistance();
    Serial.printf("Distance: %d cm\n", distance);

    /* TODO:
    Investigar sobre subirle la ganancia al micrófono.
    Por ahora siempre devuelve el mismo valor entre 1300-1400.

    int micVoltage = getMicVoltage();
    Serial.printf("MIC Voltage: %d\n", micVoltage);
    */

    // TODO: Profundizar algoritmo de reconocimiento.
    const int CALIBRATED_MAX_RANGE = 200;
    if (distance > 50 && distance <= CALIBRATED_MAX_RANGE) {
      Serial.println("Traffic recognized!");
      recognitions++;
    }

    delay(1000);
  }

  return recognitions;
}

void setup() {
  Serial.begin(9600);

  pinMode(TRIG_PIN, OUTPUT);
  pinMode(ECHO_PIN, INPUT);
  pinMode(MIC_PIN, INPUT);
  initWifi();

  // TODO: Iniciar calibración de distancia y sonido ambiente.
}

void loop() {
  // TODO: Implementar acciones (PAUSE, RESUME, ???).

  while (1) {
    Serial.println("Getting device data...");
    int error = getDeviceData(device);
    if (!error) break;

    Serial.println("There was an error trying to get the device data, trying again soon!");
    delay(30000);
  }

  int recognitions = recognition_loop();
  Serial.printf("Recognized traffic: %d\n", recognitions);

  while (1) {
    Serial.println("Sending traffic report...");
    int error = sendTrafficReport(recognitions);
    if (!error) break;

    Serial.println("There was an error trying to send the traffic report, trying again soon!");
    delay(15000);
  }
  Serial.println("-----------------------");
}
