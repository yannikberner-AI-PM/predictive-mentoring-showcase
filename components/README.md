# Ausgewählte Originalauszüge

Sechs vollständige TypeScript-Dateien unter `components/src/` sind byteidentische Kopien aus `apps/predictive/src/`:

| Datei | Zweck |
| --- | --- |
| `db/types.ts` | Domänentypen, keine gespeicherten Daten |
| `db/categories.ts` | Lebensbereiche und einfache Keyword-Klassifikation |
| `db/dataOwnerPolicy.ts` | Reine Besitzerzustandsregel, keine Anmeldung oder DB-Sicherheitsgrenze |
| `services/llm/types.ts` | Eingabe-/Ausgabetypen der Sprachschicht |
| `services/llm/routing.ts` | OS-Modell nur bei Verfügbarkeit, sonst lokaler Helfer |
| `services/llm/fallback.ts` | Deterministische Vorschlags-/Chat-Textvorlagen |

Die Originalkommentare und Texte wurden nicht nachträglich zu Marketingzwecken verbessert. Insbesondere sind Wörter wie „Erfolgswahrscheinlichkeit“ keine hier belegte Kalibrierung; siehe [Status](../docs/STATUS.md). Klassifikationsregeln können mehrdeutige Texte falsch einordnen. Ein lokaler Helfer ist kein Sprachmodell.

`tests/resolve-ts.mjs` ergänzt ausschließlich bei der Node-Testausführung die `.ts`-Endung für extensionlose relative Importe. Keine Originaldatei wird umgeschrieben; Nodes eingebautes Type-Stripping führt den Code aus. Test-Harness und Dokumentation sind neu, kein aus dem privaten Projekt übernommener Testlauf. Die App und native Provider sind ausdrücklich nicht enthalten.

[PROVENANCE.json](../docs/PROVENANCE.json) enthält Quellpfade und SHA-256-Hashes für alle übernommenen Dateien, das Icon und die analysierten Belege. Prüfung gegen die private Quelle ist optional lokal möglich; die eigenständigen Tests benötigen sie nicht. Alle Auszüge bleiben [proprietär](../LICENSE).
