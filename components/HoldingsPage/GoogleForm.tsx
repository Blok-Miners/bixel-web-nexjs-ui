import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Label } from "../ui/label"

export default function GoogleForm() {
  return (
    <div className="flex h-[20rem] w-full max-w-xl flex-col gap-6 rounded-2xl bg-th-accent-2/10 p-4 px-10 ite">
      <div className="flex flex-col gap-2">
        <Label>Google Form Link</Label>
        <Input type="text" placeholder="Google Form Link" />
      </div>
      <Button>Verify</Button>
    </div>
  )
}
