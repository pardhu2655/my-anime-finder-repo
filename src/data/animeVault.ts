import narutoImg from '../assets/images/anime_naruto_shinobi_1794727286836.jpg';
import onePieceImg from '../assets/images/anime_one_piece_voyage_1794727288580.jpg';
import dbzImg from '../assets/images/anime_dbz_ki_arena_1794727289897.jpg';
import bleachImg from '../assets/images/anime_bleach_soul_blade_1794727289721.jpg';
import yuYuHakushoImg from '../assets/images/anime_yuyuhakusho_spirit_1794727290398.jpg';
import ippoImg from '../assets/images/anime_ippo_boxing_ring_1794727290201.jpg';
import conanImg from '../assets/images/anime_conan_mystery_night_1794727291582.jpg';

export type BingeType = 'got' | 'crime' | 'cyberpunk' | 'marvel' | 'cozy';
export type CommitmentType = 'movie' | 'season' | 'epic';
export type PacingType = 'fast' | 'slow';
export type VaultCategory = 'universal' | 'quick' | 'cozy' | 'movie' | 'legends';
export type RouletteFilter =
  | 'SHORT & FINISHED'
  | 'HIGH ACTION'
  | 'MIND GAMES'
  | 'CRY YOUR EYES OUT'
  | 'ENGLISH DUB APPROVED';

export interface AnimeEntry {
  id: string;
  title: string;
  subtitle: string;
  cassetteCode: string;
  badge: string;
  stamp: string;
  category: VaultCategory;
  episodesLabel: string;
  genreLabel: string;
  successRate: string;
  imdbRating: string;
  platforms: string[];
  posterUrl: string;
  posterAlt: string;
  whyItWorks: string;
  synopsis: string;
  episodeOneHook: string;
  dubVerdict: string;
  weirdnessScore: string;
  pacingScore: string;
  lengthCommitment: string;
  tags: RouletteFilter[];
  quizProfile: {
    binge: BingeType[];
    commitment: CommitmentType[];
    pacing: PacingType[];
  };
}

export const HOTLINKED_ASSETS = {
  avatar:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuAEWdSVC5rhAzMKDdUVz48Flq2EfN5rB8PFo6w8uUV32lNblSk7OlwAv97VwyvgfPxXtQv6_knAcH4Z7DZolU43TawKj833sujcR_eU9Sv_1ykSBKLJgILkiowKBrAanLJyaBxYXJyQYEjPKEReURrg_Nru5YdRsAv8t498isUjWY5jrkQjMRZl_Tvb7c4S9e9ZNh5Qs6NvoLkKdE4CQ69gFF0TWzGEEHSJRkPtMtTG',
  heroAlley:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuCshIR2_vFG4zEKriX-1GYBO2re1rl-pwH05z3hzy1QMd_3Ut2tVIwwqC6BLywLyrHVoa4o-AesUgLZSccYBXy5oKZZUbH59Q43uqMw8MloCN3xJNVLNnMNGbLxk_itCfQRRIuNOY0dS49rdme8gyN2Xlj7XEafTqHWHfqsIIDLKrpwMO2NAZAJEAXZHaic56HZb-ha3xIjcCp9RJChHn_G8d_JaKyb_E6EvXwGa2ee',
  quizAot:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuB072hJq-85Eh76C59PCl1-pMYvZYcvUdedWCKU_KqOTktgd446bEBJGHVoIqz1cWonwMYh35Ky6MhXXorYgkSiZh4GzjSrf1FVIHSGWTbOUNBph0uzlTvh4_0UQmK-i1MllYxIVb5QZCm6w94VXVT8vbAanazJguwwIvRWvHLXTGMpLfPOspCWGNrbZ8b7q4WjWI-jjy1uuCQaX36rkzw6qHyJiKWKFE6xdqF9B1to',
  deathNote:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuCUFsVwxHt-8g4A01fX5YyDE0fPQkJzs4_9OE_aoYgvnEESxMz_J0mKfEVaIyuH-ophsQxKYZt7fJzfy1RjmAnNeAQQi6m29rvEcA3CISlKpUa_-y2Xpe7eEBcthlZhq4d39-bFQjad7X8Gytiv8UFv1_qH5NR35dHRb_dB5UxF5JwZYcOxZMZoT7A1j8JzZLCfc43O7qZ_gfggiI2uW0yeCZmtQwABzdG_p-b5l_hD',
  aotWall:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuCxhJPp2RE2EjUpyitwCqVJwB_-s02gbVPuxIHLENgzYjtO2eYH6BvsLq3J-O5u_jQWw2IQBBqGuZJXAsj8vMiv0QC2k9LhtwU_4t74CxXeZnHJBN37gEZ_jcixb4iCNSEJRMLeKXJxHm50-mwE07D59XIe0yxJuKBmdQuU4qjCIFaQzrF9Iw3wiFeceYwdGUKfpxH8VvDAX2PATmodX7M8_vhs0F3Z1z0rA4R0rOjY',
  fma:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuBev_9DN_6uWLQLNOnUDCQVKLkkXkpkTw4MRMmhmt2vnQBg6ShSo4UqYeaWyH4hOCAZTLcm93DjNzKa8wbNoc3Ve70DlhBN-CDgEVi3WMRyXscCe3DY2zP7kSea0UtRPF4duIgOUVq_Jfd-tfYcHMihvdqweOCNmpoc4j1AYWDSo9cMJzk_fz4xAdBGa7wyHenltJ2ikqRb7bAeT2RZsSOrgGcLlhDyigElFbi2_eDN',
  cowboyBebop:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuDOZ-tiuWmSZDDfTspglHFdlB_MUWhVYqEh5pKGiUuFYTHzywCwWyLqqMxBgMdQgCn5GCLIhgP0IRJCQPdad_7oi7w6poYWA-ZHRqOzGICp-QhEDAJnyWJ2Yu5SPBexHYiHOAZm3JNSe5-fkxHnaMGmyB7yjXOBm0gzRNTvoelr4fOgD08zYA5aAOuklhqVxyG5sw-9e6Ckq_J4Ze9ELp1u1VjzGgUbILQ48jlFkS61',
  edgerunners:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuDrBESK101iPPvGKp6u9GDdcbnKObyOLOI7SdfVlTaZc5kaEvSUPPRB0Y3DEnLwMX976JcMxM1JJzZA2VDX4Gi_hLGoS6t18J4Jzsc6EaiKrODFOI2vKWBPwnyXKrG_otaWLtO3P086bOLPHWNug5rbJfuZ-7IxQzuJzBKPG4LUniepNpkteMlYhHItzOQx9_f9vYcb2bQS6zkiQ1ubN2QbNIwDzeaPsHhyJLGhpaxb',
  demonSlayer:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuAma8dlL2G8xKoD37y3dnoF5Ix-H8H9MpuJH1JBSBXl7tPqT3rG00iEyAUq5uUCoyfCUxWQB0BIZWufC3DosRw1ZW0FmP2ZLXMHIHrdsVLafyNVDMgseNqkfvRBxdmSl5nP-DzOtGd_CDU-UpOj8H88_YCDZRCctlZzMiL5TMn8Pauos4EUCyVIQeF-TYHGyY8HoNQco-rHbS4pMPEQkapyeV_VuOjR0cqCv0bGz4k8',
  psychoPass:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuA2KKY3UKYZCSLdTli9F3_XnByRqgoIoEzMC6bK0V8JcWdvzG49cg2gr6OBgYmRhGy9ji8f48w0dLQu_x40p3jnuVDKh0PRu01zRu9OpdcDru9jl6Qiy-FpOpZwt34GzGz-73fsDqkf-hAxOqSlzIQrk7CY4kPjFFBCi6dZBeQfsJUM7zsYxs7eayWGIT6VK9kUtgrY9fahaFF9XfzX2Vzpbl7-E2Dis2rt4bMbo-36',
};

export const BINGE_OPTIONS: {
  id: BingeType;
  label: string;
  subtitle: string;
}[] = [
  {
    id: 'got',
    label: 'Game of Thrones / Succession',
    subtitle: 'High stakes, political drama & plot twists',
  },
  {
    id: 'crime',
    label: 'Breaking Bad / True Crime',
    subtitle: 'Psychological mind games & morality',
  },
  {
    id: 'cyberpunk',
    label: 'Blade Runner / Matrix / Sci-Fi',
    subtitle: 'Atmospheric synth, noir, philosophy',
  },
  {
    id: 'marvel',
    label: 'Marvel / Avengers / Action',
    subtitle: 'Superpowers, hypes, adrenaline battles',
  },
  {
    id: 'cozy',
    label: 'Cozy Comfort Shows / Ted Lasso / Ghibli',
    subtitle: 'Warm feelings, laugh-out-loud comedy, zero stress',
  },
];

export const COMMITMENT_OPTIONS: {
  id: CommitmentType;
  label: string;
  duration: string;
}[] = [
  { id: 'movie', label: 'Bite-sized Movie', duration: '~ 2 HOURS' },
  { id: 'season', label: 'Tight Run', duration: '12 - 24 EPS' },
  { id: 'epic', label: 'Epic Saga', duration: '50+ EPISODES' },
];

export const PACING_OPTIONS: {
  id: PacingType;
  label: string;
  subtitle: string;
  icon: 'bolt' | 'hourglass_top';
}[] = [
  {
    id: 'fast',
    label: 'Breakneck Adrenaline',
    subtitle: 'Cliffhangers from episode 1, zero drag',
    icon: 'bolt',
  },
  {
    id: 'slow',
    label: 'Slow-Burn Mystery',
    subtitle: 'Deep character payoff & intricate clues',
    icon: 'hourglass_top',
  },
];

export const ANIME_CATALOG: AnimeEntry[] = [
  {
    id: 'attack-on-titan',
    title: 'ATTACK ON TITAN (SHINGEKI NO KYOJIN)',
    subtitle: 'HIGH STAKES & UNREAL CLIFFHANGERS',
    cassetteCode: 'CASSETTE #001',
    badge: '87 EPS // DARK FANTASY',
    stamp: 'ZERO FILLER',
    category: 'universal',
    episodesLabel: '87 EPS (4 SEASONS)',
    genreLabel: 'EP. 25 (S1) // DARK FANTASY // NO FILLER',
    successRate: '98.8% SUCCESS RATE',
    imdbRating: '9.1 / 10 (IMDb)',
    platforms: ['CRUNCHYROLL', 'HULU'],
    posterUrl: HOTLINKED_ASSETS.quizAot,
    posterAlt:
      'A dramatic cinematic anime still showing a giant colossal titan looming over towering stone walls under an apocalyptic sky.',
    whyItWorks:
      "Zero slow exposition. The first 15 minutes deliver one of modern television's most jaw-dropping cliffhangers. Perfect for fans of high-stakes political intrigue, brutal stakes, and relentless cinematic pacing.",
    synopsis:
      'Humanity huddles behind concentric fortress walls to escape gigantic man-eating humanoids. When the outer wall shatters, survival turns into a relentless conspiracy thriller.',
    episodeOneHook:
      'Within the first 20 minutes, the 60-meter Colossal Titan breaches Wall Maria and changes the entire trajectory of the world.',
    dubVerdict: 'Both Sub and English Dub are top-tier; watch whichever keeps your eyes on the action.',
    weirdnessScore: '0 / 10 (ZERO ANIME TROPES)',
    pacingScore: '10 / 10 (RELENTLESS)',
    lengthCommitment: '87 EPISODES (NO FILLER)',
    tags: ['HIGH ACTION', 'MIND GAMES', 'CRY YOUR EYES OUT', 'ENGLISH DUB APPROVED'],
    quizProfile: {
      binge: ['got', 'marvel'],
      commitment: ['epic', 'season'],
      pacing: ['fast'],
    },
  },
  {
    id: 'death-note',
    title: 'DEATH NOTE',
    subtitle: 'THE ULTIMATE 1ST EPISODE HOOK',
    cassetteCode: 'CASSETTE #002',
    badge: 'EP. 37 // PSYCHOLOGICAL',
    stamp: 'HOT PICK',
    category: 'universal',
    episodesLabel: '37 EPS',
    genreLabel: 'EP. 37 // PSYCHOLOGICAL THRILLER',
    successRate: '99.1% SUCCESS RATE',
    imdbRating: '9.0 / 10 (IMDb)',
    platforms: ['NETFLIX', 'CRUNCHYROLL', 'HULU'],
    posterUrl: HOTLINKED_ASSETS.deathNote,
    posterAlt:
      'A moody anime composition of a dark room with a Death Note resting on a desk under the glow of computer screens.',
    whyItWorks:
      'A battle of wits where every step feels like a high-tension chess match. Light Yagami and L will keep you on the edge of your seat with zero downtime.',
    synopsis:
      'A genius high schooler discovers a notebook capable of killing anyone whose name is written in it. Ignites an electrifying cat-and-mouse duel against an eccentric detective.',
    episodeOneHook:
      'Light tests the notebook rules in real time and crosses the moral point of no return before the credits roll.',
    dubVerdict: 'Iconic English Dub with unforgettable vocal performances by Brad Swaile & Alessandro Juliani.',
    weirdnessScore: '1 / 10 (SUPERNATURAL NOIR)',
    pacingScore: '10 / 10 (CHESS DUEL)',
    lengthCommitment: '37 EPISODES (COMPLETE)',
    tags: ['SHORT & FINISHED', 'MIND GAMES', 'ENGLISH DUB APPROVED'],
    quizProfile: {
      binge: ['crime', 'got'],
      commitment: ['season', 'epic'],
      pacing: ['fast', 'slow'],
    },
  },
  {
    id: 'fma-brotherhood',
    title: 'FULLMETAL ALCHEMIST: BROTHERHOOD',
    subtitle: 'THE FLAWLESS NARRATIVE BALANCE',
    cassetteCode: 'CASSETTE #003',
    badge: '64 EPS // STEAM-ALCHEMY',
    stamp: 'MASTERPIECE',
    category: 'universal',
    episodesLabel: '64 EPS',
    genreLabel: 'EP. 64 // EPIC CONSPIRACY // COMPLETE',
    successRate: '99.7% SUCCESS RATE',
    imdbRating: '9.1 / 10 (IMDb)',
    platforms: ['CRUNCHYROLL', 'PRIME', 'HULU'],
    posterUrl: HOTLINKED_ASSETS.fma,
    posterAlt:
      'Two anime brothers performing glowing blue alchemical transmutation on an ornate stone circle.',
    whyItWorks:
      'Considered the gold standard of complete storytelling. Deep political conspiracy, found family, hard magic rules, and one of the most satisfying finales in television.',
    synopsis:
      'Two brothers pay an unbearable biological price attempting taboo human resurrection. World-class worldbuilding, unforgettable villainy, and zero filler episodes.',
    episodeOneHook:
      'Edward and Alphonse unveil the tragic cost of Equivalent Exchange and why they seek the Philosopher’s Stone.',
    dubVerdict: 'Widely considered one of the greatest English dubs ever recorded.',
    weirdnessScore: '1 / 10 (OCCASIONAL CHIBI HUMOR)',
    pacingScore: '8 / 10 (EPIC BUILD)',
    lengthCommitment: '64 EPISODES (COMPLETE)',
    tags: ['HIGH ACTION', 'MIND GAMES', 'CRY YOUR EYES OUT', 'ENGLISH DUB APPROVED'],
    quizProfile: {
      binge: ['got', 'marvel'],
      commitment: ['epic'],
      pacing: ['slow', 'fast'],
    },
  },
  {
    id: 'cowboy-bebop',
    title: 'COWBOY BEBOP',
    subtitle: '90S JAZZ, NEO-NOIR, EPISODIC COOL',
    cassetteCode: 'CASSETTE #004',
    badge: '26 EPS // NEO-NOIR SCI-FI',
    stamp: '90s CLASSIC',
    category: 'quick',
    episodesLabel: '26 EPS',
    genreLabel: '26 EPS // NEO-NOIR SPACE WESTERN',
    successRate: '97.9% SUCCESS RATE',
    imdbRating: '8.9 / 10 (IMDb)',
    platforms: ['NETFLIX', 'HULU', 'CRUNCHYROLL'],
    posterUrl: HOTLINKED_ASSETS.cowboyBebop,
    posterAlt:
      'A cool 90s anime bounty hunter in a slim navy suit inside a dimly lit neon jazz bar.',
    whyItWorks:
      'Feels like a Tarantino and Scorcese film set in space with a legendary live jazz soundtrack. Zero anime clichés, stylish hand-drawn animation, and self-contained bounty episodes.',
    synopsis:
      'Bounty hunters drift across the solar system aboard the spaceship Bebop. Incredible legendary jazz soundtrack by Yoko Kanno with unmatched cinematic direction.',
    episodeOneHook:
      'A sleek asteroid shootout set to harmonica blues introduces Spike Spiegel and Jet Black in pure style.',
    dubVerdict: 'Steve Blum as Spike Spiegel is legendary—English Dub is the community favorite.',
    weirdnessScore: '0 / 10 (PURE CINEMA)',
    pacingScore: '7 / 10 (STYLISH & COOL)',
    lengthCommitment: '26 EPISODES (COMPLETE)',
    tags: ['SHORT & FINISHED', 'HIGH ACTION', 'CRY YOUR EYES OUT', 'ENGLISH DUB APPROVED'],
    quizProfile: {
      binge: ['cyberpunk', 'crime'],
      commitment: ['season'],
      pacing: ['slow'],
    },
  },
  {
    id: 'cyberpunk-edgerunners',
    title: 'CYBERPUNK: EDGERUNNERS',
    subtitle: '10 EPISODES OF PURE ADRENALINE',
    cassetteCode: 'CASSETTE #005',
    badge: '10 EPS // CYBERPUNK',
    stamp: 'BINGE IN 1 NIGHT',
    category: 'quick',
    episodesLabel: '10 EPS',
    genreLabel: '10 EPS // NEON SCI-FI // COMPLETE',
    successRate: '96.5% SUCCESS RATE',
    imdbRating: '8.3 / 10 (IMDb)',
    platforms: ['NETFLIX EXCLUSIVE'],
    posterUrl: HOTLINKED_ASSETS.edgerunners,
    posterAlt:
      'A vivid hyper-saturated scene of Night City featuring glowing holographic neon street signs and a cybernetically augmented hero.',
    whyItWorks:
      '10 episodes of hyper-kinetic visual brilliance and emotional resonance. If you love Blade Runner, The Matrix, or synthwave aesthetics, start right here.',
    synopsis:
      "Studio TRIGGER's masterclass in kinetic violence and tragic romance set in Mike Pondsmith's Night City. Fast, gorgeous, and emotionally devastating.",
    episodeOneHook:
      'David Martinez installs military-grade Sandevistan chrome and enters the unforgiving underworld of Night City.',
    dubVerdict: 'Incredible English Dub featuring Giancarlo Esposito and Matthew Mercer.',
    weirdnessScore: '1 / 10 (MATURE SCI-FI)',
    pacingScore: '10 / 10 (HYPER-KINETIC)',
    lengthCommitment: '10 EPISODES (1 NIGHT)',
    tags: ['SHORT & FINISHED', 'HIGH ACTION', 'CRY YOUR EYES OUT', 'ENGLISH DUB APPROVED'],
    quizProfile: {
      binge: ['cyberpunk', 'marvel'],
      commitment: ['season', 'movie'],
      pacing: ['fast'],
    },
  },
  {
    id: 'demon-slayer',
    title: 'DEMON SLAYER (KIMETSU NO YAIBA)',
    subtitle: 'VISUAL SPECTACLE, ACCESSIBLE SHONEN',
    cassetteCode: 'CASSETTE #006',
    badge: '26 EPS (S1) // HISTORICAL ACTION',
    stamp: 'VISUAL PEAK',
    category: 'quick',
    episodesLabel: '26 EPS (S1)',
    genreLabel: '26 EPS (S1) // SUPERNATURAL ACTION',
    successRate: '98.1% SUCCESS RATE',
    imdbRating: '8.6 / 10 (IMDb)',
    platforms: ['CRUNCHYROLL', 'NETFLIX', 'HULU'],
    posterUrl: HOTLINKED_ASSETS.demonSlayer,
    posterAlt:
      'A stylized Japanese anime sword clash featuring fluid ukiyo-e water waves swirling around a katana blade.',
    whyItWorks:
      'Simple, emotionally clear story paired with jaw-dropping animation that blends traditional Japanese woodblock art with modern 3D camera choreography.',
    synopsis:
      "A kindhearted boy embarks on a perilous quest to cure his demonized sister. Ufotable's animation benchmarks set new worldwide industry standards.",
    episodeOneHook:
      'A snowy tragedy transforms Tanjiro’s peaceful mountain life into a desperate fight to save his sister Nezuko.',
    dubVerdict: 'Solid English Dub and crisp Japanese Sub; both are widely praised.',
    weirdnessScore: '2 / 10 (LIGHT COMIC RELIEF)',
    pacingScore: '9 / 10 (CRISPY COMBAT)',
    lengthCommitment: '26 EPISODES (SEASON 1)',
    tags: ['HIGH ACTION', 'CRY YOUR EYES OUT', 'ENGLISH DUB APPROVED'],
    quizProfile: {
      binge: ['marvel'],
      commitment: ['season', 'epic'],
      pacing: ['fast'],
    },
  },
  {
    id: 'spy-x-family',
    title: 'SPY X FAMILY',
    subtitle: 'HILARIOUS & WHOLESOME',
    cassetteCode: 'CASSETTE #007',
    badge: '25 EPS // WHOLESOME COMEDY',
    stamp: 'ZERO STRESS',
    category: 'cozy',
    episodesLabel: '25 EPS',
    genreLabel: '25 EPS // SPY COMEDY // WHOLESOME',
    successRate: '99.4% SUCCESS RATE',
    imdbRating: '8.4 / 10 (IMDb)',
    platforms: ['CRUNCHYROLL', 'HULU', 'NETFLIX'],
    posterUrl: HOTLINKED_ASSETS.heroAlley,
    posterAlt: 'Retro cybernetic city neon aesthetic card preview.',
    whyItWorks:
      'Guaranteed smile on your face from the first scene. A fake family built on secrets, telepathy, and genuine heart without any stressful angst.',
    synopsis:
      "A spy, an assassin, and a telepathic orphan form a fake family without knowing each other's secrets. Pure wholesome comedy.",
    episodeOneHook:
      'Master spy Twilight adopts 6-year-old mind-reader Anya, kicking off the world’s funniest undercover operation.',
    dubVerdict: 'Charming English Dub and Japanese original—both nail Anya’s comedic timing.',
    weirdnessScore: '0 / 10 (COZY & CHARMING)',
    pacingScore: '8 / 10 (BREEZY FUN)',
    lengthCommitment: '25 EPISODES (S1)',
    tags: ['ENGLISH DUB APPROVED'],
    quizProfile: {
      binge: ['cozy'],
      commitment: ['season', 'epic'],
      pacing: ['fast'],
    },
  },
  {
    id: 'frieren',
    title: "FRIEREN: BEYOND JOURNEY'S END",
    subtitle: 'GORGEOUS PACING',
    cassetteCode: 'CASSETTE #008',
    badge: '28 EPS // COZY FANTASY',
    stamp: '#1 RATED',
    category: 'cozy',
    episodesLabel: '28 EPS',
    genreLabel: '28 EPS // REFLECTIVE FANTASY',
    successRate: '99.2% SUCCESS RATE',
    imdbRating: '8.9 / 10 (IMDb)',
    platforms: ['CRUNCHYROLL', 'NETFLIX'],
    posterUrl: HOTLINKED_ASSETS.fma,
    posterAlt: 'Atmospheric fantasy world aesthetic.',
    whyItWorks:
      'Starts where other fantasy stories end. Gentle acoustic score, breathtaking painted backgrounds, and deeply human warmth without melodrama.',
    synopsis:
      'An immortal elf mage retraces her steps after the demon king was already defeated. Touching meditation on memory and mortality.',
    episodeOneHook:
      'Fifty years after saving the world, an immortal elf realizes how fleeting human lifespans truly are.',
    dubVerdict: 'Mallorie Rodak brings serene, resonant warmth to the English Dub.',
    weirdnessScore: '0 / 10 (PRESTIGE FANTASY)',
    pacingScore: '6 / 10 (SERENE & POETIC)',
    lengthCommitment: '28 EPISODES (S1)',
    tags: ['CRY YOUR EYES OUT', 'ENGLISH DUB APPROVED'],
    quizProfile: {
      binge: ['cozy', 'got'],
      commitment: ['season', 'epic'],
      pacing: ['slow'],
    },
  },
  {
    id: 'haikyu',
    title: 'HAIKYU!!',
    subtitle: 'INFECTIOUS HYPE',
    cassetteCode: 'CASSETTE #009',
    badge: '25 EPS (S1) // SPORTS HYPE',
    stamp: 'PURE DOPAMINE',
    category: 'cozy',
    episodesLabel: '25 EPS (S1)',
    genreLabel: '25 EPS (S1) // UNDERDOG SPORTS',
    successRate: '97.4% SUCCESS RATE',
    imdbRating: '8.7 / 10 (IMDb)',
    platforms: ['NETFLIX', 'CRUNCHYROLL'],
    posterUrl: HOTLINKED_ASSETS.demonSlayer,
    posterAlt: 'Dynamic high-energy sports anime motion.',
    whyItWorks:
      'Like Ted Lasso meets Friday Night Lights. Even if you have zero interest in volleyball, the camaraderie and match tension are impossible to resist.',
    synopsis:
      'Even if you care nothing for volleyball, this will have you cheering on your feet in five minutes.',
    episodeOneHook:
      'Undersized spiker Shoyo Hinata challenges his towering rival Tobio Kageyama—only to end up on the same team.',
    dubVerdict: 'Subtitled Japanese energy is electric, while the English Dub is super snappy.',
    weirdnessScore: '0 / 10 (PURE TEAM SPIRIT)',
    pacingScore: '9 / 10 (ADRENALINE)',
    lengthCommitment: '25 EPISODES (S1)',
    tags: ['HIGH ACTION', 'ENGLISH DUB APPROVED'],
    quizProfile: {
      binge: ['cozy', 'marvel'],
      commitment: ['epic', 'season'],
      pacing: ['fast'],
    },
  },
  {
    id: 'spirited-away',
    title: 'SPIRITED AWAY (2001)',
    subtitle: 'OSCAR WINNER',
    cassetteCode: 'CASSETTE #010',
    badge: '125 MIN // STUDIO GHIBLI',
    stamp: 'OSCAR WINNER',
    category: 'movie',
    episodesLabel: '125 MIN',
    genreLabel: '125 MIN // CINEMATIC FAIRY TALE',
    successRate: '99.5% SUCCESS RATE',
    imdbRating: '8.6 / 10 (IMDb)',
    platforms: ['MAX // HBO'],
    posterUrl: HOTLINKED_ASSETS.heroAlley,
    posterAlt: 'Lush hand-drawn spirit realm atmosphere.',
    whyItWorks:
      'Zero episodic commitment, Academy Award winner for Best Animated Feature, and an unforgettable introduction to hand-drawn Japanese artistry.',
    synopsis:
      "Hayao Miyazaki's hand-drawn wonderland bathhouse for spirits. The gold standard for modern cinematic fairy tales.",
    episodeOneHook:
      'Ten-year-old Chihiro wanders through a mysterious tunnel into an enchanted twilight town for spirits.',
    dubVerdict: 'Produced by Disney with an all-star English cast.',
    weirdnessScore: '2 / 10 (WHIMSICAL MAGIC)',
    pacingScore: '7 / 10 (ENCHANTING)',
    lengthCommitment: '125 MINUTES (MOVIE)',
    tags: ['SHORT & FINISHED', 'CRY YOUR EYES OUT', 'ENGLISH DUB APPROVED'],
    quizProfile: {
      binge: ['cozy'],
      commitment: ['movie'],
      pacing: ['slow', 'fast'],
    },
  },
  {
    id: 'your-name',
    title: 'YOUR NAME (2016)',
    subtitle: 'SCI-FI ROMANCE',
    cassetteCode: 'CASSETTE #011',
    badge: '106 MIN // ROMANCE MYSTERY',
    stamp: 'BOX OFFICE HIT',
    category: 'movie',
    episodesLabel: '106 MIN',
    genreLabel: '106 MIN // TIME-BENDING ROMANCE',
    successRate: '98.7% SUCCESS RATE',
    imdbRating: '8.4 / 10 (IMDb)',
    platforms: ['CRUNCHYROLL', 'RENT / STREAM'],
    posterUrl: HOTLINKED_ASSETS.quizAot,
    posterAlt: 'Luminous comet sky and cinematic anime vista.',
    whyItWorks:
      'Plays like a blockbuster Hollywood mystery-romance with gorgeous photorealistic backgrounds and a third-act twist that hits hard.',
    synopsis:
      "Makoto Shinkai's breathtaking visual spectacle about two strangers swapping bodies across space and time.",
    episodeOneHook:
      'A Tokyo boy and a countryside girl wake up in each other’s lives—until a cosmic secret unravels.',
    dubVerdict: 'Includes English-sung versions of the soundtrack by RADWIMPS.',
    weirdnessScore: '0 / 10 (MAINSTREAM FILM)',
    pacingScore: '8 / 10 (SWEEPING)',
    lengthCommitment: '106 MINUTES (MOVIE)',
    tags: ['SHORT & FINISHED', 'CRY YOUR EYES OUT', 'ENGLISH DUB APPROVED'],
    quizProfile: {
      binge: ['cozy', 'crime'],
      commitment: ['movie'],
      pacing: ['fast', 'slow'],
    },
  },
  {
    id: 'akira',
    title: 'AKIRA (1988)',
    subtitle: 'CYBERPUNK ORIGIN',
    cassetteCode: 'CASSETTE #012',
    badge: '124 MIN // NEO-TOKYO 1988',
    stamp: 'CYBERPUNK ORIGIN',
    category: 'movie',
    episodesLabel: '124 MIN',
    genreLabel: '124 MIN // CYBERPUNK LANDMARK',
    successRate: '95.8% SUCCESS RATE',
    imdbRating: '8.0 / 10 (IMDb)',
    platforms: ['HULU', 'CRUNCHYROLL'],
    posterUrl: HOTLINKED_ASSETS.edgerunners,
    posterAlt: 'Neo-Tokyo neon cityscape and light trails.',
    whyItWorks:
      'If you love Blade Runner, The Matrix, or Stranger Things, this 1988 hand-painted milestone is the literal DNA behind modern sci-fi cinema.',
    synopsis:
      'The legendary, hand-animated 24fps cyberpunk benchmark that shook Western cinema and influenced The Matrix.',
    episodeOneHook:
      'Motorcycle gangs race across Neo-Tokyo’s neon expressways before awakening a secret government psychic.',
    dubVerdict: 'The 2001 Pioneer English Dub is crystal-clear and atmospheric.',
    weirdnessScore: '2 / 10 (BODY HORROR SCI-FI)',
    pacingScore: '9 / 10 (EXPLOSIVE)',
    lengthCommitment: '124 MINUTES (MOVIE)',
    tags: ['SHORT & FINISHED', 'HIGH ACTION', 'ENGLISH DUB APPROVED'],
    quizProfile: {
      binge: ['cyberpunk', 'got', 'marvel'],
      commitment: ['movie'],
      pacing: ['fast', 'slow'],
    },
  },
  {
    id: 'psycho-pass',
    title: 'PSYCHO-PASS (SEASON 1)',
    subtitle: 'MINORITY REPORT MEETS SE7EN',
    cassetteCode: 'CASSETTE #042',
    badge: '22 EPS // CYBER-NOIR',
    stamp: 'VERIFIED',
    category: 'quick',
    episodesLabel: '22 EPS',
    genreLabel: 'SCI-FI // NOIR PSYCHOLOGICAL THRILLER',
    successRate: '96.9% SUCCESS RATE',
    imdbRating: '8.2 / 10 (IMDb)',
    platforms: ['CRUNCHYROLL', 'HULU'],
    posterUrl: HOTLINKED_ASSETS.psychoPass,
    posterAlt:
      'A stylish futuristic detective in a dystopian neo-noir city overlooking a rain-drenched neon skyline.',
    whyItWorks:
      'Reads like an HBO sci-fi crime drama. Mature adult protagonists, zero high school clichés, and a philosophical villain worthy of Silence of the Lambs.',
    synopsis:
      'In a future where minds are scanned for criminal intent before crimes occur, rookie inspector Akane Tsunemori questions the authoritarian Sybil System alongside a brooding enforcer.',
    episodeOneHook:
      'A rookie police inspector joins an elite squad armed with Dominator pistols that judge human souls in milliseconds.',
    dubVerdict: 'Sharp English Dub featuring Kate Oxley and Robert McCollum.',
    weirdnessScore: '0 / 10 (VERY GROUNDED)',
    pacingScore: '10 / 10 (RELENTLESS)',
    lengthCommitment: '22 EPISODES',
    tags: ['SHORT & FINISHED', 'MIND GAMES', 'HIGH ACTION', 'ENGLISH DUB APPROVED'],
    quizProfile: {
      binge: ['cyberpunk', 'crime'],
      commitment: ['season'],
      pacing: ['fast', 'slow'],
    },
  },
  {
    id: 'erased',
    title: 'ERASED (BOKUDAKE GA INAI MACHI)',
    subtitle: 'IMPOSSIBLE TO STOP WATCHING',
    cassetteCode: 'CASSETTE #019',
    badge: '12 EPS // CRIME THRILLER',
    stamp: 'ZERO FILLER',
    category: 'quick',
    episodesLabel: '12 EPS',
    genreLabel: 'CRIME MYSTERY // TIME REWIND',
    successRate: '98.4% SUCCESS RATE',
    imdbRating: '8.5 / 10 (IMDb)',
    platforms: ['CRUNCHYROLL', 'HULU'],
    posterUrl: HOTLINKED_ASSETS.deathNote,
    posterAlt: 'Moody nocturnal mystery desk scene.',
    whyItWorks:
      'Tighter than a Netflix limited series. Zero weird tropes—just pure suspense, emotional warmth, and cliffhangers at the end of every 22-minute episode.',
    synopsis:
      'A struggling 29-year-old with the ability to rewind seconds before a tragedy is suddenly sent back 18 years to his childhood to prevent a serial kidnapping.',
    episodeOneHook:
      'A sudden tragedy triggers a massive 18-year "Revival", dropping Satoru back into 1988 with one chance to save his classmates.',
    dubVerdict: 'Naturalistic English Dub that feels just like a live-action mystery series.',
    weirdnessScore: '0 / 10 (ZERO ANIME CRINGE)',
    pacingScore: '10 / 10 (PEAK BINGE)',
    lengthCommitment: '12 EPISODES',
    tags: ['SHORT & FINISHED', 'MIND GAMES', 'CRY YOUR EYES OUT', 'ENGLISH DUB APPROVED'],
    quizProfile: {
      binge: ['crime', 'got'],
      commitment: ['season', 'movie'],
      pacing: ['slow', 'fast'],
    },
  },
  {
    id: 'jujutsu-kaisen',
    title: 'JUJUTSU KAISEN',
    subtitle: 'MARVEL-TIER ACTION CHOREOGRAPHY',
    cassetteCode: 'CASSETTE #077',
    badge: '24 EPS (S1) // SUPERNATURAL',
    stamp: 'FAN FAVORITE',
    category: 'quick',
    episodesLabel: '24 EPS (S1)',
    genreLabel: 'EP. 24 // SUPERNATURAL SHONEN',
    successRate: '98.5% SUCCESS RATE',
    imdbRating: '8.6 / 10 (IMDb)',
    platforms: ['CRUNCHYROLL', 'NETFLIX'],
    posterUrl: HOTLINKED_ASSETS.aotWall,
    posterAlt: 'High-stakes supernatural battle aesthetic.',
    whyItWorks:
      'Incredible combat choreography, supernatural curse lore, and charismatic characters with Marvel-level entertainment value and flawless pacing.',
    synopsis:
      'After swallowing a cursed talisman to save his friends, Yuji Itadori enrolls in Tokyo Jujutsu High to hunt down lethal supernatural curses.',
    episodeOneHook:
      'An ordinary teenager unleashes terrifying ancient power in a moonlit school courtyard.',
    dubVerdict: 'High-energy English Dub and Japanese voice cast.',
    weirdnessScore: '1 / 10 (MODERN ACTION)',
    pacingScore: '10 / 10 (FAST & KINETIC)',
    lengthCommitment: '24 EPISODES (S1)',
    tags: ['HIGH ACTION', 'ENGLISH DUB APPROVED'],
    quizProfile: {
      binge: ['marvel'],
      commitment: ['season'],
      pacing: ['fast'],
    },
  },
  {
    id: 'vivy',
    title: "VIVY: FLUORITE EYE'S SONG",
    subtitle: 'TERMINATOR MEETS BLADE RUNNER',
    cassetteCode: 'CASSETTE #088',
    badge: '13 EPS // TIME TRAVEL',
    stamp: 'HIDDEN GEM',
    category: 'quick',
    episodesLabel: '13 EPS',
    genreLabel: 'TIME TRAVEL // SCI-FI ACTION',
    successRate: '96.2% SUCCESS RATE',
    imdbRating: '8.1 / 10 (IMDb)',
    platforms: ['CRUNCHYROLL'],
    posterUrl: HOTLINKED_ASSETS.cowboyBebop,
    posterAlt: 'Sleek futuristic cyberpunk scene.',
    whyItWorks:
      'Complete 13-episode original story written by the creator of Re:Zero and animated by Attack on Titan’s studio. Stunning action and zero filler.',
    synopsis:
      "The world's first autonomous AI idol singer must team up with an enigmatic AI from 100 years in the future to stop an imminent robotic apocalypse.",
    episodeOneHook:
      'An AI songstress receives a desperate time-traveling cube warning her of a 100-year war against humanity.',
    dubVerdict: 'Crisp English Dub with poignant vocal performances.',
    weirdnessScore: '1 / 10 (ACCESSIBLE)',
    pacingScore: '9 / 10 (HIGH SPEED)',
    lengthCommitment: '13 EPISODES',
    tags: ['SHORT & FINISHED', 'HIGH ACTION', 'CRY YOUR EYES OUT', 'ENGLISH DUB APPROVED'],
    quizProfile: {
      binge: ['cyberpunk', 'marvel'],
      commitment: ['season'],
      pacing: ['fast'],
    },
  },
  {
    id: 'naruto',
    title: 'NARUTO & NARUTO SHIPPUDEN',
    subtitle: 'THE GLOBAL SHINOBI PHENOMENON',
    cassetteCode: 'CASSETTE #201',
    badge: '220 EPS (PT 1) // SHINOBI EPIC',
    stamp: 'ALL-TIME GREAT',
    category: 'legends',
    episodesLabel: '220 + 500 EPS',
    genreLabel: 'SHINOBI ACTION // COMING OF AGE',
    successRate: '98.4% SUCCESS RATE',
    imdbRating: '8.7 / 10 (IMDb)',
    platforms: ['CRUNCHYROLL', 'NETFLIX', 'HULU'],
    posterUrl: narutoImg,
    posterAlt: 'Hidden ninja village rooftops at dusk with swirling cyan chakra energy.',
    whyItWorks:
      'Unforgettable underdog emotion, iconic hand-to-hand choreography, and some of the greatest tournament and villain arcs in television—just skip the filler episodes!',
    synopsis:
      'An ostracized orphan ninja harboring a nine-tailed fox spirit dreams of becoming Hokage, forging unbreakable bonds through brutal Chunin Exams and legendary shinobi wars.',
    episodeOneHook:
      'Lonely prankster Naruto Uzumaki steals a forbidden scroll and masters the Multi Shadow Clone Jutsu to defend his teacher.',
    dubVerdict: 'Iconic English Dub (Maile Flanagan, Yuri Lowenthal) and classic Japanese Sub.',
    weirdnessScore: '2 / 10 (CLASSIC SHONEN)',
    pacingScore: '8 / 10 (SKIP FILLER GUIDE)',
    lengthCommitment: '220 EPS (PART 1)',
    tags: ['HIGH ACTION', 'CRY YOUR EYES OUT', 'ENGLISH DUB APPROVED'],
    quizProfile: {
      binge: ['marvel', 'got'],
      commitment: ['epic'],
      pacing: ['fast', 'slow'],
    },
  },
  {
    id: 'one-piece',
    title: 'ONE PIECE',
    subtitle: 'THE GREATEST TREASURE VOYAGE EVER TOLD',
    cassetteCode: 'CASSETTE #202',
    badge: '1,100+ EPS // PIRATE EPIC',
    stamp: 'CROWN JEWEL',
    category: 'legends',
    episodesLabel: '1,100+ EPS',
    genreLabel: 'GRAND ADVENTURE // WORLD-BUILDING',
    successRate: '99.3% SUCCESS RATE',
    imdbRating: '9.0 / 10 (IMDb)',
    platforms: ['CRUNCHYROLL', 'NETFLIX'],
    posterUrl: onePieceImg,
    posterAlt: 'Pirate galleon sailing across turquoise seas toward golden sky islands.',
    whyItWorks:
      'Unmatched 25-year interconnected worldbuilding where every tiny clue pays off hundreds of episodes later. Start with the Arlong Park arc (Eps 31–44) to feel the magic.',
    synopsis:
      'Rubber-bodied optimist Monkey D. Luffy gathers an eccentric crew of dreamers to sail the treacherous Grand Line in pursuit of the legendary One Piece treasure.',
    episodeOneHook:
      'Luffy bursts out of a wooden barrel on a pirate ship, effortlessly flattening raiders with a rubber Gum-Gum Pistol.',
    dubVerdict: 'Modern Funimation/Crunchyroll English Dub is great; Japanese Sub features legendary voice acting.',
    weirdnessScore: '3 / 10 (WHIMSICAL PIRATES)',
    pacingScore: '7 / 10 (EPIC SLOW BUILD)',
    lengthCommitment: '1,100+ EPISODES',
    tags: ['HIGH ACTION', 'CRY YOUR EYES OUT', 'ENGLISH DUB APPROVED'],
    quizProfile: {
      binge: ['got', 'cozy'],
      commitment: ['epic'],
      pacing: ['slow'],
    },
  },
  {
    id: 'dragon-ball-z',
    title: 'DRAGON BALL Z (OR Z KAI)',
    subtitle: 'THE GODFATHER OF MODERN ACTION ANIME',
    cassetteCode: 'CASSETTE #203',
    badge: '167 EPS (KAI) // MARTIAL ARTS',
    stamp: '90s TITAN',
    category: 'legends',
    episodesLabel: '167 EPS (KAI)',
    genreLabel: '90s MARTIAL ARTS // SCI-FI ACTION',
    successRate: '98.9% SUCCESS RATE',
    imdbRating: '8.8 / 10 (IMDb)',
    platforms: ['CRUNCHYROLL', 'HULU'],
    posterUrl: dbzImg,
    posterAlt: 'Mountain tournament arena erupting with golden Super Saiyan ki aura and cyan lightning.',
    whyItWorks:
      'Every modern superhero transformation and beam clash owes its DNA to DBZ. Pro tip: watch "Dragon Ball Z Kai" to cut 124 filler episodes and get crisp, punchy pacing.',
    synopsis:
      'Saiyan warrior Goku and Earth’s defenders push past mortal limits to battle galactic tyrants, time-traveling androids, and cosmic destroyers.',
    episodeOneHook:
      'A mysterious armored warrior lands on Earth, revealing Goku’s alien Saiyan heritage and kidnapping his young son.',
    dubVerdict: 'Sean Schemmel and Christopher Sabat in the English Dub—especially DBZ Kai—are pure 90s/2000s nostalgia gold.',
    weirdnessScore: '1 / 10 (PURE MARTIAL ARTS)',
    pacingScore: '8 / 10 (USE DBZ KAI)',
    lengthCommitment: '167 EPS (Z KAI)',
    tags: ['HIGH ACTION', 'ENGLISH DUB APPROVED'],
    quizProfile: {
      binge: ['marvel'],
      commitment: ['epic'],
      pacing: ['fast'],
    },
  },
  {
    id: 'bleach',
    title: 'BLEACH',
    subtitle: 'STYLE, SWORDS & SOUL REAPERS',
    cassetteCode: 'CASSETTE #204',
    badge: '366 EPS + TYBW // SUPERNATURAL',
    stamp: 'PEAK DRIP',
    category: 'legends',
    episodesLabel: '366 + 52 EPS',
    genreLabel: 'SUPERNATURAL // SWORD ACTION',
    successRate: '97.6% SUCCESS RATE',
    imdbRating: '8.2 / 10 (IMDb)',
    platforms: ['HULU', 'DISNEY+'],
    posterUrl: bleachImg,
    posterAlt: 'Moonlit Japanese rooftops with a glowing cyan spiritual katana blade.',
    whyItWorks:
      'Unrivaled character drip, Shiro Sagisu’s hip-hop/rock soundtrack, and the legendary Soul Society rescue arc. Skip filler arcs (Eps 64–108) for a razor-sharp binge.',
    synopsis:
      'Ghost-seeing teenager Ichigo Kurosaki inherits the powers of a Soul Reaper, defending the living from monstrous Hollows and crossing blades inside the Soul Society.',
    episodeOneHook:
      'Ichigo takes a Soul Reaper’s sword through his chest to save his family, awakening a towering Zanpakuto blade.',
    dubVerdict: 'Johnny Yong Bosch gives one of the coolest English Dub performances in anime history.',
    weirdnessScore: '1 / 10 (STYLISH ACTION)',
    pacingScore: '9 / 10 (SKIP FILLER ARCS)',
    lengthCommitment: '366 EPS (CANON ~203)',
    tags: ['HIGH ACTION', 'MIND GAMES', 'ENGLISH DUB APPROVED'],
    quizProfile: {
      binge: ['marvel', 'cyberpunk'],
      commitment: ['epic'],
      pacing: ['fast'],
    },
  },
  {
    id: 'yu-yu-hakusho',
    title: 'YU YU HAKUSHO',
    subtitle: 'THE 90s SPIRIT DETECTIVE MASTERCLASS',
    cassetteCode: 'CASSETTE #205',
    badge: '112 EPS // 90s CLASSIC',
    stamp: 'ZERO FILLER',
    category: 'legends',
    episodesLabel: '112 EPS',
    genreLabel: '90s SUPERNATURAL // TOURNAMENT',
    successRate: '98.6% SUCCESS RATE',
    imdbRating: '8.5 / 10 (IMDb)',
    platforms: ['CRUNCHYROLL', 'HULU', 'NETFLIX'],
    posterUrl: yuYuHakushoImg,
    posterAlt: 'Retro 1990s neon Japanese alley illuminated by a glowing emerald spirit sphere.',
    whyItWorks:
      'Pure 1990s hand-painted cel atmosphere, zero filler episodes, razor-sharp banter among four unforgettable leads, and the Dark Tournament—still the gold standard of anime tournaments.',
    synopsis:
      'Street delinquent Yusuke Urameshi dies saving a child, earns a second chance as Underworld Spirit Detective, and teams up with Hiei, Kurama, and Kuwabara.',
    episodeOneHook:
      'Yusuke wakes up as a ghost watching his own funeral—and discovers he wasn’t even supposed to die yet.',
    dubVerdict: 'Universally acclaimed 90s/2000s English Dub—the witty dialogue actually shines brightest in English.',
    weirdnessScore: '1 / 10 (90s NOIR ACTION)',
    pacingScore: '9 / 10 (TIGHT & PUNCHY)',
    lengthCommitment: '112 EPISODES (COMPLETE)',
    tags: ['SHORT & FINISHED', 'HIGH ACTION', 'ENGLISH DUB APPROVED'],
    quizProfile: {
      binge: ['marvel', 'cyberpunk'],
      commitment: ['epic', 'season'],
      pacing: ['fast'],
    },
  },
  {
    id: 'hajime-no-ippo',
    title: 'HAJIME NO IPPO (FIGHTING SPIRIT)',
    subtitle: 'THE ULTIMATE UNDERDOG BOXING THRILL',
    cassetteCode: 'CASSETTE #206',
    badge: '75 EPS (S1) // BOXING',
    stamp: 'PURE HYPE',
    category: 'legends',
    episodesLabel: '75 EPS (S1)',
    genreLabel: 'SPORTS DRAMA // BOXING',
    successRate: '99.0% SUCCESS RATE',
    imdbRating: '8.8 / 10 (IMDb)',
    platforms: ['NETFLIX', 'CRUNCHYROLL'],
    posterUrl: ippoImg,
    posterAlt: 'Smoky boxing ring under dramatic white spotlights with red boxing gloves mid-punch.',
    whyItWorks:
      'Feels like Rocky I–IV with jet engines strapped to it. Zero superpowers—just heart, brutal training montages, hilarious locker-room comedy, and unforgettable title bouts.',
    synopsis:
      'Shy, bullied high schooler Ippo Makunouchi discovers an explosive natural punch after being rescued by pro boxer Takamura and climbs Japan’s featherweight ranks.',
    episodeOneHook:
      'Ippo unleashes rapid-fire jabs to catch ten falling leaves in mid-air, realizing the hidden strength built from working his mother’s fishing boat.',
    dubVerdict: 'Subtitled Japanese matches pack electric intensity; Season 1 also has a classic English Dub.',
    weirdnessScore: '0 / 10 (GROUNDED SPORTS)',
    pacingScore: '9 / 10 (ELECTRIC BOUTS)',
    lengthCommitment: '75 EPISODES (S1)',
    tags: ['HIGH ACTION', 'CRY YOUR EYES OUT', 'ENGLISH DUB APPROVED'],
    quizProfile: {
      binge: ['cozy', 'marvel'],
      commitment: ['epic', 'season'],
      pacing: ['fast'],
    },
  },
  {
    id: 'detective-conan',
    title: 'DETECTIVE CONAN (CASE CLOSED)',
    subtitle: 'SHERLOCK HOLMES IN 90s TOKYO',
    cassetteCode: 'CASSETTE #207',
    badge: '1,100+ EPS // MYSTERY NOIR',
    stamp: '90s MYSTERY',
    category: 'legends',
    episodesLabel: '1,100+ EPS',
    genreLabel: 'CLASSIC CRIME MYSTERY // NOIR',
    successRate: '97.2% SUCCESS RATE',
    imdbRating: '8.5 / 10 (IMDb)',
    platforms: ['CRUNCHYROLL', 'NETFLIX'],
    posterUrl: conanImg,
    posterAlt: 'Rainy midnight Tokyo rooftop with magnifying glass glinting in moonlight.',
    whyItWorks:
      'Like Law & Order meets Sherlock Holmes. Because most episodes are self-contained locked-room mysteries, you can dip in anytime—or follow the overarching Black Organization thriller.',
    synopsis:
      'Teen prodigy detective Shinichi Kudo is poisoned by a secret syndicate and shrunk into a seven-year-old’s body, solving impossible crimes in secret while hunting his attackers.',
    episodeOneHook:
      'Minutes after solving a grisly roller-coaster decapitation, Shinichi is ambushed by men in black and wakes up in a child’s body.',
    dubVerdict: 'Classic "Case Closed" English Dub covers early seasons cleanly; Japanese Sub is crisp for later mysteries.',
    weirdnessScore: '1 / 10 (CLASSIC DETECTIVE)',
    pacingScore: '8 / 10 (EPISODIC CLUES)',
    lengthCommitment: 'EPISODIC / WATCH ANYTIME',
    tags: ['MIND GAMES', 'ENGLISH DUB APPROVED'],
    quizProfile: {
      binge: ['crime', 'cozy'],
      commitment: ['epic', 'season'],
      pacing: ['slow'],
    },
  },
];

export const SURVIVAL_RULES = [
  {
    num: '01',
    title: 'SUB VS DUB: DROP THE GUILT',
    description:
      'The elitist debate is over. Modern English dubs have incredible voice talent and sound mixing. If reading subtitles prevents you from relaxing, switch to English immediately!',
    verdict: 'VERDICT: WATCH HOW YOU ENJOY IT',
    badgeClass: 'bg-primary-container text-surface-container-lowest',
  },
  {
    num: '02',
    title: 'THE 3-EPISODE RULE',
    description:
      'Anime pacing often uses Episode 1 for premise, Episode 2 for mechanics, and Episode 3 for the explosive turning point. Give any show three full episodes before dropping it.',
    verdict: 'VERDICT: 60 MIN TRIAL PERIOD',
    badgeClass: 'bg-secondary-container text-white',
  },
  {
    num: '03',
    title: 'BEWARE THE 800-EP TRAP',
    description:
      'Yes, One Piece, Naruto, and Bleach are historic. But starting a 1,100-episode mountain as a novice induces instant burnout. Finish three 12-to-24 episode runs first.',
    verdict: 'VERDICT: RUN QUICK SPRINTS FIRST',
    badgeClass: 'bg-tertiary-container text-surface-container-lowest',
  },
  {
    num: '04',
    title: 'FILLER LISTS ARE YOUR FRIEND',
    description:
      'Older weekly anime created uncanonical episodes to let manga catch up. When venturing into longer shows, look up AnimeFillerList.com and skip them guilt-free.',
    verdict: 'VERDICT: 100% CANON PURITY',
    badgeClass: 'bg-surface-container-high border border-outline text-primary-container',
  },
];

export function matchQuizRecommendation(
  binge: BingeType,
  commitment: CommitmentType,
  pacing: PacingType
): { anime: AnimeEntry; compatibility: string } {
  let best = ANIME_CATALOG[0];
  let bestScore = -1;

  for (const item of ANIME_CATALOG) {
    let score = 0;
    if (item.quizProfile.binge.includes(binge)) score += 50;
    if (item.quizProfile.binge[0] === binge) score += 15;
    if (item.quizProfile.commitment.includes(commitment)) score += 30;
    if (item.quizProfile.commitment[0] === commitment) score += 10;
    if (item.quizProfile.pacing.includes(pacing)) score += 20;
    if (item.quizProfile.pacing[0] === pacing) score += 8;

    if (score > bestScore) {
      bestScore = score;
      best = item;
    }
  }

  const pct = Math.min(99.6, Math.max(91.4, 88.2 + bestScore * 0.085)).toFixed(1);
  return { anime: best, compatibility: `${pct}% COMPATIBILITY` };
}

export function getDailyDateKey(date: Date = new Date()): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function getDailyRecommendedAnime(date: Date = new Date()): {
  anime: AnimeEntry;
  dateKey: string;
} {
  const dateKey = getDailyDateKey(date);
  // Deterministic FNV-1a + Murmur-style mix seeded by the YYYY-MM-DD date string
  let hash = 2166136261;
  for (let i = 0; i < dateKey.length; i++) {
    hash ^= dateKey.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  hash ^= hash >>> 16;
  hash = Math.imul(hash, 0x85ebca6b);
  hash ^= hash >>> 13;
  hash = Math.imul(hash, 0xc2b2ae35);
  hash ^= hash >>> 16;

  const index = (hash >>> 0) % ANIME_CATALOG.length;
  return {
    anime: ANIME_CATALOG[index],
    dateKey,
  };
}

