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

## 3. Technologie-Stack

    Frontend / Client: React (oder Vue.js) als Progressive Web App (PWA). Ermöglicht flüssiges UI, schnelle Klickzeiten und läuft im Safari-Browser des iPhones.

    Backend / Server: Node.js mit Express.js. Ist leichtgewichtig, perfekt für schnelle API-Requests und einfach auf einem lokalen Server zu betreiben.

    Datenbank: SQLite oder PostgreSQL. (Für ein dreitägiges Fest reicht SQLite oft völlig aus, PostgreSQL ist robuster für Logs).

    Drucker-Ansteuerung: Kommunikation über das ESC/POS-Protokoll via TCP/IP direkt aus dem Node.js Backend.

## 4. Datenmodell & Datenspeicherung

    Entity-Relationship-Aufbau:

        Users (Kellner: ID, Name, PIN/Passwort)

        Orders (Bestellungen: ID, Tisch_Nr, Kellner_ID, Timestamp, Status)

        Order_Items (Positionen: Order_ID, Produkt_ID, Menge)

        Products (Speisenkarte: ID, Name, Kategorie, Preis)

    Datenspeicherung: Alle Logs (Wer hat wann welchen Tisch bedient) werden persistent in der relationalen Datenbank gespeichert.

## 5. Schnittstellen & APIs

    API-Architektur: REST-API.

    Interne Endpunkte (Beispiele):

        POST /api/orders (Sendet die fertige Bestellung vom Handy an den Server).

        GET /api/products (Lädt die Speisekarte beim Login).

    Payload-Beispiel (POST /api/orders):
    JSON

    {
      "waiterId": "12",
      "tableNumber": "42",
      "items": [
        { "productId": "101", "quantity": 2 },
        { "productId": "205", "quantity": 1 }
      ]
    }

## 6. Technische Umsetzung der Nicht-funktionalen Anforderungen

    Performance (Effizienz):

        Klickzeit unter 0.5s: Das Frontend wird als Single Page Application (SPA) mit React umgesetzt. Die Speisekarte wird beim ersten Laden lokal im Browser (LocalStorage/State) gecacht. Klicks auf "Hinzufügen" passieren rein lokal ohne Server-Verzögerung.

        Druck in unter 5s: Das Backend nutzt eine asynchrone Queue. Sobald der Request ankommt, wird der Druckbefehl via TCP/IP direkt an die IP-Adresse des Küchendruckers gesendet.

    Zuverlässigkeit (Stresstest):

        10 gleichzeitige Nutzer: Node.js ist durch seine asynchrone Architektur (Event Loop) problemlos in der Lage, Hunderte gleichzeitige Requests zu verarbeiten. 10 Kellner sind für den Server keine Last. Der Stresstest kann z.B. mit dem Tool Artillery oder Postman automatisiert durchgeführt werden.

    Sicherheit:

        Netzwerksicherheit: Das Fest-WLAN nutzt WPA3-Verschlüsselung und ist versteckt (Hidden SSID). Die Handys der Kellner und der Server befinden sich in einem isolierten VLAN ohne Internetzugriff von außen.

        Verbindungsverschlüsselung: Der Server nutzt HTTPS-Zertifikate (z. B. selbstsigniert für das lokale Netz), sodass die Daten vom iPhone zum Server verschlüsselt (TLS) sind.

        Authentifizierung: Kellner müssen sich beim Start der App mit einem PIN/Passwort einloggen und erhalten einen JSON Web Token (JWT) für die Sitzung. Der Drucker selbst akzeptiert über eine IP-Whitelist nur Druckaufträge von der statischen IP-Adresse des Node.js-Servers.
