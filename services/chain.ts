import axios from "axios"
import BindService from "./bind"

export class ChainService extends BindService {
  private http

  constructor() {
    super()
    this.http = axios.create({
      baseURL: `${process.env.NEXT_PUBLIC_API_URL}/chain`,
      headers: {
        "Content-Type": "application/json",
      },
    })
  }

  public async getChains() {
    try {
      return (await this.http.get("/")).data
    } catch (error) {
      throw error
    }
  }
}
