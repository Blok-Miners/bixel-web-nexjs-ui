import axios, { AxiosResponse } from "axios"
import bind from "./bind"
import { getAccessToken } from "@/lib/utils"

export class SurveyService extends bind {
  private http
  constructor() {
    super()
    this.http = axios.create({
      baseURL: `${process.env.NEXT_PUBLIC_API_URL}/contest`,
    })
  }

  public async getSurvey(id: string) {
    try {
      return (
        await this.http.get(`survey/${id}`, {
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
  public async registerSurveySubmission(id: string) {
    try {
      return (
        await this.http.post(
          `register-survey-submission/${id}`,
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
}
