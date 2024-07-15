import axios from "axios"
import BindService from "./bind"
import { ILogin } from "@/types/services/user"

export class UserService extends BindService {
  private http

  constructor() {
    super()
    this.http = axios.create({
      baseURL: `${process.env.NEXT_PUBLIC_API_URL}/user`,
      headers: {
        "Content-Type": "application/json",
      },
    })
  }

  public async login(body: ILogin) {
    try {
      return (await this.http.post("/login", body)).data
    } catch (error) {
      throw new Error("Failed to login")
    }
  }
}
