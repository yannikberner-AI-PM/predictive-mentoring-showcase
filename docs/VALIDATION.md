# Lokale Validierung

## Eigenständiges Showcase

Node.js **v26.7.0**, Python **3.9.6**, macOS. Mindestziel für die Node-Tests ist 22.18; diese Mindestversion wurde nicht separat ausgeführt. Die Showcase-Prüfung benötigt keine Installation, Konten oder Zugangsdaten:

```bash
npm test
npm run validate
# Optional: ausschließlich lesender Vergleich mit dem privaten Projektstamm
python3 scripts/validate.py --source ../predictive-app

git diff --check
```

- **17 Tests:** 15 Tests der kuratierten Originalfunktionen sowie zwei Screenshot-/Dokumentationschecks. Keine Aussage zur gesamten App-Qualität.
- Exaktes Allowlist-Inventar und SHA-256-Manifest aller Nutzdateien außer dem Manifest selbst. `.git/` gehört nicht zum öffentlichen Inventar.
- Sieben unverändert übernommene Dateien (sechs TypeScript-Dateien, ein Icon); 26 zusätzliche Analyse-Fingerprints in [PROVENANCE.json](PROVENANCE.json).
- Drei echte App-Aufnahmen, Dateihashes, Dimensionen und komprimierte Bilddaten gegen [SCREENSHOTS.json](SCREENSHOTS.json). Nur PNG-Chunks `IHDR`, `IDAT`, `IEND`; keine EXIF-/Textmetadaten. Das Manifest dokumentiert zusätzlich 16 Quell-Fingerprints des ausgeführten Ausschnitts.
- Lokale Markdown-Dateiverweise und begrenzter Mustercheck für Schlüssel, ausgewählte Tokenformen und absolute Benutzerpfade. Kein vollständiger Security-Audit.

## Tatsächlich ausgeführter Simulator-Pfad · 26. Oktober 2026

**iPhone 17 Pro · iOS 26.5 · Expo Go 57.0.9 · Expo 57.0.16 · React Native 0.86.2.** Kein Web-Rendering, kein signierter eigener App-Build, kein physisches Gerät.

1. Den committed App-Quellstand ohne private Git-Historie in eine Scratch-Kopie archiviert. Keine dotenv-Dateien, persönlichen App-Zustände, Zugangsdaten oder Datenbanken übernommen. Die bestehenden Änderungen im privaten Projekt blieben unangetastet.
2. Einen neuen, ausschließlich hierfür angelegten Simulator mit frischem Expo-Go-App-Container verwendet. Ohne Supabase-Konfiguration und mit `EXPO_NO_DOTENV=1` gestartet. Nur den vorhandenen lokalen Development-Session-Pfad genutzt, kein externes Konto und keine echte Anmeldung.
3. Eine temporäre Scratch-Initialisierung legte über die vorhandenen App-Funktionen zwei synthetische Ziele und 14 erfundene Logs an und markierte das Onboarding als abgeschlossen. Danach Initialisierung entfernt, sämtliche getrackten App-Dateien byteweise mit dem archivierten Original verglichen und die App vollständig neu gestartet. **Keine UI- oder Berechnungsänderung für die Aufnahmen.**
4. Über die echte App-Oberfläche: Zielübersicht → Bewegungsziel → „Heute eintragen“ → synthetische Notiz → „Eintrag speichern“. Der Schnelleintrag-Screenshot entstand vor dem Speichern.
5. Den tatsächlich gespeicherten Datensatz ausschließlich im neuen Simulator-Container lesend nachgewiesen: Workout mit Wert 1, exakte synthetische Notiz, mit dem vorgesehenen Ziel verknüpft. Danach 10 Workouts und 5 Habit-Logs bei zwei Zielen. Der Gesundheitswert wechselte von 62 % auf 66 %, Wachstum blieb bei 43 %.
6. Die aktualisierte Übersicht aufgenommen und das Vorschlagsdetail geöffnet. Die App zeigte ausdrücklich „On-device KI nicht verfügbar“; der lokale deterministische Helfer war aktiv. Das öffnet keine Aussage über Apple Intelligence oder Gemini Nano.
7. Alle drei Bilder assistentengestützt visuell geprüft: lesbar, keine persönlichen Daten, keine Fehler-/Entwickler-Overlays, keine Tastatur. Die Vorschlagsvorschau wird vom Original-UI auf drei Zeilen gekürzt. Statusleiste über Simulator-Funktion auf 09:41 / volle Batterie gesetzt; Expo-Go-Entwicklerbutton per Client-Präferenz ausgeschaltet. Nur Metadaten entfernt, kein Zuschnitt, keine Pixelretusche, keine Montage.

### App-Repository-Gates in der isolierten Kopie

- `npm run typecheck`: **Exit 0**.
- `npm test`: **78/78 Tests**, 25 Suites, keine übersprungenen Tests; **Exit 0**.
- `npm run doctor`: **Exit 1**, 20/21 Checks; 11 Patchversionsabweichungen. Kein Native-/Release-Pass.
- `npm run audit:critical`: **Exit 1**; 15 gemeldete Abhängigkeitsschwachstellen (3 moderate, 11 hohe, 1 kritische). Kritisch: `shell-quote`, [GHSA-pqg4-j6r4-53mv](https://github.com/advisories/GHSA-pqg4-j6r4-53mv). Keine Behebung im privaten Projekt im Rahmen dieser Screenshot-Aufgabe. Der öffentliche Showcase fügt keine App-Runtime-Abhängigkeiten hinzu.

Beim Aufsetzen traten eine auf IPv6 begrenzte Metro-Verbindung sowie Fehler während temporärer Entry-Point-/Fast-Refresh-Änderungen auf (`main`/`ExpoAsset`). Nach Wiederherstellung des Originals und vollständigem Beenden/Neustarten von Expo Go lief der dokumentierte Pfad; diese Anlauffehler sind keine verschwiegenen bestandenen Checks. Neue Fehler nach dem finalen Neustart wurden im Metro-Log nicht beobachtet. Wegen fehlender Simulator.app-Oberfläche wurde die native UI über XCTest mit `agent-device` bedient; die Bilder stammen von `simctl io screenshot`, nicht aus nachgebautem HTML.

## Grenzen und Veröffentlichungsumfang

Kein vollständiger App-End-to-End-Test: Onboarding, externe Authentifizierung, Kontowechsel, Export/Löschung, Sensoren, Push und Android wurden in dieser Runde nicht durchlaufen. Kein laufendes OS-Modell, keine signierte eigene App, keine Store-/Compliance-Freigabe. Die frische SQLite-Initialisierung lief im Simulator, nicht eine Upgrade-Migrationsmatrix. Keine Prognosekalibrierung, Wirkungsmessung, unabhängige Human-Evaluation oder Penetrationsprüfung.

Veröffentlicht werden ausschließlich die freigegebenen Showcase-Dateien auf `feat/product-screenshots` beziehungsweise dem daraus fast-forward aktualisierten öffentlichen `main`. Der vollständige Produktcode, seine Historie, Konfiguration, Sessions und die synthetische Laufzeitdatenbank bleiben außerhalb des Showcase. Die Eigentümerfreigabe für Implementierung und Veröffentlichung liegt für diese Aufgabe vor. Ein App-Release bleibt insbesondere wegen der fehlgeschlagenen Dependency-/Doctor-Gates ausdrücklich **nicht freigegeben**.
