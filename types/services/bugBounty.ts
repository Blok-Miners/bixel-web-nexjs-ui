export interface BugBountySubmission {
  _id: string
  user: string
  image: string
  stepsToReplicate: string
  summary: string
  verified: boolean
  createdAt: string
  updatedAt: string
  __v: number
}

export interface BugBounty {
  _id: string
  description: string
  contractAddress?: string
  chain?: string
  profileURL: string
  submissions: BugBountySubmission[]
  createdAt: string
  updatedAt: string
  __v: number
}
