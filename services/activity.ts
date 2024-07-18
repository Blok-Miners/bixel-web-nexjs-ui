import axios, { AxiosResponse } from "axios"
import bind from "./bind"
import { getAccessToken } from "@/lib/utils"

export class ActivityService extends bind {
  private http
  constructor() {
    super()
    this.http = axios.create({
      baseURL: `${process.env.NEXT_PUBLIC_API_URL}/activity`,
    })
  }

  public async createActivity(body: FormData, groupId: string) {
    try {
      return (
        await this.http.post(`/`, body, {
          headers: { Authorization: getAccessToken() },
        })
      ).data
    } catch (error) {
      throw error
    }
  }

  public async getUserActivity() {
    try {
      return (
        await this.http.get(`/`, {
          headers: { Authorization: getAccessToken() },
        })
      ).data
    } catch (error) {
      throw error
    }
  }
}
