# SimTrader – mobilny system kantoru wymiany walut

SimTrader to symulator kantoru: użytkownik zakłada konto, zasila je wirtualnymi środkami, śledzi kursy, kupuje i sprzedaje waluty oraz przegląda portfel i historię operacji. System składa się z aplikacji mobilnej (React Native), usługi sieciowej REST (Node.js / Express) i bazy danych PostgreSQL. Kursy pochodzą z publicznego API giełdy Binance; walutą rozliczeniową jest USD.

Cała logika sald i transakcji działa po stronie serwera – aplikacja mobilna tylko wysyła żądania i wyświetla wyniki.

## Spis treści

1. [Funkcje](#funkcje)
2. [Technologie](#technologie)
3. [Struktura repozytorium](#struktura-repozytorium)
4. [Uruchomienie](#uruchomienie)
5. [Testy](#testy)
6. [Instrukcja użytkownika](#instrukcja-użytkownika)
7. [API](#api)
8. [Dokumentacja projektowa](#dokumentacja-projektowa)
9. [Autor](#autor)

## Funkcje

- Rejestracja i logowanie (e-mail + hasło lub konto Google), sesja oparta na tokenie JWT.
- Lista aktualnych kursów (do 100 walut), odświeżana na serwerze co 5 sekund.
- Wykres kursów archiwalnych dla okresów 1H, 1D, 1W, 1M, 1Y.
- Zasilenie konta z symulowanej karty (każdy użytkownik dostaje kartę z 10 000 USD) i wypłata z powrotem na kartę.
- Kupno i sprzedaż waluty po kursie ustalanym przez serwer.
- Portfel z bieżącą wyceną i zmianą dobową.
- Historia transakcji z zapisanym kursem oraz datą i czasem.
- Interfejs w trzech językach: polski, angielski, niemiecki.

## Technologie

| Część | Technologie |
|---|---|
| Aplikacja mobilna | React Native 0.82, TypeScript, React Navigation, Axios, i18next, react-native-keychain |
| Web Service | Node.js 22, Express 5, TypeScript, Prisma ORM, jsonwebtoken, bcryptjs, node-cron |
| Baza danych | PostgreSQL 15 |
| Infrastruktura | Docker Compose, GitHub Actions (kontrola typów, lint, testy, wdrożenie) |
| API zewnętrzne | Binance REST API (kursy), Google OAuth 2.0 (logowanie) |

## Struktura repozytorium

```
app/                  aplikacja mobilna (ekrany, komponenty, konteksty, klient API)
server/               usługa sieciowa
  src/routes/         adresy URL
  src/controllers/    walidacja żądań i kody odpowiedzi
  src/services/       logika biznesowa, pamięć podręczna kursów
  src/middleware/     weryfikacja JWT
  src/__tests__/      testy
  prisma/             schemat bazy danych i migracje
docs/                 dokumentacja projektowa i diagramy
docker-compose.yml    baza danych + serwer
```

## Uruchomienie

### Wymagania

- Docker z Docker Compose,
- Node.js 20 lub nowszy,
- Android Studio z emulatorem (lub telefon z Androidem) oraz JDK 17.

### 1. Serwer i baza danych

Wszystkie polecenia wykonuj w katalogu głównym repozytorium.

1. Utwórz pliki konfiguracyjne z szablonów:

   ```bash
   cp .env.example .env
   cp server/.env.example server/.env
   ```

2. Uzupełnij wartości:

   | Plik | Zmienna | Znaczenie |
   |---|---|---|
   | `.env` | `POSTGRES_USER`, `POSTGRES_PASSWORD`, `POSTGRES_DB` | dane dostępowe do bazy |
   | `server/.env` | `PORT` | port serwera, domyślnie `4000` |
   | `server/.env` | `JWT_SECRET_KEY` | długi losowy ciąg do podpisywania tokenów |
   | `server/.env` | `GOOGLE_CLIENT_ID` | identyfikator klienta OAuth – potrzebny tylko do logowania przez Google |

   Pliki `.env` są wyłączone z repozytorium – nie dodawaj ich do commitów.

3. Uruchom kontenery:

   ```bash
   docker compose up -d --build
   ```

   Migracje bazy wykonują się automatycznie przy starcie. Serwer działa pod adresem `http://localhost:4000`.

4. Sprawdź, czy serwer odpowiada:

   ```bash
   curl -i http://localhost:4000/api/currency/list
   ```

   Poprawna odpowiedź to `401 Not authorized` – serwer działa i wymaga tokenu.

Podgląd logów: `docker compose logs -f backend`. Zatrzymanie: `docker compose down`.

#### Wariant deweloperski (serwer bez kontenera)

Przydatny przy pracy nad kodem serwera – zmiany przeładowują się automatycznie.

```bash
docker compose up -d postgres
cd server
npm install
```

Dopisz w `server/.env` adres bazy (dane takie jak w głównym `.env`; baza jest wystawiona na porcie `5433`):

```env
DATABASE_URL="postgresql://UZYTKOWNIK:HASLO@localhost:5433/NAZWA_BAZY?schema=public"
```

```bash
npx prisma migrate deploy
npm run dev
```

### 2. Aplikacja mobilna

1. Zainstaluj zależności:

   ```bash
   cd app
   npm install
   ```

2. Sprawdź adres serwera w `app/services/api.ts` (stała `API_URL`):

   | Gdzie działa aplikacja | Adres |
   |---|---|
   | emulator Androida | `http://10.0.2.2:4000/api` (ustawiony domyślnie) |
   | telefon w tej samej sieci Wi-Fi | `http://<adres IP komputera>:4000/api` |
   | serwer na VPS | `http://<adres serwera>:4000/api` |

3. Uruchom emulator w Android Studio, a następnie aplikację:

   ```bash
   npm run android
   ```

   Na Linuksie i macOS można też użyć `npm run dev` – skrypt sam uruchamia emulator o nazwie `SimTrader` (inną nazwę podaj w zmiennej `AVD_NAME`), Metro i instaluje aplikację.

Logowanie przez Google wymaga własnego klienta OAuth w Google Cloud (ten sam identyfikator w `server/.env` i w `app/context/AuthContext.tsx`). Bez tej konfiguracji działa zwykła rejestracja i logowanie hasłem.

## Testy

```bash
cd server
npm install
npm test
```

Testy nie wymagają bazy danych ani dostępu do sieci. Sprawdzają podstawowe scenariusze:

- kupno i sprzedaż: poprawna zmiana sald, odmowa przy braku środków, braku waluty lub braku kursu,
- zapis kursu w transakcji i jego niezmienność po późniejszej zmianie kursu,
- autoryzację: odrzucenie żądania bez tokenu, z tokenem podrobionym lub wygasłym,
- walidację adresu e-mail i hasła.

Pozostałe kontrole: `npm run type-check` w `server/` oraz `npm run lint` i `npm run type-check` w `app/`. Wszystkie uruchamiają się automatycznie w GitHub Actions.

## Instrukcja użytkownika

1. **Rejestracja.** Na ekranie logowania wybierz „Zarejestruj się”, podaj nazwę użytkownika, e-mail i hasło. Hasło musi mieć co najmniej 6 znaków, jedną wielką literę i jeden znak specjalny. Po rejestracji jesteś od razu zalogowany.
2. **Logowanie.** Podaj e-mail i hasło albo wybierz „Zaloguj się przez Google”. Aplikacja pamięta sesję przez 24 godziny.
3. **Zasilenie konta.** Na ekranie głównym wybierz „Doładuj”, wskaż metodę płatności, wpisz kwotę i potwierdź. Środki pochodzą z wirtualnej karty z saldem początkowym 10 000 USD.
4. **Kursy.** Ekran główny pokazuje popularne waluty z ceną i zmianą dobową. „Zobacz wszystkie” otwiera pełną listę.
5. **Kursy archiwalne.** Dotknij waluty, aby zobaczyć wykres; przełączniki 1H / 1D / 1W / 1M / 1Y zmieniają okres.
6. **Kupno i sprzedaż.** Na ekranie waluty wybierz „Kup” lub „Sprzedaj”, wpisz ilość i potwierdź. Transakcja jest rozliczana po kursie serwera z chwili potwierdzenia.
7. **Portfel.** Zakładka „Portfel” pokazuje saldo USD, posiadane waluty i ich aktualną wartość.
8. **Historia.** Zakładka „Historia” zawiera wszystkie operacje: doładowania, wypłaty, kupno i sprzedaż.
9. **Wypłata.** „Wypłać” przenosi środki USD z portfela z powrotem na kartę.
10. **Ustawienia.** Zmiana języka (polski, angielski, niemiecki) i wylogowanie.

## API

Wszystkie adresy mają prefiks `/api`. Poza rejestracją i logowaniem wymagany jest nagłówek `Authorization: Bearer <token>`.

| Metoda | Ścieżka | Opis |
|---|---|---|
| POST | `/auth/registration` | rejestracja |
| POST | `/auth/login` | logowanie |
| POST | `/auth/google` | logowanie przez Google |
| GET | `/auth/check` | weryfikacja sesji i odnowienie tokenu |
| GET | `/currency/list?limit=` | aktualne kursy |
| GET | `/currency/history?symbol=&period=` | kursy archiwalne (`1H`, `1D`, `1W`, `1M`, `1Y`) |
| GET | `/currency/rate?symbol=` | bieżący kurs jednej pary |
| GET | `/wallet/:userId` | portfel z wyceną |
| GET | `/wallet/:userId/transactions` | historia transakcji |
| POST | `/wallet/top-up` | zasilenie konta |
| POST | `/wallet/withdraw` | wypłata |
| POST | `/trade/buy` | kupno waluty |
| POST | `/trade/sell` | sprzedaż waluty |

Kurs transakcji to ostatnia cena pary `WALUTA/USDT` z Binance, przechowywana w pamięci serwera i odświeżana co 5 sekund. Kupno i sprzedaż odbywają się po tym samym kursie, bez prowizji. Kurs jest zapisywany w rekordzie transakcji.

## Dokumentacja projektowa

Raport z projektem koncepcyjnym znajduje się w `docs/Dokumentacja_projektowa_SimTrader.pdf`, a źródła diagramów (przypadki użycia, klasy, ERD, architektura) w `docs/diagrams/`.

## Autor

Danyil Fiut
