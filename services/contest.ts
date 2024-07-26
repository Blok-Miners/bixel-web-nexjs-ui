import axios from "axios"
import BindService from "./bind"
import {
  ICreateContest,
  ICreateSurveyContest,
  ISocialMedia,
  ISocialMediaInteraction,
} from "@/types/services/contest"
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

  public async getContests(productId: string) {
    try {
      return (await this.http.get(`/get-product-contests/${productId}`)).data
    } catch (error) {
      throw new Error("Failed to create contest")
    }
  }

  public async createBugBountyContest(contestData: ICreateContest) {
    try {
      return (
        await this.http.post("/create-bug-bounty-contest", contestData, {
          headers: { Authorization: getAccessToken() },
        })
      ).data
    } catch (error) {
      throw new Error("Failed to create contest")
    }
  }

  public async createSurveyContest(contestData: ICreateSurveyContest) {
    try {
      return (
        await this.http.post("/create-survey-contest", contestData, {
          headers: { Authorization: getAccessToken() },
        })
      ).data
    } catch (error) {
      throw new Error("Failed to create contest")
    }
  }

  public async getContestDetails(id: string) {
    try {
      return (
        await this.http.get(`/get-contest-details/${id}`, {
          headers: { Authorization: getAccessToken() },
        })
      ).data
    } catch (error) {
      throw error
    }
  }
  public async getTestContestDetails(id: string) {
    try {
      return (
        await this.http.get(`/get-secondary-contest-details/${id}`, {
          headers: { Authorization: getAccessToken() },
        })
      ).data
    } catch (error) {
      throw error
    }
  }

  public async createHoldingsVerificationContest(contestData: ICreateContest) {
    try {
      return (
        await this.http.post(
          "/create-holdings-verification-contest",
          contestData,
          {
            headers: { Authorization: getAccessToken() },
          },
        )
      ).data
    } catch (error) {
      throw new Error("Failed to create contest")
    }
  }

  public async createRegistrationVerificationContest(
    contestData: ICreateContest,
  ) {
    try {
      return (
        await this.http.post(
          "/create-registration-verification-contest",
          contestData,
          {
            headers: { Authorization: getAccessToken() },
          },
        )
      ).data
    } catch (error) {
      throw new Error("Failed to create contest")
    }
  }

  public async createProjectSubmissionContest(contestData: ICreateContest) {
    try {
      return (
        await this.http.post(
          "/create-project-submission-contest",
          contestData,
          {
            headers: { Authorization: getAccessToken() },
          },
        )
      ).data
    } catch (error) {
      throw new Error("Failed to create contest")
    }
  }

  public async createSocialMediaInteractionContest(
    socialMediaData: ISocialMediaInteraction,
  ) {
    try {
      console.log(socialMediaData)
      return (
        await this.http.post("/create-social-media-contest", socialMediaData, {
          headers: { Authorization: getAccessToken() },
        })
      ).data
    } catch (error) {
      throw new Error("Failed to create contest")
    }
  }

  public async getSocialMediaInteractionDetails(id:string){
    try {
      return (
        await this.http.get(
          `/get-contest-social-medias/${id}`,
          {
            headers: { Authorization: getAccessToken() },
          },
        )
      ).data
    } catch (error) {
      throw new Error("Failed to create contest")
    }
  }

  public async verifySocialMediaTask(id:string,username:string,contestId:string){
    try {
      return (
        await this.http.post(
          `/verify-social-media-task/${id}`,
          { url:username,
            contestId
           },
          {
            headers: { Authorization: getAccessToken() },
          },
        )
      ).data
    } catch (error) {
      throw new Error("Failed to create contest")
    }
  }

  public async isSocialMediaTaskVerified(contestId:string){
    try {
      return (
        await this.http.post(`is-social-media-task-verified`, 
          {
            contestId
          }
          ,{
          headers: { Authorization: getAccessToken() },
        })
      ).data
    } catch (error) {
      throw new Error("Failed to create contest")
    }
  }

  public async getInteractionDetails(id: string) {
    try {
      return (
        await this.http.get(`get-contest-details/${id}?interaction=true`, {
          headers: { Authorization: getAccessToken() },
        })
      ).data
    } catch (error) {
      throw new Error("Failed to create contest")
    }
  }

  public async verifySmartContractTask(id: string) {
    try {
      return (
        await this.http.get(`verify-smart-contract-task/${id}`, {
          headers: { Authorization: getAccessToken() },
        })
      ).data
    } catch (error) {
      throw new Error("Failed to create contest")
    }
  }

  public async isProductOwner(contestId: string) {
    try {
      return (
        await this.http.get(`is-product-owner/${contestId}`, {
          headers: { Authorization: getAccessToken() },
        })
      ).data
    } catch (error) {
      throw new Error("Failed to create contest")
    }
  }

  public async getProjectDetails(id: string) {
    try {
      return (
        await this.http.get(`project-submission/${id}`, {
          headers: { Authorization: getAccessToken() },
        })
      ).data
    } catch (error) {
      throw error
    }
  }

  public async getSocialMediaDetails(id: string) {
    try {
      return (await this.http.get(`product-social-media-submissions/${id}`))
        .data
    } catch (error) {
      throw error
    }
  }

  public async verifyProductsSocialMediaSubmission(id: string , userId: string) {
    try {
      const response = await this.http.post(
        `verify-social-media-submission/${id}`,
        {userId},
        {
          headers: { Authorization: getAccessToken() },
        },
      )
      return response.data
    } catch (error) {
      throw error
    }
  }

  public async verifyUserProjectSubmission(id: string , userId: string , approved: boolean) {
    try {
      const response = await this.http.post(
        `verify-user-project-submission/${id}`,
        {userId, approved},
        {
          headers: { Authorization: getAccessToken() },
        },
      )
      return response.data
    } catch (error) {
      throw error
    }
  }

  public async getMyVerifiedContractSubmission(id:string){
    try {
      const response = await this.http.get(
        `get-my-verified-contract-submission/${id}`,
        {
          headers: { Authorization: getAccessToken() },
        },
      )
      return response.data
    } catch (error) {
      throw error
    }
  }
  
}
