export type Language = 'sr' | 'en';

export const translations = {
  sr: {
    nav: {
      about: 'O nama',
      achievements: 'Dostignuća',
      training: 'Treninzi',
      tournaments: 'Turniri',
      teams: 'Ekipe',
      gallery: 'Galerija',
      faq: 'FAQ',
      contact: 'Kontakt',
      joinUs: 'Pridruži se',
    },
    hero: {
      tagline: 'Sunce. Pesak. Strast.',
      title: 'Beach Volleyball\nKlub Novi Sad',
      subtitle: 'Profesionalni klub odbojke na pesku — za sve uzraste i nivoe',
      ctaPrimary: 'Prijavi se na trening',
      ctaSecondary: 'O klubu',
    },
    about: {
      sectionLabel: 'O nama',
      title: 'Naša priča',
      p1: 'Klub odbojke na pesku Novi Sad osnovali su profesionalni igrači i treneri sa željom da doprinesu razvoju i popularizaciji odbojke na pesku u Srbiji.',
      p2: 'Verujemo da je odbojka na pesku jedan od najlepših sportova — spoj prirode, energije, druženja i sportskog duha. Sunce, pesak, lopta i dobra atmosfera čine ovaj sport jedinstvenim iskustvom.',
      p3: 'Naš cilj je da kroz kvalitetan rad, treninge i organizaciju sportskih događaja razvijamo nove generacije igrača i doprinesemo rastu beach volley scene u Novom Sadu i regionu.',
      founded: 'Osnovano',
      location: 'Lokacija',
      locationValue: 'Štrand, Novi Sad',
    },
    achievements: {
      sectionLabel: 'Dostignuća',
      title: 'Naši Uspesi',
      subtitle: 'Od osnivanja 2021. godine, klub je ostvario izuzetne rezultate na domaćoj i međunarodnoj sceni.',
      items: [
        {
          title: 'Državni Prvak Srbije',
          year: '2025',
          desc: 'Osvojili smo prvo klupsko državno prvenstvo Srbije u odbojci na pesku.',
        },
        {
          title: 'Evropske Kvalifikacije',
          year: '2025',
          desc: 'Zauzeli smo 2. mesto na evropskim kvalifikacijama — svega nekoliko poena od finalnog dela evropskog klupskog prvenstva.',
        },
        {
          title: 'Internacionalni Turnir',
          year: 'od 2021.',
          desc: 'Organizatori smo internacionalnog turnira na Štrandu od osnivanja kluba, kontinuirano promovišući beach volley scenu.',
        },
        {
          title: 'Selektori Reprezentacija',
          year: 'višestruko',
          desc: 'Članovi kluba bili su selektori seniorskih reprezentacija Srbije i nacionalnih selekcija drugih država.',
        },
        {
          title: 'Višestruki Prvaci',
          year: 'višestruko',
          desc: 'Naši igrači su višestruki prvaci Srbije i osvajači značajnih medalja na međunarodnim takmičenjima.',
        },
        {
          title: 'Međunarodna Scena',
          year: 'Balkan · Evropa · Svet',
          desc: 'Igrači kluba nastupaju na turnirima širom Balkana, Evrope i na međunarodnoj svetskoj sceni.',
        },
      ],
    },
    training: {
      sectionLabel: 'Treninzi',
      title: 'Trenirај Sa Nama',
      subtitle: 'Organizujemo treninge i školu odbojke na pesku za sve uzraste od 12 godina i starije.',
      groups: [
        { name: 'Početnička grupa', ages: '12+ god.', desc: 'Za one koji tek upoznaju odbojku na pesku. Učenje osnova u opuštenoj i podstičućoj atmosferi.' },
        { name: 'Rekreativna grupa', ages: 'Svi uzrasti', desc: 'Savršeno za ljubitelje sporta koji žele aktivnost, zabavu i dobru atmosferu.' },
        { name: 'Takmičarska grupa', ages: 'Po selekciji', desc: 'Za igrače koji žele da se takmiče na državnom nivou i razvijaju profesionalni nivo igre.' },
      ],
      howToJoin: 'Kako se prijaviti',
      steps: [
        'Pošalji poruku na Instagram ili email',
        'Dogovaramo termin za probni trening',
        'Probni trening je besplatan za sve',
        'Biramo grupu prema uzrastu i nivou',
      ],
      ctaLabel: 'Pošalji poruku',
      equipment: 'Oprema za prvi trening',
      equipmentList: ['Majica i šorc', 'Flašica vode', 'Naočare za sunce', 'Krema za sunčanje'],
    },
    tournaments: {
      sectionLabel: 'Turniri & Događaji',
      title: 'Turniri Na Štrandu',
      subtitle: 'Svake godine organizujemo profesionalni internacionalni turnir i više amaterskih takmičenja u Novom Sadu.',
      events: [
        {
          name: 'Internacionalni Profesionalni Turnir',
          badge: 'Godišnje',
          desc: 'Flagship turnir kluba na Štrandu koji okuplja domaće i međunarodne igrače. Jedan od najznačajnijih beach volley događaja u regionu.',
        },
        {
          name: 'Amaterski Turnir — Muška Kategorija',
          badge: 'Višestruko godišnje',
          desc: 'Otvoreno takmičenje za sve ljubitelje igre. Odlična atmosfera, pravi trofej, nezaboravno iskustvo na pesku.',
        },
        {
          name: 'Amaterski Turnir — Ženska Kategorija',
          badge: 'Višestruko godišnje',
          desc: 'Turnir posvećen ženskim parovima. Takmičite se, upoznajte nove ljude, uživajte u sportu.',
        },
        {
          name: 'Mix Turnir',
          badge: 'Višestruko godišnje',
          desc: 'Mešoviti parovi na terenu — fun format koji spaja sve ljubitelje odbojke na pesku.',
        },
      ],
      upcoming: 'Novi projekti i turniri na atraktivnoj lokaciji u Novom Sadu su u pripremi. Pratite nas!',
    },
    teams: {
      sectionLabel: 'Ekipe',
      title: 'Naš Tim',
      subtitle: 'Upoznajte igrače i trenere kluba. Profili dolaze uskoro.',
      comingSoon: 'Profili igrača i trenera biće objavljeni uskoro.',
    },
    gallery: {
      sectionLabel: 'Galerija',
      title: 'Sa Terena',
    },
    faq: {
      sectionLabel: 'FAQ',
      title: 'Često Postavljana Pitanja',
      items: [
        {
          q: 'Da li je potrebno prethodno iskustvo za treninge?',
          a: 'Prethodno iskustvo nije potrebno. Na treninzima imamo početnike, rekreativce, bivše odbojkaše iz dvorane, kao i igrače koji su se nakon više godina ponovo vratili sportu.',
        },
        {
          q: 'Koji je minimalni uzrast za treninge?',
          a: 'Minimalni uzrast za priključenje treninzima je oko 11–12 godina.',
        },
        {
          q: 'Gde se održavaju treninzi?',
          a: 'Treninzi se održavaju na Štrandu u Novom Sadu.',
        },
        {
          q: 'Kako mogu da se prijavim na trening?',
          a: 'Na treninge se možete prijaviti putem Instagram stranice kluba ili email adrese navedene u kontakt sekciji sajta.',
        },
        {
          q: 'Da li postoje grupe za početnike i rekreativce?',
          a: 'Da. Formiramo različite grupe prema uzrastu i nivou iskustva, uključujući početnike, rekreativce i takmičarske grupe.',
        },
        {
          q: 'Koliko puta nedeljno se održavaju treninzi?',
          a: 'Tokom sezone treninzi se održavaju gotovo svakodnevno, a broj treninga zavisi od grupe i nivoa igrača.',
        },
        {
          q: 'Da li je moguće doći na probni trening?',
          a: 'Naravno. Svi zainteresovani mogu doći na probni trening i upoznati se sa načinom rada kluba. Probni trening je besplatan.',
        },
        {
          q: 'Ko vodi treninge?',
          a: 'Treninge vode iskusni treneri sa dugogodišnjim iskustvom rada sa decom i profesionalnim igračima, kao i iskustvom na međunarodnim kampovima.',
        },
        {
          q: 'Da li organizujete rekreativne i amaterske turnire?',
          a: 'Da. Tokom godine organizujemo više amaterskih i rekreativnih turnira u muškoj, ženskoj i mix kategoriji.',
        },
        {
          q: 'Šta je potrebno od opreme za prvi trening?',
          a: 'Za prvi trening potrebni su: majica, šorc, flašica vode, naočare za sunce i krema za sunčanje.',
        },
      ],
    },
    contact: {
      sectionLabel: 'Kontakt',
      title: 'Kontaktiraj Nas',
      subtitle: 'Imaš pitanje? Pošalji nam poruku na Instagram ili ispuni formu.',
      instagram: 'Instagram',
      email: 'Email',
      emailValue: 'beachvolleyballclubns@gmail.com',
      location: 'Lokacija',
      locationValue: 'Štrand, Novi Sad, Srbija',
      formName: 'Ime i prezime',
      formEmail: 'Email adresa',
      formMessage: 'Poruka',
      formSend: 'Pošalji poruku',
      formSuccess: 'Hvala! Javićemo se uskoro.',
    },
    footer: {
      rights: 'Sva prava zadržana.',
      followUs: 'Prati nas',
    },
  },
  en: {
    nav: {
      about: 'About',
      achievements: 'Achievements',
      training: 'Training',
      tournaments: 'Tournaments',
      teams: 'Teams',
      gallery: 'Gallery',
      faq: 'FAQ',
      contact: 'Contact',
      joinUs: 'Join Us',
    },
    hero: {
      tagline: 'Sun. Sand. Passion.',
      title: 'Beach Volleyball\nClub Novi Sad',
      subtitle: 'Professional beach volleyball club — for all ages and skill levels',
      ctaPrimary: 'Join Training',
      ctaSecondary: 'About Us',
    },
    about: {
      sectionLabel: 'About',
      title: 'Our Story',
      p1: 'Novi Sad Beach Volleyball Club was founded by professional players and coaches with a mission to develop and popularize beach volleyball in Serbia.',
      p2: 'We believe beach volleyball is one of the most beautiful sports — a combination of nature, energy, social connection and athletic spirit. Sun, sand, a ball and great atmosphere make this sport a unique experience.',
      p3: 'Our goal is to develop new generations of players through quality training and event organization, contributing to the growth of the beach volley scene in Novi Sad and the region.',
      founded: 'Founded',
      location: 'Location',
      locationValue: 'Štrand, Novi Sad',
    },
    achievements: {
      sectionLabel: 'Achievements',
      title: 'Our Achievements',
      subtitle: 'Since our founding in 2021, the club has achieved exceptional results on the domestic and international stage.',
      items: [
        {
          title: 'Serbian Club Champions',
          year: '2025',
          desc: 'We won the first club Serbian national championship in beach volleyball.',
        },
        {
          title: 'European Qualifications',
          year: '2025',
          desc: '2nd place at European qualifications — just a few points away from the European Club Championship final eight.',
        },
        {
          title: 'International Tournament',
          year: 'since 2021',
          desc: 'We have been organizing the international tournament at Štrand since the club\'s founding.',
        },
        {
          title: 'National Team Selectors',
          year: 'multiple times',
          desc: 'Club members have served as selectors of the Serbian senior national team and other national teams.',
        },
        {
          title: 'Multiple National Champions',
          year: 'multiple times',
          desc: 'Our players are multiple Serbian champions and holders of significant medals at international competitions.',
        },
        {
          title: 'International Stage',
          year: 'Balkans · Europe · World',
          desc: 'Club players compete in tournaments across the Balkans, Europe, and on the international world stage.',
        },
      ],
    },
    training: {
      sectionLabel: 'Training',
      title: 'Train With Us',
      subtitle: 'We organize training sessions and a beach volleyball school for all ages from 12 years and older.',
      groups: [
        { name: 'Beginner Group', ages: '12+ yrs', desc: 'For those just discovering beach volleyball. Learning the fundamentals in a relaxed and encouraging atmosphere.' },
        { name: 'Recreational Group', ages: 'All ages', desc: 'Perfect for sports enthusiasts who want activity, fun and great company on the sand.' },
        { name: 'Competitive Group', ages: 'By selection', desc: 'For players who want to compete at the national level and develop professional game skills.' },
      ],
      howToJoin: 'How to join',
      steps: [
        'Send us a message on Instagram or email',
        'We schedule a trial training session',
        'Trial training is free for everyone',
        'We place you in the right group',
      ],
      ctaLabel: 'Send a message',
      equipment: 'Equipment for first training',
      equipmentList: ['T-shirt and shorts', 'Water bottle', 'Sunglasses', 'Sunscreen'],
    },
    tournaments: {
      sectionLabel: 'Tournaments & Events',
      title: 'Tournaments At Štrand',
      subtitle: 'Every year we organize a professional international tournament and multiple amateur competitions in Novi Sad.',
      events: [
        {
          name: 'International Professional Tournament',
          badge: 'Annual',
          desc: 'The club\'s flagship tournament at Štrand, gathering domestic and international players. One of the most important beach volleyball events in the region.',
        },
        {
          name: 'Amateur Tournament — Men\'s',
          badge: 'Multiple times per year',
          desc: 'Open competition for all enthusiasts. Great atmosphere, real trophy, unforgettable experience on the sand.',
        },
        {
          name: 'Amateur Tournament — Women\'s',
          badge: 'Multiple times per year',
          desc: 'Tournament dedicated to women\'s pairs. Compete, meet new people, enjoy the sport.',
        },
        {
          name: 'Mix Tournament',
          badge: 'Multiple times per year',
          desc: 'Mixed pairs on the court — a fun format that brings together all beach volleyball lovers.',
        },
      ],
      upcoming: 'New projects and tournaments at an attractive location in Novi Sad are in preparation. Follow us!',
    },
    teams: {
      sectionLabel: 'Teams',
      title: 'Our Team',
      subtitle: 'Meet the players and coaches of the club. Profiles coming soon.',
      comingSoon: 'Player and coach profiles will be published soon.',
    },
    gallery: {
      sectionLabel: 'Gallery',
      title: 'From The Court',
    },
    faq: {
      sectionLabel: 'FAQ',
      title: 'Frequently Asked Questions',
      items: [
        {
          q: 'Is previous experience required for training?',
          a: 'No previous experience is required. We have absolute beginners, recreational players, former indoor volleyball players, and players returning to the sport after years away.',
        },
        {
          q: 'What is the minimum age for training?',
          a: 'The minimum age to join training sessions is around 11–12 years.',
        },
        {
          q: 'Where do training sessions take place?',
          a: 'Training sessions take place at Štrand in Novi Sad.',
        },
        {
          q: 'How can I sign up for training?',
          a: 'You can sign up via the club\'s Instagram page or the email address listed in the contact section of the website.',
        },
        {
          q: 'Are there groups for beginners and recreational players?',
          a: 'Yes. We form different groups based on age and experience level, including beginners, recreational players, and competitive groups.',
        },
        {
          q: 'How many times per week are training sessions held?',
          a: 'During the season, training sessions are held almost daily, and the number of sessions depends on the group and player level.',
        },
        {
          q: 'Is it possible to come to a trial training session?',
          a: 'Absolutely. Everyone interested can come to a trial training session and get familiar with how the club works. The trial session is free.',
        },
        {
          q: 'Who leads the training sessions?',
          a: 'Training is led by experienced coaches with years of experience working with children and professional players, as well as experience at international camps.',
        },
        {
          q: 'Do you organize recreational and amateur tournaments?',
          a: 'Yes. Throughout the year we organize multiple amateur and recreational tournaments in men\'s, women\'s, and mixed categories.',
        },
        {
          q: 'What equipment is needed for the first training?',
          a: 'For the first training session you need: a t-shirt, shorts, a water bottle, sunglasses, and sunscreen.',
        },
      ],
    },
    contact: {
      sectionLabel: 'Contact',
      title: 'Get In Touch',
      subtitle: 'Have a question? Send us a message on Instagram or fill out the form.',
      instagram: 'Instagram',
      email: 'Email',
      emailValue: 'beachvolleyballclubns@gmail.com',
      location: 'Location',
      locationValue: 'Štrand, Novi Sad, Serbia',
      formName: 'Full name',
      formEmail: 'Email address',
      formMessage: 'Message',
      formSend: 'Send message',
      formSuccess: 'Thank you! We\'ll get back to you soon.',
    },
    footer: {
      rights: 'All rights reserved.',
      followUs: 'Follow us',
    },
  },
} as const;

export type Translations = typeof translations['sr'];
