import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { FaLongArrowAltRight } from "react-icons/fa"

export default function ContractDetails({
  blockchainData,
  handleChange,
  chain,
  setBlockchainData,
  setStep,
  step1Error,
}: any) {
  return (
    <div className="flex flex-col gap-6">
      <div className="text-lg font-bold">Contract Details</div>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <div>Contract Address</div>
          <Input
            onChange={handleChange}
            value={blockchainData.contractAddress}
            name="contractAddress"
            type="text"
            placeholder="Enter your contract address"
            className="w-full rounded-lg border border-th-accent-2 px-4 py-6"
          />
        </div>
        <div className="flex flex-col gap-2">
          <div>Contract Abi</div>
          <Textarea
            onChange={handleChange}
            name="abi"
            value={blockchainData.abi}
            placeholder="Enter token Abi"
            className="w-full rounded-lg border border-th-accent-2 p-4"
          />
        </div>
        <div className="flex w-full gap-4">
          {/* <div className="flex w-1/2 flex-col gap-2">
                <div>Chain</div>
                <Input
                  onChange={handleChange}
                  name="chainDeployed"
                  value={blockchainData.chainDeployed}
                  type="text"
                  placeholder="Enter chain"
                  className="w-full rounded-lg border border-th-accent-2 px-4 py-6"
                />
              </div> */}
          <div className="flex w-1/2 flex-col gap-2">
            <div>Chain</div>
            <Select
              onValueChange={(value) =>
                setBlockchainData({
                  ...blockchainData,
                  chainDeployed: value,
                })
              }
            >
              <SelectTrigger
                className={`flex h-full w-full items-center gap-2 rounded-lg border border-th-accent-2 bg-th-black-2 p-4 hover:bg-opacity-50`}
              >
                <SelectValue placeholder="Select a chain" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {chain &&
                    chain.map((item: any, index: any) => {
                      return (
                        <SelectItem value={item.id} className="text-white">
                          {item.name}
                        </SelectItem>
                      )
                    })}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="flex w-1/2 flex-col gap-2">
            <div>Event Name</div>
            <Input
              onChange={handleChange}
              name="eventName"
              value={blockchainData.eventName}
              type="text"
              placeholder="Enter event type"
              className="w-full rounded-lg border border-th-accent-2 px-4 py-6"
            />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <div>Interaction URL</div>
          <Input
            onChange={handleChange}
            value={blockchainData.url}
            name="url"
            type="text"
            placeholder="Enter url"
            className="w-full rounded-lg border border-th-accent-2 px-4 py-6"
          />
        </div>
        <div className="flex flex-col gap-2">
          <div>Description/Steps to participate</div>
          <Textarea
            onChange={handleChange}
            value={blockchainData.description}
            name="description"
            placeholder="Enter description"
            className="w-full rounded-lg border border-th-accent-2 p-4"
          />
        </div>
        <Button
          onClick={() => setStep(2)}
          className="flex w-fit items-center gap-2"
        >
          <div>Next</div> <FaLongArrowAltRight />
        </Button>
        {step1Error && <div className="text-sm text-red-500">{step1Error}</div>}
      </div>
    </div>
  )
}
