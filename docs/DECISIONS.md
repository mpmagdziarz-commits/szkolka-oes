# Decyzje i ustalenia projektu OES

Ten rejestr oddziela wcześniejsze ustalenia od obserwacji z kodu. Nie rekonstruuje nieudokumentowanych decyzji autorów.
Punkt odniesienia: `claude/project-thread-e0jil3`, commit `f30ef5a7ac3501b3a0462eb5cec6b688a8fa0028`. Data zadania: 2026-10-26 według kontekstu właściciela.

## D-001 — Domyślny podział odpowiedzialności
Status: istniejące ustalenie, źródło: CLAUDE.md, sekcja 2.
Claude odpowiada za główne wykonanie techniczne i testy swoich zmian. ChatGPT zajmuje się planowaniem, treściami, analizą, weryfikacją informacji, UX/UI, SEO, dostępnością, przeglądem kodu i dokumentacją.
Uzasadnienie współpracy: czytelny zakres pracy i ograniczenie nakładających się zmian. Podział może zostać zmieniony przez właściciela.

## D-002 — GitHub jako wspólny zapis pracy
Status: istniejące ustalenie, źródło: CLAUDE.md, sekcja 3.
Aktualny kod i przekazanie pracy opierają się na GitHub oraz plikach projektu. Nie zakładamy wzajemnego dostępu do rozmów Claude i ChatGPT.
Konsekwencja: przed zadaniem sprawdzamy aktualną bazę, a po zadaniu podajemy zakres, wyniki weryfikacji i otwarte kwestie; zachowujemy cudze zmiany.

## D-003 — Uzupełnienie wyłącznie brakującej dokumentacji
Status: zakres zlecony przez właściciela w tym zadaniu.
Dodać tylko AGENTS.md, docs/PROJECT_STATUS.md i docs/DECISIONS.md, o ile brakuje ich na bazie. Nie zmieniać istniejących plików ani kodu strony. Oddzielna gałąź i PR do `claude/project-thread-e0jil3`; bez scalania.
Uzasadnienie: uzupełnić wspólne zasady i przekazać zweryfikowany stan bez nadpisywania pracy Claude.
Konsekwencja: propozycje zmian aplikacji pozostają poza tym PR.

## D-004 — Stan dokumentowany z dowodami
Status: zasada dokumentacji przyjęta w tym uzupełnieniu, zgodna z CLAUDE.md.
Status wskazuje konkretny commit i źródła, a wyniki przeglądu kodu oddziela od testów działania i informacji wymagających potwierdzenia.
Uzasadnienie: obecność pliku lub funkcji nie dowodzi jej poprawności ani gotowości produkcyjnej.
Konsekwencja: nie deklarujemy uruchomionych testów, wdrożenia ani aktualności oferty bez dowodów.

## Obserwacje techniczne — bez przypisywania historycznej decyzji
- Prototyp używa statycznych plików HTML/CSS/JavaScript. W bazowym drzewie brak package.json. Nie ustalono docelowego frameworka.
- Asystent w asystent.js działa na lokalnym FAQ; nie jest integracją modelu AI.
- Generator zbuduj.py przetwarza faq.json i baza_danych.json do asystent-dane.js.
- Formularz zapis.html pokazuje symulację; jego kod informuje, że zgłoszenie nie zostało wysłane.

Źródła i ograniczenia opisano w [PROJECT_STATUS.md](PROJECT_STATUS.md). Te obserwacje nie ustanawiają docelowej architektury.

## Kwestie otwarte
Docelowy sposób obsługi zgłoszeń, hosting i wdrożenie, ewentualny framework, proces aktualizacji danych oraz potwierdzenie aktualnej oferty wymagają odrębnych ustaleń. Ten PR ich nie rozstrzyga.

## Dodawanie kolejnych decyzji
Dodaj kolejny identyfikator, status (propozycja / zatwierdzona / zastąpiona), datę, źródło zatwierdzenia, kontekst, decyzję i konsekwencje. Nie zapisuj propozycji asystenta jako zatwierdzenia właściciela. Przy zastąpieniu decyzji zachowaj jej historię i wskaż następcę.
