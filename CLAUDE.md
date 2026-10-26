# CLAUDE.md – Instrukcje projektu OES

## 1. Informacje o projekcie

**Nazwa:** OES – Ośrodek Szkolenia Kierowców Kraków

**Strona internetowa:** https://oes.com.pl

**Repozytorium GitHub:** `mpmagdziarz-commits/szkolka-oes`

**Język projektu:** polski

### Główny cel

Stworzenie profesjonalnej, nowoczesnej, interaktywnej i responsywnej strony internetowej dla OES – Ośrodka Szkolenia Kierowców w Krakowie.

Strona powinna wyróżniać się estetyką, szybkością działania, intuicyjną nawigacją oraz nowoczesnymi rozwiązaniami wizualnymi.

Głównym celem biznesowym jest zwiększenie liczby osób zapisujących się na kursy prawa jazdy.

## 2. Podział obowiązków AI

W projekcie wykorzystywane są dwa systemy AI:

**Claude – główny wykonawca techniczny**
- Programowanie strony internetowej.
- Tworzenie i modyfikowanie komponentów.
- Implementacja animacji i interakcji.
- Tworzenie formularzy zapisów.
- Optymalizacja kodu i responsywności.
- Testowanie wprowadzanych zmian.

**ChatGPT – planowanie, analiza i kontrola jakości**
- Przygotowywanie treści na stronę.
- Analiza funkcjonalności i architektury.
- Weryfikacja informacji dotyczących prawa jazdy.
- Proponowanie ulepszeń UX/UI.
- Analiza SEO i dostępności.
- Przegląd kodu oraz wykrywanie potencjalnych błędów.
- Przygotowywanie dokumentacji projektu.

Podział jest domyślny i może być zmieniany na polecenie właściciela projektu.

## 3. Zasady współpracy przez GitHub

1. GitHub jest głównym źródłem aktualnego kodu.
2. Przed rozpoczęciem pracy sprawdź aktualną gałąź oraz ostatnie zmiany.
3. Nie zakładaj, że wcześniejsza wersja kodu jest nadal aktualna.
4. Nie nadpisuj zmian wprowadzonych przez inne narzędzie AI.
5. Przy większych zadaniach pracuj na osobnej gałęzi.
6. Stosuj zrozumiałe nazwy gałęzi i opisowe komunikaty commitów.
7. Przed scaleniem zmian sprawdź potencjalne konflikty.
8. Nie wykonuj destrukcyjnych operacji Git bez wyraźnej zgody.
9. Nie publikuj strony produkcyjnej bez zgody właściciela.
10. Po zakończeniu większego zadania przedstaw podsumowanie zmian i wyniki testów.

Nie zakładaj, że ChatGPT i Claude mają dostęp do swoich rozmów. Wymieniaj informacje za pośrednictwem plików projektu oraz GitHub.

## 4. Wymagania dotyczące strony

### Wygląd i UX/UI

- Nowoczesny, profesjonalny i spójny design.
- Pełna responsywność na telefonach, tabletach i komputerach.
- Intuicyjna nawigacja i czytelne przyciski.
- Atrakcyjne prezentacje pojazdów szkoleniowych.
- Animacje, które nie pogarszają wydajności strony.
- Przejrzyste informacje o kursach i zapisach.

### Wydajność

- Optymalizuj czas ładowania strony.
- Minimalizuj zbędny JavaScript.
- Optymalizuj obrazy i inne pliki multimedialne.
- Stosuj lazy loading tam, gdzie ma uzasadnienie.
- Dbaj o dobre wyniki Core Web Vitals.
- Unikaj niepotrzebnych zależności.

### Dostępność

- Stosuj semantyczny HTML.
- Dbaj o odpowiedni kontrast tekstu.
- Zapewnij obsługę klawiaturą.
- Dodawaj prawidłowe etykiety formularzy.
- Uwzględniaj wymagania WCAG 2.2 AA.

### SEO

- Stosuj poprawną strukturę nagłówków.
- Dbaj o unikalne tytuły i opisy podstron.
- Stosuj przyjazne adresy URL.
- Uwzględniaj lokalne SEO dla Krakowa.
- Dodawaj odpowiednie dane strukturalne, gdy są uzasadnione.

## 5. Kategorie prawa jazdy

Strona powinna umożliwiać prezentację odpowiednich kursów, między innymi:

- AM
- A1
- A2
- A
- B1
- B
- B+E
- C1
- C
- C1+E
- C+E
- D1
- D
- D1+E
- D+E

Lista nie stanowi potwierdzenia aktualnej oferty OES. Publikuj wyłącznie kategorie rzeczywiście oferowane przez szkołę.

Dla każdej oferowanej kategorii należy uwzględnić:
- Minimalny wiek.
- Wymagania.
- Dokumenty i PKK.
- Przebieg szkolenia.
- Egzamin teoretyczny i praktyczny.
- Pojazd szkoleniowy, jeśli został potwierdzony.
- Cenę, jeśli została potwierdzona.
- Możliwość zapisania się na kurs.

Weryfikuj aktualność informacji prawnych w wiarygodnych źródłach.

## 6. Formularze zapisów

Formularze powinny być:
- Czytelne i proste w obsłudze.
- Responsywne.
- Zabezpieczone przed typowymi nadużyciami.
- Wyposażone w walidację danych.
- Zgodne z obowiązującymi wymaganiami ochrony danych osobowych.

Nie zapisuj haseł, tokenów, kluczy API ani danych kursantów w publicznym repozytorium.

## 7. Aktualna struktura projektu

Znane elementy repozytorium:

- `wizualizacja/index.html` – robocza wizualizacja strony.
- `szkic/hero.html` – starszy szkic.
- `dane/asystent/` – dane związane z asystentem OES.
- `README.md` – podstawowy opis projektu.

Przed rozpoczęciem implementacji sprawdź faktyczną strukturę plików. Nie zakładaj, że powyższa lista jest kompletna.

## 8. Dokumentacja

Utrzymuj aktualne dokumenty:

- `README.md` – opis projektu i instrukcja uruchamiania.
- `CLAUDE.md` – instrukcje dla Claude.
- `AGENTS.md` – wspólne zasady pracy narzędzi AI.
- `docs/PROJECT_STATUS.md` – aktualny stan realizacji.
- `docs/DECISIONS.md` – decyzje techniczne i projektowe.

Po ukończeniu istotnej funkcji aktualizuj dokumentację, jeśli ma to zastosowanie.

## 9. Testowanie i jakość

Przed zakończeniem zadania:
1. Sprawdź poprawność kodu.
2. Zweryfikuj, czy istniejące funkcje nadal działają.
3. Przeprowadź dostępne testy.
4. Sprawdź widoki mobilne i desktopowe, jeśli masz taką możliwość.
5. Zweryfikuj formularze, linki i nawigację.
6. Zgłoś wszystkie istotne błędy.

Nie twierdź, że testy zostały wykonane, jeśli ich nie uruchomiono.

## 10. Zasady komunikacji

- Odpowiadaj po polsku.
- Bądź konkretny i rzeczowy.
- Wyjaśniaj istotne decyzje techniczne.
- Dla dużych zmian przedstaw krótki plan.
- Nie komplikuj rozwiązań bez potrzeby.
- Proponuj ulepszenia, ale nie zmieniaj samodzielnie uzgodnionych założeń biznesowych.
- Zachowuj istniejące, działające funkcje.
- Informuj o ryzyku i ograniczeniach.

## 11. Priorytety projektu

1. Poprawne działanie wszystkich funkcji.
2. Bezpieczeństwo danych.
3. Wygoda użytkownika i dostępność.
4. Wydajność strony.
5. Atrakcyjność wizualna.
6. SEO i widoczność w wyszukiwarkach.
7. Łatwość dalszego rozwoju projektu.

**Najważniejsza zasada:** rozwijaj stronę OES w sposób bezpieczny, uporządkowany i możliwy do zweryfikowania. Każda zmiana powinna poprawiać jakość projektu bez niszczenia wcześniej wykonanej pracy.
