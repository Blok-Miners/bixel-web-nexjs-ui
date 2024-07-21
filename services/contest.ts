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

  public async getContestDetails(id: string) {
    try {
      return (await this.http.get(`/get-contest-details/${id}`)).data
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

  public async createRegistrationVerificationContest(contestData: ICreateContest) {
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
}
