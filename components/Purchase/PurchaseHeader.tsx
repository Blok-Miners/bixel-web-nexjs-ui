import { Card, CardContent, CardHeader } from "../ui/card"

export default function PurchaseHeader() {
  return (
    <Card className="flex flex-col rounded-xl md:col-span-2">
      <CardHeader className="text-2xl font-bold">
        Buy/Rent Pixels
      </CardHeader>
      <CardContent className="flex flex-col gap-2 text-lg">
        <div className="flex justify-between">
          <div className="">Pixels</div>
          <div className="font-medium">{(80).toLocaleString("en-US")}</div>
        </div>
        <div className="flex justify-between">
          <div className="">
            Price
            <span className="text-sm font-light">/pixel</span>
          </div>
          <div className="font-medium">$ {(80).toLocaleString("en-US")}</div>
        </div>
        <div className="flex justify-between">
          <div className="">Total</div>
          <div className="font-medium">
            $ {(80 * 80).toLocaleString("en-US")}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
