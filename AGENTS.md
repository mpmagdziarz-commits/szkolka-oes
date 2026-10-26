# Wspólne zasady pracy nad OES

## Kontekst i źródła
Projekt: nowa strona OES – Ośrodka Szkolenia Kierowców w Krakowie. Pracujemy i komunikujemy się po polsku.
Przed pracą przeczytaj `README.md`, `CLAUDE.md`, `docs/PROJECT_STATUS.md` i `docs/DECISIONS.md`, a następnie sprawdź faktyczny kod, gałąź, ostatnie commity i lokalne niezapisane zmiany. Dokumentacja stanu jest migawką; nie zastępuje kontroli aktualnego repozytorium.
Ten plik uzupełnia CLAUDE.md. Nie zmienia uzgodnionego tam podziału ról. Przy sprzecznych założeniach nie rozstrzygaj ich przez nadpisywanie cudzej pracy; opisz rozbieżność właścicielowi. Jego bieżące polecenia określają zakres zadania.

## Podział obowiązków
- Claude: główny wykonawca techniczny — kod strony, komponenty, animacje, interakcje, formularze, optymalizacja i testowanie swoich zmian.
- ChatGPT: planowanie, treści, analiza funkcji i architektury, weryfikacja informacji o prawie jazdy, UX/UI, SEO, dostępność, przegląd kodu i dokumentacja.
- Właściciel może zmienić ten podział. Nie rozszerzaj samodzielnie zadania dokumentacyjnego na przebudowę strony.

## Ochrona pracy i współpraca
1. GitHub jest wspólnym źródłem kodu i ustaleń. Nie zakładaj dostępu do rozmów drugiego asystenta.
2. Na początku zapisz punkt bazowy (gałąź i SHA), cel i zakres plików. Sprawdź otwarte PR, aby nie dublować pracy.
3. Pracuj na osobnej gałęzi od uzgodnionej bazy. W tym zadaniu bazą PR jest `claude/project-thread-e0jil3`; przy kolejnych zadaniach sprawdź aktualne polecenie właściciela.
4. Nie nadpisuj cudzych zmian, nie cofaj niezwiązanych commitów i nie wykonuj force push ani destrukcyjnych operacji bez wyraźnej zgody.
5. Przed dodaniem brakującego pliku sprawdź, czy nie został już dodany. Jeśli istnieje, przeczytaj go i uzgodnij potrzebę zmiany zamiast zastępować.
6. Przed publikacją PR ponownie sprawdź bazę i pełny diff. Przy równoległych zmianach opisz rozbieżności, zachowaj pracę obu autorów; nie rozwiązuj konfliktów przez automatyczne wybranie jednej wersji.
7. PR powinien opisywać cel, pliki, weryfikację, ograniczenia i następny krok. Nie scalaj ani nie wdrażaj produkcyjnie bez polecenia właściciela.
8. Przekazanie pracy: wskaż gałąź, SHA lub PR, wykonane czynności, faktycznie wykonane testy i otwarte kwestie. Nie deklaruj testów, których nie uruchomiono.

## Zasady projektu
- Zachowuj działające funkcje. Nie dodawaj frameworka, zależności ani przebudowy bez uzasadnienia i odpowiedniego zakresu zadania.
- Aktualny prototyp jest w `wizualizacja/`; `szkic/hero.html` jest według README nieaktualnym szkicem.
- `wizualizacja/asystent-dane.js` jest generowany przez `dane/asystent/zbuduj.py` z `faq.json` i `baza_danych.json`. Zmieniaj źródła i regeneruj wynik w zadaniu dotyczącym danych; nie poprawiaj wyłącznie wyniku.
- Ceny, terminy, oferta, pojazdy i informacje prawne wymagają potwierdzenia. Przy weryfikacji zapisuj źródło i datę; obecność danych w repozytorium nie dowodzi ich aktualności.
- Nie zapisuj tokenów, haseł, kluczy API ani danych kursantów w repozytorium. Do prób formularzy używaj danych fikcyjnych.
- Dbaj o semantyczny HTML, obsługę klawiaturą, kontrast, etykiety formularzy, ograniczenie animacji, wydajność i SEO zgodnie z CLAUDE.md.

## Weryfikacja i dokumentacja
Dostosuj sprawdzanie do zmiany. Dla dokumentacji sprawdź fakty, ścieżki, spójność i diff; nie deklaruj testów działania strony. Przy zmianach strony sprawdź odpowiednie widoki, nawigację, formularze i asystenta. Najpierw sprawdź dostępne narzędzia — nie zakładaj istnienia komend npm ani automatycznego zestawu testów.
Po istotnej zmianie aktualizuj status i zapisuj nowe decyzje z uzasadnieniem. Oddzielaj obserwacje z kodu, wymagania, propozycje i potwierdzone decyzje.
