# 🛠️ Solution Design Document (SDD) – Digitale Bestell-App
## 1. Einleitung & Technischer Kontext

    Referenz zum Product Goal: Die Anforderungen an UI/UX, Infrastruktur und die funktionalen Ziele sind im Dokument product-goal.md definiert.

    Technischer Scope: Entwicklung einer mobilen Web-Applikation für Kellner zur Bestellaufnahme, Implementierung eines Backend-Servers zur Log-Verwaltung und Bestellweiterleitung sowie die Ansteuerung eines Bondruckers in der Küche.

## 2. High-Level Systemarchitektur

    Architektur-Muster: Client-Server-Architektur (Mobile Client -> lokaler Server -> Netzwerkdrucker). Da es sich um ein Fest handelt, läuft das System idealerweise in einem autarken, lokalen WLAN-Netzwerk (Local Area Network), um Ausfälle durch schlechtes Handynetz (Edge/LTE) zu vermeiden.

    Komponenten:

        Client: Smartphone (iPhone 12) der Kellner.

        Server: Ein lokaler Rechner (z. B. Raspberry Pi 4 oder Mini-PC), der das Backend und die Datenbank hostet.

        Drucker: Ein LAN-fähiger Thermobondrucker in der Küche.

## 2. Technologie-Stack

### 2.1 Mobile App (Frontend)
* **Framework:** Swift (SwiftUI) für eine native iOS-App ODER Flutter (Dart) für plattformübergreifende Entwicklung. *(Entscheidung je nach Vorwissen im Team)*
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

## 3. Datenmodell (Auszug)

* **User:** `id` (PK), `name` (Kellner-Name), `pin_hash` (Authentifizierung).
* **Product:** `id` (PK), `name`, `price`, `category`.
* **Order:** `id` (PK), `user_id` (FK), `table_number` (erfasst durch QR-Code), `status`, `timestamp`.
* **OrderItem:** `id` (PK), `order_id` (FK), `product_id` (FK), `quantity`.

## 4. Schnittstellen (REST-API)

Kommunikation zwischen App und Backend erfolgt via JSON über HTTPS (lokales, selbstsigniertes Zertifikat).

* `POST /api/auth/login`: Verifiziert den Kellner-PIN und sendet einen JWT (JSON Web Token) zurück.
* `GET /api/products`: Lädt beim App-Start die aktuelle Speisekarte (wird in der App gecacht).
* `POST /api/orders`: Übermittelt eine neue Bestellung vom Tisch.
    * *Payload:* `{ "table": "12", "items": [{"id": 1, "qty": 2}, {"id": 4, "qty": 1}] }`

## 5. Technische Umsetzung der Nicht-funktionalen Anforderungen

    Performance (Effizienz):

        Klickzeit unter 0.5s: Das Frontend wird als Single Page Application (SPA) mit React umgesetzt. Die Speisekarte wird beim ersten Laden lokal im Browser (LocalStorage/State) gecacht. Klicks auf "Hinzufügen" passieren rein lokal ohne Server-Verzögerung.

        Druck in unter 5s: Das Backend nutzt eine asynchrone Queue. Sobald der Request ankommt, wird der Druckbefehl via TCP/IP direkt an die IP-Adresse des Küchendruckers gesendet.

    Zuverlässigkeit (Stresstest):

        10 gleichzeitige Nutzer: Node.js ist durch seine asynchrone Architektur (Event Loop) problemlos in der Lage, Hunderte gleichzeitige Requests zu verarbeiten. 10 Kellner sind für den Server keine Last. Der Stresstest kann z.B. mit dem Tool Artillery oder Postman automatisiert durchgeführt werden.

    Sicherheit:

        Netzwerksicherheit: Das Fest-WLAN nutzt WPA3-Verschlüsselung und ist versteckt (Hidden SSID). Die Handys der Kellner und der Server befinden sich in einem isolierten VLAN ohne Internetzugriff von außen.

        Verbindungsverschlüsselung: Der Server nutzt HTTPS-Zertifikate (z. B. selbstsigniert für das lokale Netz), sodass die Daten vom iPhone zum Server verschlüsselt (TLS) sind.

        Authentifizierung: Kellner müssen sich beim Start der App mit einem PIN/Passwort einloggen und erhalten einen JSON Web Token (JWT) für die Sitzung. Der Drucker selbst akzeptiert über eine IP-Whitelist nur Druckaufträge von der statischen IP-Adresse des Node.js-Servers.