# Implementierungsstand und Claim-Matrix

Die Einstufung basiert auf statischer Inspektion des lokalen Quellstands, nicht auf übernommenen Marketingtexten oder dem Erfolg eines nativen Builds. Fingerprints stehen in [PROVENANCE.json](PROVENANCE.json).

| Aussage | Quellbeleg relativ zum App-Verzeichnis `apps/predictive/` | Reichweite |
| --- | --- | --- |
| Vision → Meilenstein → Ziel → Handlung | `src/db/types.ts`, `src/db/goals.ts`, `src/screens/OnboardingScreen.tsx` | Typen, Speicherung und Onboardingpfad vorhanden; nicht hier als App getestet. |
| Manuelle Beobachtungen und Journal | `src/db/datapoints.ts`, `src/screens/QuickLogScreen.tsx`, `src/screens/JournalScreen.tsx` | Manuelle Datenpfade; keine automatische Sensoranbindung behauptet. |
| Lokaler On-Track-Wert | `src/services/prediction/model.ts`, `observe.ts`, `types.ts` im selben Ordner | Heuristische Funktion mit gesetzten Parametern; keine Accuracy-, Kalibrierungs- oder Wirkungsmessung. |
| OS-Modell oder lokaler Helfer | `src/services/llm/capability.ts`, `routing.ts`, `providers/onDevice.ts`, `providers/onDeviceShared.ts` | Routing implementiert; kein Laufnachweis von Apple/Gemini auf Hardware. |
| Regelbasierte Vorlagen | `src/services/llm/fallback.ts`, `src/db/categories.ts` | Enthaltene Originalfunktionen mit synthetischen Tests ausgeführt. Unveränderte Texte sind keine validierten Prognoseaussagen. |
| Generierungsfehler | `src/screens/SuggestionScreen.tsx`, `src/screens/CoachingChatScreen.tsx` | Vorschlagsvorlage vs. Chat-Wiederholhinweis; kein universeller Auto-Fallback. |
| Kontozuordnung | `src/db/dataOwnerPolicy.ts`, `src/db/dataOwner.ts`, `App.tsx` | Reine Zustandsregel getestet, keine isolierten verschlüsselten Datenbanken pro Account. |
| Export / lokale Löschung | `src/db/meta.ts`, `src/screens/ExportDataScreen.tsx`, `src/screens/DeleteDataScreen.tsx` | Quellpfade vorhanden; kein Entfernen des Auth-Kontos oder separat gespeicherter Exporte. |
| Verbindungen zu Health/Kalender | `src/screens/connectionAvailability.ts` | `canConnect: false`, „Demnächst“; nicht als verfügbar darstellen. |
| Momentum | `src/db/momentum.ts`, `src/screens/MomentumScreen.tsx` | Persistenz und Darstellung vorhanden; vollständige automatische tägliche Habit-Loop-/Push-Auswertung nicht hier nachgewiesen. |

## Nicht behauptete Ergebnisse

Keine Nutzerzahlen, Conversion-, Retention- oder Erfolgsquoten. Keine wissenschaftliche oder klinische Prüfung. Kein Nachweis einer erfolgreichen Store-Veröffentlichung, von Skalierbarkeit oder von produktivem Push-Versand. Paketversionen und Buildprofile sind keine Release-Nachweise. Keine Behauptung eigenständiger Geräte-/Human-Evaluation: Diese Auswahl wurde assistentengestützt statisch geprüft und lokal auf Funktionsebene getestet.

## Nächste sinnvolle Nachweise

1. Native Integrationsprüfung auf unterstütztem und nicht unterstütztem iOS-/Android-Gerät, inklusive Download und Fehlern nach Verfügbarkeitsprüfung.
2. App-End-to-End-Pfade für Zielanlage, Logging, Kontowechsel, Export und Löschung.
3. Zieltyp-spezifische Semantik und Eingabevalidierung vor einer Bewertung von Prognosequalität.
4. Vorab definierte, datenschutzgerecht erhobene Evaluation statt Ableitung von Nutzen aus plausiblen Prozentwerten.

Diese Schritte sind Ausblick, nicht erledigte Arbeit.
