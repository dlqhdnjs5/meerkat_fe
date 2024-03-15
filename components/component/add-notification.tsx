/**
 * This code was generated by v0 by Vercel.
 * @see https://v0.dev/t/jRMNRn5jpMD
 */
import { Button } from "@/components/ui/button"
import { DialogTrigger, DialogTitle, DialogDescription, DialogHeader, DialogContent, Dialog } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

export function AddNotification() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Open Modal</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Modal Title</DialogTitle>
          <DialogDescription>Enter your information in the modal.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="input1">Input 1</Label>
            <Input id="input1" placeholder="Enter input 1" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="input2">Input 2</Label>
            <Input id="input2" placeholder="Enter input 2" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="input3">Input 3</Label>
            <Input id="input3" placeholder="Enter input 3" />
          </div>
          <Button className="w-full" type="submit">
            Submit
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}