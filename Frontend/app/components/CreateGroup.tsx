
import { useState } from "react";

type UsersType = {
  chatId: string ,
  UserName: string
};

type CreateGroupProps = {
  users: UsersType[] ;
  handleCreateGroup : (groupName : string , members  : UsersType[])=> void ;
};

const CreateGroup = ({ users , handleCreateGroup }: CreateGroupProps) => {
  const [groupName, setGroupName] = useState("");
  const [searchName, setSearchName] = useState("");
  const [members, setMembers] = useState<UsersType[]>([]);

  const isMember = (id: string) =>
    members.some((m) => m.chatId === id);

  const handleAdd = (user: UsersType) => {
    setMembers((prev) => [...prev, user]);
  };

  const handleRemove = (id: string) => {
    setMembers((prev) => prev.filter((m) => m.chatId !== id));
  };

  const filteredUsers = users.filter((user) =>
    user.UserName.toLowerCase().includes(searchName.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-3 p-4">
      {/* Group name */}
      <input
        type="text"
        value={groupName}
        onChange={(e) => setGroupName(e.target.value)}
        placeholder="Enter group name"
        className="border p-2 rounded-md"
      />

      {/* Search */}
      <input
        type="text"
        value={searchName}
        onChange={(e) => setSearchName(e.target.value)}
        placeholder="Search users"
        className="border p-2 rounded-md"
      />

      {/* Selected Members (Max 3 visible) */}
      {members.length > 0 && (
        <div>
          <div className="font-semibold mb-1">Selected Members</div>

          <div
            className="
              max-h-[110px] 
              overflow-y-auto 
              flex  gap-2 
              p-2 border rounded-md
              transition-all duration-300 ease-in-out
            "
          >
            {members.map((m) => (
              <span
                key={m.chatId}
                className="bg-purple-200 text-black p-2 w-max rounded-sm "
              >{m.UserName}</span>
            ))}
          </div>
        </div>
      )}

      {/* Users List */}
      <div className="font-semibold">Add members</div>
      <div className="max-h-60 overflow-y-auto border rounded-md p-2 flex flex-col gap-2">
        {filteredUsers.map((user) => {
          const added = isMember(user.chatId);

          return (
            <div
              key={user.chatId}
              className="flex justify-between items-center"
            >
              <span>{user.UserName}</span>

              {added ? (
                <button
                  onClick={() => handleRemove(user.chatId)}
                  className="bg-red-500 hover:bg-red-600 text-white text-sm px-3 py-1 rounded-md transition"
                >
                  Remove
                </button>
              ) : (
                <button
                  onClick={() => handleAdd(user)}
                  className="bg-purple-600 hover:bg-purple-700 text-white text-sm px-3 py-1 rounded-md transition"
                >
                  Add
                </button>
              )}
            </div>
          );
        })}
      </div>
      <div 
       className="flex justify-center ">
      <button
  disabled={!groupName || members.length < 2}
  onClick={() => handleCreateGroup(groupName,members)}
  className={`
    relative px-6 py-2 rounded-lg font-semibold text-white
    bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700
    shadow-lg shadow-purple-500/40
    hover:shadow-purple-500/70
    transition-all duration-300 ease-out
    hover:scale-105
    focus:outline-none
    disabled:opacity-50 disabled:cursor-not-allowed
    disabled:hover:scale-100 disabled:hover:shadow-purple-500/40
  `}
>
  Create Group
</button>


      </div>
    </div>
  );
};

export default CreateGroup;
