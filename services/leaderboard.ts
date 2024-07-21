import axios, { AxiosResponse } from "axios"
import bind from "./bind"
import { getAccessToken } from "@/lib/utils"

export class leaderboard extends bind {
  private http
  constructor() {
    super()
    this.http = axios.create({
      baseURL: `${process.env.NEXT_PUBLIC_API_URL}/leaderboard`,
    })
  }

  public async getLeaderboardbyId(id: string) {
    try {
      return (
        await this.http.get(`/get-contest-mode/${id}`)
      ).data
    } catch (error) {
      throw error
    }
  }

}