export interface NavyRank {
  id: number;
  rank: string;
  description: string;
  fact: string;
  imageUrl: string;
}

export const navyRanks: NavyRank[] = [
  // Non-Commissioned Members
  {
    id: 1,
    rank: "Sailor Third Class",
    description: "Entry-level rank in the Royal Canadian Navy",
    fact: "Previously known as Ordinary Seaman until 2020 when the RCN modernized its rank structure to be more inclusive.",
    imageUrl: "/ranks/s3.png"
  },
  {
    id: 2,
    rank: "Sailor Second Class",
    description: "Trade-qualified sailor with basic operational experience",
    fact: "This rank typically takes 2-3 years to achieve from Sailor Third Class, requiring completion of occupation training.",
    imageUrl: "/ranks/s2.png"
  },
  {
    id: 3,
    rank: "Sailor First Class",
    description: "Experienced sailor with leadership responsibilities",
    fact: "Formerly called Leading Seaman, this rank carries significant responsibility including mentoring junior sailors.",
    imageUrl: "/ranks/s1.png"
  },
  {
    id: 4,
    rank: "Master Sailor",
    description: "Senior appointment for experienced Sailor First Class",
    fact: "This specialist appointment recognizes leadership and technical expertise while remaining at the S1 rank level.",
    imageUrl: "/ranks/ms.png"
  },
  {
    id: 5,
    rank: "Petty Officer Second Class",
    description: "Junior supervisor responsible for departmental tasks",
    fact: "PO2s often serve as section heads and are responsible for training and supervising junior sailors.",
    imageUrl: "/ranks/po2.png"
  },
  {
    id: 6,
    rank: "Petty Officer First Class",
    description: "Senior supervisor with significant technical expertise",
    fact: "PO1s are often referred to as 'Chief' despite not being Chief Petty Officers, a tradition dating back many years.",
    imageUrl: "/ranks/po1.png"
  },
  {
    id: 7,
    rank: "Chief Petty Officer Second Class",
    description: "Senior technical advisor and departmental manager",
    fact: "CPO2s are usually the most senior technical experts in their trade within their unit.",
    imageUrl: "/ranks/cpo2.png"
  },
  {
    id: 8,
    rank: "Chief Petty Officer First Class",
    description: "Most senior non-commissioned member rank",
    fact: "The appointment of Coxswain (senior CPO1 on a ship) is considered the highest non-commissioned position on any vessel.",
    imageUrl: "/ranks/cpo1.png"
  },
  // Commissioned Officers
  {
    id: 9,
    rank: "Naval Cadet",
    description: "Officer under training at military college or university",
    fact: "Naval Cadets undergo intensive training including summer seamanship phases on naval vessels.",
    imageUrl: "/ranks/ncdt.png"
  },
  {
    id: 10,
    rank: "Acting Sub-Lieutenant",
    description: "Junior officer completing initial occupation training",
    fact: "This rank is typically held while completing naval warfare officer training or other specialist courses.",
    imageUrl: "/ranks/asl.png"
  },
  {
    id: 11,
    rank: "Sub-Lieutenant",
    description: "Junior officer leading small teams or divisions",
    fact: "Sub-Lieutenants often serve as bridge watchkeepers, responsible for safely navigating the ship.",
    imageUrl: "/ranks/sl.png"
  },
  {
    id: 12,
    rank: "Lieutenant(N)",
    description: "Experienced junior officer leading larger divisions",
    fact: "The (N) designation distinguishes naval lieutenants from army/air force captains of equivalent rank.",
    imageUrl: "/ranks/lt.png"
  },
  {
    id: 13,
    rank: "Lieutenant-Commander",
    description: "Senior officer commanding smaller vessels or shore units",
    fact: "LCdrs often command Maritime Coastal Defence Vessels or serve as Executive Officers on major warships.",
    imageUrl: "/ranks/lcdr.png"
  },
  {
    id: 14,
    rank: "Commander",
    description: "Senior officer commanding major warships or shore establishments",
    fact: "Commanders typically have 15-20 years of experience and often command Halifax-class frigates.",
    imageUrl: "/ranks/cdr.png"
  },
  {
    id: 15,
    rank: "Captain(N)",
    description: "Senior officer commanding naval formations or bases",
    fact: "The (N) designation prevents confusion with army Captains, as naval Captains are equivalent to Colonels.",
    imageUrl: "/ranks/capt.png"
  },
  {
    id: 16,
    rank: "Commodore",
    description: "Junior flag officer leading major formations",
    fact: "Historically, Commodore was a temporary rank given to senior Captains commanding multiple ships.",
    imageUrl: "/ranks/cmdre.png"
  },
  {
    id: 17,
    rank: "Rear-Admiral",
    description: "Flag officer commanding maritime forces or major commands",
    fact: "The term 'Rear-Admiral' originates from the age of sail, when this officer commanded the rear squadron of the fleet.",
    imageUrl: "/ranks/radm.png"
  },
  {
    id: 18,
    rank: "Vice-Admiral",
    description: "Senior flag officer commanding large maritime forces",
    fact: "Historically commanded the van (front) of the fleet, second in command to the Admiral of the fleet.",
    imageUrl: "/ranks/vadm.png"
  },
  {
    id: 19,
    rank: "Admiral",
    description: "Highest naval rank in the Royal Canadian Navy",
    fact: "Only one Admiral position exists in the RCN: the Chief of the Defence Staff, when filled by a naval officer.",
    imageUrl: "/ranks/adm.png"
  }
];
