# Sicherheits- und Datenschutzgrenzen

## Datenwege statt pauschaler Zusagen

- App-Inhalte werden im inspizierten Code lokal mit `expo-sqlite` gespeichert. Daraus folgt keine Aussage über Betriebssystem-Backups, kompromittierte Geräte oder sämtliche Drittanbieter-SDKs.
- Anmeldung verwendet Supabase sowie Apple-/Google-Anmeldepfade. Die App ist damit nicht vollständig offline oder netzwerkfrei. Die inspizierte Supabase-Konfiguration persistiert die Sitzung mit AsyncStorage; sie belegt keine spezielle Verschlüsselung von Tokens.
- Der betrachtete Sprachpfad enthält OS-Modelle und einen lokalen Helfer, keinen Cloud-LLM-Provider. Das ist eine Codepfad-Beobachtung, kein vollständiger Traffic-Audit und keine Garantie für das Verhalten von OS und Abhängigkeiten. Android-Modelldownloads können Netzwerk benötigen.
- Export und OS-Teilen sind explizite Datenabflüsse. Die empfangende Anwendung bzw. ein separat gespeicherter Export liegt außerhalb der lokalen Löschung.

## Vorhandene Schutzmechanismen und ihre Grenzen

Lokale Besitzerprüfung blockiert im App-Einstieg einen Kontokonflikt und bietet explizite Übernahme älterer unzugeordneter Daten oder Löschung. Die enthaltene reine Regel testet nur die Klassifikation dieser Zustände, nicht jede UI-/DB-Integration und nicht die Sicherheit eines Mehrbenutzersystems.

Lokale Löschfunktionen entfernen App-Datensätze und berücksichtigen interne Exportdateien. Das Anmeldekonto und separat gespeicherte Exportkopien bleiben bestehen. SQL-DELETE ist kein Nachweis forensisch sicherer Löschung; WAL-Dateien, Backups und unterbrochene Abläufe benötigen eigene Prüfung. Für anwendungsspezifische Verschlüsselung ruhender SQLite-Daten wurde im betrachteten Öffnungspfad kein Nachweis gefunden.

Freitext kann besonders sensible Ziele, Gefühle oder finanzielle Angaben enthalten. Auch lokal generierte Ausgaben können unzutreffend oder ungeeignet sein. Prompts und Parser sind keine belastbare Inhalts-/Prompt-Injection-Sicherheitsgrenze.

## Öffentliche Auswahl

Nur ausgewählte reine Originaldateien, neue Dokumentation, synthetische Tests und ein visuell geprüftes vorhandenes Icon wurden übernommen. Kein Klonen der privaten Git-Historie. Keine `.env`, Auth-/EAS-Konfiguration, Datenbanken, Exporte, Logs, interne Arbeitsanweisungen, Archive oder Testpersonen-Daten. Herkunftsangaben sind relativ zum privaten Projektstamm; keine absoluten Benutzerpfade oder Remote-Adressen.

Der lokale Validator kombiniert eine exakte Dateiliste, Hashprüfungen und begrenzte Musterprüfung. Ein bestandener Scan ist **keine Zusicherung von Geheimnisfreiheit**, kein Penetrationstest und keine Datenschutz-/Compliance-Freigabe. Personenbezogene Angaben in Tests sind ausschließlich synthetische Kennungen.

## Vor einer echten Freigabe offen

Native Geräteprüfung für beide Plattformen, beobachteter Netzwerkverkehr, Backup-/Wiederherstellungsverhalten, Sitzungsablage, Löschfehler, Kontowechsel, Exportweitergabe, Dependency-Audit und fachliche Bewertung sensibler Vorschläge. Keine DSGVO-, Sicherheits- oder wissenschaftliche Garantie aus diesem Showcase ableiten. Sicherheitsmeldungen nicht mit privaten Logs, Tokens oder Nutzerdaten in öffentliche Issues einstellen; ein privater Meldekanal ist vor Veröffentlichung festzulegen.
