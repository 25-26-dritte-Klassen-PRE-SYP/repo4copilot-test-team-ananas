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
<img width="539" height="491" alt="soll-ucd" src="https://github.com/user-attachments/assets/93d5bcc1-5479-4fe9-a568-dc38acda56f7" />

### DFD
<img width="879" height="829" alt="soll-dfd" src="https://github.com/user-attachments/assets/c66b1257-838f-465b-8071-d35c58f0bd12" />

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
<img width="2160" height="3055" alt="wireframe-1" src="https://github.com/user-attachments/assets/ff67386a-199a-4429-add6-c12cb7bbeab9" />

<img width="2160" height="3055" alt="wireframe-2" src="https://github.com/user-attachments/assets/ed74830a-2cc5-4f21-ac05-9972df965336" />

<img width="2160" height="3055" alt="wireframe-3" src="https://github.com/user-attachments/assets/a6c1482d-4fa7-4037-a37d-f78e046d4d08" />

<img width="2160" height="3055" alt="wireframe-4" src="https://github.com/user-attachments/assets/56be6445-7b1a-41e6-856b-962ae562dc02" />


