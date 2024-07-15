export interface IUploadImages {
  images: IImage[]
}

export interface IImage {
  base64String: string
  filename: string
  colorCode: string
  pixelId: number
}
