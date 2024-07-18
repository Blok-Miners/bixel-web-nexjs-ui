import axios from "axios"
import BindService from "./bind"
import { ILogin, IRegister } from "@/types/services/user"
import { getAccessToken } from "@/lib/utils"

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
      throw error
    }
  }

  public async getUser(){
    try {
      return (await this.http.get("/", {
        headers: {
          Authorization: getAccessToken(),
        },
      })).data
    } catch (error) {
      throw error
    }
  }

  public async register(body: IRegister) {
    try {
      return (await this.http.post("/register", body)).data
    } catch (error) {
      throw new Error("Failed to login")
    }
  }
}
