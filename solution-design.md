# Solution Design Document (SDD)

## 1. Systemarchitektur & Infrastruktur

Das System läuft autark in einem geschlossenen, lokalen Netzwerk (LAN/WLAN) am Veranstaltungsort, um unabhängig von der Mobilfunkabdeckung (LTE/5G) zu sein.

* **Netzwerk:** Dedizierter lokaler WLAN-Router (z.B. Ubiquiti UniFi oder robuster ASUS-Router) mit WPA3-Verschlüsselung. SSID ist versteckt.
* **Server-Hardware:** Ein lokaler Mini-PC oder Raspberry Pi 4 (per LAN-Kabel am Router), der das Backend und die Datenbank hostet.
* **Client-Hardware:** iPhones 12 der Kellner (per WLAN verbunden).
* **Drucker:** LAN-fähiger Thermobondrucker in der Küche (per LAN-Kabel am Router).

## 2. Technologie-Stack

### 2.1 Mobile App (Frontend)
* **Framework:** Flutter (Dart) für plattformübergreifende Entwicklung. *(Entscheidung je nach Vorwissen im Team)*
* **QR-Scanning:** Nutzung der nativen iOS-Kamera-APIs (`AVFoundation` bei Swift oder `mobile_scanner` Package bei Flutter).
* **HTTP-Client:** `Alamofire` (Swift) oder `http`-Package (Flutter) für REST-Requests ans Backend.
* **Deployment:** Installation auf den Geräten des Kunden via Apple TestFlight oder Ad-Hoc Provisioning.

### 2.2 Backend (Server)
* **Laufzeitumgebung & Framework:** Node.js mit Express.js.
* **Drucker-Ansteuerung:** Bibliothek `node-thermal-printer`, Kommunikation direkt über das `ESC/POS`-Protokoll via TCP/IP.
* **Protokollierung (Logs):** Winston oder Morgan (Node.js Logger).

### 2.3 Datenbank
* **Technologie:** PostgreSQL (robust, relational, perfekt für das Mitloggen von Transaktionen).
* **ORM (Object-Relational Mapping):** Prisma ORM oder Sequelize für die typsichere Kommunikation zwischen Node.js und der Datenbank.

## 3. Technische Umsetzung der Nicht-funktionalen Anforderungen

### 3.1 Effizienz (< 0.5s Klick, < 5s Druck)
* **UI-Reaktion:** Die Speisekarte wird nach dem Login lokal auf dem iPhone im Memory/Speicher gehalten (State Management). Das Hinzufügen von Artikeln zum Warenkorb erfordert **keinen** Netzwerk-Request, wodurch Klicks verzögerungsfrei (<< 0.5s) verarbeitet werden.
* **Druck-Geschwindigkeit:** Der Request zum Senden der Bestellung (`POST /api/orders`) triggert im Node.js Backend sofort asynchron den TCP-Socket zum Drucker, bevor der Datenbank-Eintrag final bestätigt wird. Das umgeht Latenzen und garantiert einen Druck weit unter der 5-Sekunden-Grenze.

### 3.2 Zuverlässigkeit (Stresstest, 10 Nutzer, 30 Min)
* **Concurrency:** Node.js nutzt eine asynchrone, non-blocking I/O-Architektur. 10 gleichzeitige Nutzer erzeugen vernachlässigbare Last. 
* **Verifizierung:** Die Anforderung wird am Ende des Projekts durch das Tool `Artillery.io` oder `Postman Collection Runner` nachgewiesen, indem 10 virtuelle User-Sessions simuliert werden, die 30 Minuten lang kontinuierlich Bestellungen an die API feuern.

### 3.3 Sicherheit (Verschlüsselung & Auth)
* **Verbindung:** Die Kommunikation im LAN erfolgt streng über **HTTPS/TLS**. Der Server nutzt ein eigenes Zertifikat, dem die iPhones vertrauen.
* **Authentifizierung (Server):** Jeder Request der App muss im HTTP-Header einen gültigen **JWT (JSON Web Token)** mitsenden. Dieser Token identifiziert den Kellner manipulationssicher für die Logs.
* **Authentifizierung (Drucker):** Der Netzwerkdrucker wird per IP/MAC-Filter (im Router) so konfiguriert, dass er TCP-Pakete auf Port 9100 ausschließlich von der statischen IP-Adresse des Node.js-Servers annimmt. Direkte Verbindungen von den Handys zum Drucker werden netzwerkseitig blockiert.
