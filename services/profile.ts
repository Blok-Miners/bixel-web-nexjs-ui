import axios, { AxiosResponse } from "axios"
import bind from "./bind"
import { getAccessToken } from "@/lib/utils"

export class ProfileService extends bind {
  private http
  constructor() {
    super()
    this.http = axios.create({
      baseURL: `${process.env.NEXT_PUBLIC_API_URL}/product`,
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    })
  }

  public async createProfile(body: FormData) {
    try {
      return (await this.http.post("/create", body , {
        headers: { Authorization: getAccessToken() , "Content-Type": "multipart/form-data" },
      } )).data
    } catch (error) {
    
      throw error
    }
  }
}
