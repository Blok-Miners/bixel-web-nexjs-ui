import axios, { AxiosResponse } from "axios"
import bind from "./bind"
import { getAccessToken } from "@/lib/utils"

export class BugBountyService extends bind {
  private http
  constructor() {
    super()
    this.http = axios.create({
      baseURL: `${process.env.NEXT_PUBLIC_API_URL}/contest`,
    })
  }

  public async getBugBounty(id: string) {
    try {
      return (
        await this.http.get(`bug-bounty/${id}`, {
          headers: {
            Authorization: getAccessToken(),
          },
        })
      ).data
    } catch (error) {
      throw error
    }
  }

  public async submitBugBounty(formData: FormData, contestId: string) {
    try {
      return (
        await this.http.post("/submit-bug-bounty", formData, {
          params: { contestId: contestId },
          headers: {
            Authorization: getAccessToken(),
            "Content-Type": "multipart/form-data",
          },
        })
      ).data
    } catch (error) {
      throw error
    }
  }

  public async verifySubmission(body: {
    contestId: string
    submissionId: string
    approved: boolean
  }) {
    try {
      return (
        await this.http.post("/verify-submission", body, {
          headers: {
            Authorization: getAccessToken(),
          },
        })
      ).data
    } catch (error) {
      throw error
    }
  }
}
