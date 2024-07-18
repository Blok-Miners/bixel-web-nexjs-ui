import axios, { AxiosResponse } from "axios"
import bind from "./bind"

export class ProfileService extends bind {
  private http
  constructor() {
    super()
    this.http = axios.create({
      baseURL: `${process.env.NEXT_PUBLIC_API_URL}/product`,
      headers: {
        "Content-Type": "application/json",
      },
    })
  }

  public async createProfile(body: FormData) {
    try {
      return (await this.http.post("/create", body)).data
    } catch (error) {
    
      throw error
    }
  }
}
