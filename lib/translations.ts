/**
 * 多语言文案汇总：全站翻译均在此文件中维护，新增或修改文案只需改这一处。
 * All multilingual copy lives here; add or change text in this file only.
 */
import type { Locale } from "./i18n";

export type TranslationKeys = {
  nav: { restore: string; history: string; tools: string; cases: string; member: string; feedback: string; terms: string; privacy: string; more: string; signIn: string; signOut: string; clearLoginState: string; memoryRestore: string };
  login: { welcomeBack: string; welcomeToBrand: string; signInToSave: string; loginRequiredForFeature: string; clearedMessage: string; continueWithGoogle: string; signInWithApple: string; signInWithEmail: string; comingSoon: string; agreeTerms: string; and: string; terms: string; privacyPolicy: string; redirecting: string; pleaseComplete: string };
  footer: { memoryRestore: string; tagline: string; restoreMemories: string; cases: string; member: string; history: string; oldPhotos: string; fixScratches: string; reviveFaded: string; addColor: string; termsOfService: string; privacyPolicy: string; madeWithCare: string };
  common: { before: string; after: string; beforeAfter: string };
  home: {
    hero: { badge: string; titleLine1: string; titleLine2: string; intro: string; dropTitle: string; dropHint: string; privateNote: string; pullDown: string; carousel0: string; carousel1: string; carousel2: string };
    heroBanner: { title: string; subtitle: string; cta: string };
    steps: { title: string; subtitle: string; step1Title: string; step1Desc: string; step2Title: string; step2Desc: string; step3Title: string; step3Desc: string };
    toolsSection: { title: string; subtitle: string };
    reviewsSection: { title: string; subtitle: string; cta: string };
    casesSection: { title: string; description: string; cta: string };
    privacySection: { title: string; body: string; cta: string };
    toolKeywords: Record<string, string>;
    toolDescriptions: Record<string, string>;
  };
  feature: {
    howWeHelp: string;
    restoreWhatMatters: string;
    feature0: { tag: string; title: string; description: string; benefit1: string; benefit2: string; benefit3: string; beforeLabel: string; afterLabel: string };
    feature1: { tag: string; title: string; description: string; benefit1: string; benefit2: string; benefit3: string; beforeLabel: string; afterLabel: string };
    feature2: { tag: string; title: string; description: string; benefit1: string; benefit2: string; benefit3: string; beforeLabel: string; afterLabel: string };
    feature3: { tag: string; title: string; description: string; benefit1: string; benefit2: string; benefit3: string; beforeLabel: string; afterLabel: string };
  };
  knowledge: {
    learnExplore: string;
    storiesTitle: string;
    storiesSubtitle: string;
    readMore: string;
    article0: { title: string; excerpt: string; readTime: string };
    article1: { title: string; excerpt: string; readTime: string };
    article2: { title: string; excerpt: string; readTime: string };
  };
  restore: {
    pageTitle: string;
    pageSubtitle: string;
    serverError: string;
    loginRequired: string;
    insufficientCredits: string;
    restoreFailedRefunded: string;
    creditsCheckFailed: string;
    networkError: string;
    pointsDeducted: string;
    pointsRefunded: string;
    restoring: string;
  };
  cases: {
    badge: string;
    title: string;
    subtitle: string;
    restoreTitle: string;
    restoreSubtitle: string;
    beforeLabel: string;
    afterLabel: string;
    storiesTitle: string;
    storiesSubtitle: string;
    ctaTitle: string;
    ctaSubtitle: string;
    ctaButton: string;
  };
  history: {
    loadingHistory: string;
    signInToSeeHistory: string;
    signInToSeeHistoryDesc: string;
    restorationHistory: string;
    photosRestoredWhileSignedIn: string;
    noRestorationsYet: string;
    restoreAPhoto: string;
    beforeAfter: string;
  };
  loginSuccess: { title: string; description: string; bonusLine: string; close: string };
  cookieConsent: { message: string; accept: string; learnMore: string };
  memberNav: { home: string; points: string; subscribe: string; feedback: string; review: string };
  member: {
    signInFirst: string;
    goLogin: string;
    memberCenter: string;
    currentCredits: string;
    creditsPerRestore: string;
    pointsDetail: string;
    membershipStatus: string;
    planYearly: string;
    planWeekly: string;
    notSubscribed: string;
    subscribedAt: string;
    goSubscribe: string;
    pointsTitle: string;
    signInFirstPoints: string;
    noRecords: string;
    loadMore: string;
    loading: string;
    creditsUnit: string;
    reasonSubscribeWeekly: string;
    reasonSubscribeYearly: string;
    reasonRefillWeekly: string;
    reasonRefillYearly: string;
    reasonRestorePhoto: string;
    reasonRefundRestoreFailed: string;
    reasonSignupBonus: string;
    reasonInitialBonus: string;
    subscribeSignInFirst: string;
    subscribeBadge: string;
    subscribeTitle: string;
    subscribeSubtitle: string;
    perPhotoCredits: string;
    instantCredits: string;
    bestValue: string;
    demoNote: string;
    checkoutNote: string;
    checkoutSuccessTitle: string;
    checkoutSuccessDetail: string;
    purchaseFailed: string;
    subscribeFailed: string;
    networkError: string;
    planCreditsName: string;
    planCreditsSub: string;
    planCreditsUnit: string;
    planCreditsNote: string;
    planCreditsF1: string;
    planCreditsF2: string;
    planCreditsF3: string;
    planCreditsF4: string;
    planCreditsCta: string;
    planCreditsCtaLoading: string;
    planWeeklyName: string;
    planWeeklySub: string;
    planWeeklyUnit: string;
    planWeeklyNote: string;
    planWeeklyF1: string;
    planWeeklyF2: string;
    planWeeklyF3: string;
    planWeeklyF4: string;
    planWeeklyCta: string;
    planWeeklyCtaLoading: string;
    planYearlyName: string;
    planYearlySub: string;
    planYearlyUnit: string;
    planYearlyNote: string;
    planYearlyF1: string;
    planYearlyF2: string;
    planYearlyF3: string;
    planYearlyF4: string;
    planYearlyCta: string;
    planYearlyCtaLoading: string;
    layoutTitle: string;
    layoutDescription: string;
  };
  feedback: { title: string; description: string; messagePlaceholder: string; contextPlaceholder: string; submit: string; success: string; submitFailed: string; networkError: string; ctaAfterRestore: string; signInFirst: string; goLogin: string; labelMessage: string; labelContext: string; submitting: string };
  review: { title: string; description: string; successMessage: string; labelEmail: string; labelContent: string; labelCountry: string; placeholderEmail: string; placeholderContent: string; placeholderCountry: string; submit: string; submitting: string };
  timeout: { suffix: string; retry: string; close: string; actionLogin: string; actionSubscribe: string; actionRestore: string };
};

const translations: Record<Locale, TranslationKeys> = {
  en: {
    nav: {
      restore: "Restore",
      history: "History",
      tools: "Tools",
      cases: "Cases",
      member: "Member",
      feedback: "Feedback",
      terms: "Terms",
      privacy: "Privacy",
      more: "More",
      signIn: "Sign In",
      signOut: "Sign Out",
      clearLoginState: "Clear login state",
      memoryRestore: "AI RestorePic",
    },
    login: {
      welcomeBack: "Welcome Back",
      welcomeToBrand: "Welcome to AI RestorePic",
      signInToSave: "Sign in to save your restorations and track your history.",
      loginRequiredForFeature: "Sign in to use this feature.",
      continueWithGoogle: "Sign in with Google",
      signInWithApple: "Sign in with Apple",
      signInWithEmail: "Sign in with email",
      comingSoon: "Coming soon",
      agreeTerms: "By clicking Sign in with Google, you agree to our",
      and: " and ",
      terms: "Terms of Service",
      privacyPolicy: "Privacy Policy",
      redirecting: "Redirecting to Google…",
      pleaseComplete: "Please complete sign-in in the new window.",
      clearedMessage: "Login state cleared. Please sign in again.",
    },
    footer: {
      memoryRestore: "AI RestorePic",
      tagline: "Helping families preserve and rediscover their most treasured photographs.",
      restoreMemories: "Restore Memories",
      cases: "Cases",
      member: "Member",
      history: "History",
      oldPhotos: "Old Photos",
      fixScratches: "Fix Scratches",
      reviveFaded: "Revive Faded Photos",
      addColor: "Add Color",
      termsOfService: "Terms of Service",
      privacyPolicy: "Privacy Policy",
      madeWithCare: "Made with care.",
    },
    common: { before: "Before", after: "After", beforeAfter: "Before / After" },
    home: {
      hero: {
        badge: "Simple · Free · Safe",
        titleLine1: "Every Photo Tells",
        titleLine2: "a Family Story",
        intro: "Found an old photo in a drawer? Faded, scratched, or torn? Simply drop it here and watch the years of wear gently disappear — like turning back the clock on your family album.",
        dropTitle: "Drop your photo here to begin",
        dropHint: "or click to browse · JPG, PNG, WebP · max 8MB",
        privateNote: "Your photos stay private — we never save or share them.",
        pullDown: "Pull down to refresh",
        carousel0: "A Family Moment, Reborn",
        carousel1: "Color Returns to Old Memories",
        carousel2: "Scratches Fade, Stories Stay",
      },
      heroBanner: {
        title: "AI RestorePic Does It All",
        subtitle: "Restore, colorize, and bring old photos back to life — in seconds.",
        cta: "Start Restoring",
      },
      steps: {
        title: "As Easy as 1, 2, 3",
        subtitle: "No apps to install, no accounts to create. Just you and your photo.",
        step1Title: "Choose a Photo",
        step1Desc: "Pick any old photo from your drawer, album, or phone. Just drag it in or tap to select.",
        step2Title: "Let AI Work Its Magic",
        step2Desc: "Our AI gently removes damage, sharpens faces, and restores faded colors in seconds.",
        step3Title: "See the Difference",
        step3Desc: "Slide between before and after to see your memory come back to life.",
      },
      toolsSection: { title: "Find the Right Tool for Your Photo", subtitle: "Every photo has its own story and its own needs. Choose the restoration that fits yours." },
reviewsSection: { title: "What Users Say", subtitle: "Real experiences from people who restored their memories.", cta: "Share your experience →" },
      casesSection: { title: "Restoration Cases & Family Stories", description: "See real restoration results and precious memories shared by users.", cta: "View cases" },
    privacySection: {
        title: "Your Memories Are Safe With Us",
        body: "We understand how personal your photos are. That's why we never save, share, or use your images for anything other than restoring them for you. Once you're done, they're gone from our system.",
        cta: "Restore a Memory",
      },
      toolKeywords: {
        "old-photo-restoration": "Old Photo Restoration",
        "faded-photo-repair": "Faded Photo Repair",
        "scratch-removal": "Photo Scratch Removal",
        "water-damaged-photo-repair": "Water Damaged Photo Repair",
        "black-and-white-photo-colorization": "Black and White Colorization",
        "blurry-photo-fix": "Blurry Photo Fix",
        "torn-photo-repair": "Torn Photo Repair",
        "photo-noise-reduction": "Photo Noise Reduction",
        "face-enhancement": "Photo Face Enhancement",
        "vintage-photo-enhancement": "Vintage Photo Enhancement",
        "polaroid-photo-restoration": "Polaroid Photo Restoration",
        "book-photo-restoration": "Book Photo Restoration",
      },
      toolDescriptions: {
        "old-photo-restoration": "Restore old photos with AI. Remove scratches, fix fading, enhance faces.",
        "faded-photo-repair": "Fix faded and washed-out photos. Restore color and contrast.",
        "scratch-removal": "Remove scratches, creases, and dust marks with AI.",
        "water-damaged-photo-repair": "Repair water stains, warping, mold spots, and color bleeding.",
        "black-and-white-photo-colorization": "Colorize black and white photos with historically accurate colors.",
        "blurry-photo-fix": "Sharpen blurry photos. Fix out-of-focus and motion blur.",
        "torn-photo-repair": "Reconstruct torn and ripped photos. Fill missing pieces.",
        "photo-noise-reduction": "Reduce grain and noise while keeping detail.",
        "face-enhancement": "Sharpen and enhance faces in old photos.",
        "vintage-photo-enhancement": "Enhance vintage and retro photos.",
        "polaroid-photo-restoration": "Restore faded or damaged Polaroid prints.",
        "book-photo-restoration": "Restore photos from books and albums.",
      },
    },
    feature: {
      howWeHelp: "How We Help",
      restoreWhatMatters: "Restore What Matters Most",
      feature0: { tag: "Heal Scratches", title: "Gently Erase the Marks of Time", description: "Over the years, precious photos pick up scratches, creases, and dust spots. Our AI carefully identifies each imperfection and fills it in with the surrounding colors and textures — like a skilled restorer working with the tiniest brush.", benefit1: "Removes scratches, creases & dust gently", benefit2: "Fills in damage naturally, not artificially", benefit3: "Safe even for photos with faces", beforeLabel: "Before", afterLabel: "After" },
      feature1: { tag: "Bring Back Faces", title: "See Your Loved Ones Clearly Again", description: "Blurry or faded faces in old photos can make it hard to recognize the people you love. Our AI gently sharpens facial details — eyes, smiles, hair — so you can see them as clearly as the day the photo was taken.", benefit1: "Sharpens faces in group photos too", benefit2: "Brings out eyes, smiles & expressions", benefit3: "Keeps each person looking like themselves", beforeLabel: "Before", afterLabel: "After" },
      feature2: { tag: "Add Color", title: "Watch Black & White Come Alive", description: "Imagine seeing grandma's wedding dress in its true color, or the garden where grandpa played as a child in full bloom. Our AI studies the shapes and context in your photo to paint in natural, true-to-life colors that feel right for the era.", benefit1: "Colors that match the time period", benefit2: "Natural skin tones & landscapes", benefit3: "Works on photos from any decade", beforeLabel: "Black & White", afterLabel: "In Color" },
      feature3: { tag: "Clear Up Grain", title: "Smooth Away Fuzz & Grain", description: "Old film photos and early digital cameras often produce grainy, noisy images. Our AI tells the difference between the grain and the real picture underneath, then gently cleans it away — leaving a smooth, clear photo you can print and frame.", benefit1: "Keeps the photo sharp while cleaning grain", benefit2: "Works on film photos & old digital shots", benefit3: "Great for reprinting family favorites", beforeLabel: "Grainy", afterLabel: "Clean" },
    },
    knowledge: {
      learnExplore: "Learn & Explore",
      storiesTitle: "Stories Behind the Photos",
      storiesSubtitle: "Discover the art, history, and simple steps behind preserving your family's most precious memories.",
      readMore: "Read More",
      article0: { title: "How AI Brings Old Photos Back to Life", excerpt: "Modern AI can see damage that the human eye misses — tiny scratches, faded colors, blurred faces. It learns from millions of photos how things should look, then gently repairs your image like an expert restorer. The whole process takes seconds.", readTime: "5 min read" },
      article1: { title: "The Beautiful History of Family Photography", excerpt: "From the very first photographs in the 1830s to the snapshots in your family drawer, every era produced images on different materials — tin, glass, paper, and film. Each one ages differently, and each one tells a story worth preserving.", readTime: "7 min read" },
      article2: { title: "Simple Tips to Keep Your Photos Safe for Decades", excerpt: "Store photos in acid-free sleeves, away from sunlight and humidity. But even the best-kept prints will age. Scanning your photos today is the best gift you can give to future generations who want to remember.", readTime: "4 min read" },
    },
    restore: { pageTitle: "Restore Your Photo", pageSubtitle: "Choose a photo from your family album, and our AI will carefully remove damage, brighten faded colors, and bring back the details you remember.", serverError: "Service temporarily unavailable. Please try again in a moment.", loginRequired: "Please sign in to use restore.", insufficientCredits: "Insufficient points. Subscribe or wait for refresh.", restoreFailedRefunded: "Restore failed. Points refunded.", creditsCheckFailed: "Points check temporarily failed. Please try again later.", networkError: "Connection failed. Please check your network.", pointsDeducted: "5 points deducted.", pointsRefunded: "Restore failed. 5 points refunded.", restoring: "Restoring your photo…" },
    cases: { badge: "Cases & Stories", title: "Restoration Cases & Family Stories", subtitle: "See how others use AI to restore old photos and the family memories behind them.", restoreTitle: "Restoration Cases", restoreSubtitle: "Sample cases with placeholder before/after images.", beforeLabel: "Before", afterLabel: "After", storiesTitle: "Family Stories", storiesSubtitle: "Real stories from users: one old photo, one family memory.", ctaTitle: "Restore your precious memories too", ctaSubtitle: "Upload an old photo and let AI restore colors, remove scratches, and preserve family and time.", ctaButton: "Restore now" },
    history: {
      loadingHistory: "Loading your history…",
      signInToSeeHistory: "Sign in to see your history",
      signInToSeeHistoryDesc: "Your restored photos are saved here after you sign in.",
      restorationHistory: "Restoration History",
      photosRestoredWhileSignedIn: "Photos you've restored while signed in.",
      noRestorationsYet: "No restorations yet. Restore a photo while signed in and it will appear here.",
      restoreAPhoto: "Restore a Photo",
      beforeAfter: "Before / After",
    },
    loginSuccess: { title: "Signed in successfully", description: "History and sync are now enabled.", bonusLine: "You received 5 bonus points.", close: "Close" },
    cookieConsent: { message: "We use cookies to improve your experience and analyze traffic.", accept: "Accept", learnMore: "Privacy Policy" },
    feedback: { title: "Feedback", description: "We'd love to hear from you.", messagePlaceholder: "Tell us what you think or suggest…", contextPlaceholder: "Optional: which feature or page?", submit: "Submit", success: "Thank you! Your feedback has been sent.", submitFailed: "Failed to submit. Please try again.", networkError: "Network error. Please try again.", ctaAfterRestore: "How was the result? Send feedback", signInFirst: "Please sign in to submit feedback.", goLogin: "Sign in", labelMessage: "Your message *", labelContext: "Context (optional)", submitting: "Submitting…" },
    memberNav: { home: "Member Center", points: "Points", subscribe: "Subscribe", feedback: "Feedback", review: "Reviews" },
    member: {
      signInFirst: "Please sign in to view the member center.",
      goLogin: "Sign in",
      memberCenter: "Member Center",
      currentCredits: "Current points",
      creditsPerRestore: "5 points per restoration. View",
      pointsDetail: "Points history",
      membershipStatus: "Membership",
      planYearly: "Yearly",
      planWeekly: "Weekly",
      notSubscribed: "Not subscribed",
      subscribedAt: "Started",
      goSubscribe: "Subscribe",
      pointsTitle: "Points History",
      signInFirstPoints: "Please sign in to view points history.",
      noRecords: "No records yet.",
      loadMore: "Load more",
      loading: "Loading…",
      creditsUnit: "points",
      reasonSubscribeWeekly: "Weekly membership",
      reasonSubscribeYearly: "Yearly membership",
      reasonRefillWeekly: "Weekly refill",
      reasonRefillYearly: "Yearly refill",
      reasonRestorePhoto: "Photo restoration",
      reasonRefundRestoreFailed: "Refund (restore failed)",
      reasonSignupBonus: "Sign-up bonus",
      reasonInitialBonus: "Login bonus",
      subscribeSignInFirst: "Please sign in to choose a plan.",
      subscribeBadge: "More points · Lower price",
      subscribeTitle: "Choose your plan",
      subscribeSubtitle: "Buy credits or subscribe weekly/yearly for more restorations and the best price.",
      perPhotoCredits: "~5 points per photo",
      instantCredits: "Instant credits",
      bestValue: "Best value",
      demoNote: "Demo: credits are added instantly. Real payment will be integrated later.",
      checkoutNote: "Payment is securely processed by Polar.",
      checkoutSuccessTitle: "Payment successful",
      checkoutSuccessDetail: "Your points or membership will update shortly. Checkout ID",
      purchaseFailed: "Purchase failed",
      subscribeFailed: "Subscription failed",
      networkError: "Network error. Please try again.",
      planCreditsName: "Starter",
      planCreditsSub: "Credits pack",
      planCreditsUnit: "one-time",
      planCreditsNote: "~2 photo restorations",
      planCreditsF1: "10 points one-time",
      planCreditsF2: "~2 photo restorations",
      planCreditsF3: "No renewal, use as needed",
      planCreditsF4: "Good for trying out",
      planCreditsCta: "Buy now",
      planCreditsCtaLoading: "Purchasing…",
      planWeeklyName: "Weekly",
      planWeeklySub: "Weekly plan",
      planWeeklyUnit: "/ week",
      planWeeklyNote: "~20 photos/week, under $0.5/photo",
      planWeeklyF1: "100 points per week",
      planWeeklyF2: "~20 restorations/week",
      planWeeklyF3: "Under $0.5/photo",
      planWeeklyF4: "Auto-refresh each week",
      planWeeklyCta: "Subscribe",
      planWeeklyCtaLoading: "Subscribing…",
      planYearlyName: "Yearly",
      planYearlySub: "Yearly plan",
      planYearlyUnit: "/ year",
      planYearlyNote: "~2000 photos/year, under $0.02/photo",
      planYearlyF1: "10000 points per year",
      planYearlyF2: "~2000 restorations/year",
      planYearlyF3: "Under $0.02/photo",
      planYearlyF4: "Best value",
      planYearlyCta: "Subscribe",
      planYearlyCtaLoading: "Subscribing…",
      layoutTitle: "Member Center",
      layoutDescription: "Points history and membership",
    },
    review: { title: "Write a review", description: "Your experience may be shown on the homepage to help others.", successMessage: "Thank you! Your review was submitted and will appear after moderation.", labelEmail: "Email *", labelContent: "Your review *", labelCountry: "Country or region (optional)", placeholderEmail: "your@email.com", placeholderContent: "Share your restoration experience or thoughts…", placeholderCountry: "e.g. United States, China", submit: "Submit review", submitting: "Submitting…" },
    timeout: { suffix: "timed out. Please check your network and try again.", retry: "Retry", close: "Close", actionLogin: "Login", actionSubscribe: "Checkout", actionRestore: "Photo restoration" },
  },
  de: {
    nav: {
      restore: "Wiederherstellen",
      history: "Verlauf",
      tools: "Werkzeuge",
      cases: "Fälle",
      member: "Mitglied",
      feedback: "Feedback",
      terms: "AGB",
      privacy: "Datenschutz",
      more: "Mehr",
      signIn: "Anmelden",
      signOut: "Abmelden",
      clearLoginState: "Anmeldestatus löschen",
      memoryRestore: "AI RestorePic",
    },
    login: {
      welcomeBack: "Willkommen zurück",
      welcomeToBrand: "Willkommen bei AI RestorePic",
      signInToSave: "Melden Sie sich an, um Wiederherstellungen zu speichern und den Verlauf zu sehen.",
      loginRequiredForFeature: "Melden Sie sich an, um diese Funktion zu nutzen.",
      continueWithGoogle: "Mit Google anmelden",
      signInWithApple: "Mit Apple anmelden",
      signInWithEmail: "Mit E-Mail anmelden",
      comingSoon: "Demnächst",
      agreeTerms: "Mit „Mit Google anmelden“ stimmen Sie unseren",
      and: " und ",
      terms: "AGB",
      privacyPolicy: "Datenschutzrichtlinie",
      redirecting: "Weiterleitung zu Google…",
      pleaseComplete: "Bitte schließen Sie die Anmeldung im neuen Fenster ab.",
      clearedMessage: "Anmeldestatus gelöscht. Bitte erneut anmelden.",
    },
    footer: {
      memoryRestore: "AI RestorePic",
      tagline: "Familien dabei helfen, ihre wertvollsten Fotos zu bewahren und wiederzuentdecken.",
      restoreMemories: "Erinnerungen wiederherstellen",
      cases: "Fälle",
      member: "Mitglied",
      history: "Verlauf",
      oldPhotos: "Alte Fotos",
      fixScratches: "Kratzer entfernen",
      reviveFaded: "Verblasste Fotos auffrischen",
      addColor: "Kolorieren",
      termsOfService: "Nutzungsbedingungen",
      privacyPolicy: "Datenschutzrichtlinie",
      madeWithCare: "Mit Sorgfalt gemacht.",
    },
    common: { before: "Vorher", after: "Nachher", beforeAfter: "Vorher / Nachher" },
    home: {
      hero: { badge: "Einfach · Kostenlos · Sicher", titleLine1: "Jedes Foto erzählt", titleLine2: "eine Familiengeschichte", intro: "Ein altes Foto in der Schublade gefunden? Verblasst, zerkratzt oder eingerissen? Legen Sie es hier ab und sehen Sie zu, wie die Spuren der Zeit verschwinden.", dropTitle: "Foto hier ablegen zum Start", dropHint: "oder klicken zum Durchsuchen · JPG, PNG, WebP · max. 8 MB", privateNote: "Ihre Fotos bleiben privat — wir speichern oder teilen sie nicht.", pullDown: "Zum Aktualisieren nach unten ziehen", carousel0: "Ein Familienmoment, neu erweckt", carousel1: "Farbe kehrt in alte Erinnerungen zurück", carousel2: "Kratzer verblassen, Geschichten bleiben" },
      heroBanner: { title: "AI RestorePic macht alles", subtitle: "Alte Fotos wiederherstellen, kolorieren und in Sekunden zum Leben erwecken.", cta: "Jetzt starten" },
      steps: { title: "So einfach wie 1, 2, 3", subtitle: "Keine Apps, kein Konto. Nur Sie und Ihr Foto.", step1Title: "Foto wählen", step1Desc: "Wählen Sie ein altes Foto aus Schublade, Album oder Handy. Einfach hereinziehen oder antippen.", step2Title: "KI arbeitet", step2Desc: "Unsere KI entfernt Schäden, schärft Gesichter und stellt verblasste Farben in Sekunden wieder her.", step3Title: "Vergleich ansehen", step3Desc: "Schieben Sie zwischen Vorher und Nachher und sehen Sie Ihre Erinnerung wieder lebendig werden." },
      toolsSection: { title: "Das passende Werkzeug für Ihr Foto", subtitle: "Jedes Foto hat seine eigene Geschichte und eigene Bedürfnisse. Wählen Sie die passende Wiederherstellung." },
      reviewsSection: { title: "Was Nutzer sagen", subtitle: "Echte Erfahrungen von Menschen, die ihre Erinnerungen wiederhergestellt haben.", cta: "Teilen Sie Ihre Erfahrung →" },
      casesSection: { title: "Restaurierungsfälle & Familiengeschichten", description: "Echte Ergebnisse und von Nutzern geteilte Erinnerungen.", cta: "Fälle ansehen" },
      privacySection: { title: "Ihre Erinnerungen sind bei uns sicher", body: "Wir wissen, wie persönlich Ihre Fotos sind. Deshalb speichern, teilen oder nutzen wir Ihre Bilder nie für etwas anderes als die Wiederherstellung.", cta: "Erinnerung wiederherstellen" },
      toolKeywords: { "old-photo-restoration": "Alte Fotos wiederherstellen", "faded-photo-repair": "Verblasste Fotos reparieren", "scratch-removal": "Kratzer entfernen", "water-damaged-photo-repair": "Wasserschaden reparieren", "black-and-white-photo-colorization": "Schwarz-Weiß kolorieren", "blurry-photo-fix": "Unschärfe beheben", "torn-photo-repair": "Eingerissene Fotos reparieren", "photo-noise-reduction": "Bildrauschen reduzieren", "face-enhancement": "Gesichter verbessern", "vintage-photo-enhancement": "Vintage-Fotos verbessern", "polaroid-photo-restoration": "Polaroid wiederherstellen", "book-photo-restoration": "Buchfotos wiederherstellen" },
      toolDescriptions: {},
    },
    feature: { howWeHelp: "So helfen wir", restoreWhatMatters: "Das Wichtigste wiederherstellen", feature0: { tag: "Kratzer heilen", title: "Spuren der Zeit sanft entfernen", description: "Im Laufe der Jahre sammeln wertvolle Fotos Kratzer, Knicke und Staub. Unsere KI erkennt jede Unvollkommenheit und füllt sie mit den umgebenden Farben und Texturen aus.", benefit1: "Entfernt Kratzer, Knicke und Staub sanft", benefit2: "Füllt Schäden natürlich aus", benefit3: "Sicher auch für Fotos mit Gesichtern", beforeLabel: "Vorher", afterLabel: "Nachher" }, feature1: { tag: "Gesichter zurückbringen", title: "Ihre Lieben wieder klar erkennen", description: "Unschärfe oder Verblassen in alten Fotos erschweren die Erkennung. Unsere KI schärft Gesichter — Augen, Lächeln, Haare — behutsam.", benefit1: "Schärft auch Gesichter in Gruppenfotos", benefit2: "Hebt Augen, Lächeln und Ausdruck hervor", benefit3: "Jede Person bleibt erkennbar", beforeLabel: "Vorher", afterLabel: "Nachher" }, feature2: { tag: "Farbe hinzufügen", title: "Schwarz-Weiß zum Leben erwecken", description: "Stellen Sie sich Omas Brautkleid in echter Farbe vor. Unsere KI analysiert Formen und Kontext und kolorisiert natürlich und epochengerecht.", benefit1: "Farben passend zur Epoche", benefit2: "Natürliche Hauttöne und Landschaften", benefit3: "Funktioniert mit Fotos aus jeder Dekade", beforeLabel: "Schwarz-Weiß", afterLabel: "In Farbe" }, feature3: { tag: "Körnigkeit reduzieren", title: "Weichzeichner und Korn glätten", description: "Alte Film- und frühe Digitalfotos sind oft körnig. Unsere KI unterscheidet Korn vom echten Bild und bereinigt behutsam.", benefit1: "Foto bleibt scharf, Korn wird reduziert", benefit2: "Für Film und alte Digitalfotos", benefit3: "Ideal zum Neuabdruck", beforeLabel: "Körnig", afterLabel: "Sauber" } },
    knowledge: { learnExplore: "Lernen & Entdecken", storiesTitle: "Geschichten hinter den Fotos", storiesSubtitle: "Kunst, Geschichte und einfache Schritte zur Bewahrung Ihrer wertvollsten Erinnerungen.", readMore: "Weiterlesen", article0: { title: "Wie KI alte Fotos wiederbelebt", excerpt: "Moderne KI erkennt Schäden, die das Auge übersieht — und repariert Ihr Bild in Sekunden wie ein Restaurator.", readTime: "5 Min. Lesezeit" }, article1: { title: "Die Geschichte der Familienfotografie", excerpt: "Von den ersten Fotografien bis zu den Schnappschüssen in Ihrer Schublade: Jede Epoche erzählt eine Geschichte.", readTime: "7 Min. Lesezeit" }, article2: { title: "Tipps: Fotos jahrzehntelang sichern", excerpt: "Säurefreie Hüllen, wenig Licht und Feuchtigkeit. Heute scannen ist das beste Geschenk für künftige Generationen.", readTime: "4 Min. Lesezeit" } },
    restore: { pageTitle: "Foto wiederherstellen", pageSubtitle: "Wählen Sie ein Foto aus dem Familienalbum — unsere KI entfernt Schäden, hellt Farben auf und bringt Details zurück.", serverError: "Dienst vorübergehend nicht verfügbar. Bitte versuchen Sie es in Kürze erneut.", loginRequired: "Bitte melden Sie sich an.", insufficientCredits: "Nicht genug Punkte. Bitte abonnieren oder auf Auffüllung warten.", restoreFailedRefunded: "Wiederherstellung fehlgeschlagen. Punkte erstattet.", creditsCheckFailed: "Punkteprüfung vorübergehend fehlgeschlagen. Bitte später erneut versuchen.", networkError: "Verbindung fehlgeschlagen. Bitte Netzwerk prüfen.", pointsDeducted: "5 Punkte abgezogen.", pointsRefunded: "Wiederherstellung fehlgeschlagen. 5 Punkte erstattet.", restoring: "Foto wird wiederhergestellt…" },
    cases: { badge: "Fälle & Geschichten", title: "Restaurierungsfälle & Familiengeschichten", subtitle: "So nutzen andere KI zur Restaurierung und die Geschichten dahinter.", restoreTitle: "Restaurierungsfälle", restoreSubtitle: "Beispielfälle mit Platzhalterbildern.", beforeLabel: "Vorher", afterLabel: "Nachher", storiesTitle: "Familiengeschichten", storiesSubtitle: "Echte Nutzerberichte: ein Foto, eine Erinnerung.", ctaTitle: "Auch Ihre Erinnerungen restaurieren", ctaSubtitle: "Altes Foto hochladen – KI stellt Farben wieder her und entfernt Kratzer.", ctaButton: "Jetzt restaurieren" },
    history: { loadingHistory: "Verlauf wird geladen…", signInToSeeHistory: "Melden Sie sich an, um Ihren Verlauf zu sehen", signInToSeeHistoryDesc: "Wiederhergestellte Fotos werden hier nach der Anmeldung gespeichert.", restorationHistory: "Wiederherstellungsverlauf", photosRestoredWhileSignedIn: "Fotos, die Sie nach der Anmeldung wiederhergestellt haben.", noRestorationsYet: "Noch keine Wiederherstellungen. Stellen Sie ein Foto wieder her, sobald Sie angemeldet sind.", restoreAPhoto: "Foto wiederherstellen", beforeAfter: "Vorher / Nachher" },
    loginSuccess: { title: "Erfolgreich angemeldet", description: "Verlauf und Sync sind jetzt aktiv.", bonusLine: "Sie haben 5 Bonuspunkte erhalten.", close: "Schließen" },
    cookieConsent: { message: "Wir verwenden Cookies für bessere Nutzererfahrung und Analyse.", accept: "Akzeptieren", learnMore: "Datenschutz" },
    feedback: { title: "Feedback", description: "Wir freuen uns über Ihre Meinung.", messagePlaceholder: "Was möchten Sie uns mitteilen?", contextPlaceholder: "Optional: welche Funktion oder Seite?", submit: "Senden", success: "Vielen Dank! Ihr Feedback wurde gesendet.", submitFailed: "Senden fehlgeschlagen. Bitte erneut versuchen.", networkError: "Netzwerkfehler. Bitte erneut versuchen.", ctaAfterRestore: "Wie war das Ergebnis? Feedback senden", signInFirst: "Bitte melden Sie sich an, um Feedback zu senden.", goLogin: "Anmelden", labelMessage: "Ihre Nachricht *", labelContext: "Kontext (optional)", submitting: "Wird gesendet…" },
    memberNav: { home: "Mitgliederbereich", points: "Punkte", subscribe: "Abonnieren", feedback: "Feedback", review: "Bewertungen" },
    member: { signInFirst: "Bitte melden Sie sich an, um den Mitgliederbereich zu sehen.", goLogin: "Anmelden", memberCenter: "Mitgliederbereich", currentCredits: "Aktuelle Punkte", creditsPerRestore: "5 Punkte pro Wiederherstellung. Anzeigen", pointsDetail: "Punkteverlauf", membershipStatus: "Mitgliedschaft", planYearly: "Jahresabo", planWeekly: "Wochenabo", notSubscribed: "Nicht abonniert", subscribedAt: "Beginn", goSubscribe: "Abonnieren", pointsTitle: "Punkteverlauf", signInFirstPoints: "Bitte anmelden, um den Punkteverlauf zu sehen.", noRecords: "Noch keine Einträge.", loadMore: "Mehr laden", loading: "Laden…", creditsUnit: "Punkte", reasonSubscribeWeekly: "Wochenabo", reasonSubscribeYearly: "Jahresabo", reasonRefillWeekly: "Wochen-Auffüllung", reasonRefillYearly: "Jahres-Auffüllung", reasonRestorePhoto: "Fotowiederherstellung", reasonRefundRestoreFailed: "Erstattung (Wiederherstellung fehlgeschlagen)", reasonSignupBonus: "Registrierungsbonus", reasonInitialBonus: "Anmeldebonus", subscribeSignInFirst: "Bitte anmelden, um einen Plan zu wählen.", subscribeBadge: "Mehr Punkte · Günstiger", subscribeTitle: "Plan wählen", subscribeSubtitle: "Punkte kaufen oder wöchentlich/jährlich abonnieren.", perPhotoCredits: "~5 Punkte pro Foto", instantCredits: "Sofort gutgeschrieben", bestValue: "Bester Wert", demoNote: "Demo: Punkte werden sofort gutgeschrieben. Echtes Zahlungssystem folgt.", checkoutNote: "Zahlung wird sicher von Polar abgewickelt.", checkoutSuccessTitle: "Zahlung erfolgreich", checkoutSuccessDetail: "Punkte oder Abo werden in Kürze aktualisiert. Checkout-ID", purchaseFailed: "Kauf fehlgeschlagen", subscribeFailed: "Abonnement fehlgeschlagen", networkError: "Netzwerkfehler. Bitte erneut versuchen.", planCreditsName: "Starter", planCreditsSub: "Punktepaket", planCreditsUnit: "einmalig", planCreditsNote: "~2 Fotos", planCreditsF1: "10 Punkte einmalig", planCreditsF2: "~2 Wiederherstellungen", planCreditsF3: "Keine Verlängerung", planCreditsF4: "Zum Ausprobieren", planCreditsCta: "Jetzt kaufen", planCreditsCtaLoading: "Wird gekauft…", planWeeklyName: "Woche", planWeeklySub: "Wochenplan", planWeeklyUnit: "/ Woche", planWeeklyNote: "~20 Fotos/Woche", planWeeklyF1: "100 Punkte/Woche", planWeeklyF2: "~20 Wiederherstellungen/Woche", planWeeklyF3: "Unter 0,50 €/Foto", planWeeklyF4: "Wöchentliche Auffüllung", planWeeklyCta: "Abonnieren", planWeeklyCtaLoading: "Wird abonniert…", planYearlyName: "Jahr", planYearlySub: "Jahresplan", planYearlyUnit: "/ Jahr", planYearlyNote: "~2000 Fotos/Jahr", planYearlyF1: "10000 Punkte/Jahr", planYearlyF2: "~2000 Wiederherstellungen/Jahr", planYearlyF3: "Unter 0,02 €/Foto", planYearlyF4: "Bester Wert", planYearlyCta: "Abonnieren", planYearlyCtaLoading: "Wird abonniert…", layoutTitle: "Mitgliederbereich", layoutDescription: "Punkteverlauf und Mitgliedschaft" },
    review: { title: "Bewertung schreiben", description: "Ihre Erfahrung kann auf der Startseite angezeigt werden.", successMessage: "Danke! Ihre Bewertung wurde gesendet und erscheint nach Prüfung.", labelEmail: "E-Mail *", labelContent: "Ihre Bewertung *", labelCountry: "Land (optional)", placeholderEmail: "ihre@email.de", placeholderContent: "Teilen Sie Ihre Erfahrung…", placeholderCountry: "z. B. Deutschland", submit: "Bewertung senden", submitting: "Wird gesendet…" },
    timeout: { suffix: "Zeitüberschreitung. Bitte prüfen Sie Ihre Verbindung und versuchen Sie es erneut.", retry: "Erneut versuchen", close: "Schließen", actionLogin: "Anmeldung", actionSubscribe: "Kasse", actionRestore: "Fotowiederherstellung" },
  },
  fr: {
    nav: {
      restore: "Restaurer",
      history: "Historique",
      tools: "Outils",
      cases: "Cas",
      member: "Membre",
      feedback: "Commentaires",
      terms: "CGU",
      privacy: "Confidentialité",
      more: "Plus",
      signIn: "Connexion",
      signOut: "Déconnexion",
      clearLoginState: "Effacer l'état de connexion",
      memoryRestore: "AI RestorePic",
    },
    login: {
      welcomeBack: "Bon retour",
      welcomeToBrand: "Bienvenue sur AI RestorePic",
      signInToSave: "Connectez-vous pour enregistrer vos restaurations et consulter l’historique.",
      continueWithGoogle: "Se connecter avec Google",
      loginRequiredForFeature: "Connectez-vous pour utiliser cette fonction.",
      signInWithApple: "Se connecter avec Apple",
      signInWithEmail: "Se connecter avec e-mail",
      comingSoon: "Bientôt disponible",
      agreeTerms: "En cliquant sur « Se connecter avec Google », vous acceptez nos",
      and: " et ",
      terms: "CGU",
      privacyPolicy: "Politique de confidentialité",
      redirecting: "Redirection vers Google…",
      pleaseComplete: "Veuillez terminer la connexion dans la nouvelle fenêtre.",
      clearedMessage: "État de connexion effacé. Veuillez vous reconnecter.",
    },
    footer: {
      memoryRestore: "AI RestorePic",
      tagline: "Aider les familles à préserver et redécouvrir leurs photos les plus précieuses.",
      restoreMemories: "Restaurer des souvenirs",
      cases: "Cas",
      member: "Membre",
      history: "Historique",
      oldPhotos: "Vieilles photos",
      fixScratches: "Réparer les rayures",
      reviveFaded: "Raviver les photos délavées",
      addColor: "Coloriser",
      termsOfService: "Conditions d’utilisation",
      privacyPolicy: "Politique de confidentialité",
      madeWithCare: "Fait avec soin.",
    },
    common: { before: "Avant", after: "Après", beforeAfter: "Avant / Après" },
    home: {
      hero: { badge: "Simple · Gratuit · Sécurisé", titleLine1: "Chaque photo raconte", titleLine2: "une histoire de famille", intro: "Une vieille photo dans un tiroir ? Décolorée, rayée ou déchirée ? Déposez-la ici et regardez les années d'usure disparaître en douceur.", dropTitle: "Déposez votre photo ici pour commencer", dropHint: "ou cliquez pour parcourir · JPG, PNG, WebP · max 8 Mo", privateNote: "Vos photos restent privées — nous ne les enregistrons ni ne les partageons.", pullDown: "Tirez pour actualiser", carousel0: "Un moment familial, renaissance", carousel1: "La couleur revient aux vieux souvenirs", carousel2: "Les rayures s'effacent, les histoires restent" },
      heroBanner: { title: "AI RestorePic fait tout", subtitle: "Restaurez, colorisez et redonnez vie aux vieilles photos — en quelques secondes.", cta: "Commencer" },
      steps: { title: "Aussi simple que 1, 2, 3", subtitle: "Aucune app à installer, aucun compte. Juste vous et votre photo.", step1Title: "Choisir une photo", step1Desc: "Prenez n'importe quelle vieille photo dans votre tiroir, album ou téléphone. Glissez-déposez ou touchez pour sélectionner.", step2Title: "Laisser l'IA agir", step2Desc: "Notre IA supprime les dommages, affine les visages et restaure les couleurs délavées en quelques secondes.", step3Title: "Voir la différence", step3Desc: "Glissez entre avant et après pour voir votre souvenir reprendre vie." },
      toolsSection: { title: "Trouvez l'outil adapté à votre photo", subtitle: "Chaque photo a son histoire et ses besoins. Choisissez la restauration qui vous convient." },
      reviewsSection: { title: "Ce que disent les utilisateurs", subtitle: "Expériences réelles de ceux qui ont restauré leurs souvenirs.", cta: "Partagez votre expérience →" },
      casesSection: { title: "Cas de restauration et histoires familiales", description: "Résultats réels et souvenirs partagés par les utilisateurs.", cta: "Voir les cas" },
      privacySection: { title: "Vos souvenirs sont en sécurité", body: "Nous savons à quel point vos photos sont personnelles. Nous ne les enregistrons, ne les partageons ni ne les utilisons pour rien d'autre que les restaurer. Une fois terminé, elles disparaissent de nos systèmes.", cta: "Restaurer un souvenir" },
      toolKeywords: { "old-photo-restoration": "Restauration de vieilles photos", "faded-photo-repair": "Réparer photos délavées", "scratch-removal": "Retirer les rayures", "water-damaged-photo-repair": "Réparer dégâts des eaux", "black-and-white-photo-colorization": "Colorisation noir et blanc", "blurry-photo-fix": "Corriger flou", "torn-photo-repair": "Réparer photos déchirées", "photo-noise-reduction": "Réduction du bruit", "face-enhancement": "Améliorer les visages", "vintage-photo-enhancement": "Améliorer photos vintage", "polaroid-photo-restoration": "Restauration Polaroid", "book-photo-restoration": "Restauration de photos de livre" },
      toolDescriptions: {},
    },
    feature: { howWeHelp: "Comment nous aidons", restoreWhatMatters: "Restaurer l'essentiel", feature0: { tag: "Réparer les rayures", title: "Effacer en douceur les marques du temps", description: "Les photos précieuses accumulent rayures, plis et poussière. Notre IA repère chaque imperfection et la comble avec les couleurs et textures environnantes.", benefit1: "Supprime rayures, plis et poussière en douceur", benefit2: "Comble les dommages naturellement", benefit3: "Sûr même pour les photos avec visages", beforeLabel: "Avant", afterLabel: "Après" }, feature1: { tag: "Rendre les visages", title: "Revoyez vos proches clairement", description: "Les visages flous ou délavés rendent les gens méconnaissables. Notre IA affine les détails du visage.", benefit1: "Affine les visages en photo de groupe", benefit2: "Fait ressortir yeux, sourires et expressions", benefit3: "Chacun garde son apparence", beforeLabel: "Avant", afterLabel: "Après" }, feature2: { tag: "Ajouter la couleur", title: "Le noir et blanc prend vie", description: "Imaginez la robe de mariée de grand-mère en vraie couleur. Notre IA étudie les formes et le contexte pour appliquer des couleurs naturelles et d'époque.", benefit1: "Couleurs en accord avec l'époque", benefit2: "Teints de peau et paysages naturels", benefit3: "Fonctionne pour toutes les décennies", beforeLabel: "Noir et blanc", afterLabel: "En couleur" }, feature3: { tag: "Réduire le grain", title: "Lisser le flou et le grain", description: "Les anciens films et appareils numériques produisent souvent des images granuleuses. Notre IA distingue le grain de l'image réelle et nettoie en douceur.", benefit1: "Garde la netteté tout en réduisant le grain", benefit2: "Pour films et anciens numériques", benefit3: "Idéal pour réimprimer", beforeLabel: "Granuleux", afterLabel: "Propre" } },
    knowledge: { learnExplore: "Apprendre et explorer", storiesTitle: "Histoires derrière les photos", storiesSubtitle: "Découvrez l'art, l'histoire et les étapes pour préserver les souvenirs les plus précieux de votre famille.", readMore: "Lire la suite", article0: { title: "Comment l'IA redonne vie aux vieilles photos", excerpt: "L'IA moderne voit les dommages invisibles à l'œil — rayures, couleurs délavées, visages flous. Elle répare votre image en secondes.", readTime: "5 min de lecture" }, article1: { title: "La belle histoire de la photo de famille", excerpt: "Des premiers clichés des années 1830 aux photos de votre tiroir, chaque époque raconte une histoire à préserver.", readTime: "7 min de lecture" }, article2: { title: "Conseils pour conserver vos photos des décennies", excerpt: "Pochettes sans acide, à l'abri de la lumière et de l'humidité. Numériser aujourd'hui est le meilleur cadeau pour les générations futures.", readTime: "4 min de lecture" } },
    restore: { pageTitle: "Restaurer votre photo", pageSubtitle: "Choisissez une photo de l'album familial ; notre IA supprimera les dommages, ravivera les couleurs et restituera les détails.", serverError: "Service temporairement indisponible. Veuillez réessayer dans un instant.", loginRequired: "Veuillez vous connecter pour restaurer.", insufficientCredits: "Points insuffisants. Abonnez-vous ou attendez le rafraîchissement.", restoreFailedRefunded: "Restauration échouée. Points remboursés.", creditsCheckFailed: "Vérification des points temporairement indisponible. Réessayez plus tard.", networkError: "Connexion échouée. Vérifiez votre réseau.", pointsDeducted: "5 points déduits.", pointsRefunded: "Restauration échouée. 5 points remboursés.", restoring: "Restauration en cours…" },
    cases: { badge: "Cas et histoires", title: "Cas de restauration et histoires familiales", subtitle: "Comment d'autres utilisent l'IA pour restaurer et les souvenirs derrière.", restoreTitle: "Cas de restauration", restoreSubtitle: "Exemples avec images avant/après.", beforeLabel: "Avant", afterLabel: "Après", storiesTitle: "Histoires familiales", storiesSubtitle: "Témoignages réels : une photo, un souvenir.", ctaTitle: "Restaurer vos souvenirs aussi", ctaSubtitle: "Uploadez une vieille photo, l'IA restaure couleurs et rayures.", ctaButton: "Restaurer" },
    history: { loadingHistory: "Chargement de l'historique…", signInToSeeHistory: "Connectez-vous pour voir votre historique", signInToSeeHistoryDesc: "Vos photos restaurées sont enregistrées ici après connexion.", restorationHistory: "Historique de restauration", photosRestoredWhileSignedIn: "Photos que vous avez restaurées en étant connecté.", noRestorationsYet: "Aucune restauration. Restaurez une photo en étant connecté pour la voir ici.", restoreAPhoto: "Restaurer une photo", beforeAfter: "Avant / Après" },
    loginSuccess: { title: "Connexion réussie", description: "Historique et synchronisation sont activés.", bonusLine: "Vous avez reçu 5 points bonus.", close: "Fermer" },
    cookieConsent: { message: "Nous utilisons des cookies pour améliorer votre expérience.", accept: "Accepter", learnMore: "Confidentialité" },
    feedback: { title: "Commentaires", description: "Votre avis nous intéresse.", messagePlaceholder: "Dites-nous ce que vous en pensez…", contextPlaceholder: "Optionnel : quelle fonction ou page ?", submit: "Envoyer", success: "Merci ! Votre message a bien été envoyé.", submitFailed: "Échec de l'envoi. Veuillez réessayer.", networkError: "Erreur réseau. Veuillez réessayer.", ctaAfterRestore: "Comment était le résultat ? Envoyer un avis", signInFirst: "Veuillez vous connecter pour envoyer un avis.", goLogin: "Se connecter", labelMessage: "Votre message *", labelContext: "Contexte (optionnel)", submitting: "Envoi…" },
    memberNav: { home: "Espace membre", points: "Points", subscribe: "Abonnement", feedback: "Commentaires", review: "Avis" },
    member: { signInFirst: "Veuillez vous connecter pour accéder à l'espace membre.", goLogin: "Se connecter", memberCenter: "Espace membre", currentCredits: "Points actuels", creditsPerRestore: "5 points par restauration. Voir", pointsDetail: "Historique des points", membershipStatus: "Abonnement", planYearly: "Annuel", planWeekly: "Hebdo", notSubscribed: "Non abonné", subscribedAt: "Début", goSubscribe: "S'abonner", pointsTitle: "Historique des points", signInFirstPoints: "Veuillez vous connecter pour voir l'historique.", noRecords: "Aucun enregistrement.", loadMore: "Charger plus", loading: "Chargement…", creditsUnit: "points", reasonSubscribeWeekly: "Abonnement hebdo", reasonSubscribeYearly: "Abonnement annuel", reasonRefillWeekly: "Recharge hebdo", reasonRefillYearly: "Recharge annuelle", reasonRestorePhoto: "Restauration photo", reasonRefundRestoreFailed: "Remboursement (échec)", reasonSignupBonus: "Bonus d'inscription", reasonInitialBonus: "Bonus de connexion", subscribeSignInFirst: "Veuillez vous connecter pour choisir un forfait.", subscribeBadge: "Plus de points · Prix réduit", subscribeTitle: "Choisissez votre forfait", subscribeSubtitle: "Achetez des points ou abonnez-vous à la semaine/année.", perPhotoCredits: "~5 points par photo", instantCredits: "Crédits immédiats", bestValue: "Meilleur rapport qualité-prix", demoNote: "Démo : les points sont crédités immédiatement. Paiement réel à venir.", checkoutNote: "Paiement sécurisé par Polar.", checkoutSuccessTitle: "Paiement réussi", checkoutSuccessDetail: "Les points ou l'abonnement seront mis à jour sous peu. ID de checkout", purchaseFailed: "Achat échoué", subscribeFailed: "Abonnement échoué", networkError: "Erreur réseau. Réessayez.", planCreditsName: "Starter", planCreditsSub: "Pack de points", planCreditsUnit: "unique", planCreditsNote: "~2 restaurations", planCreditsF1: "10 points en une fois", planCreditsF2: "~2 restaurations", planCreditsF3: "Sans renouvellement", planCreditsF4: "Pour essayer", planCreditsCta: "Acheter", planCreditsCtaLoading: "Achat…", planWeeklyName: "Hebdo", planWeeklySub: "Forfait hebdo", planWeeklyUnit: "/ semaine", planWeeklyNote: "~20 photos/semaine", planWeeklyF1: "100 points/semaine", planWeeklyF2: "~20 restaurations/semaine", planWeeklyF3: "Moins de 0,50 €/photo", planWeeklyF4: "Recharge auto chaque semaine", planWeeklyCta: "S'abonner", planWeeklyCtaLoading: "Abonnement…", planYearlyName: "Annuel", planYearlySub: "Forfait annuel", planYearlyUnit: "/ an", planYearlyNote: "~2000 photos/an", planYearlyF1: "10000 points/an", planYearlyF2: "~2000 restaurations/an", planYearlyF3: "Moins de 0,02 €/photo", planYearlyF4: "Meilleur rapport qualité-prix", planYearlyCta: "S'abonner", planYearlyCtaLoading: "Abonnement…", layoutTitle: "Espace membre", layoutDescription: "Historique des points et abonnement" },
    review: { title: "Écrire un avis", description: "Votre expérience peut être affichée sur la page d'accueil.", successMessage: "Merci ! Votre avis a été envoyé et sera visible après modération.", labelEmail: "E-mail *", labelContent: "Votre avis *", labelCountry: "Pays ou région (optionnel)", placeholderEmail: "votre@email.fr", placeholderContent: "Partagez votre expérience…", placeholderCountry: "ex. France", submit: "Envoyer l'avis", submitting: "Envoi…" },
    timeout: { suffix: "a expiré. Vérifiez votre connexion et réessayez.", retry: "Réessayer", close: "Fermer", actionLogin: "Connexion", actionSubscribe: "Paiement", actionRestore: "Restauration photo" },
  },
  "zh-CN": {
    nav: {
      restore: "修复",
      history: "历史",
      tools: "工具",
      cases: "案例",
      member: "会员",
      feedback: "反馈",
      terms: "条款",
      privacy: "隐私",
      more: "更多",
      signIn: "登录",
      signOut: "退出",
      clearLoginState: "清除登录状态",
      memoryRestore: "AI RestorePic",
    },
    login: {
      welcomeBack: "欢迎回来",
      welcomeToBrand: "欢迎使用 AI RestorePic",
      signInToSave: "登录后可保存修复记录并查看历史。",
      loginRequiredForFeature: "需要登录才可以使用该功能",
      continueWithGoogle: "使用 Google 登录",
      signInWithApple: "使用 Apple 登录",
      signInWithEmail: "使用邮箱登录",
      comingSoon: "即将上线",
      agreeTerms: "点击「使用 Google 登录」即表示您同意我们的",
      and: "与",
      terms: "服务条款",
      privacyPolicy: "隐私政策",
      redirecting: "正在跳转到 Google…",
      pleaseComplete: "请在新窗口中完成登录。",
      clearedMessage: "已清除登录状态，请重新登录。",
    },
    footer: {
      memoryRestore: "AI RestorePic",
      tagline: "帮助家庭保存并重新发现最珍贵的照片。",
      restoreMemories: "修复回忆",
      cases: "案例",
      member: "会员",
      history: "历史",
      oldPhotos: "老照片",
      fixScratches: "去除划痕",
      reviveFaded: "修复褪色",
      addColor: "上色",
      termsOfService: "服务条款",
      privacyPolicy: "隐私政策",
      madeWithCare: "用心制作。",
    },
    common: { before: "修复前", after: "修复后", beforeAfter: "修复前 / 修复后" },
    home: {
      hero: { badge: "简单 · 免费 · 安全", titleLine1: "每张照片都在讲述", titleLine2: "一个家庭故事", intro: "在抽屉里发现老照片？褪色、划痕或破损？拖到这里，让岁月的痕迹轻轻消失——就像把家庭相册拨回从前。", dropTitle: "将照片拖到此处开始", dropHint: "或点击选择 · JPG、PNG、WebP · 最大 8MB", privateNote: "您的照片仅您可见，我们不会保存或分享。", pullDown: "下拉刷新", carousel0: "家庭瞬间，重获新生", carousel1: "色彩重回旧日回忆", carousel2: "划痕褪去，故事留存" },
      heroBanner: { title: "AI RestorePic 全能修复", subtitle: "修复、上色，让老照片重获新生 — 只需几秒。", cta: "立即开始" },
      steps: { title: "简单三步", subtitle: "无需安装应用、无需注册。只有你和你的照片。", step1Title: "选择照片", step1Desc: "从抽屉、相册或手机里选一张老照片。拖入或点击即可。", step2Title: "交给 AI 处理", step2Desc: "我们的 AI 会轻柔去除损伤、锐化人脸并恢复褪色，几秒完成。", step3Title: "查看对比", step3Desc: "在修复前后之间滑动，看回忆重获新生。" },
      toolsSection: { title: "为你的照片选对工具", subtitle: "每张照片都有自己的故事和需求。选择适合的修复方式。" },
      reviewsSection: { title: "用户怎么说", subtitle: "真实用户修复回忆后的体验分享。", cta: "分享你的使用体验 →" },
      casesSection: { title: "修复案例与家庭故事", description: "查看真实修复效果与用户分享的珍贵回忆。", cta: "查看案例" },
      privacySection: { title: "您的回忆由我们守护", body: "我们深知照片的私密性。因此我们从不保存、分享或将您的图片用于修复以外的任何用途。完成后即从系统中清除。", cta: "修复一张回忆" },
      toolKeywords: { "old-photo-restoration": "老照片修复", "faded-photo-repair": "褪色修复", "scratch-removal": "去除划痕", "water-damaged-photo-repair": "水渍修复", "black-and-white-photo-colorization": "黑白上色", "blurry-photo-fix": "模糊修复", "torn-photo-repair": "撕损修复", "photo-noise-reduction": "降噪", "face-enhancement": "人脸增强", "vintage-photo-enhancement": "复古增强", "polaroid-photo-restoration": "宝丽来修复", "book-photo-restoration": "书本照片修复" },
      toolDescriptions: {},
    },
    feature: { howWeHelp: "我们能做什么", restoreWhatMatters: "修复最重要的", feature0: { tag: "修复划痕", title: "轻柔抹去岁月痕迹", description: "珍贵照片会随岁月留下划痕、折痕和污点。我们的 AI 识别每一处瑕疵，用周围色彩与纹理自然填补。", benefit1: "轻柔去除划痕、折痕与灰尘", benefit2: "自然填补损伤，不显人工", benefit3: "含人脸的照片也安全", beforeLabel: "修复前", afterLabel: "修复后" }, feature1: { tag: "还原面容", title: "再次清晰看见所爱之人", description: "老照片中模糊或褪色的脸让人难以辨认。我们的 AI 轻柔锐化面部细节——眼睛、笑容、头发。", benefit1: "集体照中的脸也能锐化", benefit2: "突出眼神、笑容与表情", benefit3: "每人仍保持本人样貌", beforeLabel: "修复前", afterLabel: "修复后" }, feature2: { tag: "添加色彩", title: "黑白照焕发色彩", description: "想象奶奶的婚纱还原真色，或爷爷儿时玩耍的花园重绽繁花。我们的 AI 根据形状与语境为照片赋予自然、贴合时代的色彩。", benefit1: "色彩贴合时代", benefit2: "自然肤色与风景", benefit3: "适用于任意年代的照片", beforeLabel: "黑白", afterLabel: "上色" }, feature3: { tag: "去除颗粒", title: "抚平模糊与颗粒", description: "老胶片与早期数码相机常产生颗粒感。我们的 AI 区分颗粒与真实画面，轻柔去噪，得到可打印装框的清晰照片。", benefit1: "去噪同时保持清晰", benefit2: "适用于胶片与老数码", benefit3: "适合重新冲印", beforeLabel: "颗粒", afterLabel: "干净" } },
    knowledge: { learnExplore: "了解与探索", storiesTitle: "照片背后的故事", storiesSubtitle: "了解保存家庭珍贵回忆的艺术、历史与简单步骤。", readMore: "阅读更多", article0: { title: "AI 如何让老照片重获新生", excerpt: "现代 AI 能看见人眼忽略的损伤——细微划痕、褪色、模糊的脸。它从海量照片中学习应有的样貌，然后像专业修复师一样轻柔修复。全程仅需数秒。", readTime: "5 分钟阅读" }, article1: { title: "家庭摄影的美好历史", excerpt: "从 1830 年代的第一张照片到你家抽屉里的快照，每个时代用不同载体——锡版、玻璃、相纸、胶片。每一种老化方式不同，每一种都值得保存。", readTime: "7 分钟阅读" }, article2: { title: "让照片安全保存数十年的小贴士", excerpt: "用无酸套保存，避光防潮。但再好的保存也会老化。今天扫描照片，是留给未来想回忆的人最好的礼物。", readTime: "4 分钟阅读" } },
    restore: { pageTitle: "修复你的照片", pageSubtitle: "从家庭相册选一张照片，我们的 AI 会细心去除损伤、提亮褪色并还原你记得的细节。", serverError: "服务暂时异常，请稍后重试。", loginRequired: "请先登录后再使用修复功能。", insufficientCredits: "积分不足，请先开通会员或等待周期刷新。", restoreFailedRefunded: "生成失败，已退回积分。", creditsCheckFailed: "积分校验暂时失败，请稍后重试。", networkError: "网络异常，请检查网络后重试。", pointsDeducted: "已扣除 5 积分", pointsRefunded: "生成失败，已退回 5 积分", restoring: "正在修复照片，请稍候…" },
    cases: { badge: "案例与故事", title: "修复案例与家庭故事", subtitle: "看看其他人如何用 AI 修复老照片，以及一张张旧照背后的家庭记忆。", restoreTitle: "修复案例", restoreSubtitle: "以下为示意案例，使用占位图展示修复前后对比效果。", beforeLabel: "修复前", afterLabel: "修复后", storiesTitle: "家庭故事", storiesSubtitle: "来自用户的真实分享：一张老照片，一段家族记忆。", ctaTitle: "也来修复你的珍贵回忆", ctaSubtitle: "上传老照片，让 AI 帮你还原色彩、去除划痕，留住家人与时光。", ctaButton: "立即修复" },
    history: { loadingHistory: "正在加载历史…", signInToSeeHistory: "登录后可查看历史", signInToSeeHistoryDesc: "登录后修复的照片会保存在这里。", restorationHistory: "修复历史", photosRestoredWhileSignedIn: "您登录后修复的照片。", noRestorationsYet: "暂无修复记录。登录后修复一张照片即可在此查看。", restoreAPhoto: "修复一张照片", beforeAfter: "修复前 / 修复后" },
    loginSuccess: { title: "登录成功", description: "已为你启用历史记录与同步保存功能。", bonusLine: "已赠送 5 积分。", close: "关闭" },
    cookieConsent: { message: "我们使用 Cookie 以提升体验与流量分析。", accept: "同意", learnMore: "隐私政策" },
    feedback: { title: "用户反馈", description: "欢迎留下您的意见或建议。", messagePlaceholder: "请写下您的想法或建议…", contextPlaceholder: "选填：来自哪个功能或页面？", submit: "提交", success: "感谢！您的反馈已提交。", submitFailed: "提交失败，请重试。", networkError: "网络错误，请重试。", ctaAfterRestore: "修复效果如何？给我们反馈", signInFirst: "请先登录后提交反馈。", goLogin: "去登录", labelMessage: "反馈内容 *", labelContext: "来源（选填）", submitting: "提交中…" },
    memberNav: { home: "会员中心", points: "积分明细", subscribe: "订阅", feedback: "反馈", review: "评价" },
    member: { signInFirst: "请先登录后查看会员中心。", goLogin: "去登录", memberCenter: "会员中心", currentCredits: "当前积分", creditsPerRestore: "每次修复照片消耗 5 积分。查看", pointsDetail: "积分明细", membershipStatus: "会员状态", planYearly: "年会员", planWeekly: "周会员", notSubscribed: "未开通", subscribedAt: "开通时间", goSubscribe: "去订阅", pointsTitle: "积分明细", signInFirstPoints: "请先登录后查看积分明细。", noRecords: "暂无记录", loadMore: "加载更多", loading: "加载中…", creditsUnit: "积分", reasonSubscribeWeekly: "开通周会员", reasonSubscribeYearly: "开通年会员", reasonRefillWeekly: "周会员周期刷新", reasonRefillYearly: "年会员周期刷新", reasonRestorePhoto: "修复照片", reasonRefundRestoreFailed: "修复失败退回", reasonSignupBonus: "注册赠送", reasonInitialBonus: "登录赠送", subscribeSignInFirst: "请先登录后再选择套餐。", subscribeBadge: "更多积分 · 更低单价", subscribeTitle: "选择你的套餐", subscribeSubtitle: "按需购买积分包，或订阅周/年会员，解锁更多修复次数与全年最低价。", perPhotoCredits: "每张约 5 积分", instantCredits: "即时到账", bestValue: "最划算", demoNote: "当前为演示环境，开通/购买后积分即时到账，后续将接入真实支付。", checkoutNote: "支付由 Polar 安全处理。", checkoutSuccessTitle: "支付成功", checkoutSuccessDetail: "积分或会员状态将很快更新。结账 ID", purchaseFailed: "购买失败", subscribeFailed: "订阅失败", networkError: "网络错误，请重试", planCreditsName: "轻量包", planCreditsSub: "积分套餐", planCreditsUnit: "一次性", planCreditsNote: "约 2 张照片修复", planCreditsF1: "10 积分一次性到账", planCreditsF2: "约 2 张照片修复", planCreditsF3: "无需续费，随用随买", planCreditsF4: "适合尝鲜体验", planCreditsCta: "立即购买", planCreditsCtaLoading: "购买中…", planWeeklyName: "周会员", planWeeklySub: "周套餐", planWeeklyUnit: "/ 周", planWeeklyNote: "约 20 张/周，折合不到 $0.5/张", planWeeklyF1: "每周 100 积分", planWeeklyF2: "约 20 张照片修复/周", planWeeklyF3: "折合不到 $0.5/张", planWeeklyF4: "周期按开通日自动刷新", planWeeklyCta: "立即订阅", planWeeklyCtaLoading: "开通中…", planYearlyName: "年会员", planYearlySub: "年套餐", planYearlyUnit: "/ 年", planYearlyNote: "约 2000 张/年，折合不到 $0.02/张", planYearlyF1: "每年 10000 积分", planYearlyF2: "约 2000 张照片修复/年", planYearlyF3: "折合不到 $0.02/张", planYearlyF4: "全年最低单价，最划算", planYearlyCta: "立即订阅", planYearlyCtaLoading: "开通中…", layoutTitle: "会员中心", layoutDescription: "积分明细与会员订阅" },
    review: { title: "写评价", description: "您的使用体验会展示在首页，帮助更多人了解我们。", successMessage: "感谢！您的评价已提交，审核通过后会展示在首页。", labelEmail: "邮箱 *", labelContent: "评价内容 *", labelCountry: "国家或地区（选填）", placeholderEmail: "your@email.com", placeholderContent: "分享您的修复体验或对产品的看法…", placeholderCountry: "例如：中国、美国", submit: "提交评价", submitting: "提交中…" },
    timeout: { suffix: "超时，请检查网络后重试。", retry: "重试", close: "关闭", actionLogin: "登录", actionSubscribe: "订阅", actionRestore: "图片生成" },
  },
  "zh-TW": {
    nav: {
      restore: "修復",
      history: "歷史",
      tools: "工具",
      cases: "案例",
      member: "會員",
      feedback: "反饋",
      terms: "條款",
      privacy: "隱私",
      more: "更多",
      signIn: "登入",
      signOut: "登出",
      clearLoginState: "清除登入狀態",
      memoryRestore: "AI RestorePic",
    },
    login: {
      welcomeBack: "歡迎回來",
      welcomeToBrand: "歡迎使用 AI RestorePic",
      signInToSave: "登入後可儲存修復記錄並查看歷史。",
      loginRequiredForFeature: "需要登入才可以使用該功能",
      continueWithGoogle: "使用 Google 登入",
      signInWithApple: "使用 Apple 登入",
      signInWithEmail: "使用電子郵件登入",
      comingSoon: "即將上線",
      agreeTerms: "點擊「使用 Google 登入」即表示您同意我們的",
      and: "與",
      terms: "服務條款",
      privacyPolicy: "隱私權政策",
      redirecting: "正在跳轉至 Google…",
      pleaseComplete: "請在新視窗中完成登入。",
      clearedMessage: "已清除登入狀態，請重新登入。",
    },
    footer: {
      memoryRestore: "AI RestorePic",
      tagline: "幫助家庭保存並重新發現最珍貴的照片。",
      restoreMemories: "修復回憶",
      cases: "案例",
      member: "會員",
      history: "歷史",
      oldPhotos: "老照片",
      fixScratches: "去除刮痕",
      reviveFaded: "修復褪色",
      addColor: "上色",
      termsOfService: "服務條款",
      privacyPolicy: "隱私權政策",
      madeWithCare: "用心製作。",
    },
    common: { before: "修復前", after: "修復後", beforeAfter: "修復前 / 修復後" },
    home: {
      hero: { badge: "簡單 · 免費 · 安全", titleLine1: "每張照片都在講述", titleLine2: "一個家庭故事", intro: "在抽屜裡發現老照片？褪色、刮痕或破損？拖到這裡，讓歲月的痕跡輕輕消失。", dropTitle: "將照片拖到此處開始", dropHint: "或點擊選擇 · JPG、PNG、WebP · 最大 8MB", privateNote: "您的照片僅您可見，我們不會儲存或分享。", pullDown: "下拉重新整理", carousel0: "家庭瞬間，重獲新生", carousel1: "色彩重回舊日回憶", carousel2: "刮痕褪去，故事留存" },
      heroBanner: { title: "AI RestorePic 全能修復", subtitle: "修復、上色，讓老照片重獲新生 — 只需幾秒。", cta: "立即開始" },
      steps: { title: "簡單三步", subtitle: "無需安裝應用、無需註冊。只有你和你的照片。", step1Title: "選擇照片", step1Desc: "從抽屜、相冊或手機裡選一張老照片。拖入或點擊即可。", step2Title: "交給 AI 處理", step2Desc: "我們的 AI 會輕柔去除損傷、銳化人臉並恢復褪色，幾秒完成。", step3Title: "查看對比", step3Desc: "在修復前後之間滑動，看回憶重獲新生。" },
      toolsSection: { title: "為你的照片選對工具", subtitle: "每張照片都有自己的故事和需求。選擇適合的修復方式。" },
      reviewsSection: { title: "用戶怎麼說", subtitle: "真實用戶修復回憶後的體驗分享。", cta: "分享你的使用體驗 →" },
      casesSection: { title: "修復案例與家庭故事", description: "查看真實修復效果與用戶分享的珍貴回憶。", cta: "查看案例" },
      privacySection: { title: "您的回憶由我們守護", body: "我們深知照片的私密性。因此我們從不儲存、分享或將您的圖片用於修復以外的任何用途。完成後即從系統中清除。", cta: "修復一張回憶" },
      toolKeywords: { "old-photo-restoration": "老照片修復", "faded-photo-repair": "褪色修復", "scratch-removal": "去除刮痕", "water-damaged-photo-repair": "水漬修復", "black-and-white-photo-colorization": "黑白上色", "blurry-photo-fix": "模糊修復", "torn-photo-repair": "撕損修復", "photo-noise-reduction": "降噪", "face-enhancement": "人臉增強", "vintage-photo-enhancement": "復古增強", "polaroid-photo-restoration": "寶麗來修復", "book-photo-restoration": "書本照片修復" },
      toolDescriptions: {},
    },
    feature: { howWeHelp: "我們能做什麼", restoreWhatMatters: "修復最重要的", feature0: { tag: "修復刮痕", title: "輕柔抹去歲月痕跡", description: "珍貴照片會隨歲月留下刮痕、折痕和污點。我們的 AI 識別每一處瑕疵，用周圍色彩與紋理自然填補。", benefit1: "輕柔去除刮痕、折痕與灰塵", benefit2: "自然填補損傷，不顯人工", benefit3: "含人臉的照片也安全", beforeLabel: "修復前", afterLabel: "修復後" }, feature1: { tag: "還原面容", title: "再次清晰看見所愛之人", description: "老照片中模糊或褪色的臉讓人難以辨認。我們的 AI 輕柔銳化面部細節。", benefit1: "集體照中的臉也能銳化", benefit2: "突出眼神、笑容與表情", benefit3: "每人仍保持本人樣貌", beforeLabel: "修復前", afterLabel: "修復後" }, feature2: { tag: "添加色彩", title: "黑白照煥發色彩", description: "想像奶奶的婚紗還原真色，或爺爺兒時玩耍的花園重綻繁花。我們的 AI 根據形狀與語境為照片賦予自然、貼合時代的色彩。", benefit1: "色彩貼合時代", benefit2: "自然膚色與風景", benefit3: "適用於任意年代的照片", beforeLabel: "黑白", afterLabel: "上色" }, feature3: { tag: "去除顆粒", title: "撫平模糊與顆粒", description: "老膠片與早期數位相機常產生顆粒感。我們的 AI 區分顆粒與真實畫面，輕柔去噪。", benefit1: "去噪同時保持清晰", benefit2: "適用於膠片與老數位", benefit3: "適合重新沖印", beforeLabel: "顆粒", afterLabel: "乾淨" } },
    knowledge: { learnExplore: "了解與探索", storiesTitle: "照片背後的故事", storiesSubtitle: "了解保存家庭珍貴回憶的藝術、歷史與簡單步驟。", readMore: "閱讀更多", article0: { title: "AI 如何讓老照片重獲新生", excerpt: "現代 AI 能看見人眼忽略的損傷——細微刮痕、褪色、模糊的臉。它從海量照片中學習應有的樣貌，然後像專業修復師一樣輕柔修復。", readTime: "5 分鐘閱讀" }, article1: { title: "家庭攝影的美好歷史", excerpt: "從 1830 年代的第一張照片到你家抽屜裡的快照，每個時代用不同載體。每一種都值得保存。", readTime: "7 分鐘閱讀" }, article2: { title: "讓照片安全保存數十年的小貼士", excerpt: "用無酸套保存，避光防潮。今天掃描照片，是留給未來想回憶的人最好的禮物。", readTime: "4 分鐘閱讀" } },
    restore: { pageTitle: "修復你的照片", pageSubtitle: "從家庭相冊選一張照片，我們的 AI 會細心去除損傷、提亮褪色並還原你記得的細節。", serverError: "服務暫時異常，請稍後重試。", loginRequired: "請先登入後再使用修復功能。", insufficientCredits: "積分不足，請先開通會員或等待週期刷新。", restoreFailedRefunded: "生成失敗，已退回積分。", creditsCheckFailed: "積分校驗暫時失敗，請稍後重試。", networkError: "網路異常，請檢查網路後重試。", pointsDeducted: "已扣除 5 積分", pointsRefunded: "生成失敗，已退回 5 積分", restoring: "正在修復照片，請稍候…" },
    cases: { badge: "案例與故事", title: "修復案例與家庭故事", subtitle: "看看其他人如何用 AI 修復老照片，以及一張張舊照背後的家庭記憶。", restoreTitle: "修復案例", restoreSubtitle: "以下為示意案例，使用佔位圖展示修復前後對比效果。", beforeLabel: "修復前", afterLabel: "修復後", storiesTitle: "家庭故事", storiesSubtitle: "來自用戶的真實分享：一張老照片，一段家族記憶。", ctaTitle: "也來修復你的珍貴回憶", ctaSubtitle: "上傳老照片，讓 AI 幫你還原色彩、去除劃痕，留住家人與時光。", ctaButton: "立即修復" },
    history: { loadingHistory: "正在載入歷史…", signInToSeeHistory: "登入後可查看歷史", signInToSeeHistoryDesc: "登入後修復的照片會儲存在這裡。", restorationHistory: "修復歷史", photosRestoredWhileSignedIn: "您登入後修復的照片。", noRestorationsYet: "暫無修復記錄。登入後修復一張照片即可在此查看。", restoreAPhoto: "修復一張照片", beforeAfter: "修復前 / 修復後" },
    loginSuccess: { title: "登入成功", description: "已為你啟用歷史記錄與同步儲存功能。", bonusLine: "已贈送 5 積分。", close: "關閉" },
    cookieConsent: { message: "我們使用 Cookie 以提升體驗與流量分析。", accept: "同意", learnMore: "隱私權政策" },
    feedback: { title: "用戶反饋", description: "歡迎留下您的意見或建議。", messagePlaceholder: "請寫下您的想法或建議…", contextPlaceholder: "選填：來自哪個功能或頁面？", submit: "提交", success: "感謝！您的反饋已提交。", submitFailed: "提交失敗，請重試。", networkError: "網路錯誤，請重試。", ctaAfterRestore: "修復效果如何？給我們反饋", signInFirst: "請先登入後提交反饋。", goLogin: "去登入", labelMessage: "反饋內容 *", labelContext: "來源（選填）", submitting: "提交中…" },
    memberNav: { home: "會員中心", points: "積分明細", subscribe: "訂閱", feedback: "反饋", review: "評價" },
    member: { signInFirst: "請先登入後查看會員中心。", goLogin: "去登入", memberCenter: "會員中心", currentCredits: "當前積分", creditsPerRestore: "每次修復照片消耗 5 積分。查看", pointsDetail: "積分明細", membershipStatus: "會員狀態", planYearly: "年會員", planWeekly: "周會員", notSubscribed: "未開通", subscribedAt: "開通時間", goSubscribe: "去訂閱", pointsTitle: "積分明細", signInFirstPoints: "請先登入後查看積分明細。", noRecords: "暫無記錄", loadMore: "載入更多", loading: "載入中…", creditsUnit: "積分", reasonSubscribeWeekly: "開通周會員", reasonSubscribeYearly: "開通年會員", reasonRefillWeekly: "周會員週期刷新", reasonRefillYearly: "年會員週期刷新", reasonRestorePhoto: "修復照片", reasonRefundRestoreFailed: "修復失敗退回", reasonSignupBonus: "註冊贈送", reasonInitialBonus: "登入贈送", subscribeSignInFirst: "請先登入後再選擇套餐。", subscribeBadge: "更多積分 · 更低單價", subscribeTitle: "選擇你的套餐", subscribeSubtitle: "按需購買積分包，或訂閱周/年會員，解鎖更多修復次數與全年最低價。", perPhotoCredits: "每張約 5 積分", instantCredits: "即時到帳", bestValue: "最划算", demoNote: "當前為演示環境，開通/購買後積分即時到帳，後續將接入真實支付。", checkoutNote: "支付由 Polar 安全處理。", checkoutSuccessTitle: "支付成功", checkoutSuccessDetail: "積分或會員狀態將很快更新。結賬 ID", purchaseFailed: "購買失敗", subscribeFailed: "訂閱失敗", networkError: "網路錯誤，請重試", planCreditsName: "輕量包", planCreditsSub: "積分套餐", planCreditsUnit: "一次性", planCreditsNote: "約 2 張照片修復", planCreditsF1: "10 積分一次性到帳", planCreditsF2: "約 2 張照片修復", planCreditsF3: "無需續費，隨用隨買", planCreditsF4: "適合嘗鮮體驗", planCreditsCta: "立即購買", planCreditsCtaLoading: "購買中…", planWeeklyName: "周會員", planWeeklySub: "周套餐", planWeeklyUnit: "/ 周", planWeeklyNote: "約 20 張/周", planWeeklyF1: "每週 100 積分", planWeeklyF2: "約 20 張照片修復/周", planWeeklyF3: "折合不到 $0.5/張", planWeeklyF4: "週期按開通日自動刷新", planWeeklyCta: "立即訂閱", planWeeklyCtaLoading: "開通中…", planYearlyName: "年會員", planYearlySub: "年套餐", planYearlyUnit: "/ 年", planYearlyNote: "約 2000 張/年", planYearlyF1: "每年 10000 積分", planYearlyF2: "約 2000 張照片修復/年", planYearlyF3: "折合不到 $0.02/張", planYearlyF4: "全年最低單價，最划算", planYearlyCta: "立即訂閱", planYearlyCtaLoading: "開通中…", layoutTitle: "會員中心", layoutDescription: "積分明細與會員訂閱" },
    review: { title: "寫評價", description: "您的使用體驗會展示在首頁，幫助更多人了解我們。", successMessage: "感謝！您的評價已提交，審核通過後會展示在首頁。", labelEmail: "信箱 *", labelContent: "評價內容 *", labelCountry: "國家或地區（選填）", placeholderEmail: "your@email.com", placeholderContent: "分享您的修復體驗或對產品的看法…", placeholderCountry: "例如：台灣、美國", submit: "提交評價", submitting: "提交中…" },
    timeout: { suffix: "逾時，請檢查網路後重試。", retry: "重試", close: "關閉", actionLogin: "登入", actionSubscribe: "訂閱", actionRestore: "圖片生成" },
  },
  es: {
    nav: {
      restore: "Restaurar",
      history: "Historial",
      tools: "Herramientas",
      cases: "Casos",
      member: "Miembro",
      feedback: "Comentarios",
      terms: "Términos",
      privacy: "Privacidad",
      more: "Más",
      signIn: "Iniciar sesión",
      signOut: "Cerrar sesión",
      clearLoginState: "Borrar estado de sesión",
      memoryRestore: "AI RestorePic",
    },
    login: {
      welcomeBack: "Bienvenido de nuevo",
      welcomeToBrand: "Bienvenido a AI RestorePic",
      signInToSave: "Inicia sesión para guardar restauraciones y ver el historial.",
      loginRequiredForFeature: "Inicia sesión para usar esta función.",
      continueWithGoogle: "Iniciar sesión con Google",
      signInWithApple: "Iniciar sesión con Apple",
      signInWithEmail: "Iniciar sesión con correo",
      comingSoon: "Próximamente",
      agreeTerms: "Al hacer clic en «Iniciar sesión con Google», aceptas nuestros",
      and: " y ",
      terms: "Términos de servicio",
      privacyPolicy: "Política de privacidad",
      redirecting: "Redirigiendo a Google…",
      pleaseComplete: "Completa el inicio de sesión en la nueva ventana.",
      clearedMessage: "Estado de sesión borrado. Vuelve a iniciar sesión.",
    },
    footer: {
      memoryRestore: "AI RestorePic",
      tagline: "Ayudando a las familias a preservar y redescubrir sus fotografías más preciadas.",
      restoreMemories: "Restaurar recuerdos",
      cases: "Casos",
      member: "Miembro",
      history: "Historial",
      oldPhotos: "Fotos antiguas",
      fixScratches: "Reparar rayaduras",
      reviveFaded: "Revivir fotos descoloridas",
      addColor: "Añadir color",
      termsOfService: "Términos de servicio",
      privacyPolicy: "Política de privacidad",
      madeWithCare: "Hecho con cuidado.",
    },
    common: { before: "Antes", after: "Después", beforeAfter: "Antes / Después" },
    home: {
      hero: { badge: "Simple · Gratis · Seguro", titleLine1: "Cada foto cuenta", titleLine2: "una historia familiar", intro: "¿Encontraste una foto vieja en un cajón? ¿Descolorida, rayada o rota? Suéltala aquí y mira cómo los años de desgaste desaparecen con suavidad.", dropTitle: "Suelta tu foto aquí para empezar", dropHint: "o haz clic para explorar · JPG, PNG, WebP · máx. 8 MB", privateNote: "Tus fotos son privadas — nunca las guardamos ni compartimos.", pullDown: "Desliza hacia abajo para actualizar", carousel0: "Un momento familiar, renacido", carousel1: "El color vuelve a los recuerdos", carousel2: "Los rayones se desvanecen, las historias permanecen" },
      heroBanner: { title: "AI RestorePic lo hace todo", subtitle: "Restaura, coloriza y devuelve la vida a fotos antiguas — en segundos.", cta: "Empezar ahora" },
      steps: { title: "Tan fácil como 1, 2, 3", subtitle: "Sin apps que instalar, sin cuentas. Solo tú y tu foto.", step1Title: "Elige una foto", step1Desc: "Cualquier foto antigua de tu cajón, álbum o móvil. Arrastra o toca para seleccionar.", step2Title: "Deja que la IA actúe", step2Desc: "Nuestra IA elimina daños, afina rostros y restaura colores desvaídos en segundos.", step3Title: "Mira la diferencia", step3Desc: "Desliza entre antes y después para ver tu recuerdo cobrar vida." },
      toolsSection: { title: "Encuentra la herramienta adecuada para tu foto", subtitle: "Cada foto tiene su historia y sus necesidades. Elige la restauración que te convenga." },
      reviewsSection: { title: "Lo que dicen los usuarios", subtitle: "Experiencias reales de quienes restauraron sus recuerdos.", cta: "Comparte tu experiencia →" },
      casesSection: { title: "Casos de restauración e historias familiares", description: "Resultados reales y recuerdos compartidos por usuarios.", cta: "Ver casos" },
      privacySection: { title: "Tus recuerdos están seguros con nosotros", body: "Entendemos lo personales que son tus fotos. Por eso nunca guardamos, compartimos ni usamos tus imágenes para nada más que restaurarlas. Al terminar, desaparecen de nuestro sistema.", cta: "Restaurar un recuerdo" },
      toolKeywords: { "old-photo-restoration": "Restauración de fotos antiguas", "faded-photo-repair": "Reparar fotos descoloridas", "scratch-removal": "Eliminar rayaduras", "water-damaged-photo-repair": "Reparar daños por agua", "black-and-white-photo-colorization": "Colorizar blanco y negro", "blurry-photo-fix": "Corregir desenfoque", "torn-photo-repair": "Reparar fotos rotas", "photo-noise-reduction": "Reducir ruido", "face-enhancement": "Mejorar rostros", "vintage-photo-enhancement": "Mejorar fotos vintage", "polaroid-photo-restoration": "Restauración Polaroid", "book-photo-restoration": "Restauración de fotos de libro" },
      toolDescriptions: {},
    },
    feature: { howWeHelp: "Cómo ayudamos", restoreWhatMatters: "Restaurar lo que más importa", feature0: { tag: "Reparar rayones", title: "Borrar suavemente las marcas del tiempo", description: "Con los años, las fotos preciosas acumulan rayones, pliegues y manchas de polvo. Nuestra IA identifica cada imperfección y la rellena con los colores y texturas del entorno.", benefit1: "Elimina rayones, pliegues y polvo con suavidad", benefit2: "Rellena daños de forma natural", benefit3: "Seguro incluso para fotos con rostros", beforeLabel: "Antes", afterLabel: "Después" }, feature1: { tag: "Recuperar rostros", title: "Vuelve a ver con claridad a tus seres queridos", description: "Los rostros borrosos o desvaídos en fotos antiguas dificultan reconocer a la gente. Nuestra IA afina con suavidad los detalles del rostro.", benefit1: "Afinación de rostros en fotos de grupo", benefit2: "Resalta ojos, sonrisas y expresiones", benefit3: "Cada persona mantiene su aspecto", beforeLabel: "Antes", afterLabel: "Después" }, feature2: { tag: "Añadir color", title: "Ver el blanco y negro cobrar vida", description: "Imagina el vestido de novia de la abuela en su color real. Nuestra IA estudia formas y contexto para aplicar colores naturales y de época.", benefit1: "Colores que coinciden con la época", benefit2: "Tonos de piel y paisajes naturales", benefit3: "Funciona con fotos de cualquier década", beforeLabel: "Blanco y negro", afterLabel: "En color" }, feature3: { tag: "Reducir grano", title: "Suavizar desenfoque y grano", description: "Las fotos de película y las primeras digitales suelen ser granulosas. Nuestra IA distingue el grano de la imagen real y limpia con suavidad.", benefit1: "Mantiene nitidez y reduce grano", benefit2: "Para película y fotos digitales antiguas", benefit3: "Ideal para reimprimir", beforeLabel: "Granulado", afterLabel: "Limpio" } },
    knowledge: { learnExplore: "Aprender y explorar", storiesTitle: "Historias detrás de las fotos", storiesSubtitle: "Descubre el arte, la historia y los pasos para preservar los recuerdos más preciados de tu familia.", readMore: "Leer más", article0: { title: "Cómo la IA devuelve la vida a fotos antiguas", excerpt: "La IA moderna ve daños que el ojo no percibe — rayones, colores desvaídos, rostros borrosos. Repara tu imagen en segundos.", readTime: "5 min de lectura" }, article1: { title: "La bella historia de la fotografía familiar", excerpt: "Desde las primeras fotos de los años 1830 hasta las de tu cajón, cada época cuenta una historia que merece preservarse.", readTime: "7 min de lectura" }, article2: { title: "Consejos para conservar tus fotos durante décadas", excerpt: "Guárdalas en fundas sin ácido, lejos del sol y la humedad. Escanear hoy es el mejor regalo para las generaciones futuras.", readTime: "4 min de lectura" } },
    restore: { pageTitle: "Restaurar tu foto", pageSubtitle: "Elige una foto del álbum familiar; nuestra IA eliminará daños, avivará colores y recuperará los detalles que recuerdas.", serverError: "Servicio no disponible temporalmente. Por favor, inténtalo de nuevo en un momento.", loginRequired: "Inicia sesión para restaurar.", insufficientCredits: "Puntos insuficientes. Suscríbete o espera al refresco.", restoreFailedRefunded: "Restauración fallida. Puntos reembolsados.", creditsCheckFailed: "Comprobación de puntos no disponible. Inténtalo más tarde.", networkError: "Error de conexión. Comprueba tu red.", pointsDeducted: "5 puntos descontados.", pointsRefunded: "Restauración fallida. 5 puntos reembolsados.", restoring: "Restaurando tu foto…" },
    cases: { badge: "Casos e historias", title: "Casos de restauración e historias familiares", subtitle: "Cómo otros usan la IA para restaurar y las memorias detrás.", restoreTitle: "Casos de restauración", restoreSubtitle: "Casos de ejemplo con imágenes antes/después.", beforeLabel: "Antes", afterLabel: "Después", storiesTitle: "Historias familiares", storiesSubtitle: "Historias reales: una foto, un recuerdo.", ctaTitle: "Restaura tus recuerdos también", ctaSubtitle: "Sube una foto antigua; la IA restaura colores y quita rayones.", ctaButton: "Restaurar ahora" },
    history: { loadingHistory: "Cargando historial…", signInToSeeHistory: "Inicia sesión para ver tu historial", signInToSeeHistoryDesc: "Tus fotos restauradas se guardan aquí tras iniciar sesión.", restorationHistory: "Historial de restauración", photosRestoredWhileSignedIn: "Fotos que has restaurado con la sesión iniciada.", noRestorationsYet: "Aún no hay restauraciones. Restaura una foto con la sesión iniciada para verla aquí.", restoreAPhoto: "Restaurar una foto", beforeAfter: "Antes / Después" },
    loginSuccess: { title: "Sesión iniciada correctamente", description: "El historial y la sincronización están activos.", bonusLine: "Has recibido 5 puntos de bonificación.", close: "Cerrar" },
    cookieConsent: { message: "Usamos cookies para mejorar tu experiencia y analizar tráfico.", accept: "Aceptar", learnMore: "Privacidad" },
    feedback: { title: "Comentarios", description: "Nos encantaría saber tu opinión.", messagePlaceholder: "Cuéntanos qué piensas o sugiere…", contextPlaceholder: "Opcional: ¿qué función o página?", submit: "Enviar", success: "¡Gracias! Tu comentario se ha enviado.", submitFailed: "Error al enviar. Inténtalo de nuevo.", networkError: "Error de red. Inténtalo de nuevo.", ctaAfterRestore: "¿Cómo fue el resultado? Enviar comentarios", signInFirst: "Inicia sesión para enviar comentarios.", goLogin: "Iniciar sesión", labelMessage: "Tu mensaje *", labelContext: "Contexto (opcional)", submitting: "Enviando…" },
    memberNav: { home: "Mi cuenta", points: "Puntos", subscribe: "Suscripción", feedback: "Comentarios", review: "Reseñas" },
    member: { signInFirst: "Inicia sesión para ver tu cuenta.", goLogin: "Iniciar sesión", memberCenter: "Mi cuenta", currentCredits: "Puntos actuales", creditsPerRestore: "5 puntos por restauración. Ver", pointsDetail: "Historial de puntos", membershipStatus: "Suscripción", planYearly: "Anual", planWeekly: "Semanal", notSubscribed: "Sin suscripción", subscribedAt: "Inicio", goSubscribe: "Suscribirse", pointsTitle: "Historial de puntos", signInFirstPoints: "Inicia sesión para ver el historial.", noRecords: "Sin registros.", loadMore: "Cargar más", loading: "Cargando…", creditsUnit: "puntos", reasonSubscribeWeekly: "Suscripción semanal", reasonSubscribeYearly: "Suscripción anual", reasonRefillWeekly: "Recarga semanal", reasonRefillYearly: "Recarga anual", reasonRestorePhoto: "Restauración", reasonRefundRestoreFailed: "Reembolso (fallo)", reasonSignupBonus: "Regalo por registro", reasonInitialBonus: "Bonificación por inicio de sesión", subscribeSignInFirst: "Inicia sesión para elegir un plan.", subscribeBadge: "Más puntos · Mejor precio", subscribeTitle: "Elige tu plan", subscribeSubtitle: "Compra puntos o suscríbete semanal/anual.", perPhotoCredits: "~5 puntos por foto", instantCredits: "Puntos al instante", bestValue: "Mejor valor", demoNote: "Demo: los puntos se añaden al instante. Pago real próximamente.", checkoutNote: "Pago seguro procesado por Polar.", checkoutSuccessTitle: "Pago realizado", checkoutSuccessDetail: "Los puntos o la suscripción se actualizarán en breve. ID de checkout", purchaseFailed: "Compra fallida", subscribeFailed: "Suscripción fallida", networkError: "Error de red. Inténtalo de nuevo.", planCreditsName: "Starter", planCreditsSub: "Pack de puntos", planCreditsUnit: "único", planCreditsNote: "~2 fotos", planCreditsF1: "10 puntos de una vez", planCreditsF2: "~2 restauraciones", planCreditsF3: "Sin renovación", planCreditsF4: "Para probar", planCreditsCta: "Comprar", planCreditsCtaLoading: "Comprando…", planWeeklyName: "Semanal", planWeeklySub: "Plan semanal", planWeeklyUnit: "/ semana", planWeeklyNote: "~20 fotos/semana", planWeeklyF1: "100 puntos/semana", planWeeklyF2: "~20 restauraciones/semana", planWeeklyF3: "Menos de 0,50 €/foto", planWeeklyF4: "Recarga automática", planWeeklyCta: "Suscribirse", planWeeklyCtaLoading: "Suscribiendo…", planYearlyName: "Anual", planYearlySub: "Plan anual", planYearlyUnit: "/ año", planYearlyNote: "~2000 fotos/año", planYearlyF1: "10000 puntos/año", planYearlyF2: "~2000 restauraciones/año", planYearlyF3: "Menos de 0,02 €/foto", planYearlyF4: "Mejor valor", planYearlyCta: "Suscribirse", planYearlyCtaLoading: "Suscribiendo…", layoutTitle: "Mi cuenta", layoutDescription: "Historial de puntos y suscripción" },
    review: { title: "Escribir reseña", description: "Tu experiencia puede mostrarse en la página principal.", successMessage: "¡Gracias! Tu reseña se ha enviado y se mostrará tras moderación.", labelEmail: "Email *", labelContent: "Tu reseña *", labelCountry: "País o región (opcional)", placeholderEmail: "tu@email.com", placeholderContent: "Comparte tu experiencia…", placeholderCountry: "ej. España", submit: "Enviar reseña", submitting: "Enviando…" },
    timeout: { suffix: "agotado el tiempo. Comprueba tu conexión e inténtalo de nuevo.", retry: "Reintentar", close: "Cerrar", actionLogin: "Inicio de sesión", actionSubscribe: "Pago", actionRestore: "Restauración de foto" },
  },
  pt: {
    nav: {
      restore: "Restaurar",
      history: "Histórico",
      tools: "Ferramentas",
      cases: "Casos",
      member: "Membro",
      feedback: "Feedback",
      terms: "Termos",
      privacy: "Privacidade",
      more: "Mais",
      signIn: "Entrar",
      signOut: "Sair",
      clearLoginState: "Limpar estado de login",
      memoryRestore: "AI RestorePic",
    },
    login: {
      welcomeBack: "Bem-vindo de volta",
      welcomeToBrand: "Bem-vindo ao AI RestorePic",
      signInToSave: "Entre para salvar restaurações e ver o histórico.",
      loginRequiredForFeature: "Entre para usar este recurso.",
      continueWithGoogle: "Entrar com Google",
      signInWithApple: "Entrar com Apple",
      signInWithEmail: "Entrar com e-mail",
      comingSoon: "Em breve",
      agreeTerms: "Ao clicar em «Entrar com Google», você concorda com nossos",
      and: " e ",
      terms: "Termos de serviço",
      privacyPolicy: "Política de privacidade",
      redirecting: "Redirecionando para o Google…",
      pleaseComplete: "Conclua o login na nova janela.",
      clearedMessage: "Estado de login limpo. Faça login novamente.",
    },
    footer: {
      memoryRestore: "AI RestorePic",
      tagline: "Ajudando famílias a preservar e redescobrir suas fotos mais preciosas.",
      restoreMemories: "Restaurar memórias",
      cases: "Casos",
      member: "Membro",
      history: "Histórico",
      oldPhotos: "Fotos antigas",
      fixScratches: "Reparar arranhões",
      reviveFaded: "Reviver fotos desbotadas",
      addColor: "Adicionar cor",
      termsOfService: "Termos de uso",
      privacyPolicy: "Política de privacidade",
      madeWithCare: "Feito com cuidado.",
    },
    common: { before: "Antes", after: "Depois", beforeAfter: "Antes / Depois" },
    home: {
      hero: { badge: "Simples · Grátis · Seguro", titleLine1: "Cada foto conta", titleLine2: "uma história de família", intro: "Achou uma foto antiga na gaveta? Desbotada, arranhada ou rasgada? Solte aqui e veja os anos de desgaste desaparecerem com suavidade.", dropTitle: "Solte sua foto aqui para começar", dropHint: "ou clique para procurar · JPG, PNG, WebP · máx. 8 MB", privateNote: "Suas fotos ficam privadas — nunca as salvamos nem compartilhamos.", pullDown: "Deslize para atualizar", carousel0: "Um momento em família, renascido", carousel1: "A cor volta às lembranças", carousel2: "Arranhões somem, histórias ficam" },
      heroBanner: { title: "AI RestorePic faz tudo", subtitle: "Restaure, colorize e traga fotos antigas de volta à vida — em segundos.", cta: "Começar agora" },
      steps: { title: "Tão fácil quanto 1, 2, 3", subtitle: "Sem apps para instalar, sem contas. Só você e sua foto.", step1Title: "Escolha uma foto", step1Desc: "Qualquer foto antiga da gaveta, álbum ou celular. Arraste ou toque para selecionar.", step2Title: "Deixe a IA trabalhar", step2Desc: "Nossa IA remove danos, afia rostos e restaura cores desbotadas em segundos.", step3Title: "Veja a diferença", step3Desc: "Deslize entre antes e depois para ver sua memória ganhar vida." },
      toolsSection: { title: "Encontre a ferramenta certa para sua foto", subtitle: "Cada foto tem sua história e suas necessidades. Escolha a restauração que combina com você." },
      reviewsSection: { title: "O que os usuários dizem", subtitle: "Experiências reais de quem restaurou suas memórias.", cta: "Compartilhe sua experiência →" },
      casesSection: { title: "Casos de restauração e histórias de família", description: "Resultados reais e memórias compartilhadas por usuários.", cta: "Ver casos" },
      privacySection: { title: "Suas memórias estão seguras conosco", body: "Entendemos o quanto suas fotos são pessoais. Por isso nunca salvamos, compartilhamos ou usamos suas imagens para nada além de restaurá-las. Quando terminar, somem do nosso sistema.", cta: "Restaurar uma memória" },
      toolKeywords: { "old-photo-restoration": "Restauração de fotos antigas", "faded-photo-repair": "Reparar fotos desbotadas", "scratch-removal": "Remover arranhões", "water-damaged-photo-repair": "Reparar danos por água", "black-and-white-photo-colorization": "Colorizar preto e branco", "blurry-photo-fix": "Corrigir desfoque", "torn-photo-repair": "Reparar fotos rasgadas", "photo-noise-reduction": "Reduzir ruído", "face-enhancement": "Melhorar rostos", "vintage-photo-enhancement": "Melhorar fotos vintage", "polaroid-photo-restoration": "Restauração Polaroid", "book-photo-restoration": "Restauração de fotos de livro" },
      toolDescriptions: {},
    },
    feature: { howWeHelp: "Como ajudamos", restoreWhatMatters: "Restaurar o que importa", feature0: { tag: "Reparar arranhões", title: "Apagar suavemente as marcas do tempo", description: "Com o tempo, fotos preciosas ganham arranhões, vincos e manchas. Nossa IA identifica cada imperfeição e preenche com as cores e texturas ao redor.", benefit1: "Remove arranhões, vincos e pó com suavidade", benefit2: "Preenche danos de forma natural", benefit3: "Seguro mesmo para fotos com rostos", beforeLabel: "Antes", afterLabel: "Depois" }, feature1: { tag: "Recuperar rostos", title: "Veja seus entes queridos com clareza de novo", description: "Rostos desfocados ou desbotados em fotos antigas dificultam o reconhecimento. Nossa IA afia com suavidade os detalhes do rosto.", benefit1: "Afia rostos em fotos de grupo", benefit2: "Destaca olhos, sorrisos e expressões", benefit3: "Cada pessoa mantém sua aparência", beforeLabel: "Antes", afterLabel: "Depois" }, feature2: { tag: "Adicionar cor", title: "Ver preto e branco ganhar vida", description: "Imagine o vestido de noiva da vovó na cor real. Nossa IA estuda formas e contexto para aplicar cores naturais e de época.", benefit1: "Cores que combinam com a época", benefit2: "Tons de pele e paisagens naturais", benefit3: "Funciona com fotos de qualquer década", beforeLabel: "Preto e branco", afterLabel: "Colorido" }, feature3: { tag: "Reduzir grão", title: "Suavizar desfoque e grão", description: "Fotos de filme e câmeras digitais antigas costumam ser granuladas. Nossa IA distingue o grão da imagem real e limpa com suavidade.", benefit1: "Mantém nitidez e reduz grão", benefit2: "Para filme e fotos digitais antigas", benefit3: "Ótimo para reimprimir", beforeLabel: "Granulado", afterLabel: "Limpo" } },
    knowledge: { learnExplore: "Aprender e explorar", storiesTitle: "Histórias por trás das fotos", storiesSubtitle: "Descubra a arte, a história e os passos para preservar as memórias mais preciosas da sua família.", readMore: "Ler mais", article0: { title: "Como a IA traz fotos antigas de volta à vida", excerpt: "A IA moderna vê danos que o olho não percebe — arranhões, cores desbotadas, rostos desfocados. Ela repara sua imagem em segundos.", readTime: "5 min de leitura" }, article1: { title: "A bela história da fotografia de família", excerpt: "Das primeiras fotos dos anos 1830 às da sua gaveta, cada época conta uma história que merece ser preservada.", readTime: "7 min de leitura" }, article2: { title: "Dicas para manter suas fotos seguras por décadas", excerpt: "Guarde em capas sem ácido, longe do sol e da umidade. Digitalizar hoje é o melhor presente para as gerações futuras.", readTime: "4 min de leitura" } },
    restore: { pageTitle: "Restaurar sua foto", pageSubtitle: "Escolha uma foto do álbum de família; nossa IA removerá danos, avivará cores e recuperará os detalhes que você lembra.", serverError: "Serviço temporariamente indisponível. Tente novamente em um momento.", loginRequired: "Faça login para restaurar.", insufficientCredits: "Pontos insuficientes. Assine ou aguarde a atualização.", restoreFailedRefunded: "Restauração falhou. Pontos reembolsados.", creditsCheckFailed: "Verificação de pontos temporariamente indisponível. Tente mais tarde.", networkError: "Falha na conexão. Verifique sua rede.", pointsDeducted: "5 pontos deduzidos.", pointsRefunded: "Restauração falhou. 5 pontos reembolsados.", restoring: "Restaurando sua foto…" },
    cases: { badge: "Casos e histórias", title: "Casos de restauração e histórias de família", subtitle: "Como outros usam a IA para restaurar e as memórias por trás.", restoreTitle: "Casos de restauração", restoreSubtitle: "Casos de exemplo com imagens antes/depois.", beforeLabel: "Antes", afterLabel: "Depois", storiesTitle: "Histórias de família", storiesSubtitle: "Histórias reais: uma foto, uma memória.", ctaTitle: "Restaurar suas memórias também", ctaSubtitle: "Envie uma foto antiga; a IA restaura cores e remove arranhões.", ctaButton: "Restaurar agora" },
    history: { loadingHistory: "Carregando histórico…", signInToSeeHistory: "Entre para ver seu histórico", signInToSeeHistoryDesc: "Suas fotos restauradas são salvas aqui após entrar.", restorationHistory: "Histórico de restauração", photosRestoredWhileSignedIn: "Fotos que você restaurou com a sessão iniciada.", noRestorationsYet: "Ainda não há restaurações. Restaure uma foto com a sessão iniciada para aparecer aqui.", restoreAPhoto: "Restaurar uma foto", beforeAfter: "Antes / Depois" },
    loginSuccess: { title: "Login realizado com sucesso", description: "Histórico e sincronização estão ativos.", bonusLine: "Você recebeu 5 pontos bônus.", close: "Fechar" },
    cookieConsent: { message: "Usamos cookies para melhorar sua experiência e analisar tráfego.", accept: "Aceitar", learnMore: "Privacidade" },
    feedback: { title: "Feedback", description: "Adoraríamos ouvir você.", messagePlaceholder: "Conte o que achou ou sugira…", contextPlaceholder: "Opcional: qual função ou página?", submit: "Enviar", success: "Obrigado! Seu feedback foi enviado.", submitFailed: "Falha ao enviar. Tente novamente.", networkError: "Erro de rede. Tente novamente.", ctaAfterRestore: "Como foi o resultado? Enviar feedback", signInFirst: "Faça login para enviar feedback.", goLogin: "Entrar", labelMessage: "Sua mensagem *", labelContext: "Contexto (opcional)", submitting: "Enviando…" },
    memberNav: { home: "Minha conta", points: "Pontos", subscribe: "Assinatura", feedback: "Feedback", review: "Avaliações" },
    member: { signInFirst: "Faça login para ver sua conta.", goLogin: "Entrar", memberCenter: "Minha conta", currentCredits: "Pontos atuais", creditsPerRestore: "5 pontos por restauração. Ver", pointsDetail: "Histórico de pontos", membershipStatus: "Assinatura", planYearly: "Anual", planWeekly: "Semanal", notSubscribed: "Sem assinatura", subscribedAt: "Início", goSubscribe: "Assinar", pointsTitle: "Histórico de pontos", signInFirstPoints: "Faça login para ver o histórico.", noRecords: "Nenhum registro.", loadMore: "Carregar mais", loading: "Carregando…", creditsUnit: "pontos", reasonSubscribeWeekly: "Assinatura semanal", reasonSubscribeYearly: "Assinatura anual", reasonRefillWeekly: "Recarga semanal", reasonRefillYearly: "Recarga anual", reasonRestorePhoto: "Restauração", reasonRefundRestoreFailed: "Reembolso (falha)", reasonSignupBonus: "Bônus de cadastro", reasonInitialBonus: "Bônus de login", subscribeSignInFirst: "Faça login para escolher um plano.", subscribeBadge: "Mais pontos · Menor preço", subscribeTitle: "Escolha seu plano", subscribeSubtitle: "Compre pontos ou assine semanal/anual.", perPhotoCredits: "~5 pontos por foto", instantCredits: "Pontos instantâneos", bestValue: "Melhor valor", demoNote: "Demo: os pontos são creditados na hora. Pagamento real em breve.", checkoutNote: "Pagamento processado com segurança pela Polar.", checkoutSuccessTitle: "Pagamento concluído", checkoutSuccessDetail: "Pontos ou assinatura serão atualizados em breve. ID do checkout", purchaseFailed: "Falha na compra", subscribeFailed: "Falha na assinatura", networkError: "Erro de rede. Tente novamente.", planCreditsName: "Starter", planCreditsSub: "Pacote de pontos", planCreditsUnit: "único", planCreditsNote: "~2 fotos", planCreditsF1: "10 pontos de uma vez", planCreditsF2: "~2 restaurações", planCreditsF3: "Sem renovação", planCreditsF4: "Para experimentar", planCreditsCta: "Comprar", planCreditsCtaLoading: "Comprando…", planWeeklyName: "Semanal", planWeeklySub: "Plano semanal", planWeeklyUnit: "/ semana", planWeeklyNote: "~20 fotos/semana", planWeeklyF1: "100 pontos/semana", planWeeklyF2: "~20 restaurações/semana", planWeeklyF3: "Menos de US$ 0,50/foto", planWeeklyF4: "Recarga automática", planWeeklyCta: "Assinar", planWeeklyCtaLoading: "Assinando…", planYearlyName: "Anual", planYearlySub: "Plano anual", planYearlyUnit: "/ ano", planYearlyNote: "~2000 fotos/ano", planYearlyF1: "10000 pontos/ano", planYearlyF2: "~2000 restaurações/ano", planYearlyF3: "Menos de US$ 0,02/foto", planYearlyF4: "Melhor valor", planYearlyCta: "Assinar", planYearlyCtaLoading: "Assinando…", layoutTitle: "Minha conta", layoutDescription: "Histórico de pontos e assinatura" },
    review: { title: "Escrever avaliação", description: "Sua experiência pode ser exibida na página inicial.", successMessage: "Obrigado! Sua avaliação foi enviada e aparecerá após moderação.", labelEmail: "Email *", labelContent: "Sua avaliação *", labelCountry: "País ou região (opcional)", placeholderEmail: "seu@email.com", placeholderContent: "Compartilhe sua experiência…", placeholderCountry: "ex. Brasil", submit: "Enviar avaliação", submitting: "Enviando…" },
    timeout: { suffix: "tempo esgotado. Verifique sua conexão e tente novamente.", retry: "Tentar novamente", close: "Fechar", actionLogin: "Login", actionSubscribe: "Pagamento", actionRestore: "Restauração de foto" },
  },
  ar: {
    nav: {
      restore: "استعادة",
      history: "السجل",
      tools: "أدوات",
      cases: "حالات",
      member: "عضو",
      feedback: "تعليقات",
      terms: "الشروط",
      privacy: "الخصوصية",
      more: "المزيد",
      signIn: "تسجيل الدخول",
      signOut: "تسجيل الخروج",
      clearLoginState: "مسح حالة تسجيل الدخول",
      memoryRestore: "AI RestorePic",
    },
    login: {
      welcomeBack: "مرحباً بعودتك",
      welcomeToBrand: "مرحباً بك في AI RestorePic",
      signInToSave: "سجّل الدخول لحفظ الاستعادة وعرض السجل.",
      loginRequiredForFeature: "سجّل الدخول لاستخدام هذه الميزة.",
      continueWithGoogle: "تسجيل الدخول باستخدام Google",
      signInWithApple: "تسجيل الدخول باستخدام Apple",
      signInWithEmail: "تسجيل الدخول بالبريد الإلكتروني",
      comingSoon: "قريباً",
      agreeTerms: "بالنقر على «تسجيل الدخول باستخدام Google» فإنك توافق على",
      and: " و ",
      terms: "شروط الخدمة",
      privacyPolicy: "سياسة الخصوصية",
      redirecting: "جاري التوجيه إلى Google…",
      pleaseComplete: "يرجى إكمال تسجيل الدخول في النافذة الجديدة.",
      clearedMessage: "تم مسح حالة تسجيل الدخول. يرجى تسجيل الدخول مرة أخرى.",
    },
    footer: {
      memoryRestore: "AI RestorePic",
      tagline: "نساعد العائلات في الحفاظ على صورها الثمينة وإعادة اكتشافها.",
      restoreMemories: "استعادة الذكريات",
      cases: "حالات",
      member: "عضو",
      history: "السجل",
      oldPhotos: "صور قديمة",
      fixScratches: "إصلاح الخدوش",
      reviveFaded: "إحياء الصور الباهتة",
      addColor: "إضافة لون",
      termsOfService: "شروط الخدمة",
      privacyPolicy: "سياسة الخصوصية",
      madeWithCare: "صُنع بعناية.",
    },
    common: { before: "قبل", after: "بعد", beforeAfter: "قبل / بعد" },
    home: {
      hero: { badge: "بسيط · مجاني · آمن", titleLine1: "كل صورة تحكي", titleLine2: "قصة عائلة", intro: "عثرت على صورة قديمة في الدرج؟ باهتة أو مخدوشة أو ممزقة؟ أسقطها هنا وشاهد آثار الزمن تختفي برفق.", dropTitle: "أسقط صورتك هنا للبدء", dropHint: "أو انقر للتصفح · JPG, PNG, WebP · بحد أقصى 8 ميجا", privateNote: "صورك تبقى خاصة — لا نحفظها ولا نشاركها.", pullDown: "اسحب للأسفل للتحديث", carousel0: "لحظة عائلية، تُبعث من جديد", carousel1: "الألوان تعود للذكريات", carousel2: "الخدوش تختفي، القصص تبقى" },
      heroBanner: { title: "AI RestorePic يفعل كل شيء", subtitle: "استعد الصور، لوّنها وأعد الحياة للصور القديمة — في ثوانٍ.", cta: "ابدأ الآن" },
      steps: { title: "بسهولة ١، ٢، ٣", subtitle: "بدون تطبيقات أو حسابات. فقط أنت وصورتك.", step1Title: "اختر صورة", step1Desc: "أي صورة قديمة من الدرج أو الألبوم أو الهاتف. اسحبها أو انقر للاختيار.", step2Title: "دع الذكاء الاصطناعي يعمل", step2Desc: "ذكاؤنا يزيل الأضرار ويحدّد الوجوه ويعيد الألوان الباهتة في ثوانٍ.", step3Title: "شاهد الفرق", step3Desc: "مرّر بين قبل وبعد لترى ذكراك تعود للحياة." },
      toolsSection: { title: "اعثر على الأداة المناسبة لصورتك", subtitle: "كل صورة لها قصتها واحتياجاتها. اختر الاستعادة التي تناسبك." },
      reviewsSection: { title: "ماذا يقول المستخدمون", subtitle: "تجارب حقيقية ممن استعادوا ذكرياتهم.", cta: "شارك تجربتك ←" },
      casesSection: { title: "حالات الاستعادة وقصص العائلة", description: "نتائج حقيقية وذكريات يشاركها المستخدمون.", cta: "عرض الحالات" },
      privacySection: { title: "ذكرياتك في أمان معنا", body: "نفهم مدى خصوصية صورك. لذلك لا نحفظها ولا نشاركها ولا نستخدمها لأي شيء سوى استعادتها. عند الانتهاء تُزال من نظامنا.", cta: "استعادة ذكرى" },
      toolKeywords: { "old-photo-restoration": "استعادة الصور القديمة", "faded-photo-repair": "إصلاح الصور الباهتة", "scratch-removal": "إزالة الخدوش", "water-damaged-photo-repair": "إصلاح أضرار الماء", "black-and-white-photo-colorization": "تلوين الأبيض والأسود", "blurry-photo-fix": "إصلاح الضبابية", "torn-photo-repair": "إصلاح الصور الممزقة", "photo-noise-reduction": "تقليل التشويش", "face-enhancement": "تحسين الوجوه", "vintage-photo-enhancement": "تحسين الصور العتيقة", "polaroid-photo-restoration": "استعادة بولارويد", "book-photo-restoration": "استعادة صور الكتب" },
      toolDescriptions: {},
    },
    feature: { howWeHelp: "كيف نساعد", restoreWhatMatters: "استعادة الأهم", feature0: { tag: "إصلاح الخدوش", title: "مسح آثار الزمن برفق", description: "بمرور السنوات تتراكم الخدوش والثنيات والغبار على الصور الثمينة. ذكاؤنا يحدد كل عيب ويملأه بالألوان والملمس المحيط.", benefit1: "يزيل الخدوش والثنيات والغبار برفق", benefit2: "يملأ الأضرار بشكل طبيعي", benefit3: "آمن حتى للصور التي تحتوي وجوهاً", beforeLabel: "قبل", afterLabel: "بعد" }, feature1: { tag: "استعادة الوجوه", title: "أعد رؤية أحبائك بوضوح", description: "الوجوه الضبابية أو الباهتة في الصور القديمة تصعّب التعرف على الناس. ذكاؤنا يحدد تفاصيل الوجه برفق.", benefit1: "يحدد الوجوه في الصور الجماعية", benefit2: "يبرز العيون والابتسامات والتعبيرات", benefit3: "كل شخص يبقى على طبيعته", beforeLabel: "قبل", afterLabel: "بعد" }, feature2: { tag: "إضافة اللون", title: "شاهد الأبيض والأسود ينبضان بالحياة", description: "تخيل فستان زفاف الجدة بلونه الحقيقي. ذكاؤنا يدرس الأشكال والسياق لتطبيق ألوان طبيعية وعصرية.", benefit1: "ألوان تتناسب مع الفترة", benefit2: "بشرات ومناظر طبيعية", benefit3: "يناسب صور أي عقد", beforeLabel: "أبيض وأسود", afterLabel: "ملون" }, feature3: { tag: "تقليل الحبيبات", title: "تنعيم الضبابية والحبيبات", description: "صور الأفلام والكاميرات الرقمية القديمة غالباً ما تكون حبيبية. ذكاؤنا يفرق بين الحبيبات والصورة الحقيقية وينظف برفق.", benefit1: "يحافظ على الوضوح ويقلل الحبيبات", benefit2: "لصور الأفلام والرقمية القديمة", benefit3: "مثالي لإعادة الطباعة", beforeLabel: "حبيبي", afterLabel: "نظيف" } },
    knowledge: { learnExplore: "تعلم واستكشف", storiesTitle: "قصص خلف الصور", storiesSubtitle: "اكتشف الفن والتاريخ والخطوات البسيطة لحفظ أثمن ذكريات عائلتك.", readMore: "اقرأ المزيد", article0: { title: "كيف يعيد الذكاء الاصطناعي الحياة للصور القديمة", excerpt: "الذكاء الاصطناعي الحديث يرى أضراراً لا تراها العين — خدوشاً وألواناً باهتة ووجوهاً ضبابية. يصلح صورتك في ثوانٍ.", readTime: "٥ دقائق قراءة" }, article1: { title: "التاريخ الجميل لتصوير العائلة", excerpt: "من أوائل الصور في ثلاثينيات القرن التاسع عشر إلى لقطات درجك، كل حقبة تحكي قصة تستحق الحفظ.", readTime: "٧ دقائق قراءة" }, article2: { title: "نصائح بسيطة لحفظ صورك لعقود", excerpt: "احفظها في أكمام خالية من الحمض، بعيداً عن الشمس والرطوبة. المسح الرقمي اليوم أفضل هدية للأجيال القادمة.", readTime: "٤ دقائق قراءة" } },
    restore: { pageTitle: "استعادة صورتك", pageSubtitle: "اختر صورة من ألبوم العائلة؛ ذكاؤنا يزيل الأضرار ويحيي الألوان ويعيد التفاصيل التي تتذكرها.", serverError: "الخدمة غير متاحة مؤقتاً. يرجى المحاولة مرة أخرى بعد قليل.", loginRequired: "يرجى تسجيل الدخول للاستعادة.", insufficientCredits: "نقاط غير كافية. اشترك أو انتظر التحديث.", restoreFailedRefunded: "فشلت الاستعادة. تم استرداد النقاط.", creditsCheckFailed: "التحقق من النقاط غير متاح مؤقتاً. حاول لاحقاً.", networkError: "فشل الاتصال. تحقق من الشبكة.", pointsDeducted: "تم خصم 5 نقاط.", pointsRefunded: "فشلت الاستعادة. تم استرداد 5 نقاط.", restoring: "جاري استعادة صورتك…" },
    cases: { badge: "حالات وقصص", title: "حالات الاستعادة وقصص العائلة", subtitle: "كيف يستخدم الآخرون الذكاء الاصطناعي واستعادة الذكريات.", restoreTitle: "حالات الاستعادة", restoreSubtitle: "حالات نموذجية مع صور قبل/بعد.", beforeLabel: "قبل", afterLabel: "بعد", storiesTitle: "قصص عائلية", storiesSubtitle: "قصص حقيقية: صورة واحدة، ذكرى واحدة.", ctaTitle: "استعد ذكرياتك أيضاً", ctaSubtitle: "ارفع صورة قديمة؛ الذكاء الاصطناعي يستعيد الألوان ويزيل الخدوش.", ctaButton: "استعادة الآن" },
    history: { loadingHistory: "جاري تحميل السجل…", signInToSeeHistory: "سجّل الدخول لعرض سجلك", signInToSeeHistoryDesc: "صورك المستعادة تُحفظ هنا بعد تسجيل الدخول.", restorationHistory: "سجل الاستعادة", photosRestoredWhileSignedIn: "الصور التي استعدتها أثناء تسجيل الدخول.", noRestorationsYet: "لا استعادة بعد. استعد صورة أثناء تسجيل الدخول لتظهر هنا.", restoreAPhoto: "استعادة صورة", beforeAfter: "قبل / بعد" },
    loginSuccess: { title: "تم تسجيل الدخول بنجاح", description: "السجل والمزامنة مفعّلان الآن.", bonusLine: "تم منحك 5 نقاط مكافأة.", close: "إغلاق" },
    cookieConsent: { message: "نستخدم ملفات تعريف الارتباط لتحسين تجربتك وتحليل الزيارات.", accept: "قبول", learnMore: "الخصوصية" },
    feedback: { title: "تعليقات", description: "نود أن نسمع منك.", messagePlaceholder: "أخبرنا برأيك أو اقتراحك…", contextPlaceholder: "اختياري: أي ميزة أو صفحة؟", submit: "إرسال", success: "شكراً! تم إرسال تعليقك.", submitFailed: "فشل الإرسال. يرجى المحاولة مرة أخرى.", networkError: "خطأ في الشبكة. يرجى المحاولة مرة أخرى.", ctaAfterRestore: "كيف كانت النتيجة؟ أرسل تعليقاً", signInFirst: "يرجى تسجيل الدخول لإرسال التعليقات.", goLogin: "تسجيل الدخول", labelMessage: "رسالتك *", labelContext: "السياق (اختياري)", submitting: "جاري الإرسال…" },
    memberNav: { home: "مركز العضوية", points: "النقاط", subscribe: "الاشتراك", feedback: "تعليقات", review: "التقييمات" },
    member: { signInFirst: "يرجى تسجيل الدخول لعرض مركز العضوية.", goLogin: "تسجيل الدخول", memberCenter: "مركز العضوية", currentCredits: "النقاط الحالية", creditsPerRestore: "5 نقاط لكل استعادة. عرض", pointsDetail: "سجل النقاط", membershipStatus: "الاشتراك", planYearly: "سنوي", planWeekly: "أسبوعي", notSubscribed: "غير مشترك", subscribedAt: "البداية", goSubscribe: "اشترك", pointsTitle: "سجل النقاط", signInFirstPoints: "يرجى تسجيل الدخول لعرض سجل النقاط.", noRecords: "لا توجد سجلات بعد.", loadMore: "تحميل المزيد", loading: "جاري التحميل…", creditsUnit: "نقاط", reasonSubscribeWeekly: "اشتراك أسبوعي", reasonSubscribeYearly: "اشتراك سنوي", reasonRefillWeekly: "تعبئة أسبوعية", reasonRefillYearly: "تعبئة سنوية", reasonRestorePhoto: "استعادة الصور", reasonRefundRestoreFailed: "استرداد (فشل)", reasonSignupBonus: "مكافأة التسجيل", reasonInitialBonus: "مكافأة تسجيل الدخول", subscribeSignInFirst: "يرجى تسجيل الدخول لاختيار خطة.", subscribeBadge: "المزيد من النقاط · سعر أقل", subscribeTitle: "اختر خطتك", subscribeSubtitle: "اشترِ نقاطاً أو اشترك أسبوعياً/سنوياً.", perPhotoCredits: "~5 نقاط لكل صورة", instantCredits: "نقاط فورية", bestValue: "أفضل قيمة", demoNote: "عرض توضيحي: تُضاف النقاط فوراً. الدفع الحقيقي قريباً.", checkoutNote: "الدفع تتم معالجته بأمان عبر Polar.", checkoutSuccessTitle: "تم الدفع بنجاح", checkoutSuccessDetail: "سيتم تحديث النقاط أو الاشتراك قريباً. معرف الدفع", purchaseFailed: "فشل الشراء", subscribeFailed: "فشل الاشتراك", networkError: "خطأ في الشبكة. حاول مرة أخرى.", planCreditsName: "المبتدئ", planCreditsSub: "حزمة النقاط", planCreditsUnit: "مرة واحدة", planCreditsNote: "~2 صورة", planCreditsF1: "10 نقاط مرة واحدة", planCreditsF2: "~2 استعادة", planCreditsF3: "بدون تجديد", planCreditsF4: "للتجربة", planCreditsCta: "اشترِ الآن", planCreditsCtaLoading: "جاري الشراء…", planWeeklyName: "أسبوعي", planWeeklySub: "الخطة الأسبوعية", planWeeklyUnit: "/ أسبوع", planWeeklyNote: "~20 صورة/أسبوع", planWeeklyF1: "100 نقطة/أسبوع", planWeeklyF2: "~20 استعادة/أسبوع", planWeeklyF3: "أقل من 0.50$/صورة", planWeeklyF4: "تعبئة تلقائية", planWeeklyCta: "اشترك", planWeeklyCtaLoading: "جاري الاشتراك…", planYearlyName: "سنوي", planYearlySub: "الخطة السنوية", planYearlyUnit: "/ سنة", planYearlyNote: "~2000 صورة/سنة", planYearlyF1: "10000 نقطة/سنة", planYearlyF2: "~2000 استعادة/سنة", planYearlyF3: "أقل من 0.02$/صورة", planYearlyF4: "أفضل قيمة", planYearlyCta: "اشترك", planYearlyCtaLoading: "جاري الاشتراك…", layoutTitle: "مركز العضوية", layoutDescription: "سجل النقاط والاشتراك" },
    review: { title: "اكتب تقييماً", description: "قد تُعرض تجربتك على الصفحة الرئيسية.", successMessage: "شكراً! تم إرسال تقييمك وسيظهر بعد المراجعة.", labelEmail: "البريد الإلكتروني *", labelContent: "تقييمك *", labelCountry: "الدولة أو المنطقة (اختياري)", placeholderEmail: "your@email.com", placeholderContent: "شارك تجربتك…", placeholderCountry: "مثال: مصر", submit: "إرسال التقييم", submitting: "جاري الإرسال…" },
    timeout: { suffix: "انتهت المهلة. يرجى التحقق من الشبكة والمحاولة مرة أخرى.", retry: "إعادة المحاولة", close: "إغلاق", actionLogin: "تسجيل الدخول", actionSubscribe: "الدفع", actionRestore: "استعادة الصور" },
  },
};

export function getTranslations(locale: Locale): TranslationKeys {
  return translations[locale] ?? translations.en;
}

export function t(locale: Locale, key: string): string {
  const resolve = (T: Record<string, unknown>) => {
    const keys = key.split(".");
    let cur: unknown = T;
    for (const k of keys) {
      cur = cur != null && typeof cur === "object" && k in cur ? (cur as Record<string, unknown>)[k] : undefined;
    }
    return typeof cur === "string" ? cur : null;
  };
  const T = getTranslations(locale) as Record<string, unknown>;
  const out = resolve(T);
  if (out !== null) return out;
  if (locale !== "en") {
    const enOut = resolve(getTranslations("en") as Record<string, unknown>);
    if (enOut !== null) return enOut;
  }
  return key;
}
