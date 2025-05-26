# Moment 4 - Backend-baserad webbutveckling

## Autentisering och säkerhet - Webbtjänst

### Verktyg/paket för webbtjänsten
- NPM & Parcel
- NoSQL-databasen MongoDB
- Mongoose
- Express
- Jason Web Token (JWT)
- Dotenv
- Router
- Bcrypt

## Använda webbtjänsten

För att klona projektet anger du detta i din terminal:

```bash
git clone https://github.com/HelmerBergstrom/moment-4-backend
cd moment-4-backend
```

Installera sedan paket:
```bash
npm install
```

Skapa en .env-fil och lägg in:
```bash
JWT_KEY=dinhemliganyckel
```

Starta servern:
```bash
node server.js
```

## API anrop

##### Registrera en ny användare POST/api/register:

```bash
{
  "username": "helmer123",
  "email": "epost@ex.se",
  "firstName": "förnamn",
  "lastName": "efternamn",
  "age": 23,
  "password": "password"
}
```

Validering för Registrering av användare:

- Användarnamn: minst 7 tecken
- E-post: måste innehålla "@" och en punkt "."
- Ålder: minst 15 år krävs
- Alla fält måste fyllas i.

##### Logga in POST/api/login:

Logga in returnerar en JWT-token. Kräver användarnamn och lösenord.

```bash
{
  "username": "helmer123",
  "password": "password"
}
```

##### Skyddade routen GET/secret

Skyddad route som kräver autensiering i form av en JWT-token/inloggad användare. En token är vid liv i en timme. Lösenord är hashade. 

## Övrigt

MongoDB körs lokalt på "mongodb://127.0.0.1:27017/user-pass". user-pass är databasens namn.
Mongoose används tillsammans med MongoDB för modellering och "Schema".
En middleware-funktion används för att autensiera och heter authenticateTokenU().

## User.js

I denna fil används Mongoose för att deklarera ett schema för användare. Detta schema innehåller namnen på de värden som ska lagras i databasen och kraven för dessa värden.

I denna fil lagras två metoder, en för att kryptera lösenord och en för att jämföra lösenord. Den förstnämnda metoden använder paketet "bcrypt" för att hasha lösenord till slumpmässiga textsträngar, för att skydda lösenordet.

För att jämföra lösenord används funktionen "compare" som jämför det inmatade lösenordet och det faktiska lösenordet.

Modellerna skickas vidare till theRoutes.

## theRoutes.js

I denna fil lagras alla routes, som namnet på filen tyder. Här används post-routes för registrering av användare och för att logga in. I dessa routes används if-satser för att kontrollera inmatade fält och för att ge användaren en token, som är giltlig i en timme. Denna token används som ett pass för användaren till webbplatsen.

I routen för att logga in användaren används metoderna som lagras i User.js-filen, för att jämföra lösenord och kryptera dem. 

## server.js

Här lagras en route som kräver att användaren har en token, dvs. är inloggad. Denna route är till skillnad från föregående en GET-route, men går även först igenom en funktion innan den körs helt.

Funktionen heter "authenticateToken" och validerar om användaren har en token och om den är giltlig. Har användaren en token, körs routen, annars inte.
