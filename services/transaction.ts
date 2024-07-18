import axios, { AxiosResponse } from "axios"
import bind from "./bind"
import { getAccessToken } from "@/lib/utils"

export class Transaction extends bind {
  private http
  constructor() {
    super()
    this.http = axios.create({
      baseURL: `${process.env.NEXT_PUBLIC_API_URL}/transaction`,
    })
  }

  public async getTransactions() {
    try {
      return (
        await this.http.get("/", {
          headers: { Authorization: getAccessToken() },
        })
      ).data
    } catch (error) {
      throw error
    }
  }
}
