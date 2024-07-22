import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"

export default function RegistrationVerification({ id }: { id: string }) {
  return (
    <Card className="row-span-2 flex h-full flex-col">
      <CardHeader className="text-center font-bold">
        Registration Verification
        <div className="font-light text-th-accent-2">
          {/* ! Description Here from api */}
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Illum optio
          asperiores accusantium consectetur nostrum quasi perferendis
          laudantium quam quos eos!
        </div>
      </CardHeader>
      <CardContent className="flex h-full flex-col gap-2">
        <a
          href={
            "https://bixel.blokminers.io/product/50887ba6-e2a4-4ecc-a2fb-393117fbc603"
          }
          target="_blank"
          rel="noreferrer noopener"
          className="col-span-2 w-full rounded-lg bg-th-black/60 p-4 text-center font-medium"
        >
          {
            "https://bixel.blokminers.io/product/50887ba6-e2a4-4ecc-a2fb-393117fbc603"
          }
        </a>
        <span className="text-center text-sm font-light">
          Follow the link and register on to the platform
        </span>
      </CardContent>
      <CardFooter>
        <Button className="w-full">Verify</Button>
      </CardFooter>
    </Card>
  )
}
