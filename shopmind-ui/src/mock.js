// Realistic samples copied from real workflow runs. Used only with ?mock=1 (demo safety net).
export const MOCKS = {
  reco: {
    failed: false, attempt: 0, issues: [],
    recommendation: {
      recommendations: [
        { name: 'PC PORTABLE LENOVO / IPS3 I5-13420H / 8 GO / 512 GO SSD', price_tnd: 1529, source: 'live_search',
          key_specs: ['Intel Core i5-13420H', 'RAM: 8 Go', 'Storage: 512 Go SSD', '15.6" FHD IPS'],
          why: 'Features a modern 13th gen Core i5 processor, 8GB RAM and a spacious 512GB SSD, offering excellent performance for programming well within your 2500 TND budget.',
          source_ref: 'https://www.tunisianet.com.tn/pc-portable-tunisie/73618-pc-portable-lenovo156fhd-ips3-i5-13420h-8g-512ssd-w11-gris.html' },
        { name: 'Pc Portable Dell Pro 15 Essential PV15250 / i5-1334U / 8 Go / 512 Go SSD', price_tnd: 1899, source: 'live_search',
          key_specs: ['Intel Core i5-1334U', 'RAM: 8 Go', 'Storage: 512 Go SSD'],
          why: 'Equipped with a reliable 13th gen i5 processor, 8GB RAM and 512GB SSD storage, fitting your programming needs and budget constraints.',
          source_ref: 'https://www.tunisianet.com.tn/pc-portable-tunisie/91676-pc-portable-dell-pro-15-essential-pv15250-i5-1334u-8-go-512-go-ssd-noir.html' },
        { name: 'Dell Notebook', price_tnd: 1364.17, source: 'knowledge_base',
          key_specs: ['15.6" Full HD 1920x1080', 'Intel Core i5 8250U 1.6GHz', 'RAM: 8GB', 'Storage: 256GB SSD', 'AMD Radeon 520'],
          why: 'A solid entry-level programming setup with an 8th gen i5, 8GB RAM and an SSD, comfortably under budget.',
          source_ref: 'laptop_220' }
      ],
      note: 'HP laptops were excluded per your preference. Only models meeting programming requirements and the 2500 TND budget are included.',
      comparison: null
    }
  },
  compare: {
    failed: false, attempt: 0, issues: [],
    recommendation: {
      recommendations: [
        { name: 'Smartphone Apple iPhone 15 / 5G / 6 Go / 128 Go / Noir', price_tnd: 3249, source: 'live_search',
          key_specs: ['5G', '6 Go RAM', '128 Go Storage', 'Noir'], why: 'One of the two requested models, in stock at 3,249 TND.',
          source_ref: 'https://www.tunisianet.com.tn/smartphone-tunisie/75884-smartphone-apple-iphone-15-5g-6-go-128-go-noir.html' },
        { name: 'Smartphone Samsung Galaxy S24 / 5G / 8 Go / 256 Go / Noir', price_tnd: 3699, source: 'live_search',
          key_specs: ['5G', '8 Go RAM', '256 Go Storage', 'Noir'], why: 'The other requested model, with more RAM and storage, at 3,699 TND.',
          source_ref: 'https://www.tunisianet.com.tn/smartphone-tunisie/72252-smartphone-samsung-galaxy-s24-5g-8-go-256-go-noir.html' }
      ],
      note: 'Both requested models were found in stock.',
      comparison: 'The iPhone 15 costs 450 TND less (3249 vs 3699 TND). The Galaxy S24 offers more RAM (8 Go vs 6 Go) and double the storage (256 Go vs 128 Go).'
    }
  },
  tech: {
    failed: false, attempt: 0, issues: [], reply_type: 'direct_answer', confidence: 'medium',
    recommendation: { recommendations: [], comparison: null,
      note: "Oui, en général : un chargeur USB-C Power Delivery peut alimenter un portable Dell Latitude compatible USB-C PD. Vérifiez que la puissance du chargeur couvre celle du portable (souvent 65 W) et que le port USB-C du Dell supporte bien la charge. Sinon, le portable chargera lentement ou affichera un avertissement." }
  },
  refusal: {
    failed: false, attempt: 0, issues: [], reply_type: 'out_of_scope',
    recommendation: { recommendations: [], note: "Je suis ShopMind, un assistant pour l'achat de produits électroniques (laptops, smartphones, tablettes, accessoires). Je ne peux pas répondre à cette question." }
  }
}
