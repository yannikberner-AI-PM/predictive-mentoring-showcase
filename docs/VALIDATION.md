# Lokale Validierung

## Ausgeführter Umfang

Die Vorbereitung wurde mit Node.js **v26.7.0** und Python **3.9.6** auf macOS lokal geprüft. Mindestziel für die eigenständigen Node-Tests ist Node.js 22.18; ein separater Lauf mit dieser Mindestversion wurde nicht durchgeführt. Keine externen Pakete installiert, kein Konto verwendet und kein Modell heruntergeladen.

```bash
npm test
npm run validate
# Optional: Quell-Fingerprints gegen den privaten Projektstamm prüfen
python3 scripts/validate.py --source ../predictive-app
# Alle Dateien sind zunächst untracked: Whitespace-Prüfung ohne Staging
 git diff --no-index --check -- /dev/null README.md
```

Der letzte Befehl illustriert die Prüfung einer Datei; bei der Vorbereitung wurden alle textuellen Nutzdateien so geprüft. Ein gewöhnliches `git diff --check` allein würde untracked Dateien nicht erfassen.

## Ergebnisse

- **15 Tests bestanden**, 0 fehlgeschlagen, 0 übersprungen: Apple-/Android-Routing, fehlende Verfügbarkeit, erzwungener lokaler Helfer, Vorlage und Cold Start, Trends, Schwellen, nicht-endliche Eingaben, Chat-Kürzung, Kategorien und Kontozuordnung.
- Sechs Original-TypeScript-Dateien und ein vorhandenes App-Icon unverändert kopiert; SHA-256-Prüfung der sieben übernommenen Dateien. Weitere 26 Quell-Fingerprints dokumentieren die Analysebelege, ohne deren Inhalte zu veröffentlichen.
- Exakte Dateiliste, Dateimanifest und lokale Markdown-Dateiverweise werden durch `scripts/validate.py` geprüft. Das Manifest enthält alle Nutzdateien außer sich selbst; `.git/` gehört nicht zum öffentlichen Inventar.
- Das Icon wurde visuell geprüft: abstrakte farbige Form ohne Text oder sichtbare Personendaten. PNG-Chunks ausschließlich `IHDR`, `IDAT`, `IEND`; keine Text-/EXIF-Chunks. Unverändertes Asset, kein Beweis für eine gerenderte App oder für geklärte Markenrechte.
- Begrenzter Mustercheck für private Schlüssel, ausgewählte Tokenformen und absolute Benutzerpfade. Keine Garantie vollständiger Geheimnisfreiheit oder rechtlicher Freigabe.
- Eigenständiges neues Git-Repository auf `docs/initial-showcase`; keine Commits, kein Remote und keine Veröffentlichung. Die private Quellhistorie wurde nicht kopiert.

## Bewusst nicht geprüft

Kein React-Native-/Expo-Build, keine Emulator-/Geräteprüfung, kein laufendes OS-Modell, kein App-End-to-End-Test, kein Auth-Integrationstest, keine Datenbankmigration unter Laufzeitbedingungen, kein Dependency-/Penetrationstest und keine Wirkungsmessung. Die Prozentwerte und `confidence`-Labels wurden hier nicht kalibriert oder wissenschaftlich validiert.

Vor einer Veröffentlichung sind Eigentümerfreigabe der Texte, Auszüge und Assets sowie ein privater Sicherheitskontakt offen. Für einen App-Release sind zusätzliche Integrations-, Datenschutz- und fachliche Prüfungen erforderlich.
