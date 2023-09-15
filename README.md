# About

This project is a script that scrapes the web daily for a set of given products and sends webhook messages to a discord channel reporting status of these products.

# TODO projektu

- [x] file parser -> nacte urlka jako v ISA a naparsuje domenu -> list objektu s properties jako v ISA
- [x] udelat generic scraper, ktery pak pouzije scraper pro danou domenu, pokud neexistuje, skip
- [x] udelat scraper pro konkretni domeny
- [x] udelat scraperManager classu a v ní scraperRegister metodu
- [x] udělat lazy loading těch scraper modulů, aby se to nenačítalo do paměti hned všecko jak v BP
- [x] napsat sending zpráv + formatting embedů
- [ ] přidat Typescript typování, aby v těch předávaných datech nebyl bordel
- [ ] rozšířit scrapování o dostupnost, případně další info (název produktu, naskladnění, běží akce, obrázek, info o obchodu)
   - [ ] sepsat si template co všechno potřebuju scrapnout
   - [ ] udělat funkci na 1) waitForElement + 2) get element text (aby tam nebyl bordel s page.evaluate)
- [ ] přidat scraper na další stránky
- [ ] (udělat basic unit testy)

#### co je potřeba scrapnout:
+ title
+ stockInfo
+ price
+ isOnSale?
+ productPic
+ (sale %)
+ hostname (in footer + host favicon as footer icon)





   + source .env file
   + parse urls.txt
   + parse urls.txt with invalid urls
   + parse urls.txt with empty lines
   + parse urls.txt with empty file
   + parse urls.txt not file
   + parse urls.txt with comments
   + send invalid webhook
   + send valid webhook




## mozne upgrady:

+ prihlaseni do obchodu pro ziskani personalizovanych slev
+ moznost nastavit notifikace pouze pri slevach - sqlite db s historii cen, ktera se bude porovnavat s aktualni cenou
+ smarter vyhledavani produktu (heureka-style) - jenom podle nazvu produktu, neni potreba konkretni url
+ na alze checkovat i alzadny nebo jiné slevy (je tam extra kolonka "s kodem ALZADNYxy cena: 1234,-")


+ přidat TS typování
+ udělat TS objekt i s typama na scrapované informace z webu
+ expandnout scrapované info a taky ho pěkně passovat do té zprávy
+ editnout embed