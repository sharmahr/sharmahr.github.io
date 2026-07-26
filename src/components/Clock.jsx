import { useEffect, useState } from "react";

const FMT_OPTS = {
  timeZone: "Asia/Kolkata",
  hour: "2-digit",
  minute: "2-digit",
  hour12: false
};

/** Local time in Hyderabad. A small human detail, not a feature. */
export default function Clock() {
  const [time, setTime] = useState("—");

  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-GB", FMT_OPTS);
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const id = setInterval(tick, 15000);
    return () => clearInterval(id);
  }, []);

  return <span suppressHydrationWarning>{time}</span>;
}
