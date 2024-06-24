#include <WiFi.h>
#include <HTTPClient.h>
#include "DHTesp.h"
#include "time.h"

const int DHT_PIN = 15;

DHTesp dhtSensor;

const char* ssid = "Wokwi-GUEST";
const char* password = "";

const String url = "https://b94sgrsf-3000.euw.devtunnels.ms/";
const String path = "api/data/cargos/";

const int cargo_id = 1;

// Time server
const char* ntpServer = "pool.ntp.org";

unsigned long getTime() {
  time_t now;
  struct tm timeinfo;
  if (!getLocalTime(&timeinfo)) {
    Serial.println("Failed to obtain time");
    return(0);
  }
  time(&now);
  return now;
}

void newCargoStatus(float temp, float humidity) {
  Serial.print("Sending data...");

  HTTPClient http;
  http.begin(url + path + cargo_id);

  String json = "{\"status\":{";
  json += "\"temperature\":";
  json += temp;
  json += ",\"humidity\":";
  json += humidity;
  json += ",\"time\":";
  json += getTime();
  json += "}}";

  int httpResponseCode = http.PUT(json);

  Serial.print("Done.\n");

  // Serial.println(json);
}

void setup() {
  Serial.begin(115200);

  dhtSensor.setup(DHT_PIN, DHTesp::DHT22);

  //Wifi Setup
  WiFi.begin(ssid, password);

  Serial.print("Connecting to WiFi");
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

  Serial.print("OK! IP=");
  Serial.println(WiFi.localIP());

  //Setup time
  configTime(0, 0, ntpServer);
  getTime();
}

void loop() {
  //Send data
  TempAndHumidity data = dhtSensor.getTempAndHumidity();
  newCargoStatus(data.temperature, data.humidity);

  delay(5000);
}