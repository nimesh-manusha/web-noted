
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";

const CalendarView = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());

  return (
    <Card className="w-full max-w-sm bg-white/50 backdrop-blur-sm shadow-lg">
      <CardHeader>
        <CardTitle className="text-purple-800 dark:text-purple-300">Calendar</CardTitle>
      </CardHeader>
      <CardContent>
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          className="rounded-md border shadow p-3 bg-white dark:bg-slate-800 pointer-events-auto"
        />
      </CardContent>
    </Card>
  );
};

export default CalendarView;