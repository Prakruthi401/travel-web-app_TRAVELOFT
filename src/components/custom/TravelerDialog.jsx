import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { setTraveler } from "@/service/tripStore";

// Lightweight stand-in for accounts: trips are kept per traveler name in
// this browser, so nobody needs to sign up for anything.
const TravelerDialog = ({ open, onDone }) => {
  const [name, setName] = useState("");

  const save = () => {
    const trimmed = name.trim();
    if (!trimmed) return;
    setTraveler({ name: trimmed });
    onDone?.({ name: trimmed });
  };

  return (
    <Dialog open={open}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Who's travelling?</DialogTitle>
          <DialogDescription>
            <div className="flex flex-col items-center gap-3 pt-2">
              <span className="text-center text-sm text-gray-600">
                Your trips are saved in this browser under your name. No
                account, no password.
              </span>
              <Input
                autoFocus
                value={name}
                onChange={(e) => setName(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && save()}
                placeholder="Your first name"
                className="w-full"
              />
              <Button onClick={save} className="w-full">
                That's me
              </Button>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default TravelerDialog;
