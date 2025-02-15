
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

interface Surgery {
  id: string;
  title: string;
  startTime: string;
  endTime: string;
  status: "scheduled" | "in-progress" | "completed";
}

const mockSurgeries: Surgery[] = [
  {
    id: "1",
    title: "Appendectomy",
    startTime: "09:00",
    endTime: "10:30",
    status: "scheduled",
  },
  {
    id: "2",
    title: "Hip Replacement",
    startTime: "11:00",
    endTime: "13:00",
    status: "in-progress",
  },
  {
    id: "3",
    title: "Cataract Surgery",
    startTime: "14:00",
    endTime: "15:00",
    status: "completed",
  },
];

const TimeSlot = ({ time, surgeries }: { time: string; surgeries: Surgery[] }) => {
  const navigate = useNavigate();
  const surgery = surgeries.find(
    (s) => s.startTime === time || (s.startTime < time && s.endTime > time)
  );

  const statusColors = {
    scheduled: "bg-blue-100 text-blue-800 border-blue-200",
    "in-progress": "bg-yellow-100 text-yellow-800 border-yellow-200",
    completed: "bg-green-100 text-green-800 border-green-200",
  };

  return (
    <div className="relative grid grid-cols-[80px_1fr] gap-4 py-2 border-t">
      <div className="text-sm text-muted-foreground">{time}</div>
      {surgery && (
        <Button
          variant="ghost"
          className={cn(
            "h-auto text-left justify-start font-normal",
            statusColors[surgery.status]
          )}
          onClick={() => navigate(`/surgery/${surgery.id}`)}
        >
          {surgery.title}
        </Button>
      )}
    </div>
  );
};

const Timesheet = () => {
  const navigate = useNavigate();
  const hours = Array.from({ length: 13 }, (_, i) => i + 7);

  return (
    <div className="layout-container max-w-4xl mx-auto">
      <div className="flex items-center mb-8 space-x-4">
        <Button variant="ghost" onClick={() => navigate("/")}>
          <ChevronLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        <h1 className="text-2xl font-semibold">Surgery Schedule</h1>
      </div>

      <Card className="p-6 animate-fade-up">
        <div className="flex items-center mb-6">
          <Clock className="h-5 w-5 mr-2 text-muted-foreground" />
          <h2 className="text-lg font-medium">Today's Schedule</h2>
        </div>

        <div className="space-y-1">
          {hours.map((hour) =>
            ["00", "15", "30", "45"].map((minute) => (
              <TimeSlot
                key={`${hour}:${minute}`}
                time={`${hour.toString().padStart(2, "0")}:${minute}`}
                surgeries={mockSurgeries}
              />
            ))
          )}
        </div>
      </Card>
    </div>
  );
};

export default Timesheet;
