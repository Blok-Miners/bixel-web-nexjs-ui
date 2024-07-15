import { IUploadImages } from "@/types/services/pixel"
import BindService from "./bind"
import axios from "axios"
import { getAccessToken } from "@/lib/utils"

export class PixelService extends BindService {
  private http

  constructor() {
    super()
    this.http = axios.create({
      baseURL: `${process.env.NEXT_PUBLIC_API_URL}/pixel`,
      headers: {
        "Content-Type": "application/json",
      },
    })
  }

  public async uploadImages(body: IUploadImages) {
    try {
      return (
        await this.http.post("/upload-images", body, {
          headers: { Authorization: getAccessToken() },
        })
      ).data
    } catch (error) {
      throw new Error("Failed to upload images")
    }
  }
}
