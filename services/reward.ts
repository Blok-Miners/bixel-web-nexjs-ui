import axios, { AxiosResponse } from "axios"
import bind from "./bind"
import { getAccessToken } from "@/lib/utils"

export class Rewards extends bind {
  private http
  constructor() {
    super()
    this.http = axios.create({
      baseURL: `${process.env.NEXT_PUBLIC_API_URL}/reward`,
    })
  }

  public async getClaimableRewards() {
    try {
      return (
        await this.http.get(`/claimable-rewards`, {
          headers: { Authorization: getAccessToken() },
        })
      ).data
    } catch (error) {
      throw error
    }
  }
}
