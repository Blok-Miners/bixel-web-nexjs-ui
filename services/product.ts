import axios from "axios"
import BindService from "./bind"
import { ILogin } from "@/types/services/user"
import { getAccessToken } from "@/lib/utils"

export class ProductService extends BindService {
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

  public async getProduct(id: string) {
    try {
      return (
        await this.http.get("/", {
          params: { id },
        })
      ).data
    } catch (error) {
      throw error
    }
  }

  public async getFollowStatus(id: string) {
    try {
      return (
        await this.http.get("/follow-status", {
          params: { id },
          headers: {
            Authorization: getAccessToken(),
          },
        })
      ).data
    } catch (error) {
      throw error
    }
  }

  public async follow(id: string) {
    try {
      return (
        await this.http.post(
          `/follow/${id}`,
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
