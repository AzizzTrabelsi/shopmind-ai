export const LANGS = { fr: 'FR', en: 'EN', ar: 'AR' }

export const T = {
  fr: {
    tagline: 'Votre conseiller high-tech, vérifié par IA',
    heroA: 'Trouvez le bon appareil,',
    heroB: 'sans deviner.',
    sub: 'Décrivez votre besoin, votre budget, vos marques à éviter. ShopMind cherche en direct chez les revendeurs tunisiens et vérifie chaque réponse avant de vous la montrer.',
    placeholder: 'Ex. : un laptop pour programmer, 2500 DT max, pas de HP…',
    send: 'Envoyer',
    attach: 'Ajouter une photo',
    suggestions: [
      { t: 'Laptop pour programmer', s: '2500 DT max, pas de HP', q: 'Je cherche un laptop pour programmer, 2500 dt max, pas de HP' },
      { t: 'iPhone 15 ou Galaxy S24 ?', s: 'Comparaison avec prix réels', q: 'iPhone 15 ou Samsung S24, lequel est mieux ?' },
      { t: 'Chargeur USB-C compatible ?', s: 'Question technique', q: "Est-ce que le chargeur USB-C d'un MacBook marche avec un Dell Latitude ?" },
      { t: 'Laptop gaming', s: 'Entre 3000 et 5000 DT', q: 'Laptop gaming entre 3000 et 5000 dt' }
    ],
    steps: ['Compréhension de la demande', 'Recherche en direct + base de connaissances', 'Contrôle des prix et des contraintes', 'Vérification par un second agent'],
    thinking: 'ShopMind analyse votre demande',
    live: 'En direct', kb: 'Base de connaissances',
    viewStore: 'Voir sur', priceUnknown: 'Prix à confirmer',
    why: 'Pourquoi ce choix', comparison: 'Comparaison',
    verified: 'Vérifié', verifiedSub: 'Contrôles de règles + agent vérificateur',
    corrected: n => `Corrigé après ${n} nouvelle${n > 1 ? 's' : ''} tentative${n > 1 ? 's' : ''}`,
    partial: 'Certaines options retirées après vérification',
    advisor: 'Conseiller technique', confidence: { high: 'Confiance élevée', medium: 'Confiance moyenne', low: 'Confiance faible' },
    noResult: 'Aucun résultat fiable pour cette demande.',
    error: 'Impossible de joindre ShopMind. Vérifiez que n8n est lancé et que le workflow est actif.',
    retry: 'Réessayer', newChat: 'Nouvelle conversation', you: 'Vous',
    imgHint: 'Photo jointe', removeImg: 'Retirer', dropHere: 'Déposez votre image ici',
    theme: 'Thème', footer: 'Les prix proviennent des pages des revendeurs. Vérifiez toujours avant d’acheter.'
  },
  en: {
    tagline: 'Your AI-verified tech advisor',
    heroA: 'Find the right device,',
    heroB: 'without guessing.',
    sub: 'Tell us your need, budget and brands to avoid. ShopMind searches Tunisian retailers live and verifies every answer before showing it to you.',
    placeholder: 'e.g. a laptop for programming, 2500 TND max, no HP…',
    send: 'Send',
    attach: 'Add a photo',
    suggestions: [
      { t: 'Laptop for programming', s: '2500 TND max, no HP', q: 'I need a laptop for programming, 2500 dt max, no HP' },
      { t: 'iPhone 15 or Galaxy S24?', s: 'Comparison with real prices', q: 'iPhone 15 or Samsung S24, which one is better?' },
      { t: 'Is this USB-C charger compatible?', s: 'Technical question', q: 'Does a MacBook USB-C charger work with a Dell Latitude?' },
      { t: 'Gaming laptop', s: '3000 to 5000 TND', q: 'Gaming laptop between 3000 and 5000 dt' }
    ],
    steps: ['Understanding your request', 'Live search + knowledge base', 'Checking prices and constraints', 'Second-agent verification'],
    thinking: 'ShopMind is analysing your request',
    live: 'Live', kb: 'Knowledge base',
    viewStore: 'View on', priceUnknown: 'Price to confirm',
    why: 'Why this pick', comparison: 'Comparison',
    verified: 'Verified', verifiedSub: 'Rule checks + verifier agent',
    corrected: n => `Corrected after ${n} retr${n > 1 ? 'ies' : 'y'}`,
    partial: 'Some options removed after verification',
    advisor: 'Technical advisor', confidence: { high: 'High confidence', medium: 'Medium confidence', low: 'Low confidence' },
    noResult: 'No reliable result for this request.',
    error: 'Cannot reach ShopMind. Check that n8n is running and the workflow is active.',
    retry: 'Retry', newChat: 'New conversation', you: 'You',
    imgHint: 'Attached photo', removeImg: 'Remove', dropHere: 'Drop your image here',
    theme: 'Theme', footer: 'Prices come from retailer pages. Always double-check before buying.'
  },
  ar: {
    tagline: 'مستشارك التقني، موثّق بالذكاء الاصطناعي',
    heroA: 'اعثر على الجهاز المناسب،',
    heroB: 'دون تخمين.',
    sub: 'صف حاجتك وميزانيتك والعلامات التي تريد تجنبها. يبحث ShopMind مباشرة في المتاجر التونسية ويتحقق من كل إجابة قبل عرضها عليك.',
    placeholder: 'مثال: كمبيوتر محمول للبرمجة، 2500 دينار كحد أقصى…',
    send: 'إرسال',
    attach: 'إضافة صورة',
    suggestions: [
      { t: 'كمبيوتر محمول للبرمجة', s: '2500 دينار كحد أقصى', q: 'نحب كمبيوتر محمول للبرمجة بميزانية 2500 دينار' },
      { t: 'آيفون 15 أم غالاكسي S24؟', s: 'مقارنة بأسعار حقيقية', q: 'iPhone 15 ou Samsung S24, lequel est mieux ?' },
      { t: 'هل الشاحن متوافق؟', s: 'سؤال تقني', q: "Est-ce que le chargeur USB-C d'un MacBook marche avec un Dell Latitude ?" },
      { t: 'كمبيوتر للألعاب', s: 'بين 3000 و5000 دينار', q: 'Laptop gaming entre 3000 et 5000 dt' }
    ],
    steps: ['فهم الطلب', 'بحث مباشر + قاعدة المعرفة', 'فحص الأسعار والشروط', 'تحقق من وكيل ثانٍ'],
    thinking: 'يحلل ShopMind طلبك',
    live: 'مباشر', kb: 'قاعدة المعرفة',
    viewStore: 'عرض في', priceUnknown: 'السعر غير مؤكد',
    why: 'لماذا هذا الاختيار', comparison: 'مقارنة',
    verified: 'تم التحقق', verifiedSub: 'فحص القواعد + وكيل التحقق',
    corrected: n => `صُحّح بعد ${n} محاولة`,
    partial: 'تمت إزالة بعض الخيارات بعد التحقق',
    advisor: 'المستشار التقني', confidence: { high: 'ثقة عالية', medium: 'ثقة متوسطة', low: 'ثقة منخفضة' },
    noResult: 'لا توجد نتيجة موثوقة لهذا الطلب.',
    error: 'تعذر الوصول إلى ShopMind. تأكد من تشغيل n8n وتفعيل سير العمل.',
    retry: 'إعادة المحاولة', newChat: 'محادثة جديدة', you: 'أنت',
    imgHint: 'صورة مرفقة', removeImg: 'إزالة', dropHere: 'أسقط الصورة هنا',
    theme: 'المظهر', footer: 'الأسعار من صفحات المتاجر. تحقق دائماً قبل الشراء.'
  }
}

export const detectLang = text => (/[؀-ۿ]/.test(text) ? 'ar' : null)
