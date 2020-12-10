Käyttöohjeet:

lataa/kloonaa gitti

Kopio 'eslint' -alkuiset kansiot projektin juuri kansiosta client kansion node_modules kansioon (korvaamalla siellä olevat)

1. Avaa backend-loppuharkka kansio Visual Studio Codessa
2. Server puoli:
	a. cd server
	b. npm install
	c. npm start
3. Client puoli:
	a. cd ../client
	b. npm install
	c. npm run serve
4. Avaa http://10.69.34.115:8080/ selaimessa.

*mikäli mongodb kanta pitää luoda, aja node garbage/create_mongo_db.js


Kuvaus:

Messageboard missä voi luoda aiheen (Topic) Topic sivulla, tallentuu mongodb kantaan Topic -scheman mukaan. Home sivulla voi lisätä viestejä aiheisiin (Toggle Message Form), sisältyen kuvan. Kannasta löytyvät aiheet tulevat dropdown valikkoon.


HAASTEET/SELVITYKSET:
Login/register. Käyttäjiä voi registeröidä, mutta session muodostus ei onnistunut (konsoliin tosin näytetään että login tiedot täsmäävät kantaan, sessio ei vian jäänyt päälle).

Clientti puolella kokeiltiin Vue.js moduuleita sivujen templaateiksi, samantyylinen kuin pug. Client puolella oleva index.js toimii reitittäjänä eri views -kansion näkymiin. App.vue renderöidään joka sivulla. 
main.js määrittää routerin(index.js), renderöi App.vue:n ja mounttaa routerista tulevan sisällön App.vue:ssa olevaan #app-id:seen elementtiin.
Vue -tiedostoissa asetetaan reitit server puoleen (esim '/messages') ja metodit GET/POST toimintoihin.

Esimerkkinä Home.vue
Templaatissa on ul- lista elementti ja lista itemin pohja, mihin on asetettu muuttujia vue.js muodossa.
<script> -lohkossa määritetään message -json objekti ja messages array. Sivun latautuessa (mounted) pyydetään serveriltä Viestit ja ne syötetään messages array:hin. <ul> elementiin syötetään viestit "v-for="message in reversedMessages", asettaen jokaisen viestin eri <li> elementiksi. (reversedMessages funktio kääntää järjestyksen asettaen uusimmat viestit ylimmäksi)

Samaa message pohjaa käytetään käyttäjän syöttäessä uuden viestin method -osiossa määritetyllä addMessage() -funktiolla.


Mitä jatkokehittäisin verrattaen Piiska järjestelmään:

- Sessioiden saaminen kuntoon. Sessio id:stä luotaisiin keksi clientti puolelle viitteeksi serveripuolen username/yms. arvoille. Käyttäjänimet näkyviin ja vaapamuotoisen käyttäjänimen poisto.
- Kommentit ja tykkäykset viesteihin. Painamalla tykkää -buttonia päivitettäisiin kannassa viestin tykkäys arvoa yhdellä (esim. "likes++")

Verrattaessa PHP:hen, node.js:ssä hämmensi kaikkien eri moduulien toiminnot ja käyttäminen, mikä ajanmyötä todennäköisesti avautuisi enemmän.