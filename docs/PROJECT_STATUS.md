# Stan projektu OES

## Zakres weryfikacji
Migawka gałęzi `claude/project-thread-e0jil3` w repozytorium `mpmagdziarz-commits/szkolka-oes`, commit `f30ef5a7ac3501b3a0462eb5cec6b688a8fa0028`.
Data zadania według kontekstu właściciela: 2026-10-26 (Europe/Warsaw).
Źródła: pełne, nieucięte drzewo Git tego commitu, README.md, CLAUDE.md oraz odczyt index.html, zapis.html, asystent.js i zbuduj.py. To przegląd repozytorium, nie audyt produkcji.

## Potwierdzony stan
README opisuje repozytorium jako roboczą wersję nowej strony OES i wizualizację strony głównej. CLAUDE.md określa cel biznesowy: zwiększenie liczby zapisów na kursy oraz domyślny podział pracy Claude/ChatGPT.

| Ścieżka | Stan / rola |
| --- | --- |
| `README.md` | Krótki opis projektu; starszy szkic oznaczony jako nieaktualny. |
| `CLAUDE.md` | Istniejące instrukcje projektu, współpracy i jakości. |
| `wizualizacja/index.html` | Robocza strona główna z CSS i JavaScript w HTML; wybór pojazdów, „Pod maską”, materiały wideo, biura i odnośniki do zapisów. |
| `wizualizacja/droga.html` | Osobny plik podstrony. Istnienie potwierdzone w drzewie; działania nie testowano. |
| `wizualizacja/onas.html` | Osobny plik podstrony. Istnienie potwierdzone w drzewie; działania nie testowano. |
| `wizualizacja/zapis.html` | Formularz wizualizacji. Obsługa submit pokazuje podsumowanie i komunikat, że zgłoszenie nie zostało nigdzie wysłane. |
| `wizualizacja/asystent.js` | Lokalny asystent FAQ w formie czatu, bez modelu AI; wyszukuje odpowiedzi i doładowuje asystent-dane.js przy otwarciu. |
| `wizualizacja/asystent-dane.js` | Generowany plik danych asystenta. |
| `wizualizacja/img/` | Obrazy i filmy, w tym materiały świateł i TikTok. |
| `dane/asystent/` | Baza wiedzy, FAQ, prompt tekstowy, JSON, CSV oraz generator Python. Obecność pliku promptu nie oznacza integracji AI. |
| `szkic/hero.html` | Pierwszy, nieaktualny szkic według README. |

W zweryfikowanym drzewie brak package.json, plików konfiguracji frameworka, katalogu testów i workflow GitHub Actions. Nie ustalono automatycznej komendy budowania ani testów. Projekt zawiera statyczne pliki HTML/CSS/JavaScript oraz pomocniczy generator Python; nie ma podstaw do opisywania go jako aplikacji React/Next.js.

## Dane asystenta
`dane/asystent/zbuduj.py` czyta `faq.json` i `baza_danych.json`, zapisując domyślnie `wizualizacja/asystent-dane.js`. Komenda zapisana w skrypcie: `python3 dane/asystent/zbuduj.py` (z katalogu głównego). Uruchomienie modyfikuje wynikowy plik — w zadaniu wyłącznie dokumentacyjnym nie uruchamiano generatora. CSV i dokumenty wiedzy istnieją, ale ten generator nie czyta ich bezpośrednio.

## Ograniczenia i dalsze sprawdzenia
- Formularz jest demonstracyjny; rzeczywista obsługa zgłoszeń wymaga osobnego zadania i uzgodnienia sposobu przetwarzania danych.
- Aktualności cen, terminów, oferty, kontaktów i informacji prawnych nie potwierdzono zewnętrznie. Nie traktować ich jako zweryfikowanej oferty na dzień tego przeglądu.
- Nie sprawdzano strony w przeglądarce, responsywności, dostępności, SEO, wydajności ani rzeczywistych integracji zewnętrznych.
- Nie potwierdzono stanu hostingu, wdrożenia produkcyjnego ani zgodności repozytorium z oes.com.pl.
- Kolejność kolejnych prac ustala właściciel; powyższe punkty nie są zatwierdzonym harmonogramem.

## Zakres uzupełnienia dokumentacji
W punkcie bazowym brak AGENTS.md, docs/PROJECT_STATUS.md i docs/DECISIONS.md. Zadanie dodaje wyłącznie te trzy pliki na oddzielnej gałęzi i kieruje PR do gałęzi Claude. README.md, CLAUDE.md, kod, dane i multimedia pozostają bez zmian. Scalenie nie jest częścią zadania.
