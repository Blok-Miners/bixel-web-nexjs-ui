import {
  IBuyPixel,
  ITransactionIntent,
  IUploadImages,
} from "@/types/services/pixel"
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

  public async getAllBloks() {
    try {
      return (await this.http.get("/get-all-pixels")).data
    } catch (error) {
      throw new Error("Failed to get all blocks")
    }
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

  public async buyPixels(body: IBuyPixel) {
    try {
      return (
        await this.http.post("/metadata-url", body, {
          headers: { Authorization: getAccessToken() },
        })
      ).data
    } catch (error) {
      throw new Error("Failed to upload images")
    }
  }

  public async transactionIntent(body: ITransactionIntent) {
    try {
      return (
        await this.http.post("/transaction-intent", body, {
          headers: { Authorization: getAccessToken() },
        })
      ).data
    } catch (error) {
      throw new Error("Failed to upload images")
    }
  }

  public async getMetadataInfo(id: string) {
    try {
      return (
        await this.http.get("/metadata-info", {
          params: {
            id,
          },
        })
      ).data
    } catch (error) {
      throw new Error("Failed to upload images")
    }
  }
}

