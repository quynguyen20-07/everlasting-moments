import { Heart } from "lucide-react";

type WeddingCalendarProps = {
  date: Date;
};

const DAYS = ["M", "W", "T", "T", "F", "S", "S"];

const WeddingCalendar = ({ date }: WeddingCalendarProps) => {
  const year = date.getFullYear();
  const month = date.getMonth();
  const activeDay = date.getDate();

  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);

  // Monday start
  const startOffset = (firstDay.getDay() + 6) % 7;
  const daysInMonth = lastDay.getDate();

  return (
    <div
      className="
        w-full
        max-w-[420px]
        mx-auto
        bg-white
        px-6
        py-8
        text-center
        font-['Playfair_Display']
      "
    >
      {/* Month */}
      <h2 className="text-3xl font-semibold mb-6">
        {date.toLocaleString("en-US", { month: "long" })}
      </h2>

      {/* Week days */}
      <div className="grid grid-cols-7 text-sm mb-3">
        {DAYS.map((d, i) => (
          <div
            key={i}
            className={`font-medium ${
              i === 6 ? "text-red-400" : "text-gray-700"
            }`}
          >
            {d}
          </div>
        ))}
      </div>

      {/* Divider */}
      <div className="border-b mb-4" />

      {/* Days */}
      <div className="grid grid-cols-7 gap-y-4 text-base">
        {/* Empty */}
        {Array.from({ length: startOffset }).map((_, i) => (
          <div key={`empty-${i}`} />
        ))}

        {Array.from({ length: daysInMonth }).map((_, i) => {
          const day = i + 1;
          const isActive = day === activeDay;

          return (
            <div key={day} className="flex justify-center items-center">
              {isActive ? (
                <div className="relative">
                  <Heart className="w-7 h-7 text-red-500 fill-red-500" />
                  <span className="absolute inset-0 flex items-center justify-center text-white text-xs font-semibold">
                    {day}
                  </span>
                </div>
              ) : (
                <span className="text-gray-800">{day}</span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default WeddingCalendar;
