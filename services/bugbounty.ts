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
}
