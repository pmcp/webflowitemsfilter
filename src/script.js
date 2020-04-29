let params = {}

var app = new Vue({
  el: "#vue",
  template: `<div class="container" id="scrollToPagination">
            <div class="filter__container" style="padding-left:10px;padding-right:10px;">
              <h6>Doelgroep</h6>
              <div style="display:flex;flex-direction:row;justify-content:start;width:100%">
                <button v-for="(a, key) in audience" :key="a.name" v-on:click="toggleStatus('audience', key, audience, totalAudienceActive)" v-bind:class="{'cc-button--inActive': setAudienceInactive(a.active) }" class="tagline cc-button" style="margin-right:10px;font-weight:400;margin-bottom:0">
{{ a.name }} Active: {{a.active}}, Audience inactive: {{ setAudienceInactive(a.active) }}
                </button>
              </div>
              <h6>Genre</h6>
              <div v-if="genres" style="display:flex;flex-direction:row;justify-content:start;width:100%;flex-wrap:wrap">
                <button v-bind:disabled="genre.total === 0" v-on:click="toggleStatus('genres', key, genres, totalGenresActive)" class="tagline cc-button" v-for="(genre, key) in genres" :key="key" :class="{'cc-button--inActive': setGenreInactive(genre.active, genre.total)  }" style="margin-right:10px;margin-bottom:10px;font-weight:400">
                  {{ genre.name }} ({{ genre.total }})
                </button>
              </div>
              <button class="text-small" style v-if="filtersActive" @click="toggleAll(true)" style="margin-bottom:24px;background: none;text-decoration: underline;">Filters wissen</button>
            </div>
              <div class="cc-vue" style="margin-top:24px;">
                <div class="w-dyn-items w-row">
                  <div class="w-dyn-item w-dyn-item w-col w-col-4" v-for="(item, id) in filteredItems" :key="id">
                    <a v-on:click="goToPage(item.url)" class="video-card w-inline-block">
                      <div v-html="item.html"></div>
                    </a>
                  </div>
                  <div v-if="paginationNeeded" style="display:flex;flex-direction:row;justify-content:center;width:100%;align-items:center;">
                    <button v-bind:disabled="!startItem" v-on:click="changePage('previous')" v-bind:class="{'cc-button--inActive': !startItem }" class="button" style="margin-right:5px">
                      Vorige
                    </button>
<span style="margin-left:24px;margin-right:24px;">Pagina {{ activePage }} van {{ totalPages }}</span>
                    <button v-bind:disabled="disableIfLastPage" v-on:click="changePage('next')" v-bind:class="{'cc-button--inActive': disableIfLastPage }" class="button" style="margin-left:5px">
                      Volgende
                    </button>
                  </div>
                </div>
              </div>
            </div>`,
  mounted() {


    


      /* Check if there are url params set */

      const queryString = window.location.search;
      const urlParams = new URLSearchParams(queryString);
      const genresParams = urlParams.get('genres')
      const audienceParams = urlParams.get('audience')
      
      if(urlParams.get('untouchedGenres')) this.untouchedGenres = (urlParams.get('untouchedGenres') === 'true');
      if(urlParams.get('untouchedAudience')) this.untouchedAudience = (urlParams.get('untouchedAudience')  === 'true');

    
    

  //   var getUrlParameter = function getUrlParameter(sParam) {
  //     var sPageURL = window.location.search.substring(1),
  //         sURLVariables = sPageURL.split('&'),
  //         sParameterName,
  //         i;
  
  //     for (i = 0; i < sURLVariables.length; i++) {
  //         sParameterName = sURLVariables[i].split('=');
  
  //         if (sParameterName[0] === sParam) {
  //             return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
  //         }
  //     }
  // };


  // const audienceFilterFromUrl = getUrlParameter('audience');
  // console.log(audienceFilterFromUrl)

  

    const container = document.getElementById("vueVideoItems");
    const itemsObject = container.children;
    if (itemsObject) {
      const extraItems = [
    {
      "_archived": false,
      "_draft": false,
      "featured": true,
      "link-to-video": {
        "url": "https://vimeo.com/showcase/4766693/video/233490530",
        "metadata": {
          "width": 1280,
          "height": 720,
          "html": "<iframe class=\"embedly-embed\" src=\"//cdn.embedly.com/widgets/media.html?src=https%3A%2F%2Fplayer.vimeo.com%2Fvideo%2F233490530%3Fapp_id%3D122963&dntp=1&display_name=Vimeo&url=https%3A%2F%2Fvimeo.com%2F233490530&image=https%3A%2F%2Fi.vimeocdn.com%2Fvideo%2F868045605_1280.jpg&key=96f1f04c5f4143bcb0f2e68c87d65feb&type=text%2Fhtml&schema=vimeo\" width=\"1280\" height=\"720\" scrolling=\"no\" title=\"Vimeo embed\" frameborder=\"0\" allow=\"autoplay; fullscreen\" allowfullscreen=\"true\"></iframe>",
          "aspectRatio": 0,
          "title": "Odysseus. Een zwerver komt thuis. - ZANG 01",
          "provider_name": "Vimeo",
          "type": "video",
          "thumbnail_url": "https://i.vimeocdn.com/video/868045605_1280.jpg",
          "description": "ZANG 01 Aline Cornelissen, Nina Kortekaas, Hanne Van Doren, Jef Hellemans",
          "author_name": "KVS"
        }
      },
      "excerpt": "KVS & NTGent",
      "name": "Odysseus. Een zwerver komt thuis",
      "video-notes": "<p>Homeros’ klassieker in vertaling van Patrick Lateur en regie van Michael De Cock. Oercanon dus, maar genadeloos actueel. &nbsp;Het verhaal van een zwerver op drift, die na een veel te lange oorlog de veel te lange weg naar huis zoekt. Vrouwen, eilanden, zee en de inmenging van een weerbarstige god belemmeren zijn weg. Thuis wacht hem het ultieme gevecht om weer vader, vorst en echtgenoot te worden.Het theateravontuur in 24 zangen door een resem topacteurs. </p><p><a href=\"https://vimeo.com/showcase/4766693\">Bekijk de volledig reeks</a> van 24 zangen</p><p>‍</p><h5><em>Credits</em></h5><p><em>‍<br></em>Michael De Cock &amp; Patrick Lateur / KVS &amp; NTGent</p><p>‍</p><p>Opname video door<a href=\"http://www.beeldstorm.be\"> Beeldstorm</a> o.l.v. Jan Bosteels &nbsp;</p><p><br></p><p>‍</p>",
      "key-takeaways": "<ul><li>Theater</li><li>duur: 38 min</li><li>taal: Nederlands</li><li><a href=\"http://www.kvs.be\">KVS</a> &amp; NTGent</li></ul>",
      "video-length": "38 min (deel 1/24)",
      "thumbnail": {
        "fileId": "5e79207f503ad57f0256ec15",
        "url": "https://uploads-ssl.webflow.com/5e74d1a9ef22355294c7d60e/5e79207f503ad57f0256ec15_KVS_Odysseus_cover_captatie_landscape_web.jpeg",
        "alt": null
      },
      "slug": "odysseus-een-zwerver-komt-thuis",
      "category": "5e74d69ddafdf1330dd603cf",
      "updated-on": "2020-04-02T08:04:27.475Z",
      "updated-by": "Collaborator_5e79da9e4416e936dab4170f",
      "created-on": "2020-03-20T14:47:21.050Z",
      "created-by": "Person_52af55894ce045e60b000101",
      "published-on": "2020-04-02T08:27:50.286Z",
      "published-by": "Collaborator_5e776c2c1ede369771b8aeb1",
      "recorded-at": "Opgenomen in KVS, Brussel",
      "genre": "Theater",
      "social-share-description": "Homeros’ klassieker in vertaling van Patrick Lateur en regie van Michael De Cock. Oercanon dus, maar genadeloos actueel. Het verhaal van een zwerver op drift, die na een veel te lange oorlog de veel te lange weg naar huis zoekt. Vrouwen, eilanden, zee en de inmenging van een weerbarstige god belemmeren zijn weg. Thuis wacht hem het ultieme gevecht om weer vader, vorst en echtgenoot te worden.Het theateravontuur in 24 zangen door een resem topacteurs. ",
      "social-share-image": {
        "fileId": "5e79207f503ad57f0256ec15",
        "url": "https://uploads-ssl.webflow.com/5e74d1a9ef22355294c7d60e/5e79207f503ad57f0256ec15_KVS_Odysseus_cover_captatie_landscape_web.jpeg",
        "alt": null
      },
      "genre-v2": "5e7f791c831026496022722d",
      "_cid": "5e74d1a9ef2235c09ec7d619",
      "_id": "5e74d779d6d2298faf90b041"
    },
    {
      "_archived": false,
      "_draft": false,
      "featured": false,
      "link-to-video": {
        "url": "https://vimeo.com/207619121",
        "metadata": {
          "width": 1280,
          "height": 720,
          "html": "<iframe class=\"embedly-embed\" src=\"//cdn.embedly.com/widgets/media.html?src=https%3A%2F%2Fplayer.vimeo.com%2Fvideo%2F207619121%3Fapp_id%3D122963&dntp=1&display_name=Vimeo&url=https%3A%2F%2Fvimeo.com%2F207619121&image=https%3A%2F%2Fi.vimeocdn.com%2Fvideo%2F623253967_1280.jpg&key=c4e54deccf4d4ec997a64902e9a30300&type=text%2Fhtml&schema=vimeo\" width=\"1280\" height=\"720\" scrolling=\"no\" title=\"Vimeo embed\" frameborder=\"0\" allow=\"autoplay; fullscreen\" allowfullscreen=\"true\"></iframe>",
          "aspectRatio": 0,
          "title": "Dagboek van een verdwenene",
          "provider_name": "Vimeo",
          "type": "video",
          "thumbnail_url": "https://i.vimeocdn.com/video/623253967_1280.jpg",
          "description": "This is \"Dagboek van een verdwenene\" by Muziektheater Transparant on Vimeo, the home for high quality videos and the people who love them.",
          "author_name": "Muziektheater Transparant"
        }
      },
      "excerpt": "Muziektheater Transparant",
      "name": "Dagboek van een Verdwenene",
      "video-notes": "<p>\"Dagboek van een verdwenene\" was o.a. te gast te Klarafestival, Beijing Music Festival, BAM New York en Armel Opera Festival. In een regie van Ivo van Hove brengt componiste Annelies van Parys een antwoord op het aangrijpend liefdesverhaal van Leoš Janáček. Een reeks mysterieuze gedichten over de dorpsjongen Janik, die verliefd wordt op het zigeunermeisje Zefka en alles opgeeft om haar te volgen, inspireerde de 61-jarige Janáček (1854-1928) tot het schrijven van zijn poëtische liederencyclus voor stem en piano. &nbsp;De 22 kleine taferelen weerspiegelen niet alleen Janáček’s eigen verdriet over zijn onmogelijke liefde voor zijn veel jongere muze Kamila Stösslová maar evolueert in handen van Krystian Lada, Annelies Van Parys en Ivo van Hove tot een metavertelling die zich buigt over thema’s als passie, ontheemding en identiteit.</p><p><strong>Credits</strong></p><p>Compositie: Leoš Janáček • Nieuwe compositie: Annelies Van Parys • Regie: Ivo van Hove • Scenografie | Lichtontwerp: Jan Versweyveld • Kostuumontwerp: An D'Huys • Dramaturgie: Krystian Lada • Spel: Hugo Koolschijn • Tenor: Ed Lyon • Mezzosopraan: Marie Hamard • Piano: Lada Valesova • Koor: MM Solistenensemble van de Munt • Trees Bekwé • Isabelle Jacques • Raphaële Green <br>Productie: Muziektheater Transparant.<br>Coproductie: Internationaal Theater Amsterdam, Klarafestival, De Munt/La Monnaie Choral MM Academy, Kaaitheater, Les Théâtres de la Ville de Luxembourg, Operadagen Rotterdam &amp; Beijing Music Festival.</p><p>Opname als livestream door <a href=\"http://moose-stache.be/\">Moose-Stache</a> en <a href=\"http://www.beeldstorm.be\">Beeldstorm</a> (o.l.v. Jan Bosteels)</p><p>‍</p>",
      "key-takeaways": "<ul><li>opera</li><li>leeftijd: 18+</li><li>taal: Nederlands </li><li>duur: 61 min</li><li><a href=\"https://www.transparant.be/\" target=\"_blank\">Muziektheater Transparant</a></li></ul>",
      "transcript": "<h2>Ipsa natus odio et a inventore error voluptatem necessitatibus.</h2><p>Praesentium omnis nostrum voluptates harum reprehenderit ullam ipsa consectetur et. Autem error nostrum atque ratione ut iusto debitis ut aut. Voluptates et sit rerum commodi. Enim dolorem atque numquam minima recusandae. Veniam quia nisi qui eveniet vero delectus.</p><h3>Optio aut optio sed magnam.</h3><blockquote>Quam at nesciunt qui enim sunt quo officia explicabo. In ad autem minima perferendis sapiente sunt placeat doloribus aut. Odit aspernatur et voluptatem dolores vel. Saepe amet asperiores est quisquam iste ipsum.</blockquote><p>Dicta quis omnis. Ea minus numquam odit officiis veritatis. Eligendi illum debitis eum iure eligendi. Ab sit sunt est vero quis nemo vel debitis. Nihil repudiandae non libero consequatur numquam possimus velit ut consequatur.</p><p>Quis voluptatem sit consequatur facilis cupiditate. Saepe voluptatum ea. Ad quo commodi. Dolorem dolorem voluptas ut quae incidunt nulla recusandae quia voluptate. Enim et quia aspernatur iusto officiis modi repellat.</p>",
      "video-length": "61 min",
      "slug": "dagboek-van-een-verdwenene",
      "thumbnail": {
        "fileId": "5e7b0d0a7b2d237501faa64f",
        "url": "https://uploads-ssl.webflow.com/5e74d1a9ef22355294c7d60e/5e7b0d0a7b2d237501faa64f_Transparant_Dagboek%20van%20een%20verdwenene_%C2%A9_Jan%20Versweyveld_06.jpg",
        "alt": null
      },
      "category": "5e74d69ddafdf1330dd603cf",
      "updated-on": "2020-04-02T08:03:50.706Z",
      "updated-by": "Collaborator_5e79da9e4416e936dab4170f",
      "created-on": "2020-03-20T14:47:21.048Z",
      "created-by": "Person_52af55894ce045e60b000101",
      "published-on": "2020-04-02T08:27:50.286Z",
      "published-by": "Collaborator_5e776c2c1ede369771b8aeb1",
      "genre": "Opera",
      "recorded-at": "Opname in deSingel, Antwerpen",
      "age": "18+",
      "social-share-description": "\"Dagboek van een verdwenene\" was o.a. te gast te Klarafestival, Beijing Music Festival, BAM New York en Armel Opera Festival. In een regie van Ivo van Hove brengt componiste Annelies van Parys een antwoord op het aangrijpend liefdesverhaal van Leoš Janáček. Een reeks mysterieuze gedichten over de dorpsjongen Janik, die verliefd wordt op het zigeunermeisje Zefka en alles opgeeft om haar te volgen, inspireerde de 61-jarige Janáček (1854-1928) tot het schrijven van zijn poëtische liederencyclus voor stem en piano. De 22 kleine taferelen weerspiegelen niet alleen Janáček’s eigen verdriet over zijn onmogelijke liefde voor zijn veel jongere muze Kamila Stösslová maar evolueert in handen van Krystian Lada, Annelies Van Parys en Ivo van Hove tot een metavertelling die zich buigt over thema’s als passie, ontheemding en identiteit.",
      "social-share-image": {
        "fileId": "5e788e2e462811ef889030a4",
        "url": "https://uploads-ssl.webflow.com/5e74d1a9ef22355294c7d60e/5e788e2e462811ef889030a4_Transparant_Dagboek%20van%20een%20verdwenene_%C2%A9_Jan%20Versweyveld_06.jpg",
        "alt": null
      },
      "genre-v2": "5e7f7942a1676ddf89b435f4",
      "_cid": "5e74d1a9ef2235c09ec7d619",
      "_id": "5e74d7798e3d47448d6c1b10"
    },
    {
      "_archived": false,
      "_draft": false,
      "featured": true,
      "link-to-video": {
        "url": "https://www.youtube.com/watch?v=9rHupyUCJnQ",
        "metadata": {
          "width": 854,
          "height": 480,
          "html": "<iframe class=\"embedly-embed\" src=\"//cdn.embedly.com/widgets/media.html?src=https%3A%2F%2Fwww.youtube.com%2Fembed%2F9rHupyUCJnQ%3Ffeature%3Doembed&display_name=YouTube&url=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3D9rHupyUCJnQ&image=https%3A%2F%2Fi.ytimg.com%2Fvi%2F9rHupyUCJnQ%2Fhqdefault.jpg&key=96f1f04c5f4143bcb0f2e68c87d65feb&type=text%2Fhtml&schema=youtube\" width=\"854\" height=\"480\" scrolling=\"no\" title=\"YouTube embed\" frameborder=\"0\" allow=\"autoplay; fullscreen\" allowfullscreen=\"true\"></iframe>",
          "aspectRatio": 0,
          "title": "Kapitein Winokio's Berenconcert 2019",
          "provider_name": "YouTube",
          "type": "video",
          "thumbnail_url": "https://i.ytimg.com/vi/9rHupyUCJnQ/hqdefault.jpg",
          "description": "Kapitein Winokio's Berenconcert 2019",
          "author_name": "AB - Ancienne Belgique"
        }
      },
      "excerpt": "Kapitein Winokio",
      "name": "Kapitein Winokio: Berenconcerten met Selah Pooh, Isolde Lasoen, Jean Blaute & Stefaan Degand",
      "video-notes": "<p>Deze 10de (!) editie van de Berenconcerten blinkt extra hard, want behalve het dek van het schip, poetsen Kapitein Winokio, Mevrouw De Poes, De Matrozen én AB ook hun glimmende schoenen op voor de rode loper. En die roder loper is meer dan terecht, want tijdens de afgelopen edities passeerden indrukwekkende (al dan niet muzikale) guests de revue die zich perfect acclimatiseerden in De Wondere Wereld van Kapitein Winokio. Keer op keer waren het hartverwarmende voorstellingen met De Matrozen als gedroomde backing band waar élke Belgisch frontman/frontvrouw van droomt hen in te lijven.Opvallende guests dit jaar: begenadigd acteur Stefan Degand - die met zijn baritonstem tevens zijn eerste stappen in de Vlaamse Opera zette – en de fenomenale trommelaarster Isolde Lasoen. En, oh! Wie zou die illustere bekende Selah Pooh dan wel niet zijn?</p>",
      "key-takeaways": "<ul><li>concert</li><li>leeftijd: 4+</li><li>duur: 110 min</li><li>taal: Nederlands</li><li><a href=\"https://kapiteinwinokio.be/\">Kapitein Winokio</a></li></ul>",
      "transcript": "<h2>Suscipit magnam quaerat voluptatum.</h2><p>A deserunt quis. In ipsum repellendus blanditiis rerum porro dolorem porro. Vitae maxime magni aut placeat. Dolores aut earum fugit qui repellendus nisi ipsum. Quo nisi vero enim vel pariatur enim quia tempora.</p><h3>Illo voluptas nihil nobis qui.</h3><blockquote>Commodi omnis accusantium culpa molestiae accusantium. Excepturi est reiciendis sit veniam qui sapiente libero et consequatur. Laborum cumque sed illo quia sunt. Natus repudiandae reprehenderit.</blockquote><p>Ullam et veritatis eos qui veniam. Temporibus necessitatibus minima id et. Ipsam qui amet cupiditate ab iste quaerat asperiores. Eos sint voluptatem dolor voluptas corporis temporibus qui. Alias adipisci aut quia quaerat asperiores. Accusamus expedita ipsum aut sint quo assumenda quas ad.</p><p>Impedit omnis consectetur animi facilis aut. Provident voluptatibus sequi nesciunt veniam quo. Omnis quaerat occaecati dolor possimus nulla nesciunt voluptate vel facilis. Quibusdam eum omnis tempore rerum ea magnam. Qui ex laudantium porro eum inventore necessitatibus est.</p><h2>Pariatur dicta recusandae id.</h2><p>Voluptas omnis voluptates eligendi ab autem est ullam ut provident. Voluptates ad soluta. Quis soluta sint odit dolor nihil aliquam sed numquam.</p><h3>Distinctio rerum dicta recusandae omnis aut.</h3><blockquote>Quam et qui sed quasi. Asperiores omnis ipsum quis non fugit illum asperiores et. Possimus fuga qui. Eaque totam et inventore molestiae dolores neque.</blockquote><p>Quidem veniam quasi minima vero. Soluta repellendus nisi facilis optio. Qui blanditiis voluptas architecto fugiat vel. Et iusto eos eum quaerat neque quae. Adipisci aspernatur sed placeat est id fugit fugit natus.</p><p>Animi corporis debitis aut excepturi consequatur. Quod et aliquam aperiam illum aut qui temporibus. Fugiat et porro eos ipsa placeat non omnis assumenda est. Voluptas ipsam qui mollitia voluptate ea recusandae repudiandae. Voluptatem voluptas cumque fuga vel rerum aspernatur fuga cum.</p>",
      "video-length": "110 min",
      "thumbnail": {
        "fileId": "5e78ca9e36ef4a5a12759fa5",
        "url": "https://uploads-ssl.webflow.com/5e74d1a9ef22355294c7d60e/5e78ca9e36ef4a5a12759fa5_191228kapitein-winokio-berenconcerten-met-isolde-lasoen-stefaan-degand-the-mystery-guestkapitein-berenschow-2019-5.jpg",
        "alt": null
      },
      "slug": "kapitein-winokio",
      "category": "5e74d76a323fa1246360d029",
      "updated-on": "2020-04-15T14:32:37.540Z",
      "updated-by": "Collaborator_5e776c2c1ede369771b8aeb1",
      "created-on": "2020-03-20T14:47:20.743Z",
      "created-by": "Person_52af55894ce045e60b000101",
      "published-on": "2020-04-15T14:32:41.809Z",
      "published-by": "Collaborator_5e776c2c1ede369771b8aeb1",
      "recorded-at": "Opname in Ancienne Belgique, Brussel",
      "age": "4+",
      "social-share-description": "Deze 10de (!) editie van de Berenconcerten blinkt extra hard, want behalve het dek van het schip, poetsen Kapitein Winokio, Mevrouw De Poes, De Matrozen én AB ook hun glimmende schoenen op voor de rode loper. En die roder loper is meer dan terecht, want tijdens de afgelopen edities passeerden indrukwekkende (al dan niet muzikale) guests de revue die zich perfect acclimatiseerden in De Wondere Wereld van Kapitein Winokio. Keer op keer waren het hartverwarmende voorstellingen met De Matrozen als gedroomde backing band waar élke Belgisch frontman/frontvrouw van droomt hen in te lijven.Opvallende guests dit jaar: begenadigd acteur Stefan Degand - die met zijn baritonstem tevens zijn eerste stappen in de Vlaamse Opera zette – en de fenomenale trommelaarster Isolde Lasoen. En, oh! Wie zou die illustere bekende Selah Pooh dan wel niet zijn?",
      "social-share-image": {
        "fileId": "5e78ca9e36ef4a5a12759fa5",
        "url": "https://uploads-ssl.webflow.com/5e74d1a9ef22355294c7d60e/5e78ca9e36ef4a5a12759fa5_191228kapitein-winokio-berenconcerten-met-isolde-lasoen-stefaan-degand-the-mystery-guestkapitein-berenschow-2019-5.jpg",
        "alt": null
      },
      "genre-v2": "5e858fe7f29125b1216a43c5",
      "_cid": "5e74d1a9ef2235c09ec7d619",
      "_id": "5e74d778ffef9826a3132b35"
    },
    {
      "_archived": false,
      "_draft": false,
      "featured": false,
      "excerpt": "Zonzo Compagnie",
      "name": "THELONIOUS",
      "video-notes": "<p>Na de internationale hit Mile(s)tones, over Miles Davis, komt Zonzo Compagnie met een nieuwe voorstelling waarin een andere legendarische jazzmuzikant centraal staat: Thelonious Monk! De even koppige als geniale Monk maakte muziek vol verrassende harmonieën en avontuurlijke ritmes. De muzikanten van de het gerenommeerde jazztrio De Beren Gieren nemen je mee in de unieke muzikale wereld van de New Yorkse jazzheld. In een indrukwekkend videodecor met beelden van Nele Fack betrekken ze je bij Thelonious’ experimenteerdrang en tonen je telkens weer nieuwe kantjes van deze boeiende muzikant. Benjamin Vandewalle zorgde voor een levendige regie en lokte de muzikanten mee in een hilarische choreografie. Spring mee op deze beboptrein met het “Genius of Modern Music” en kruip onder de huid van Thelonious. Bestemming onbekend maar een waanzinnige rit verzekerd!</p><p>En te oordelen naar het huppende volkje rondom mij, is de jazzmissie geslaagd. (Theaterkrant)</p><p><strong>Credits</strong></p><p>BENJAMIN VANDEWALLE regie SIMON SEGERS of FREDERIK MEULYZER drums FULCO OTTERVANGER of SEPPE GEBRUERS piano LIEVEN VAN PÉE bas NELE FACK/STUDIO SANDY video PIETER NYS technisch ontwerp JOHANNA TRUDZINSKI kostuums STEVEN BONTINCK techniek</p><p>Een productie van Zonzo Compagnie in coproductie met Handelsbeurs, Krokusfestival, KAAP en De Grote Post. Met de steun van Vlaanderen en het Creative Europe Programme van de Europese Unie.</p>",
      "key-takeaways": "<ul><li>leeftijd: 6+</li><li>duur : 50 min</li><li>taal: Nederlands</li><li><a href=\"http://www.zonzocompagnie.be\">Zonzo Compagnie</a></li></ul>",
      "video-length": "50 min",
      "slug": "thelonious",
      "thumbnail": {
        "fileId": "5e7b0c2a09abef628c7bf1b8",
        "url": "https://uploads-ssl.webflow.com/5e74d1a9ef22355294c7d60e/5e7b0c2a09abef628c7bf1b8_Zonzo_THELONIOUS%20(c)%20Rudy%20Callier.jpg",
        "alt": null
      },
      "category": "5e74d76a323fa1246360d029",
      "updated-on": "2020-04-15T14:34:05.307Z",
      "updated-by": "Collaborator_5e776c2c1ede369771b8aeb1",
      "created-on": "2020-03-20T14:47:20.738Z",
      "created-by": "Person_52af55894ce045e60b000101",
      "published-on": "2020-04-15T14:34:14.453Z",
      "published-by": "Collaborator_5e776c2c1ede369771b8aeb1",
      "age": "6+",
      "recorded-at": "Handelsbeurs, Gent",
      "link-to-video": {
        "url": "https://vimeo.com/327923489",
        "metadata": {
          "width": 1920,
          "height": 1080,
          "html": "<iframe class=\"embedly-embed\" src=\"//cdn.embedly.com/widgets/media.html?src=https%3A%2F%2Fplayer.vimeo.com%2Fvideo%2F327923489%3Fapp_id%3D122963&dntp=1&display_name=Vimeo&url=https%3A%2F%2Fvimeo.com%2F327923489&image=https%3A%2F%2Fi.vimeocdn.com%2Fvideo%2F772334636_1280.jpg&key=96f1f04c5f4143bcb0f2e68c87d65feb&type=text%2Fhtml&schema=vimeo\" width=\"1920\" height=\"1080\" scrolling=\"no\" title=\"Vimeo embed\" frameborder=\"0\" allow=\"autoplay; fullscreen\" allowfullscreen=\"true\"></iframe>",
          "aspectRatio": 0,
          "title": "THELONIOUS full video",
          "provider_name": "Vimeo",
          "type": "video",
          "thumbnail_url": "https://i.vimeocdn.com/video/772334636_1280.jpg",
          "description": "A drummer, pianist and bassist take you to New York in the first half of the 20th century. As a child, Thelonious watches the piano keyboard over his big sister's shoulder and finds himself completely entranced by the instrument. What follows is a rollercoaster ride of memorable encounters, jam sessions, success stories and his fair share of bad luck.",
          "author_name": "Zonzo Compagnie"
        }
      },
      "social-share-description": "Na de internationale hit Mile(s)tones, over Miles Davis, komt Zonzo Compagnie met een nieuwe voorstelling waarin een andere legendarische jazzmuzikant centraal staat: Thelonious Monk! De even koppige als geniale Monk maakte muziek vol verrassende harmonieën en avontuurlijke ritmes. De muzikanten van de het gerenommeerde jazztrio De Beren Gieren nemen je mee in de unieke muzikale wereld van de New Yorkse jazzheld. In een indrukwekkend videodecor met beelden van Nele Fack betrekken ze je bij Thelonious’ experimenteerdrang en tonen je telkens weer nieuwe kantjes van deze boeiende muzikant. Benjamin Vandewalle zorgde voor een levendige regie en lokte de muzikanten mee in een hilarische choreografie. Spring mee op deze beboptrein met het “Genius of Modern Music” en kruip onder de huid van Thelonious. Bestemming onbekend maar een waanzinnige rit verzekerd!",
      "social-share-image": {
        "fileId": "5e790797b669107a4c7608d8",
        "url": "https://uploads-ssl.webflow.com/5e74d1a9ef22355294c7d60e/5e790797b669107a4c7608d8_Zonzo_THELONIOUS%20(c)%20Rudy%20Callier.jpg",
        "alt": null
      },
      "genre-v2": "5e7e3eed0a1abb2190eb7c26",
      "_cid": "5e74d1a9ef2235c09ec7d619",
      "_id": "5e74d7781e41c31b1168bdfa"
    },
    {
      "_archived": false,
      "_draft": false,
      "featured": false,
      "link-to-video": {
        "url": "https://www.youtube.com/watch?v=ZT5LXrvduls",
        "metadata": {
          "width": 854,
          "height": 480,
          "html": "<iframe class=\"embedly-embed\" src=\"//cdn.embedly.com/widgets/media.html?src=https%3A%2F%2Fwww.youtube.com%2Fembed%2FZT5LXrvduls%3Ffeature%3Doembed&display_name=YouTube&url=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3DZT5LXrvduls&image=https%3A%2F%2Fi.ytimg.com%2Fvi%2FZT5LXrvduls%2Fhqdefault.jpg&key=96f1f04c5f4143bcb0f2e68c87d65feb&type=text%2Fhtml&schema=youtube\" width=\"854\" height=\"480\" scrolling=\"no\" title=\"YouTube embed\" frameborder=\"0\" allow=\"autoplay; fullscreen\" allowfullscreen=\"true\"></iframe>",
          "aspectRatio": 0,
          "title": "B'Rock and Dmitry Sinkovsky - Viva Vivaldi",
          "provider_name": "YouTube",
          "type": "video",
          "thumbnail_url": "https://i.ytimg.com/vi/ZT5LXrvduls/hqdefault.jpg",
          "description": "ANTONIO VIVALDI Concerti op. 8 'Le Quattro Stagioni', RV 269, 315, 293, 297 Concerto In F per molti instrumenti, RV 569 Concerto RV 562 'per la sollenita di ...",
          "author_name": "B'Rock Orchestra"
        }
      },
      "excerpt": "B'Rock Orchestra ",
      "name": "Viva Vivaldi!",
      "video-notes": "<p>Blaffende honden, zingende koekoeken en ronkende dronkaards, Antonio Vivaldi zette ze allemaal zorgvuldig op muziek in zijn legendarische kwartet van vioolconcerti, De Vier seizoenen. Niet minder legendarisch – nu al! – is de violist die B’Rock naar Brugge haalt voor dit project vol beeldende en verbeeldende muziek. Het was in deze Concertzaal dat Dmitry Sinkovsky ooit het concours van het MAfestival won, en in één flitsende beweging ook de harten van het publiek.</p><p>Programma:ANTONIO VIVALDIConcerti op. 8 ‘Le Quattro Stagioni’, RV 269, 315, 293, 297 Concerto In F per molti instrumenti, RV 569 Concerto RV 562 ‘per la sollenita di San Lorenzo’, RV 562</p><p>Dmitry Sinkovsky: vioolsolo en muzikale leidingB’Rock Orchestra</p><p><em>Opname video door</em><a href=\"http://www.beeldstorm.be\" target=\"_blank\"><em> Beeldstorm</em></a><em> o.l.v. Jan Bosteels </em>&nbsp;</p><p>‍</p>",
      "key-takeaways": "<ul><li>concert</li><li>leeftijd: 18+</li><li>duur: 86 min</li><li>taal: Nederlands</li><li><a href=\"http://www.b-rock.org\" target=\"_blank\">B'Rock Orchestra</a></li></ul>",
      "transcript": "<h2>Est itaque perferendis labore quibusdam dolorum aut eum est.</h2><p>Sequi rerum qui id. Corrupti fuga sed omnis iure totam error ipsa est aperiam. Fuga praesentium repudiandae sed tenetur est et. Doloribus non sit et quod voluptatibus molestiae. Quia fugit culpa vel.</p><h3>Necessitatibus debitis itaque.</h3><blockquote>Sint voluptatibus id tempora. Suscipit dolores porro a doloribus. Ea quos rerum molestiae voluptatem sit nam. Alias voluptate eius omnis non qui eos tenetur. Laborum officia inventore beatae asperiores occaecati enim qui.</blockquote><p>Qui dolores cum. Esse quaerat consequatur id. Rerum est veniam. Illo voluptate et magni.</p><p>Nostrum dolore maxime vero. Dolores maiores corrupti quia perferendis pariatur fugit aut ratione. Blanditiis provident veritatis nulla. Unde officiis accusantium tenetur.</p>",
      "video-length": "86 min",
      "slug": "viva-vivaldi",
      "thumbnail": {
        "fileId": "5e790ee002418e81fa4b1721",
        "url": "https://uploads-ssl.webflow.com/5e74d1a9ef22355294c7d60e/5e790ee002418e81fa4b1721_BRock.jpg",
        "alt": null
      },
      "category": "5e74d69ddafdf1330dd603cf",
      "updated-on": "2020-04-02T07:54:50.730Z",
      "updated-by": "Collaborator_5e79da9e4416e936dab4170f",
      "created-on": "2020-03-20T14:47:20.735Z",
      "created-by": "Person_52af55894ce045e60b000101",
      "published-on": "2020-04-02T07:56:18.054Z",
      "published-by": "Person_52af55894ce045e60b000101",
      "recorded-at": "Opname in Concertgebouw Brugge",
      "age": "18+ ",
      "genre": "Concert",
      "social-share-description": "Blaffende honden, zingende koekoeken en ronkende dronkaards, Antonio Vivaldi zette ze allemaal zorgvuldig op muziek in zijn legendarische kwartet van vioolconcerti, De Vier seizoenen. Niet minder legendarisch – nu al! – is de violist die B’Rock naar Brugge haalt voor dit project vol beeldende en verbeeldende muziek. Het was in deze Concertzaal dat Dmitry Sinkovsky ooit het concours van het MAfestival won, en in één flitsende beweging ook de harten van het publiek.",
      "social-share-image": {
        "fileId": "5e790ee002418e81fa4b1721",
        "url": "https://uploads-ssl.webflow.com/5e74d1a9ef22355294c7d60e/5e790ee002418e81fa4b1721_BRock.jpg",
        "alt": null
      },
      "genre-v2": "5e858fe7f29125b1216a43c5",
      "_cid": "5e74d1a9ef2235c09ec7d619",
      "_id": "5e74d778941fa136f72b87e9"
    }
  ]
      
      
      const itemsArray = Object.keys(itemsObject).map(function (key) { return itemsObject[key]; });
      // const allItems = [...itemsArray, ...extraItems]

      
      /*  Get all the info out of the html and make an object per item.
          This would obviously be easier with the API, or create a service that
          extracts the collection to a json when article is saved or edited (webhook)
      */
      const updatedItems = itemsArray.map(this.setAttributes);
      this.items = updatedItems;
      /* Get all the items and create a list of genres */
      const genres = updatedItems.reduce(this.setGenres, {});
      /* Convert object to array */
      const genresArray = Object.keys(genres).map(function (key) {
        return { name: key, active: true, total: genres[key].total}
      });

      

      /** First for genres */
      let genresArrayUpdatedWithFilter = []
      if(genresParams !== null ) {
        genresArrayUpdatedWithFilter = genresArray.map(genre => {
          let newGenre = {}
          if(genresParams.indexOf(genre.name) > -1) {
            newGenre = {...genre }
          } else {
            newGenre = { ...genre, active: false }
          }

          
          

          return newGenre
        })
      } else {
        genresArrayUpdatedWithFilter = [...genresArray]
      }

      /** then for audience */
      let audienceArrayUpdatedWithFilter = []
      
      if(audienceParams !== null ) {
        audienceArrayUpdatedWithFilter = this.audience.map(audience => {
          let newAudience = {}
          if(audienceParams.indexOf(audience.name) > -1) {
            newAudience = {...audience }
          } else {
            newAudience = { ...audience, active: false }
          }
          return newAudience
        })
      } else {
        audienceArrayUpdatedWithFilter = [...this.audience]
      }

      
      
      
      this.audience = [...audienceArrayUpdatedWithFilter]
      this.genresDefaultObject = genres;
      this.genres = [...genresArrayUpdatedWithFilter];
      this.filterItems();

      /* Remove the fallback list */
      const fallback = document.getElementById("videoFallback");
      fallback.innerHTML = "";
    }


 
  },

  methods: {
    goToPage: function(url){
      console.log(url)
      // const audience = JSON.stringify(this.audience)
      // console.log(this.genres)
      const genresFiltered = this.genres.filter(item => item.active)
      const genresParam = genresFiltered.map(item => { if(item.active) {return item.name}})

      const audienceFiltered = this.audience.filter(item => item.active)
      const audienceParam = audienceFiltered.map(item => { if(item.active) {return item.name}})
      
      
      const audienceParamToParams = JSON.stringify(audienceParam)
      const genresParamToParams = JSON.stringify(genresParam)
      
      

      const untouchedAudience = this.untouchedAudience
      const untouchedGenres = this.untouchedGenres
      window.location.href = `/podiumaanhuisfilter/src/index.template.html?audience=${audienceParamToParams}&untouchedAudience=${untouchedAudience}&genres=${genresParamToParams}&untouchedGenres=${untouchedGenres}`;
      
    },
    setAttributes: function (item) {
      
      const theHTML = item.lastElementChild
      const withoutAnchor = theHTML.innerHTML
      const url = item.lastElementChild.getAttribute("href")
      /*  Gets all the info out of the html and make an object per item */
      let audience = "";
      let genre = "";
      let children = {};
      if (item) children = item.children[0].children;
      if (children[0]) audience = children[0].textContent.toLowerCase();
      if (children[1]) genre = children[1].textContent.toLowerCase();
      if (!genre) genre = "onbepaald";

      // console.log(item.)
      const updatedItem = {
        html: withoutAnchor,
        audience: audience,
        genre: genre,
        url: url
      };

      return updatedItem;
    },
    setGenres: function (acc, item) {
      const genre = item.genre;
      let total = 0;
      if (acc[genre]) {
        total = acc[genre].total;
      }
      const setGenre = { total: total + 1 };
      return { ...acc, [genre]: setGenre };
    },
    toggleAll: function (val) {
      const allGenresToActive = this.genres.map((i) => {
        const activeItem = { ...i, active: true };
        return activeItem;
      });
      this.genres = allGenresToActive;
      const allAudienceToActive = this.audience.map((i) => {
        const activeItem = { ...i, active: true };
        return activeItem;
      });
      this.audience = allAudienceToActive;

      this.untouchedAudience = true;
      this.untouchedGenres = true;
      this.filterItems();
    },
    toggleStatus: function (type, key, originalArray, allActive) {
      /* Back to first page */
      this.startItem = 0;

      const array = [...originalArray];
      const item = { ...array[key] };
      let updatedArray = [];

      //       if(type === 'genres') {
      //         if (allActive === array.length) {
      //           updatedArray = array.map(i => {
      //             return {...i, active: !i.active}
      //           });
      //         } else {
      //           updatedArray = [...array];
      //         }
      //         updatedArray = array.map(i => {
      //             return {...i, active: !i.active}
      //           });
      //         updatedItem = { ...array[key], active: !updatedArray[key].active };
      //       }

      if (type === "genres") {
        if (this.untouchedGenres === true && originalArray[key].active) {
          updatedArray = array.map((i, k) => {
            if (k === key) {
              return { ...i, active: i.active };
            } else {
              return { ...i, active: !i.active };
            }
          });

          updatedItem = { ...array[key], active: updatedArray[key].active };
        } else {
          updatedArray = [...array];
          updatedItem = { ...array[key], active: !updatedArray[key].active };
        }
      }

      if (type === "audience") {
        if (this.untouchedAudience === true && originalArray[key].active) {
          updatedArray = array.map((i, k) => {
            if (k === key) {
              return { ...i, active: i.active };
            } else {
              return { ...i, active: !i.active };
            }
          });

          updatedItem = { ...array[key], active: updatedArray[key].active };
        } else {
          updatedArray = [...array];
          updatedItem = { ...array[key], active: !updatedArray[key].active };
        }
      }

      /* If it's the first time the user clicks, we can make the active buttons coloured */
      if (type === "audience" && this.untouchedAudience === true) {
        this.untouchedAudience = false;
      }

      if (type === "genres" && this.untouchedGenres === true) {
        this.untouchedGenres = false;
      }

      updatedArray[key] = updatedItem;

      for (var i = 0; i < updatedArray.length; i++) {
        this.$set(originalArray, i, updatedArray[i]);
      }

      // console.log(originalArray[key], type);

//       let eventAction = "off";
//       if (originalArray[key].active) eventAction = "on";

//       gtag("event", eventAction, {
//         event_category: originalArray[key].name,
//         event_label: "Filter"
//       });

      this.filterItems();
    },
    setAudienceInactive: function (status) {
      console.log('untouchedAudience', this.untouchedAudience)
      if (this.untouchedAudience) {
        console.log('here 1')
        return true;
      }
      console.log('here')
      if (status) {

        console.log('here 2')
        return false;
      } else {
        return true;
      }
    },
    setGenreInactive: function (status, total) {
      
      if (this.untouchedGenres) {
        return true;
      }
      if (total === 0) return true;
      return !status;
    },
    changePage: function (val) {
      if (val === "next") {
        this.startItem = this.startItem + this.itemsPerPage;
      }
      if (val === "previous") {
        this.startItem = this.startItem - this.itemsPerPage;
      }

      this.filterItems();

      setTimeout(() => {
        let elmnt = document.getElementById("scrollToPagination");
        elmnt.scrollIntoView({ behavior: "smooth" });
      }, 100);
    },
    filterItems: function () {
      /* Items getting filtered*/
      /* 1) if the audience is active, return the item */

      let filteredItemsAudience = [];
      if (this.totalAudienceActive === 0) {
        filteredItemsAudience = this.items;
      } else {
        filteredItemsAudience = this.items.filter((item) => {
          const audience = this.audience.find(
            (element) => element.name === item.audience
          );
          if (audience) {
            if (audience.active) return item;
          }
        });
      }

      let filteredItemsGenre = [];

      const genresArray = this.genres;
      if (this.totalGenresActive === 0) {
        filteredItemsGenre = this.items;
      } else {
        filteredItemsGenre = filteredItemsAudience.filter((item) => {
          const genre = genresArray.find(
            (element) => element.name === item.genre
          );
          if (genre) {
            if (genre.active) return item;
          }
        });
      }

      const recountedGenres = filteredItemsAudience.reduce(this.setGenres, {});

      // Not functional
      const genresToZero = this.genresDefaultObject;
      for (let key in genresToZero) {
        if (genresToZero.hasOwnProperty(key)) {
          genresToZero[key].total = 0;
        }
      }

      const combinedGenres = {
        ...this.genresDefaultObject,
        ...recountedGenres
      };
      const recountedGenresArray = Object.keys(combinedGenres).map((key) => {
        return { ...combinedGenres[key], name: key };
      });

      const genresArrayCombined = recountedGenresArray.map((item, key) => {
        return { ...item, active: this.genres[key].active };
      });

      this.genres = genresArrayCombined;
      this.totalFilteredItems = filteredItemsGenre.length;
      const filteredItems = filteredItemsGenre.slice(
        this.startItem,
        this.endItem
      );
      this.filteredItems = filteredItems;
    }
  },

  computed: {
    totalGenresActive() {
      const values = this.genres.filter(function (item) {
        return item.active;
      });
      return values.length;
    },
    totalAudienceActive() {
      const values = this.audience.filter(function (item) {
        return item.active;
      });
      return values.length;
    },

    paginationNeeded() {
      return this.totalFilteredItems >= this.endItem - this.itemsPerPage
        ? true
        : false;
    },
    totalPages() {
      return Math.ceil(this.totalFilteredItems / this.itemsPerPage);
    },
    activePage() {
      if (this.startItem === 0) return 1;

      return this.startItem / this.itemsPerPage + 1;
    },
    disableIfLastPage() {
      return this.startItem + this.itemsPerPage >= this.totalFilteredItems
        ? true
        : false;
    },
    filtersActive() {
      const genresActive = this.totalGenresActive > 0;
      const audienceActive = this.totalAudiencesActive > 0;

      return (
        (genresActive || audienceActive) &&
        (!this.untouchedGenres || !this.untouchedAudience)
      );
    },
    endItem() {
      return this.startItem + this.itemsPerPage;
    }
  },
  data() {
    return {
      audience: [
        {
          name: "volwassenen",
          order: 0,
          active: true
        },
        {
          name: "familie",
          order: 1,
          active: true
        }
      ],
      items: [],
      filteredItems: [],
      itemsPerPage: 15,
      startItem: 0,
      genres: [],
      genresDefaultObject: {},
      totalFilteredItems: 0,
      untouchedAudience: true,
      untouchedGenres: true
    };
  }
});

!(function (o, c) {
  var n = c.documentElement,
    t = " w-mod-";
  (n.className += t + "js"),
    ("ontouchstart" in o || (o.DocumentTouch && c instanceof DocumentTouch)) &&
      (n.className += t + "touch");
})(window, document);



// for (var i = 0; i < document.getElementsByClassName("video-card").length; i++) {
//   const element = document.getElementsByClassName("video-card")[i];

      
//   element.addEventListener('click', function (event) {
    
//       const url = element.getAttribute("href");
//       console.log(url)
//       event.preventDefault();
      
    
//       return false;
//   });
// }

