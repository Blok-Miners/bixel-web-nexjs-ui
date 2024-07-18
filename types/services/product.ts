interface SocialMediaLinks {
  facebookUrl: string
  linkedinUrl: string
  twitterUrl: string
  telegramUrl: string
  youtubeUrl: string
}

interface DirectContact {
  email: string
  number: string
}

export interface CompanyProfile {
  id: string
  name: string
  groupId: string
  logo: string
  banner: string
  about: string
  websiteUrl: string
  email: string
  phone: string
  socialMediaLinks: SocialMediaLinks
  contractAuditReport: string
  country: string
  github: string
  video: string
  directContact: DirectContact
  approved: boolean
}
