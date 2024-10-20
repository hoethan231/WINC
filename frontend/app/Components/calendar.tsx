'use client';
import React, { useEffect, useState } from "react";
import { DayPilot, DayPilotCalendar } from "@daypilot/daypilot-lite-react";
import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react"

export default function Calendar() {
    const [calendar, setCalendar] = useState<DayPilot.Calendar>();

    const initialConfig: DayPilot.CalendarConfig = {
        viewType: "Week",
        durationBarVisible: false,
    };

    const [config, setConfig] = useState(initialConfig);

    const goToNextWeek = () => {
        if (calendar) {
            const nextWeekStartDate = new DayPilot.Date(calendar.startDate).addDays(7);
            calendar.update({ startDate: nextWeekStartDate });
        }
    };

    const goToPreviousWeek = () => {
        if (calendar) {
            const previousWeekStartDate = new DayPilot.Date(calendar.startDate).addDays(-7);
            calendar.update({ startDate: previousWeekStartDate });
        }
    };

    useEffect(() => {
        if (!calendar || calendar?.disposed()) {
            return;
        }
        const startDate = new Date();
    }, [calendar]);

    return (
        <div>
            <div className="flex justify-between">
                <button onClick={goToPreviousWeek} className="mr-2 p-2 bg-transparent text-[#39516E] rounded flex hover:-translate-y-1">
                    <IconArrowLeft /> Previous Week
                </button>
                <button onClick={goToNextWeek} className="p-2 bg-transparent text-[#39516E] rounde flex hover:-translate-y-1">
                Next Week <IconArrowRight />
                </button>
            </div>
            <div className="flex-grow">
                <DayPilotCalendar
                    {...config}
                    controlRef={setCalendar}
                />
            </div>
        </div>
    );
}
