
// Global settings for Yonesko
export const siteSettings = {
  defaultCurrency: 'USD',
  supportedCurrencies: ['USD', 'EUR', 'SAR'],
  defaultCountry: 'SA',
  supportedCountries: ['SA', 'US', 'AE'],
  siteName: 'Yonesko',
  siteDescription: 'Modern e-commerce store powered by PayloadCMS',
};

export const headerConfig = {
  navItems: [
    { label: 'Home', url: '/' },
    { label: 'Products', url: '/products' },
    { label: 'About', url: '/about' },
    { label: 'Contact', url: '/contact' },
  ],
};

export const footerConfig = {
  socialLinks: [
    { platform: 'twitter', url: '#' },
    { platform: 'facebook', url: '#' },
    { platform: 'instagram', url: '#' },
  ],
  companyInfo: {
    name: 'Yonesko',
    address: 'Your Business Address',
    email: 'contact@yonesko.com',
    phone: '+1 (555) 123-4567',
  },
};
