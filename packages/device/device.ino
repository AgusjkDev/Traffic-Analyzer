#include <LittleFS.h>
#include <ArduinoJson.h>
#include <WiFi.h>
#include <HTTPClient.h>
#include <ESPAsyncWebSrv.h>

#include "secrets.h"

#define TRIG_PIN 16
#define ECHO_PIN 17
#define MIC_PIN 36

#define WIFI_TIMEOUT 5000  // ms

#define AP_SSID "Traffic Analyzer"
#define AP_PASSWORD "12345678"

#define RESTART_DELAY 5000  // ms

String deviceId;
HTTPClient httpClient;
AsyncWebServer server(80);

void fsInit() {
  /* Inicializar LittleFS normalmente. Si falla,
  intentar hacerlo con autoformateo */
  if (LittleFS.begin()) {
    Serial.println("Filesystem successfully initialized.");
    return;
  };

  if (LittleFS.begin(true)) {
    Serial.println("Filesystem successfully initialized with autoformat.");
    return;
  };

  Serial.println("Coulnd not initialize the filesystem.");
}

bool wifiConnect(String ssid, String password) {
  Serial.printf("Establishing WiFi connection to '%s'...\n", ssid.c_str());

  WiFi.begin(ssid, password);

  unsigned long startTime = millis();
  while (millis() - startTime < WIFI_TIMEOUT) {
    if (WiFi.status() == WL_CONNECTED) {
      Serial.println("WiFi connection established.");
      return true;
    };

    delay(100);
  }

  Serial.println("Could not establish WiFi connection.");
  return false;
}

void wifiInit() {
  Serial.println("Initializing WiFi connection...");

  File file = LittleFS.open("/wifi.json");
  if (!file) {
    Serial.println("There were no saved WiFi credentials.");
    return;
  }

  DynamicJsonDocument doc(512);
  DeserializationError error = deserializeJson(doc, file);
  file.close();
  if (error) {
    Serial.println("There was an error trying to deserialize the WiFi credentials.");
    return;
  }

  wifiConnect(doc["ssid"].as<String>(), doc["password"].as<String>());
}

bool wifiSave(String ssid, String password) {
  Serial.println("Saving WiFi credentials...");

  File file = LittleFS.open("/wifi.json", "w+");
  if (!file) {
    Serial.println("There was an error trying open the WiFi credentials file.");
    return false;
  }

  DynamicJsonDocument doc(512);
  doc["ssid"] = ssid;
  doc["password"] = password;
  bool dumped = serializeJson(doc, file);
  if (dumped) {
    Serial.println("WiFi credentials saved successfully.");
  } else {
    Serial.println("There was an error trying to save the WiFi credentials.");
  }

  file.close();
  return dumped;
}

void apiRequest(String endpoint, String *response, String method = "GET", String payload = "{}") {
  if (method != "GET" && method != "POST") {
    Serial.printf("HTTP method '%s' was not implemented.\n", method);
    return;
  }

  httpClient.begin(SUPABASE_URL + endpoint);
  httpClient.addHeader("Authorization", "Bearer " + SUPABASE_TOKEN);
  httpClient.addHeader("apikey", SUPABASE_TOKEN);

  int statusCode;
  if (method == "GET") {
    statusCode = httpClient.GET();
  } else if (method == "POST") {
    httpClient.addHeader("Content-Type", "application/json");
    statusCode = httpClient.POST(payload);
  }

  if (statusCode == 200 || statusCode == 201) {
    *response = httpClient.getString();
  }
  httpClient.end();
}

bool saveDeviceId() {
  Serial.println("Saving device id...");

  File file = LittleFS.open("/deviceId.txt", "w+");
  if (!file) {
    Serial.println("There was an error trying open the device id file.");
    return false;
  }

  file.print(deviceId);
  file.close();

  return true;
}

void getDeviceId() {
  Serial.println("Getting device id...");

  File file = LittleFS.open("/deviceId.txt");
  if (file) {
    deviceId = file.readStringUntil('\n');
    file.close();

    Serial.printf("Device id: '%s'.\n", deviceId.c_str());
    return;
  }

  if (WiFi.status() != WL_CONNECTED) {
    Serial.println("Unable to get the device id.");
    return;
  }

  Serial.println("Generating new device id...");
  apiRequest("/rest/v1/rpc/insert_device_and_return_id", &deviceId, "POST");

  if (!deviceId) {
    Serial.println("There was an error trying to generate the device id.");
    return;
  }

  Serial.printf("Device id: '%s'.\n", deviceId.c_str());

  bool saved = saveDeviceId();
  if (saved) {
    Serial.println("Device id saved successfully.");
    return;
  }

  /* Error fatal ya que no se pudo guardar el id del dispositivo.
  Se reinicia el dispositivo completamente */
  Serial.println("There was a fatal error trying to save the device id.");
  Serial.printf("Restarting device in %dms...\n", RESTART_DELAY);
  delay(RESTART_DELAY);
  ESP.restart();
}

void handleServerRootRoute(AsyncWebServerRequest *request) {
  Serial.printf("[WebServer]: GET / @%s\n", request->client()->remoteIP().toString().c_str());

  String rootHTML = R"(
        <!DOCTYPE html>
        <html>
            <head>
                <meta charset="utf-8" />
                <title>Traffic Analyzer</title>
            </head>
            <body>
                <h1>Traffic Analyzer</h1>
    )";
  rootHTML += "<span>deviceId: '" + deviceId + "'</span>";
  rootHTML += R"(
                <form action="/wifi" method="POST">
                    <input type="text" value="RioTel_ARNOLDI" name="ssid" placeholder="SSID" />
                    <input type="password" value="2267937079" name="password" placeholder="Password" />
                    <button>Enviar</button>
                </form>
            </body>
        </html>
    )";

  request->send(200, "text/html", rootHTML);
}

void handleServerWifiRoute(AsyncWebServerRequest *request) {
  Serial.printf("[WebServer]: POST /wifi @%s\n", request->client()->remoteIP().toString().c_str());

  if (!request->hasParam("ssid", true) || !request->hasParam("password", true)) {
    return request->send(400, "text/plain", "Invalid request.");
  }

  String ssid = request->getParam("ssid", true)->value();
  String password = request->getParam("password", true)->value();

  bool connected = wifiConnect(ssid, password);
  if (!connected) {
    return request->send(401, "text/plain", "Invalid WiFi credentials.");
  }

  bool saved = wifiSave(ssid, password);
  if (!saved) {
    return request->send(500, "text/plain", "There was an internal server error trying to save the WiFi credentials.");
  }

  request->send(200, "text/plain", "WiFi successfully connected and saved.");
}

void setup() {
  Serial.begin(115200);

  // Inicializar los pines de los componentes físicos
  pinMode(TRIG_PIN, OUTPUT);
  pinMode(ECHO_PIN, INPUT);
  pinMode(MIC_PIN, INPUT);

  // Inicializar sistema de archivos
  fsInit();

  // Inicializar WiFi desde el archivo guardado
  wifiInit();

  // Obtener el id del dispositivo
  getDeviceId();

  // Inicializar punto de acceso y servidor web
  WiFi.softAP(AP_SSID, AP_PASSWORD);
  server.on("/", HTTP_GET, handleServerRootRoute);
  server.on("/wifi", HTTP_POST, handleServerWifiRoute);
  server.begin();

  // TODO: Iniciar calibración de distancia y sonido ambiente
}

void loop() {
  // Esperar hasta que tenga conexión WiFi
  if (WiFi.status() != WL_CONNECTED) {
    delay(100);
    return;
  }

  // Si no tengo la id del dispositivo, la obtengo
  if (deviceId.isEmpty()) {
    getDeviceId();
    return;
  }

  // TODO: Obtener información del dispositivo cada X segundos hasta que esté configurado por el usuario
  
  // TODO: Bucle de reconocimiento

  // TODO: Enviar reporte del tráfico
  
  Serial.println("Waiting for next procedure...");
  delay(10000);
}
