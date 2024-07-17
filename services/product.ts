import axios from "axios"
import BindService from "./bind"
import { ILogin } from "@/types/services/user"

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
}
