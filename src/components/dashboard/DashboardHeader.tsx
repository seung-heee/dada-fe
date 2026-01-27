import {cn} from "@/lib/utils.ts";
import {Users} from "lucide-react";

interface DashboardHeaderProps {
  meetingName: string;
  participants: string[];
}

const DashboardHeader = ({meetingName, participants}: DashboardHeaderProps) => {
  return (
      <header className="w-full pb-6 px-1">
        <h1 className="text-3xl font-black text-zinc-900 tracking-tight leading-tight mb-5">
          {meetingName}
        </h1>

        <div className="bg-white/40 backdrop-blur-sm border border-zinc-100/50 rounded-2xl p-3 shadow-sm">
          <div className="flex flex-wrap items-center gap-1.5">
            <div className="flex items-center gap-1 px-2 py-1 mr-1">
              <Users size={12} className="text-zinc-400"/>
              <span className="text-[10px] font-black text-zinc-400 uppercase tracking-tighter">With</span>
            </div>

            {participants.map((name, index) => (
                <div
                    key={name}
                    className={cn(
                        "flex items-center gap-1 px-2.5 py-1 rounded-full border text-[12px] font-bold transition-all",
                        index === 0
                            ? "bg-emerald-50 border-emerald-100 text-emerald-700 shadow-sm"
                            : "bg-white/80 border-zinc-100 text-zinc-500"
                    )}
                >
                  <div className={cn(
                      "w-1 h-1 rounded-full",
                      index === 0 ? "bg-emerald-500 animate-pulse" : "bg-zinc-300"
                  )}/>
                  {name}
                </div>
            ))}
          </div>
        </div>
      </header>
  );
};

export default DashboardHeader;