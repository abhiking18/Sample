import { BeforeAfterSet, CleanerTeamMember, CustomerReview, FaqItem, PricingPlan, ServiceItem } from '../types';

export const brandConfig = {
  name: 'Hearth & Home Cleaning Co.',
  shortName: 'Hearth & Home',
  legalName: 'Hearth & Home Services LLC / Hearth & Home Ltd.',
  foundingYear: 2018,
  
  // Contacts
  contact: {
    us: {
      phone: '+1 (512) 842-9104',
      phoneRaw: '+15128429104',
      phoneDisplay: '(512) 842-9104',
      cities: ['Austin, TX', 'Chicago, IL', 'Dallas, TX'],
      primaryAddress: '1604 S Congress Ave, Austin, TX 78704',
      hours: 'Mon–Sat: 7:30am – 6:30pm CST',
      unitLabel: 'Apartment',
      postalLabel: 'Zip code',
      currency: '$',
      currencyCode: 'USD',
    },
    uk: {
      phone: '+44 20 7946 0812',
      phoneRaw: '+442079460812',
      phoneDisplay: '020 7946 0812',
      cities: ['London (Zones 1–3)', 'Leeds (North & West)', 'Manchester', 'Edinburgh'],
      primaryAddress: '42 Upper Street, Islington, London N1 0PN',
      hours: 'Mon–Sat: 8:00am – 6:00pm GMT',
      unitLabel: 'Flat',
      postalLabel: 'Postcode',
      currency: '£',
      currencyCode: 'GBP',
    },
    email: 'hello@hearthandhomeclean.com',
    whatsapp: 'https://wa.me/15128429104?text=Hello%20Hearth%20%26%20Home%2C%20I%20would%20like%20to%20inquire%20about%20a%20quote',
  },

  // Color tokens
  colors: {
    paper: '#F6F2EA',
    paperAlt: '#EDE6D8',
    forest: '#1F3A34',
    clay: '#C4623A',
    sage: '#A9B8A0',
    butter: '#E9D8A6',
    charcoal: '#1C1C1A',
    muted: '#6B675E',
  },

  // Trust statistics
  stats: {
    averageRating: '4.96',
    totalHomesCleaned: '420+',
    repeatRetentionRate: '94%',
    teamLivingWageRatio: '100%',
  },

  // Curated warm, natural photography from Unsplash
  images: {
    heroMain: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80', // sunlit tranquil living room
    heroDetail: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80', // natural wiping counter / amber bottle
    interiorWarmth: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80', // cozy calm home corner
    foldedLinens: 'https://images.unsplash.com/photo-1582533561751-ef6f6ab93a2e?auto=format&fit=crop&w=800&q=80', // folded natural cotton linens
  },

  // 6 Core Services
  services: [
    {
      id: 'regular',
      name: 'Regular Maintenance Cleaning',
      tagline: 'The quiet rhythm that keeps your week running smooth.',
      description: 'The same two cleaners visit weekly or fortnightly. We use plant-based extracts that leave surfaces matte and rooms smelling of cedar, not harsh chlorine.',
      priceUS: 140,
      priceUK: 115,
      unit: 'visit',
      checklist: [
        'Complete kitchen counter, stovetop and sink sanitation',
        'Bathroom tile scrubbing, mirrors, and fixtures polished',
        'Hardwood floors vacuumed with HEPA filters and damp-mopped',
        'Bed linens changed and folded to hotel hospital-corners',
        'Trash emptied and recyclables properly sorted',
      ],
      image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80', // tidy warm shaker kitchen
      alt: 'Clean warm kitchen with wooden island and daylight',
      colSpan: 'lg:col-span-2',
    },
    {
      id: 'deep',
      name: 'Deep Seasonal Reset',
      tagline: 'Reaching the places you have not looked at since last year.',
      description: 'An exhaustive 5-hour overhaul. We pull appliances forward, wipe the tops of doorframes, degrease extraction hoods, and restore tile grout lines.',
      priceUS: 280,
      priceUK: 230,
      unit: 'reset',
      checklist: [
        'Inside oven degreased without caustic fumes',
        'Baseboards, door frames, and crown moulding hand-wiped',
        'Inside kitchen cabinets vacuumed and wiped',
        'Shower grout detailed with steam and natural citric acid',
        'Behind and underneath large furniture vacuumed',
      ],
      image: 'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&w=800&q=80', // bright clean bathroom detail
      alt: 'Pristine bathroom with marble basin and soft sunlight',
      colSpan: 'lg:col-span-1',
    },
    {
      id: 'move',
      name: 'Move-In / Move-Out Handover',
      tagline: 'Your full deposit back, or your new home pristine before unpacking.',
      description: 'Engineered specifically for strict lease inventory checks and buyers moving into a previous owner’s dust. Includes interior cupboards, appliances, and skirting.',
      priceUS: 340,
      priceUK: 280,
      unit: 'handover',
      checklist: [
        'Full landlord inventory checklist compliance guaranteed',
        'Inside all wardrobes, pantries, and storage drawers',
        'Refrigerator and freezer defrosted and sanitised',
        'Interior window glass and window sills polished',
        'Light switches, sockets, and radiator surfaces wiped',
      ],
      image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80', // sunlit unfurnished wooden floor apartment
      alt: 'Spacious empty sunlit apartment ready for moving in',
      colSpan: 'lg:col-span-1',
    },
    {
      id: 'office',
      name: 'Creative Studio & Quiet Workspace',
      tagline: 'After-hours care for architecture firms, studios, and design agencies.',
      description: 'Discreet evening cleaning for teams who care about sensitive documents, acoustic baffles, monitor screens, and communal kitchen espresso machines.',
      priceUS: 210,
      priceUK: 175,
      unit: 'visit',
      checklist: [
        'Workstation surface sanitising without moving papers',
        'Coffee station and espresso group heads descaled',
        'Meeting room whiteboard and glass screens streak-free',
        'Recycling, compost, and sensitive shredding bins cleared',
        'Quiet evening entry with alarm code protocols',
      ],
      image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80', // minimalist design office with warm wood
      alt: 'Calm minimalist studio workspace after hours',
      colSpan: 'lg:col-span-2',
    },
    {
      id: 'airbnb',
      name: 'Boutique Short-Stay Turnover',
      tagline: 'Five-star cleanliness ratings without you ever stepping foot inside.',
      description: 'Same-day turnaround for boutique Airbnb and Vrbo hosts. We launder sheets off-site or on-site, restage toiletries, and check for damage before the next guest arrives.',
      priceUS: 160,
      priceUK: 130,
      unit: 'turnover',
      checklist: [
        'Crisp bed making with hospitality folds',
        'Coffee, tea, and guest amenity trays restocked',
        'Comprehensive photo report of any guest damages',
        'Hair-free bathroom and shower inspection under LED torch',
        'Key lockbox verification and digital check-in readiness',
      ],
      image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80', // cozy boutique bedroom with crisp sheets
      alt: 'Comfortable guest bedroom with neatly prepared linens',
      colSpan: 'lg:col-span-1',
    },
    {
      id: 'post-con',
      name: 'Post-Renovation Plaster Extraction',
      tagline: 'Removing the fine white haze that normal vacuums just blow back into the air.',
      description: 'Builders leave fine drywall dust embedded in everything. We bring industrial M-class HEPA extractors, electrostatic wipes, and detailers who clean every groove.',
      priceUS: 390,
      priceUK: 320,
      unit: 'project',
      checklist: [
        'Multi-stage HEPA air scrub and vacuuming',
        'Drywall dust wiped from walls, trim, and light pendants',
        'Paint splatters and silicone residue gently removed from glass',
        'Vent registers and radiator fins cleaned with micro-nozzles',
        'Two passes on all hard floors to prevent sticky film',
      ],
      image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80', // architectural renovated room with clean lines
      alt: 'Freshly renovated living room with clean hardwood floors',
      colSpan: 'lg:col-span-2',
    },
  ] as ServiceItem[],

  // Process Steps
  process: [
    {
      number: '01',
      title: 'The 15-Minute Home Walkthrough',
      subtitle: 'We take notes on what matters to you.',
      description: 'Before the first clean, we map your home: which antique cedar table needs mineral oil, which floor cannot take water, and how your rescue cat prefers to be left alone.',
    },
    {
      number: '02',
      title: 'The Same Two Cleaners Arrive',
      subtitle: 'Never a rotation of strangers.',
      description: 'Bonded, insured, paid living wages, and arriving on time in quiet, unmarked aprons. They bring their own plant-based soaps, microfibre sets, and sealed HEPA vacuums.',
    },
    {
      number: '03',
      title: 'The 20-Point Walk-Away Check',
      subtitle: 'Spotless handoff, every time.',
      description: 'Before locking your door, our lead cleaner reviews the 20-point sign-off list. If any corner falls short of what we agreed, we return within 24 hours free of charge.',
    },
  ],

  // 3 Before / After Comparisons
  beforeAfterSets: [
    {
      id: 'stovetop',
      room: 'Kitchen Range',
      title: 'Heavy Enamel & Brass Cooktop',
      subtitle: 'Years of baked-in grease dissolved without harsh acid.',
      story: 'A Victorian terrace in Islington with an inherited Lacanche range. We used warm soda bicarbonate and citrus paste to lift 6 months of baked grease without etching the brass burners.',
      beforeImage: 'https://images.unsplash.com/photo-1584622781564-1d987f7333c1?auto=format&fit=crop&w=800&q=80',
      afterImage: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'bathroom',
      room: 'Shower Enclosure',
      title: 'Honed Limestone & Glass Screen',
      subtitle: 'Restoring mineral-clouded glass and porous natural stone.',
      story: 'A mid-century home in Austin, TX with hard water buildup. We descaled the glass with organic chelating agent and steam-scrubbed the stone grout without stripping the sealant.',
      beforeImage: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80',
      afterImage: 'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'hardwood',
      room: 'Living Room Flooring',
      title: 'Antique White Oak Herringbone',
      subtitle: 'Lifting ground-in city grit while feeding natural grain.',
      story: 'Post-hosting recovery in a Chicago loft. Dual damp-mop passes using vegetable glycerin and cedar essential oil, leaving zero slippery residue or cloudy buildup.',
      beforeImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
      afterImage: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80',
    },
  ] as BeforeAfterSet[],

  // Pricing Plans
  pricingPlans: [
    {
      id: 'essential',
      name: 'The Quiet Routine',
      subtitle: 'For naturally tidy homes wanting reliable upkeep.',
      priceUS: { recurring: 140, onetime: 180 },
      priceUK: { recurring: 115, onetime: 150 },
      cadence: 'per visit',
      features: [
        { name: 'Same 2 cleaners assigned every visit', included: true },
        { name: 'Kitchen & bathroom full sanitation', included: true },
        { name: 'All floors vacuumed & damp-mopped', included: true },
        { name: 'Surface dusting & trash removal', included: true },
        { name: 'Bed making (linens washed if left out)', included: false },
        { name: 'Inside oven & fridge degreasing', included: false },
        { name: 'Interior windows & window sills', included: false },
      ],
      idealFor: 'Apartments & flats up to 2 bedrooms needing fortnightly care.',
    },
    {
      id: 'standard',
      name: 'The Hearth Standard',
      subtitle: 'Our signature thorough care for busy working households.',
      priceUS: { recurring: 210, onetime: 265 },
      priceUK: { recurring: 175, onetime: 220 },
      cadence: 'per visit',
      isPopular: true,
      features: [
        { name: 'Same 2 cleaners assigned every visit', included: true },
        { name: 'Kitchen & bathroom deep detailing', included: true },
        { name: 'All floors vacuumed & damp-mopped', included: true },
        { name: 'Bed linens stripped, changed & hospital-folded', included: true },
        { name: 'Baseboards & skirting wiped on rotation', included: true },
        { name: 'Microwave & toaster crumb tray cleaned', included: true },
        { name: 'Interior windows & patio doors polished', included: false },
      ],
      idealFor: 'Homes with families, pets, or work-from-home schedules.',
    },
    {
      id: 'estate',
      name: 'The Complete Estate',
      subtitle: 'Comprehensive whole-home care with laundry and appliances.',
      priceUS: { recurring: 320, onetime: 395 },
      priceUK: { recurring: 260, onetime: 330 },
      cadence: 'per visit',
      features: [
        { name: 'Same 2 senior cleaners every visit', included: true },
        { name: 'Kitchen & bathroom showroom restoration', included: true },
        { name: 'Inside oven and refrigerator wiped clean', included: true },
        { name: '2 loads of personal laundry folded & put away', included: true },
        { name: 'All interior windows & mirrors detailed', included: true },
        { name: 'Indoor house plants watered & dusted', included: true },
        { name: 'Complimentary seasonal deep-clean upgrades', included: true },
      ],
      idealFor: 'Multi-storey homes, period properties, and high-demand weeks.',
    },
  ] as PricingPlan[],

  // Reviews
  reviews: [
    {
      id: 'rev-1',
      author: 'Sarah & Ben K.',
      neighborhood: 'Bouldin Creek',
      city: 'Austin, TX',
      region: 'US',
      duration: 'Clients for 9 months',
      rating: 5,
      quote: 'Marcus and Elena have been coming every other Thursday since March. They never bump our acoustic guitars, and our golden retriever barely looks up when they unlock the front door. Having the exact same two people who already know where the dog treats live is worth every single dollar.',
    },
    {
      id: 'rev-2',
      author: 'Julian P.',
      neighborhood: 'Highbury',
      city: 'London',
      region: 'UK',
      duration: 'Client for 14 months',
      rating: 5,
      quote: 'After three dreadful agencies that kept sending random agency temps who ruined our unsealed Carrara marble island with cheap bleach, Hearth & Home gave us Hannah and Liam. They bring their own plant soaps and leave the flat smelling faintly of eucalyptus, not a public swimming pool.',
    },
    {
      id: 'rev-3',
      author: 'Priya & Dev M.',
      neighborhood: 'Lincoln Park',
      city: 'Chicago, IL',
      region: 'US',
      duration: 'Move-out clean + ongoing',
      rating: 5,
      quote: 'Booked their move-out turnaround for our 3-bed flat on Fullerton. Our notoriously picky landlord returned our entire $2,400 deposit without a single penny deducted. The inside of the oven looked like it had just rolled off the showroom floor.',
    },
    {
      id: 'rev-4',
      author: 'Dr. Alistair & Clare G.',
      neighborhood: 'Roundhay',
      city: 'Leeds',
      region: 'UK',
      duration: 'Clients for 2 years',
      rating: 5,
      quote: 'With two toddlers and hospital shift rotas, coming home on Friday evening to crisp hospital-folded sheets, dusted skirting boards, and streak-free bathroom mirrors genuinely saves our sanity. They are punctual, warm, and thoroughly professional.',
    },
    {
      id: 'rev-5',
      author: 'David & Clara L.',
      neighborhood: 'Clarksville',
      city: 'Austin, TX',
      region: 'US',
      duration: 'Clients for 11 months',
      rating: 5,
      quote: 'Not the cheapest cleaners in Austin, and proud of it. But they are the only crew I trust around mid-century oiled walnut and unlacquered brass hardware. They actually know how to clean without destroying delicate finishes.',
    },
    {
      id: 'rev-6',
      author: 'Eleanor & Tom W.',
      neighborhood: 'Barnes',
      city: 'London',
      region: 'UK',
      duration: 'Clients for 6 months',
      rating: 5,
      quote: 'They vacuum under the sofa cushions without being asked, wipe the forgotten top edge of the picture frames, and leave the house calm. No plastic bottles cluttering our bins afterwards either.',
    },
  ] as CustomerReview[],

  // Meet the Team
  team: [
    {
      id: 'elena',
      name: 'Elena Ramos',
      role: 'Lead Cleaner & Team Mentor',
      tenure: '5 years with Hearth & Home',
      location: 'Austin, TX',
      region: 'US',
      funFact: 'Can identify almost any houseplant by leaf shape; blends her own organic lavender linen spray.',
      image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=600&q=80',
      alt: 'Elena Ramos, lead house cleaner in Austin',
    },
    {
      id: 'marcus',
      name: 'Marcus Vance',
      role: 'Senior Surface Specialist',
      tenure: '4 years with Hearth & Home',
      location: 'Chicago, IL',
      region: 'US',
      funFact: 'Former cabinet maker who treats solid oak trim, terrazzo and marble surfaces like gallery works.',
      image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=600&q=80',
      alt: 'Marcus Vance, senior cleaning specialist in Chicago',
    },
    {
      id: 'hannah',
      name: 'Hannah Davies',
      role: 'Lead Cleaner & Heritage Trainer',
      tenure: '3 years with Hearth & Home',
      location: 'London',
      region: 'UK',
      funFact: 'Distance runner obsessed with streak-free Georgian sash windows and caring for lime plaster.',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80',
      alt: 'Hannah Davies, heritage cleaner in London',
    },
    {
      id: 'liam',
      name: 'Liam Campbell',
      role: 'Restoration & Deep Clean Lead',
      tenure: '4 years with Hearth & Home',
      location: 'Leeds',
      region: 'UK',
      funFact: 'Master of restoring Victorian floor tile; owner of a gentle rescue whippet named Biscuit.',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80',
      alt: 'Liam Campbell, restoration lead cleaner in Leeds',
    },
  ] as CleanerTeamMember[],

  // Service Areas (Text list)
  serviceAreas: {
    us: [
      { city: 'Austin, TX', neighborhoods: 'Bouldin Creek, Travis Heights, Clarksville, Hyde Park, Mueller, Tarrytown' },
      { city: 'Chicago, IL', neighborhoods: 'Lincoln Park, Lakeview, Bucktown, Wicker Park, Gold Coast, Evanston' },
      { city: 'Dallas, TX', neighborhoods: 'Highland Park, Lakewood, Oak Lawn, Preston Hollow, Bishop Arts' },
    ],
    uk: [
      { city: 'London (Zones 1–3)', neighborhoods: 'Islington, Highbury, Hackney, Barnes, Richmond, Hampstead, Dulwich, Fulham' },
      { city: 'Leeds', neighborhoods: 'Roundhay, Chapel Allerton, Headingley, Alwoodley, City Centre, Horsforth' },
      { city: 'Manchester', neighborhoods: 'City Centre, Didsbury, Chorlton, Ancoats, Altrincham, Hale' },
      { city: 'Edinburgh', neighborhoods: 'New Town, Stockbridge, Morningside, Bruntsfield, Leith' },
    ],
  },

  // FAQs
  faqs: [
    {
      question: 'Do I need to be home while your cleaners work?',
      answer: 'Not at all. Over 80% of our clients are at work or running errands during their visit. You can provide a key lockbox code, leave a key with your building concierge, or let them in before you head out. Every key is tagged with an encrypted barcode (no addresses or names on tags) and stored in our locked depot between visits.',
    },
    {
      question: 'Is it truly the exact same two people every visit?',
      answer: 'Yes. We pair cleaners in dedicated teams of two. You will know their first names and faces from day one. In the rare case of illness or planned annual leave, we inform you 48 hours in advance and ask whether you prefer their assigned backup colleague or to reschedule.',
    },
    {
      question: 'What cleaning products and vacuums do you bring?',
      answer: 'We bring everything needed. Our supplies are non-toxic, plant-based, biodegradable formulas scented with pure organic essential oils (lavender, sweet orange, cedar, and tea tree). Our vacuums are commercial-grade M-class machines with sealed HEPA filters that capture 99.97% of fine dust rather than blowing it back into your room.',
    },
    {
      question: 'What if something delicate is accidentally broken or damaged?',
      answer: 'While our breakage rate is less than 0.02%, we carry comprehensive $2M / £2M commercial liability insurance and full bonding. If anything is chipped or damaged, our cleaners immediately photograph it and notify management before you even arrive home. We reimburse or restore the item without contentious bureaucracy.',
    },
    {
      question: 'How do you treat and pay your cleaning staff?',
      answer: 'All our cleaners are employed directly with contracts, paid sick leave, paid holiday, and wages set at least 25% above the official Living Wage / Real Living Wage. We do not use gig workers or zero-hour subcontracts. This is why our staff retention is five times the industry average and why your cleaners take genuine pride in your home.',
    },
    {
      question: 'What is your cancellation policy?',
      answer: 'Life happens. You can cancel or reschedule any visit up to 48 hours before your appointment with zero fee. Cancellations within 24 hours incur a 50% charge to ensure your cleaners still receive their scheduled wages for reserved time.',
    },
  ] as FaqItem[],
};
