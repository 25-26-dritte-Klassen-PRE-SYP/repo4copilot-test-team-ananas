# 1. Ist Zustand
## 1.1 Heutige Arbeitsweise
Der Kunde Hallenfest Aistersheim schreibt im Moment alle Bestellungen die gemacht werden auf Papier auf

## 1.2 Problem & Bedürfnisse
-Es ist sehr ineffizient, da das Personal zwischen den Gästen und der Küche hin und her rennen muss.

-Aufgrund des ganzen hin und her Rennens wird es auch stressig für das Personal.

-Handgeschriebene Zettel sind oft unleserlich

## 1.3 Ist-Kontext
Wir haben leider kein UCD/DFD weil wir das Projekt gewechselt haben

## 1.4 Liste Personen/Systeme
### 1.4.1 Liste Personen:

Kellner,
Gäste,
Köche,
Tablettausträger

### 1.4.2 Liste Systeme:

QR-Code Scanner,
Drucker,
Server auf dem Logs gespeichert werden


# 2. Soll Zustand
## 2.1 Ziele

- Wenn Kellner auf den Button "Drucken" drückt, soll es in unter 5 Sekunden gedruckt werden

- Kellner sollen UI nach kurzer Erklärung verstehen (Vortrag vor Kunde + ausgewählte Stakeholder, Feedback einholen)

- Drucker soll übersichtliche und verständliche Rechnung drucken (besprechen mit Kunden, wie er es will)

- Drucker soll nur Bestellungen von Handys von Kellnern annehmen können (Sicherheit: Verschlüsseltes Protokoll + Authentifizierung)

- Alle Bestellungen sollen mit dem Namen des Kellners, Tischnummer, Produkte, Uhrzeit auf dem Server mitgeloggt werden

## 2.2 Soll-Kontext

### UCD

### DFD

## 2.3. Nicht funktionale Anforderungen

### Effizienz

- Jeder Klick hat höchstens eine halbe Sekunde um ausgeführt zu werden

- Software muss auf Geräten mit mindestens 2GB RAM funktionieren

### Zuverlässigkeit

Programm soll sich bei Stresstest nicht aufhängen.

### Benutzbarkeit

Kellner sollen UI nach kurzer Erklärung verstehen (Vortrag vor Kunde + ausgewählte Stakeholder, Feedback einholen)

### Sicherheit

Server lässt nur verschlüsselte Verbindungen von Kellnern zu, Drucker lässt nur verschlüsselte Verbindungen von Servern zu


## 2.4 Erwartung-API

Es gibt keine Schnittstellen zu externen Systemen

QR-Code Scanner, Drucker, Server auf dem Logs gespeichert werden:
Diese sind alle intern

## 2.5 Wireframes

