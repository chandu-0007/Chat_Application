type GroupCardType = {
  id: string;
  name: string;
  description: string;
  noOfMembers: number;
};

type GroupType = {
  group: GroupCardType;
};

function GroupCard({ group }: GroupType) {
  return (
    <div className="w-80 rounded-xl bg-black ml-2 h-40  p-4 shadow-xl border border-white flex flex-col items-center">

      {/* Top Icon */}
      <div className="mb-3 w-20 h-20 rounded-full bg-violet-900/40 flex items-center justify-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-10 h-10 text-violet-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M17 20h5v-2a4 4 0 00-4-4h-1M9 20H4v-2a4 4 0 014-4h1M16 11a4 4 0 10-8 0 4 4 0 008 0z"
          />
        </svg>
      </div>

      {/* Group Name */}
      <h3 className="text-base font-semibold text-white text-center mb-3">
        {group.name}
      </h3>

      {/* Footer */}
      <div className="w-full flex items-center justify-between">

        {/* Members */}
        <div className="flex items-center">
          <div className="w-5 h-5 rounded-full bg-violet-500 border border-black"></div>
          <div className="w-5 h-5 rounded-full bg-violet-400 border border-black -ml-2"></div>
          <div className="w-5 h-5 rounded-full bg-violet-300 border border-black -ml-2"></div>

          <span className="ml-2 text-xs font-medium text-violet-300">
            +{group.noOfMembers}
          </span>
        </div>

        {/* Join Button */}
        <button className="px-3 py-1 rounded-full bg-violet-600 text-white text-xs font-medium hover:bg-violet-700 transition">
          Join
        </button>
      </div>
    </div>
  );
}

export default GroupCard;
