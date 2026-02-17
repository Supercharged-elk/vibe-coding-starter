export interface NewsItem {
  id: string;
  date: string;
  title: string;
  href: string;
}

export interface PolicyHighlight {
  id: string;
  category: string;
  title: string;
  description?: string;
  theme: 'dark' | 'light';
}

export interface ProjectItem {
  id: string;
  category: string;
  title: string;
}

export interface FooterNavColumn {
  title: string;
  links: { label: string; href: string }[];
}

export const navLinks = [
  { label: 'Who are we', href: '#who' },
  { label: 'What we do', href: '#what' },
  { label: 'Latest', href: '#latest' },
  { label: 'Search', href: '#search' },
];

export const heroContent = {
  headline: 'The European\nAnti-Poverty Network',
  body: 'EAPN is the largest European network of national, regional, and local networks, involving anti-poverty organisations and grassroots groups as well as European organisations, active in the fight against poverty and social exclusion.',
};

export const ctaContent = {
  mainParagraph:
    'We advocate for policies that promote social inclusion and reduce inequality across Europe, working directly with those affected by poverty.',
  columns: [
    'Our members span 31 countries, bringing together thousands of organisations that work on the ground with communities facing poverty and social exclusion every day.',
    'Through dialogue with EU institutions and national governments, we ensure that the voices of people experiencing poverty are heard at the highest levels of decision-making.',
  ],
  buttonLabel: 'Know more about EAPN',
};

export const newsItems: NewsItem[] = [
  {
    id: 'news-1',
    date: '2024-12-15',
    title: 'EAPN Response to the European Commission Annual Work Programme 2025',
    href: '#',
  },
  {
    id: 'news-2',
    date: '2024-11-28',
    title: 'Poverty Watch Report: Rising Inequality in Post-Pandemic Europe',
    href: '#',
  },
  {
    id: 'news-3',
    date: '2024-11-10',
    title: 'Annual Convention: Shaping a Social Europe for All',
    href: '#',
  },
  {
    id: 'news-4',
    date: '2024-10-22',
    title: 'Joint Statement on Minimum Income Standards Across the EU',
    href: '#',
  },
];

export const policyHighlights: PolicyHighlight[] = [
  {
    id: 'policy-1',
    category: 'Social Inclusion',
    title: 'Minimum Income and Social Protection',
    description:
      'Ensuring adequate minimum income schemes across all EU member states to protect against poverty.',
    theme: 'dark',
  },
  {
    id: 'policy-2',
    category: 'Employment',
    title: 'Quality Jobs and Fair Wages',
    theme: 'light',
  },
  {
    id: 'policy-3',
    category: 'Housing',
    title: 'Affordable Housing for All',
    theme: 'light',
  },
  {
    id: 'policy-4',
    category: 'Education',
    title: 'Access to Quality Education',
    theme: 'light',
  },
  {
    id: 'policy-5',
    category: 'Health',
    title: 'Universal Healthcare Access',
    theme: 'light',
  },
];

export const featuredProject = {
  category: 'EU Funded Project',
  title: 'Building Bridges: Community-Led Solutions to Poverty',
};

export const projectItems: ProjectItem[] = [
  {
    id: 'proj-1',
    category: 'Campaign',
    title: 'End Poverty in Europe Campaign 2025',
  },
  {
    id: 'proj-2',
    category: 'EU Project',
    title: 'Social Innovation for Inclusive Recovery',
  },
  {
    id: 'proj-3',
    category: 'Partnership',
    title: 'Civil Society Alliance for Social Rights',
  },
];

export const memberCategories = [
  'National Networks',
  'European Organisations',
];

export const footerNavColumns: FooterNavColumn[] = [
  {
    title: 'Who are we',
    links: [
      { label: 'What is EAPN', href: '#' },
      { label: 'Our structure', href: '#' },
      { label: 'What is Poverty?', href: '#' },
    ],
  },
  {
    title: 'What we do',
    links: [
      { label: 'How we work', href: '#' },
      { label: 'Policy Areas', href: '#' },
      { label: 'Projects & Campaigns', href: '#' },
      { label: 'Participation', href: '#' },
      { label: 'Sources of Info', href: '#' },
    ],
  },
  {
    title: 'Latest',
    links: [
      { label: 'Stories', href: '#' },
      { label: 'Publications', href: '#' },
      { label: 'Events', href: '#' },
      { label: 'Media Center', href: '#' },
    ],
  },
];

export const footerUtility = [
  { label: 'Get involved', href: '#' },
  { label: 'EAPN Jargon', href: '#' },
  { label: 'Contact us', href: '#' },
];

export const legalLinks = [
  { label: 'Privacy Policy', href: '#' },
  { label: 'Terms of Use', href: '#' },
  { label: 'Cookie Policy', href: '#' },
  { label: 'Accessibility', href: '#' },
];
