import axios, { AxiosResponse } from "axios"
import bind from "./bind"
import { getAccessToken } from "@/lib/utils"

export class HoldingsService extends bind {
  private http
  constructor() {
    super()
    this.http = axios.create({
      baseURL: `${process.env.NEXT_PUBLIC_API_URL}/contest`,
    })
  }

  public async getHoldingsVerification(id: string) {
    try {
      return (
        await this.http.get(`holdings-verification/${id}`, {
          headers: {
            Authorization: getAccessToken(),
          },
        })
      ).data
    } catch (error) {
      throw error
    }
  }
  public async verifyholding(id: string) {
    try {
      return (
        await this.http.post(
          `verify-holding/${id}`,
          {},
          {
            headers: {
              Authorization: getAccessToken(),
            },
          },
        )
      ).data
    } catch (error) {
      throw error
    }
  }
  public async verifyHoldingSubmission(id: string) {
    try {
      return (
        await this.http.get(`verify-holdings-submission/${id}`, {
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
