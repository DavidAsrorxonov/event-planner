import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center">
      Home Page
      <Button variant={"secondary"}>Click Me</Button>
      <ModeToggle />
    </div>
  );
}
