import { useState } from "react";
import { Input } from "@/components/ui/input";
import {
  AI_PROMPT,
  SelectBudgetOptions,
  SelectTravelList,
} from "@/constants/options";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { hasGeminiKey, makeChatSession, setGeminiKey } from "@/service/AIModel";
import { getTraveler, saveTrip } from "@/service/tripStore";
import { useNavigate } from "react-router-dom";
import DestinationInput from "@/components/custom/DestinationInput";
import TravelerDialog from "@/components/custom/TravelerDialog";

const CreateTrip = () => {
  const [openNameDialog, setOpenNameDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({});
  const [keyDraft, setKeyDraft] = useState("");
  const [keyReady, setKeyReady] = useState(hasGeminiKey());
  const navigate = useNavigate();

  const handleInputChange = (name, value) =>
    setFormData((prev) => ({ ...prev, [name]: value }));

  const saveKey = () => {
    if (!keyDraft.trim()) return;
    setGeminiKey(keyDraft);
    setKeyReady(true);
    toast("Key saved in this browser only");
  };

  const onGenerateTrip = async () => {
    if (!getTraveler()) {
      setOpenNameDialog(true);
      return;
    }
    if (Number(formData?.noOfDays) > 7) {
      toast("Keep it to 7 days or fewer for now");
      return;
    }
    if (
      !formData?.noOfDays ||
      !formData?.location ||
      !formData?.budget ||
      !formData?.noOfPeople
    ) {
      toast("Fill in the destination, days, budget and group first");
      return;
    }
    if (!hasGeminiKey()) {
      toast("Add a Gemini API key below first");
      return;
    }

    setLoading(true);
    try {
      const prompt = AI_PROMPT.replace("{location}", formData.location.label)
        .replaceAll("{totalDays}", formData.noOfDays)
        .replace("{traveler}", formData.noOfPeople)
        .replace("{budget}", formData.budget);

      const result = await makeChatSession().sendMessage(prompt);
      const text = result?.response?.text();
      // newer models sometimes still wrap JSON in fences
      const tripData = JSON.parse(text.replace(/```json|```/g, "").trim());

      const id = Date.now().toString();
      saveTrip({
        id,
        traveler: getTraveler()?.name,
        userChoice: formData,
        tripData,
      });
      navigate("/view-trip/" + id);
    } catch (err) {
      console.error("generation failed:", err);
      toast(
        "Trip generation failed - the Gemini key may be invalid or out of quota"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center bg-gradient-to-b from-teal-50 to-stone-100 px-4 py-10">
      <div className="w-full max-w-2xl text-center">
        <h1 className="mb-3 text-4xl font-bold text-teal-900">
          Where to, {getTraveler()?.name || "traveller"}? ✈️
        </h1>
        <p className="mb-10 text-lg text-gray-600">
          Four quick questions and Gemini drafts the whole trip - stays, days,
          tickets and timings.
        </p>
      </div>

      <div className="mb-8 w-full max-w-2xl">
        <label className="mb-2 block text-xl font-semibold text-gray-900">
          Destination
        </label>
        <DestinationInput
          onSelect={(value) => handleInputChange("location", value)}
        />
      </div>

      <div className="mb-8 w-full max-w-2xl">
        <label className="mb-2 block text-xl font-semibold text-gray-900">
          How many days?
        </label>
        <Input
          placeholder="e.g., 3"
          type="number"
          min="1"
          max="7"
          onChange={(e) => handleInputChange("noOfDays", e.target.value)}
          className="w-full"
        />
      </div>

      <div className="mb-8 w-full max-w-2xl">
        <h2 className="mb-4 text-xl font-semibold text-gray-900">Budget</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {SelectBudgetOptions.map((item) => (
            <div
              key={item.id}
              className={`cursor-pointer rounded-xl border-2 border-transparent p-6 transition-all duration-300 hover:border-teal-500 hover:bg-white ${
                formData?.budget === item.title
                  ? "bg-teal-600 text-white shadow-lg"
                  : "bg-white"
              }`}
              onClick={() => handleInputChange("budget", item.title)}
            >
              <div className="flex flex-col items-center text-center">
                <div className="mb-2 text-4xl">{item.icon}</div>
                <h2 className="mb-1 text-lg font-bold">{item.title}</h2>
                <p className="text-sm">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-10 w-full max-w-2xl">
        <h2 className="mb-4 text-xl font-semibold text-gray-900">
          Who's coming?
        </h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {SelectTravelList.map((item) => (
            <div
              key={item.id}
              className={`cursor-pointer rounded-xl border-2 border-transparent p-6 transition-all duration-300 hover:border-teal-500 hover:bg-white ${
                formData?.noOfPeople === item.people
                  ? "bg-teal-600 text-white shadow-lg"
                  : "bg-white"
              }`}
              onClick={() => handleInputChange("noOfPeople", item.people)}
            >
              <div className="flex items-center justify-center">
                <div className="mr-2 text-4xl">{item.icon}</div>
                <h2 className="text-lg font-bold">{item.title}</h2>
              </div>
              <p className="mt-2 text-center">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {!keyReady && (
        <div className="mb-8 w-full max-w-2xl rounded-xl border border-amber-200 bg-amber-50 p-5">
          <h3 className="mb-1 font-semibold text-amber-900">
            One thing first: a Gemini API key
          </h3>
          <p className="mb-3 text-sm text-amber-800">
            Trip generation runs on Google's Gemini. Create a free key at{" "}
            <a
              className="font-medium underline"
              href="https://aistudio.google.com/app/apikey"
              target="_blank"
              rel="noreferrer"
            >
              aistudio.google.com
            </a>{" "}
            and paste it here - it is stored only in this browser.
          </p>
          <div className="flex gap-2">
            <Input
              type="password"
              value={keyDraft}
              onChange={(e) => setKeyDraft(e.target.value)}
              placeholder="Paste your Gemini API key"
              className="flex-1 bg-white"
            />
            <Button variant="outline" onClick={saveKey}>
              Save key
            </Button>
          </div>
        </div>
      )}

      <div className="flex w-full max-w-2xl justify-center">
        <Button
          onClick={onGenerateTrip}
          disabled={loading}
          className="w-full py-6 text-lg bg-teal-600 hover:bg-teal-700"
        >
          {loading ? "Planning your trip... (10-20s)" : "Generate my trip"}
        </Button>
      </div>

      <TravelerDialog
        open={openNameDialog}
        onDone={() => {
          setOpenNameDialog(false);
          window.dispatchEvent(new Event("traveloft-traveler"));
          setTimeout(onGenerateTrip, 0);
        }}
      />
    </div>
  );
};

export default CreateTrip;
