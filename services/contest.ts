import axios from "axios"
import BindService from "./bind"
import { ICreateContest } from "@/types/services/contest"
import { getAccessToken } from "@/lib/utils"

export class ContestService extends BindService {
  private http

  constructor() {
    super()
    this.http = axios.create({
      baseURL: `${process.env.NEXT_PUBLIC_API_URL}/contest`,
      headers: {
        "Content-Type": "application/json",
      },
    })
  }

  public async createContest(contestData: ICreateContest) {
    try {
      return (
        await this.http.post("/create-blockchain-contest", contestData, {
          headers: { Authorization: getAccessToken() },
        })
      ).data
    } catch (error) {
      throw new Error("Failed to create contest")
    }
  }
}
