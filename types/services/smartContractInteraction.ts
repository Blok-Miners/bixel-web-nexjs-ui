import { Address } from "../web3";

export interface ISmartContractInteraction{
    id:string
    contractAddress:Address
    chain:string
    url:string
    description:string
}