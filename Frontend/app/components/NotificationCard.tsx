"use client";
import type { NotificationType } from "../components/DashboardClient";

export default function NotificationCard({
  data,
  onAccept,
  onCancel,
}: {
  data: NotificationType;
  onAccept: (groupId : string , memberId : string) => void;
  onCancel: (id: string) => void;
}) {

  const isRequest = data.type === "join-request";

  return (
    <div className="w-full bg-gray-900/80 backdrop-blur-md text-white p-4 rounded-xl border border-gray-800 hover:border-violet-500/40 transition-all duration-300 shadow-sm hover:shadow-lg flex items-center justify-between gap-4">

      {/* Left */}
      <div className="flex items-start gap-3 flex-1">

        {/* Avatar */}
        <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-sm font-semibold text-violet-400">
          {data.text?.charAt(0).toUpperCase()}
        </div>

        {/* Content */}
        <div className="flex flex-col">
          <p className="text-sm text-gray-200 leading-snug">
            {data.text}
          </p>
          {/* New badge */}
          {!data.view && (
            <span className="text-xs text-violet-400 mt-1">
              ● New
            </span>
          )}
        </div>
      </div>

      {/* Right (Actions) */}
      {isRequest && (
        <div className="flex items-center gap-2">
          <button
            onClick={() => onAccept(data.groupId ! , data.senderId)}
            className="px-4 py-1.5 text-sm rounded-lg bg-violet-600 hover:bg-violet-700 transition-all duration-200"
          >
            Accept
          </button>

          <button
            onClick={() => onCancel(data.id)}
            className="px-4 py-1.5 text-sm rounded-lg bg-gray-800 hover:bg-gray-700 border border-gray-700 transition-all duration-200"
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
}