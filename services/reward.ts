import axios, { AxiosResponse } from "axios"
import bind from "./bind"
import { getAccessToken } from "@/lib/utils"
import { ICreateCouponPool, ICreateTokenPool } from "@/types/services/reward"
import { ICreateNFTPool } from "@/types/services/reward"
import { Address } from "@/types/web3"

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

  public async createCouponPool(body: ICreateCouponPool) {
    try {
      return (
        await this.http.post(`/create-coupon-pool`, body, {
          headers: {
            Authorization: getAccessToken(),
          },
        })
      ).data
    } catch (error) {
      throw error
    }
  }
  public async createNftPool(nftPool: ICreateNFTPool) {
    try {
      return (
        await this.http.post(`/create-nft-pool`, nftPool, {
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

  async claimReward(rewardId: string, body: { hash?: Address }) {
    await this.http.post(`/claim-reward/${rewardId}`, body, {
      headers: { Authorization: getAccessToken() },
    })
  }

  public async distributeLeaderboardRewards(contestId: string) {
    try {
      return (
        await this.http.post(
          `/distribute-leaderboard-rewards`,
          { contestId },
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
}
