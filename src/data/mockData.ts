import { CauseProject, Pledge } from '../types';

export const INITIAL_PROJECTS: CauseProject[] = [
  {
    id: 'solar-lit-schools',
    title: 'SolarLit Classrooms: Light for Off-Grid Students',
    tagline: 'Empowering children with solar-powered study lamps & portable battery units to learn safely after dark.',
    organization: 'Grassroots Energy Alliance',
    leadOrganizer: 'Amina Diallo & Kofi Mensah',
    location: 'Rural Volta Basin, Ghana',
    category: 'Climate & poverty',
    verifiedNonprofit: true,
    transparencyScore: 98,
    targetAmount: 4800,
    currentAmount: 3720,
    targetHours: 120,
    currentHours: 94,
    urgencyLevel: 'urgent',
    unSdgGoals: [4, 7, 10, 13],
    impactUnits: [
      {
        costPerUnit: 18,
        hoursPerUnit: 1,
        unitName: 'Solar Desk Lantern',
        unitDescription: 'Provides 8 hours of clean LED lighting per day, replacing toxic kerosene smoke.',
        badge: '🏮 1 Solar Lantern'
      },
      {
        costPerUnit: 45,
        hoursPerUnit: 3,
        unitName: 'Classroom Power Hub',
        unitDescription: 'Powers 1 digital e-reader and charges 4 lanterns simultaneously during school hours.',
        badge: '⚡ 1 Classroom Hub'
      }
    ],
    budgetBreakdown: [
      { category: 'Direct Hardware & Panels', percentage: 76, amount: 3648, description: 'Bulk wholesale Tier-1 solar panels, LiFePO4 cells, LED fixtures' },
      { category: 'Local Assembly & Youth Stipends', percentage: 14, amount: 672, description: 'Paid to local vocational student technicians assembling units' },
      { category: 'Last-Mile Transport & Logistics', percentage: 8, amount: 384, description: 'Bicycle cargo and rural minibus deliveries to school compounds' },
      { category: 'Open Accounting & Audit Reserves', percentage: 2, amount: 96, description: 'Bank transfer fees and public ledger documentation printing' }
    ],
    updates: [
      {
        id: 'upd-1',
        date: '3 days ago',
        title: 'Batch #3 Assembled by Local Apprentices',
        summary: '84 solar units calibrated and tested with zero defect rate. Delivered to Kpandu Primary School.',
        verifiedReceiptCount: 14,
        beneficiariesReached: 168,
        author: 'Amina Diallo',
        authorRole: 'Field Coordinator',
        tag: 'Milestone Verified'
      },
      {
        id: 'upd-2',
        date: '10 days ago',
        title: 'Kerosene Elimination Baseline Study',
        summary: 'Families reported average monthly savings of $12 previously spent on hazardous fuel.',
        verifiedReceiptCount: 6,
        beneficiariesReached: 210,
        author: 'Kofi Mensah',
        authorRole: 'Technical Lead',
        tag: 'Impact Report'
      }
    ],
    description: 'Over 40% of rural pupils in the Volta Basin study by dim kerosene flames after sundown, causing respiratory issues and house fires. This community-led cooperative trains local vocational youth to assemble rugged, repairable solar lamps for elementary students.'
  },
  {
    id: 'fresh-harvest-pantry',
    title: 'ZeroWaste Community Cold Pantries',
    tagline: 'Rescuing 800+ lbs of fresh produce daily from wholesale dumpsters to feed local neighborhood food pantries.',
    organization: 'Open Table Mutual Aid Collective',
    leadOrganizer: 'Elena Ramos & Marcus Vance',
    location: 'Southside Chicago, IL',
    category: 'Equity & inclusion',
    verifiedNonprofit: true,
    transparencyScore: 96,
    targetAmount: 3200,
    currentAmount: 2890,
    targetHours: 200,
    currentHours: 178,
    urgencyLevel: 'normal',
    unSdgGoals: [2, 10, 12],
    impactUnits: [
      {
        costPerUnit: 12,
        hoursPerUnit: 1.5,
        unitName: 'Family Fresh Produce Crate',
        unitDescription: 'Provides 24 lbs of rescued organic produce, greens, and pantry staples for a family of four.',
        badge: '🥦 1 Fresh Crate'
      },
      {
        costPerUnit: 35,
        hoursPerUnit: 4,
        unitName: 'Neighborhood Fridge Restock Shift',
        unitDescription: 'Fuel and transport for a volunteer driver rescuing 250 lbs of bakery & farm goods.',
        badge: '🚐 1 Resupply Run'
      }
    ],
    budgetBreakdown: [
      { category: 'Cooling Equipment & Maintenance', percentage: 48, amount: 1536, description: 'Commercial fridge repairs, outdoor weatherproof enclosures & temperature monitors' },
      { category: 'Volunteer Driver Fuel Reimbursals', percentage: 26, amount: 832, description: 'Mileage reimbursement for community rescue drivers transporting food' },
      { category: 'Food-Safe Packaging & Bags', percentage: 16, amount: 512, description: 'Reusable crates, compostable produce bags, sanitary sanitizers' },
      { category: 'Digital Open Transparency Hub', percentage: 10, amount: 320, description: 'Public fridge temperature sensors, domain hosting, receipt logging' }
    ],
    updates: [
      {
        id: 'upd-3',
        date: 'Yesterday',
        title: 'New Solar Fridge Enclosure Installed on 47th St',
        summary: 'Built with donated pallet wood and solar backup. Serves over 60 neighborhood families daily.',
        verifiedReceiptCount: 9,
        beneficiariesReached: 340,
        author: 'Elena Ramos',
        authorRole: 'Pantry Steward',
        tag: 'Infrastructure'
      }
    ],
    description: 'We believe food dignity belongs to everyone. By bridging the gap between supermarket supply surplus and neighborhood food deserts, we stock 4 autonomous outdoor refrigerators accessible 24/7 with no questions asked.'
  },
  {
    id: 'youth-stem-empowerment',
    title: 'CodeForward: Teen Mentors in Refugee Centers',
    tagline: 'High school programmers teaching web development & digital literacy to recently relocated youth.',
    organization: 'Youth Digital Bridges',
    leadOrganizer: 'Tariq Al-Masri & Chloe Dupont',
    location: 'Berlin & Online Hubs',
    category: 'Youth leadership',
    verifiedNonprofit: true,
    transparencyScore: 99,
    targetAmount: 2500,
    currentAmount: 2150,
    targetHours: 150,
    currentHours: 132,
    urgencyLevel: 'normal',
    unSdgGoals: [4, 8, 10],
    impactUnits: [
      {
        costPerUnit: 25,
        hoursPerUnit: 2,
        unitName: 'Student Coding Toolkit',
        unitDescription: 'Refurbished Raspberry Pi terminal, wireless mouse, and offline curriculum USB.',
        badge: '💻 1 Student Kit'
      },
      {
        costPerUnit: 60,
        hoursPerUnit: 6,
        unitName: 'Monthly 1-on-1 Mentorship Cohort',
        unitDescription: 'Covers language translation software and high-speed Wi-Fi hotspot vouchers for 2 learners.',
        badge: '🚀 1 Mentorship Cohort'
      }
    ],
    budgetBreakdown: [
      { category: 'Refurbished Hardware Components', percentage: 65, amount: 1625, description: 'Screens, mini PCs, power adapters donated or sourced at cost' },
      { category: 'Wi-Fi & Data Sim Vouchers', percentage: 22, amount: 550, description: 'Monthly connectivity for students living in temporary accommodation' },
      { category: 'Curriculum Translation & Books', percentage: 10, amount: 250, description: 'Arabic, Ukrainian, and Farsi coding prompt booklets' },
      { category: 'Celebration Hackathon Supplies', percentage: 3, amount: 75, description: 'Pizzas and project certificates for graduation showcase' }
    ],
    updates: [
      {
        id: 'upd-4',
        date: '5 days ago',
        title: 'First Cohort Builds 12 Community Websites',
        summary: 'Students launched sites for local translation services, cultural recipes, and mutual aid.',
        verifiedReceiptCount: 11,
        beneficiariesReached: 75,
        author: 'Tariq Al-Masri',
        authorRole: 'Student Lead',
        tag: 'Graduation'
      }
    ],
    description: 'Led entirely by high school coders, this project bridges the digital divide for relocated youth, equipping them with transferable technical skills, peer friendships, and future career confidence.'
  },
  {
    id: 'clean-water-gravity-filters',
    title: 'PureFlow: Gravity Water Filters for Flood Relief',
    tagline: 'Emergency non-electric micro-filtration units deployed immediately following seasonal flash floods.',
    organization: 'Frontline Disaster Responders',
    leadOrganizer: 'Dr. Soraya Mendez',
    location: 'Choco Region, Colombia',
    category: 'Climate & poverty',
    verifiedNonprofit: true,
    transparencyScore: 97,
    targetAmount: 5500,
    currentAmount: 4620,
    targetHours: 100,
    currentHours: 85,
    urgencyLevel: 'critical',
    unSdgGoals: [3, 6, 13],
    impactUnits: [
      {
        costPerUnit: 22,
        hoursPerUnit: 1.5,
        unitName: '0.1 Micron Gravity Filter Kit',
        unitDescription: 'Purifies 100,000 gallons of contaminated river water without electricity or chemicals.',
        badge: '💧 1 Clean Water Kit'
      },
      {
        costPerUnit: 50,
        hoursPerUnit: 3,
        unitName: 'Emergency Community Water Station',
        unitDescription: 'High-volume 200L dual-filtration reservoir installed at evacuation community shelter.',
        badge: '🛡️ 1 Community Station'
      }
    ],
    budgetBreakdown: [
      { category: 'Hollow-Fiber Filter Cartridges', percentage: 70, amount: 3850, description: 'Medical-grade 0.1-micron membrane units with backwash cleaning syringes' },
      { category: 'Food-Grade Buckets & Faucets', percentage: 18, amount: 990, description: 'Local manufacturing of stackable 20L containers' },
      { category: 'Riverboat Transport & Volunteer Fuel', percentage: 9, amount: 495, description: 'Canoe & boat transport into isolated riverbank settlements' },
      { category: 'Water Quality Testing Strips', percentage: 3, amount: 165, description: 'Bacterial and heavy metal verification tests' }
    ],
    updates: [
      {
        id: 'upd-5',
        date: 'Just now',
        title: '140 Families Supplied with Safe Drinking Water',
        summary: 'Deployed after heavy rains caused Rio San Juan flooding. Zero waterborne illness cases reported.',
        verifiedReceiptCount: 18,
        beneficiariesReached: 580,
        author: 'Dr. Soraya Mendez',
        authorRole: 'Medical Logistics Lead',
        tag: 'Emergency Relief'
      }
    ],
    description: 'When seasonal floods sweep away sanitation infrastructure, waterborne pathogens spike within 48 hours. Our lightweight gravity filtration kits give families immediate sovereignty over clean drinking water.'
  }
];

export const INITIAL_PLEDGES: Pledge[] = [
  {
    id: 'pledge-1',
    projectId: 'solar-lit-schools',
    projectTitle: 'SolarLit Classrooms: Light for Off-Grid Students',
    pledgerName: 'Sarah Jenkins',
    type: 'funds',
    amount: 54,
    impactAchieved: '3 Solar Desk Lanterns',
    message: 'Honoring International Day of Charity! May every child study in bright, smoke-free light.',
    timestamp: '25 minutes ago',
    rippleCount: 3,
    badge: '🌟 Pioneer Giver'
  },
  {
    id: 'pledge-2',
    projectId: 'solar-lit-schools',
    projectTitle: 'SolarLit Classrooms: Light for Off-Grid Students',
    pledgerName: 'Carlos Rivera',
    type: 'hours',
    amount: 4,
    impactAchieved: '4 Hours Remote Firmware & Hardware QA',
    message: 'Inspired by Sarah! Volunteering my weekend electrical engineering skills.',
    timestamp: '18 minutes ago',
    parentId: 'pledge-1',
    rippleCount: 2,
    badge: '⚡ Skills Volunteer'
  },
  {
    id: 'pledge-3',
    projectId: 'fresh-harvest-pantry',
    projectTitle: 'ZeroWaste Community Cold Pantries',
    pledgerName: 'Maya Patel',
    type: 'funds',
    amount: 36,
    impactAchieved: '3 Family Fresh Produce Crates (72 lbs)',
    message: 'No one in our neighborhoods should go to sleep hungry while good food is wasted.',
    timestamp: '12 minutes ago',
    rippleCount: 2,
    badge: '🥦 Nourishment Ally'
  },
  {
    id: 'pledge-4',
    projectId: 'fresh-harvest-pantry',
    projectTitle: 'ZeroWaste Community Cold Pantries',
    pledgerName: 'Devon Lee',
    type: 'hours',
    amount: 3,
    impactAchieved: '1 Resupply Run (Morning Grocery Rescue)',
    message: 'Maya inspired me to sign up for the Sunday morning market pickup route!',
    timestamp: '7 minutes ago',
    parentId: 'pledge-3',
    rippleCount: 1,
    badge: '🚐 Route Driver'
  },
  {
    id: 'pledge-5',
    projectId: 'youth-stem-empowerment',
    projectTitle: 'CodeForward: Teen Mentors in Refugee Centers',
    pledgerName: 'Aiden Wong',
    type: 'funds',
    amount: 50,
    impactAchieved: '2 Student Coding Toolkits',
    message: 'Coding changed my life when I was 15. Excited to pass this forward to the next generation.',
    timestamp: '3 minutes ago',
    rippleCount: 0,
    badge: '💻 Future Builder'
  }
];
