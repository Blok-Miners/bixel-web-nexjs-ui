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
  public async verifyRegistration(id: string) {
    try {
      return (
        await this.http.get(`verify-registration/${id}`, {
          headers: {
            Authorization: getAccessToken(),
          },
        })
      ).data
    } catch (error) {
      throw error
    }
  }
  public async registerSubmission(id: string, email?: string) {
    try {
      const body = email ? { email } : {};
      return (
        await this.http.post(`register-registration-submission/${id}`, body, {
          headers: {
            Authorization: getAccessToken(),
          },
        })
      ).data;
    } catch (error) {
      throw error;
    }
  }
  
}
