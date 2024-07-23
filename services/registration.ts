import axios, { AxiosResponse } from "axios"
import bind from "./bind"
import { getAccessToken } from "@/lib/utils"

export class RegistrationService extends bind {
  private http
  constructor() {
    super()
    this.http = axios.create({
      baseURL: `${process.env.NEXT_PUBLIC_API_URL}/contest`,
    })
  }

  public async getRegistrationVerification(id: string) {
    try {
      return (
        await this.http.get(`registration-verification/${id}`, {
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
