export type MenuCategory =
  | 'Tout'
  | 'Entrées'
  | 'Spécialités Béninoises'
  | 'Braises & Grillades'
  | 'À Partager'
  | 'Feu de Bois & Bistro'
  | 'Cocktails & Douceurs';

export type SpaceId = 'rdc-live' | 'etage-mezzanine' | 'fumoir' | 'wakanda';

export interface MenuItem {
  id: string;
  name: string;
  category: Exclude<MenuCategory, 'Tout'>;
  priceFcfa: number;
  description: string;
  serves?: number;
  highlight?: string;
}

export interface SpaceInfo {
  id: SpaceId;
  index: string;
  levelLabel: string;
  name: string;
  tagline: string;
  description: string;
  capacity: string;
  ambiance: string;
  scheduleNote: string;
}

export interface LiveEvent {
  id: string;
  day: string;
  hours: string;
  title: string;
  space: string;
  lineup: string;
  mood: string;
}

export interface GuestReview {
  id: string;
  author: string;
  context: string;
  rating: string;
  quote: string;
}

export const RESTAURANT_INFO = {
  name: 'Kirikou',
  fullName: 'Kirikou Restaurant & Bar',
  neighborhood: 'Fidjrossè · Quartier Houénoussou',
  street: 'Rue Houdou Ali (Axe Aéroport — Route des Pêches)',
  city: 'Cotonou, Bénin',
  hours: '12h00 – 02h00',
  daysOpen: 'Ouvert 7j/7',
  phones: ['+229 01 64 32 19 19', '+229 01 96 92 85 85'],
  ratingScore: '4,2 / 5',
  reviewCount: '+1 000 avis vérifiés',
  officialSite: 'kirikourestaurant.com',
  services: ['Sur place', 'À emporter', 'Livraison Cotonou'],
};

export const MENU_CATEGORIES: MenuCategory[] = [
  'Tout',
  'Entrées',
  'Spécialités Béninoises',
  'Braises & Grillades',
  'À Partager',
  'Feu de Bois & Bistro',
  'Cocktails & Douceurs',
];

export const SPACES: SpaceInfo[] = [
  {
    id: 'rdc-live',
    index: '01',
    levelLabel: 'Rez-de-Chaussée',
    name: 'Restaurant & Scène Live',
    tagline: 'Le cœur battant du Kirikou au pied du podium',
    description:
      'Grande salle conviviale structurée autour du podium central. Idéale pour dîner en groupe au plus près de l’orchestre live et vibrer au rythme des cuivres et percussions.',
    capacity: 'Jusqu’à 90 couverts',
    ambiance: 'Animée & musicale',
    scheduleNote: 'Orchestre live mercredi au dimanche dès 20h30',
  },
  {
    id: 'etage-mezzanine',
    index: '02',
    levelLabel: '1er Étage',
    name: 'Mezzanine Panoramique',
    tagline: 'Dîner en hauteur avec vue plongeante sur la scène',
    description:
      'Balcon intérieur surplombant le rez-de-chaussée. Profitez de la musique live et de l’énergie de la salle tout en conservant un confort d’écoute idéal pour les dîners d’affaires ou en famille.',
    capacity: 'Tables de 2 à 12 personnes',
    ambiance: 'Conviviale & panoramique',
    scheduleNote: 'Vue directe sur l’orchestre · Service continu jusqu’à 01h30',
  },
  {
    id: 'fumoir',
    index: '03',
    levelLabel: 'Espace Clos',
    name: 'Le Fumoir',
    tagline: 'Un refuge feutré pour vos conversations en toute intimité',
    description:
      'Salon fermé à l’acoustique maîtrisée, pensé pour ceux qui recherchent une atmosphère discrète, des lumières tamisées et un service attentionné autour d’un verre.',
    capacity: 'Salon privé 28 places',
    ambiance: 'Feutrée & confidentielle',
    scheduleNote: 'Accès libre ou privatisation partielle sur demande',
  },
  {
    id: 'wakanda',
    index: '04',
    levelLabel: 'Dernier Niveau · R+2',
    name: 'Le Wakanda',
    tagline: 'Rooftop festif, cocktails signature et fins de soirée',
    description:
      'L’espace perché du dernier niveau dédié aux performances DJ, shows nocturnes et cocktails tardifs sous le ciel de Fidjrossè. La destination naturelle après le dîner.',
    capacity: 'Lounge & bar 70 places',
    ambiance: 'Festive & nocturne',
    scheduleNote: 'Ouvert en soirée jusqu’à 02h00 · DJ & performances',
  },
];

export const MENU_ITEMS: MenuItem[] = [
  // Entrées
  {
    id: 'mini-fours',
    name: 'Assiette de Mini-Fours',
    category: 'Entrées',
    priceFcfa: 4000,
    description: 'Assortiment croustillant de pastels au poisson, nems dorés et fatayas maison servis chauds.',
    highlight: 'Classique apéritif',
  },
  {
    id: 'salade-kirikou',
    name: 'Salade Kirikou',
    category: 'Entrées',
    priceFcfa: 5000,
    description: 'Laitue croquante, émincé de blanc de poulet grillé, jambon, œuf dur, tomates fraîches, carottes et pommes de terre.',
    highlight: 'Signature',
  },
  {
    id: 'entree-chaude-gourmande',
    name: 'Entrée Chaude Gourmande',
    category: 'Entrées',
    priceFcfa: 6000,
    description: 'Mijoté crémeux de blanc de poulet, carottes fondantes, petits pois et pommes de terre nappés d’une sauce onctueuse.',
  },
  {
    id: 'avocat-crevettes',
    name: 'Avocat aux Crevettes',
    category: 'Entrées',
    priceFcfa: 6500,
    description: 'Avocat mûr à point garni de crevettes fraîches de la côte et sauce cocktail relevée.',
  },
  {
    id: 'salade-duo-proteine',
    name: 'Salade Duo Protéiné',
    category: 'Entrées',
    priceFcfa: 6500,
    description: 'Composition généreuse mêlant grillades émincées, œufs, crudités de saison et vinaigrette aux herbes.',
  },

  // Spécialités Béninoises & Maquis Chic
  {
    id: 'garba-thon',
    name: 'Garba de Poisson Thon',
    category: 'Spécialités Béninoises',
    priceFcfa: 4500,
    description: 'Attiéké léger accompagné de thon frit doré, oignons rouges, tomates et piment frais du maquis.',
  },
  {
    id: 'crincrin-royale',
    name: 'Crincrin Royale',
    category: 'Spécialités Béninoises',
    priceFcfa: 6500,
    description: 'Sauce traditionnelle de feuilles de corète préparée dans les règles de l’art avec viande tendre, poisson fumé et crabe.',
    highlight: 'Terroir béninois',
  },
  {
    id: 'mantindjan',
    name: 'Mantindjan Traditionnel',
    category: 'Spécialités Béninoises',
    priceFcfa: 7000,
    description: 'Sauce aux feuilles locales mijotée lentement aux épices du sud-Bénin, servie avec l’accompagnement de votre choix.',
  },
  {
    id: 'koklo-mimin',
    name: 'Koklo Mimin',
    category: 'Spécialités Béninoises',
    priceFcfa: 7000,
    description: 'Poulet local rôti et mariné façon Cotonou, accompagné d’oignons confits et sauce pimentée maison.',
  },
  {
    id: 'mouton-piron',
    name: 'Mouton Sauté & son Piron',
    category: 'Spécialités Béninoises',
    priceFcfa: 7500,
    description: 'Dés de mouton sautés aux aromates et piment doux, servis avec un piron rouge ou blanc chaud.',
  },
  {
    id: 'dakouin',
    name: 'Dakouin Poisson Frais & Piron',
    category: 'Spécialités Béninoises',
    priceFcfa: 8000,
    description: 'Grand classique béninois : poisson frais entier mijoté dans une sauce tomate parfumée aux épices locales, servi avec son piron doré.',
    highlight: 'Coup de cœur',
  },
  {
    id: 'peche-du-jour',
    name: 'Pêche du Jour Grillée',
    category: 'Spécialités Béninoises',
    priceFcfa: 9500,
    description: 'Arrivage côtier du matin (bar ou dorade) saisi sur braise avec citron vert, ail et attiéké ou alloco.',
  },

  // Braises & Grillades
  {
    id: 'choukouya-poulet',
    name: 'Choukouya de Poulet',
    category: 'Braises & Grillades',
    priceFcfa: 7000,
    description: 'Poulet mariné aux épices ouest-africaines, saisi sur bois de chauffe avec oignons caramélisés et moutarde.',
    highlight: 'Best-seller',
  },
  {
    id: 'choukouya-mouton',
    name: 'Choukouya de Mouton',
    category: 'Braises & Grillades',
    priceFcfa: 7000,
    description: 'Morceaux d’agneau et de mouton longuement parfumés puis grillés à la braise, servis avec alloco ou frites.',
    highlight: 'Best-seller',
  },
  {
    id: 'lapin-braise',
    name: 'Lapin Braisé ou en Choukouya',
    category: 'Braises & Grillades',
    priceFcfa: 7000,
    description: 'Lapin entier découpé, mariné aux herbes fraîches et grillé lentement au charbon ou à la crème.',
  },
  {
    id: 'poulet-bicyclette',
    name: 'Poulet Bicyclette Braisé',
    category: 'Braises & Grillades',
    priceFcfa: 7500,
    description: 'Volaille fermière à chair ferme grillée au feu de bois, servie avec bananes plantains frites et sauce verte.',
  },
  {
    id: 'dibi-senegalais',
    name: 'Dibi Sénégalais au Feu de Bois',
    category: 'Braises & Grillades',
    priceFcfa: 8000,
    description: 'Mouton grillé à la flamme vive façon Dakar, oignons fondants, moutarde forte et piment maison.',
  },
  {
    id: 'pintade-entiere',
    name: 'Pintade Entière Braisée',
    category: 'Braises & Grillades',
    priceFcfa: 11000,
    description: 'Pintade fermière rôtie entière aux épices douces, idéale pour un grand appétit ou à partager à deux.',
  },
  {
    id: 'gambas-plancha',
    name: 'Gambas à la Plancha ou Provençale',
    category: 'Braises & Grillades',
    priceFcfa: 12000,
    description: 'Grosses gambas saisies à l’ail, persil plat et pointe de citron vert ou mijotées en sauce provençale.',
  },

  // À Partager (Entre potes ou en famille)
  {
    id: 'formule-foodporn',
    name: 'Formule FoodPorn (4 personnes)',
    category: 'À Partager',
    priceFcfa: 28000,
    serves: 4,
    description: 'Plateau royal pour 4 convives : poulet fermier braisé, mouton choukouya, escargots sautés, lapin braisé et accompagnements au choix.',
    highlight: 'Pour 4 pers.',
  },
  {
    id: 'planche-fiesta',
    name: 'Planche Fiesta (6 personnes)',
    category: 'À Partager',
    priceFcfa: 40000,
    serves: 6,
    description: 'Grande planche festive pour 6 personnes réunissant gambas grillées, poulet braisé, mouton choukouya, escargots, lapin et garnitures.',
    highlight: 'Pour 6 pers.',
  },

  // Feu de Bois & Bistro
  {
    id: 'chawarma-maison',
    name: 'Chawarma Maison',
    category: 'Feu de Bois & Bistro',
    priceFcfa: 4500,
    description: 'Pain libanais toasté garni d’émincé de viande marinée, crudités croquantes, frites et sauce ail maison.',
  },
  {
    id: 'burger-kirikou',
    name: 'Burger Kirikou Double Braise',
    category: 'Feu de Bois & Bistro',
    priceFcfa: 5500,
    description: 'Steak haché frais grillé, cheddar fondant, oignons confits, pickles et frites dorées maison.',
  },
  {
    id: 'pizza-royale-feu',
    name: 'Pizza Royale au Feu de Bois',
    category: 'Feu de Bois & Bistro',
    priceFcfa: 7500,
    description: 'Pâte fine étirée à la main, coulis de tomate mijoté, mozzarella, jambon, champignons frais et olives noires.',
  },
  {
    id: 'pizza-fruits-mer',
    name: 'Pizza Océane de Cotonou',
    category: 'Feu de Bois & Bistro',
    priceFcfa: 9000,
    description: 'Cuisson au feu de bois, crevettes, calamars sautés à l’ail, mozzarella filante et persillade fraîche.',
  },

  // Cocktails & Douceurs
  {
    id: 'jus-frais-locaux',
    name: 'Jus Frais Pressés (Bissap · Gingembre · Ananas)',
    category: 'Cocktails & Douceurs',
    priceFcfa: 2500,
    description: 'Préparés chaque matin sans conservateur : bissap menthe, gingembre citronné ou ananas pain de sucre.',
  },
  {
    id: 'bissap-royal-cocktail',
    name: 'Bissap Royal Spritz',
    category: 'Cocktails & Douceurs',
    priceFcfa: 3500,
    description: 'Infusion de fleurs d’hibiscus, sirop de gingembre frais, citron vert pressé et bulles rafraîchissantes.',
    highlight: 'Cocktail signature',
  },
  {
    id: 'planteur-kirikou',
    name: 'Planteur Maison Kirikou',
    category: 'Cocktails & Douceurs',
    priceFcfa: 4000,
    description: 'Rhum ambré, jus d’ananas du Bénin, fruit de la passion, goyave et muscade râpée.',
  },
  {
    id: 'wakanda-passion-sour',
    name: 'Wakanda Passion Sour',
    category: 'Cocktails & Douceurs',
    priceFcfa: 4500,
    description: 'Création du bar R+2 : spiritueux infusé, purée de maracuja, miel local et citron vert glacé.',
    highlight: 'Exclusivité R+2',
  },
  {
    id: 'assiette-fruits-tropicaux',
    name: 'Assiette de Fruits Tropicaux Frais',
    category: 'Cocktails & Douceurs',
    priceFcfa: 3500,
    description: 'Ananas pain de sucre, mangue de saison, papaye et zestes de citron vert givré.',
  },
  {
    id: 'fondant-chocolat',
    name: 'Fondant Tiède au Chocolat & Glace Vanille',
    category: 'Cocktails & Douceurs',
    priceFcfa: 4000,
    description: 'Cœur coulant au cacao noir servi tiède avec boule de glace vanille bourbon.',
  },
];

export const LIVE_SCHEDULE: LiveEvent[] = [
  {
    id: 'mercredi',
    day: 'Mercredi',
    hours: '20h30 – 00h30',
    title: 'Afterwork Acoustic & Afro-Soul',
    space: 'Rez-de-Chaussée & Mezzanine',
    lineup: 'Trio acoustique · Guitare, percussions et voix',
    mood: 'Idéal pour décompresser en milieu de semaine autour d’une planche apéritive.',
  },
  {
    id: 'jeudi',
    day: 'Jeudi',
    hours: '20h30 – 01h00',
    title: 'Jeudi Live Band Cotonou',
    space: 'Scène Centrale RDC',
    lineup: 'Orchestre Maison Kirikou · Variété africaine, salsa & zouk',
    mood: 'Ambiance chaleureuse et dansante, vue privilégiée depuis le 1er étage.',
  },
  {
    id: 'vendredi',
    day: 'Vendredi',
    hours: '21h00 – 02h00',
    title: 'Grand Orchestre & Nocturne Wakanda',
    space: 'RDC Live + Rooftop R+2',
    lineup: 'Orchestre au complet dès 21h · Relais DJ Afrobeats au Wakanda dès 23h30',
    mood: 'Le rendez-vous phare du vendredi soir à Fidjrossè. Réservation fortement conseillée.',
  },
  {
    id: 'samedi',
    day: 'Samedi',
    hours: '21h00 – 02h00',
    title: 'Samedi Prestige · Live & Performances',
    space: 'Tous les niveaux ouverts',
    lineup: 'Grand show live sur podium · Ambiance clubbing & cocktails au Wakanda R+2',
    mood: 'Soirée festive pour anniversaires, retrouvailles et grands groupes.',
  },
  {
    id: 'dimanche',
    day: 'Dimanche',
    hours: '13h00 – 00h00',
    title: 'Dimanche Famille & Mélodies Douces',
    space: 'Restaurant RDC & 1er Étage',
    lineup: 'Déjeuner dominical prolongé suivi d’un set live détente en soirée',
    mood: 'Spécialités béninoises (Dakouin, Crincrin) et grandes tables conviviales.',
  },
];

export const GUEST_REVIEWS: GuestReview[] = [
  {
    id: 'rev-1',
    author: 'Gildas H.',
    context: 'Dîner entre amis · Scène Live',
    rating: '5 / 5',
    quote:
      'L’ambiance avec l’orchestre live au rez-de-chaussée est incomparable à Fidjrossè. La Planche Fiesta pour six nous a bluffés par sa générosité.',
  },
  {
    id: 'rev-2',
    author: 'Nadège A.',
    context: 'Anniversaire · Le Wakanda R+2',
    rating: '4 / 5',
    quote:
      'Nous avons commencé au 1er étage avec une vue parfaite sur les musiciens puis fini au Wakanda jusqu’à 1h30. Pensez à réserver le vendredi soir.',
  },
  {
    id: 'rev-3',
    author: 'Cédric M.',
    context: 'Déjeuner d’affaires · Le Fumoir',
    rating: '5 / 5',
    quote:
      'Le Dakouin poisson frais est fidèle aux saveurs béninoises et le Fumoir permet d’échanger au calme tout en profitant d’un service attentif.',
  },
];
