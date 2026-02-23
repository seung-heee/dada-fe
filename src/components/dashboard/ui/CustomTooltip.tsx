const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;

    return (
      <div className="bg-white p-3 rounded-xl border border-zinc-100 shadow-lg text-[11px] flex flex-col gap-1 min-w-[140px]">
        <p className="font-bold text-zinc-800 border-b border-zinc-50 pb-1">{data.date}</p>

        <div className="flex flex-col gap-[0.5]">
          <p className=" font-bold">
            참여 ({data.참여}명): <span className="font-medium text-zinc-500">{data.availableList || '없음'}</span>
          </p>
          <p className=" font-bold">
            불참 ({data.불참}명): <span className="font-medium text-zinc-500">{data.absentList || '없음'}</span>
          </p>
          <p className=" font-bold">
            미투표 ({data.미투표}명): <span className="font-medium text-zinc-500">{data.pendingList || '없음'}</span>
          </p>
        </div>
      </div>
    );
  }
  return null;
};

export default CustomTooltip;
