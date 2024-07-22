import axios, { AxiosResponse } from "axios"
import bind from "./bind"
import { getAccessToken } from "@/lib/utils"
import { ICreateTokenPool } from "@/types/services/reward"

export class RewardService extends bind {
  private http
  constructor() {
    super()
    this.http = axios.create({
      baseURL: `${process.env.NEXT_PUBLIC_API_URL}/reward`,
    })
  }

  public async createTokenPool(body: ICreateTokenPool) {
    try {
      return (
        await this.http.post(`/create-token-pool`, body, {
          headers: {
            Authorization: getAccessToken(),
          },
        })
      ).data
    } catch (error) {
      throw error
    }
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

  async claimReward(rewardId: string , body:Record<string, never> = {}) {
    await this.http.post(`/claim-reward/${rewardId}`, body,
      {
        headers: { Authorization: getAccessToken() },
      }
    );
  }
}
