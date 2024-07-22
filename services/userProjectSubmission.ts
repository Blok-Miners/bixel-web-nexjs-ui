import axios, { AxiosResponse } from "axios"
import bind from "./bind"
import { getAccessToken } from "@/lib/utils"
import { IProjectData } from "@/components/Product/Contests/ProjectSubmission"

export class UserProjectSubmissionService extends bind {
  private http
  constructor() {
    super()
    this.http = axios.create({
      baseURL: `${process.env.NEXT_PUBLIC_API_URL}/contest`,
    })
  }


  public async submitUserProject(projectData: IProjectData, contestId: string) {
    try {
      return (
        await this.http.post("/submit-user-project", projectData, {
          params: { contestId: contestId },
          headers: {
            Authorization: getAccessToken(),
            'Content-Type': 'application/json',
          },
        })
      ).data
    } catch (error) {
      throw error
    }
  }

}
