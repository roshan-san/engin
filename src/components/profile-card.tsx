import { MessageSquare, UserPlus } from "lucide-react";

const UserProfileCard = ({ user, onConnect, onMessage, onProfileClick }:any) => {
    return (
        <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
            <div
                className="flex items-center gap-3 mb-4 cursor-pointer"
                onClick={() => onProfileClick(user.id)}
            >
                <div className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden">
                    {user.avatar && (
                        <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                    )}
                </div>
                <div>
                    <h3 className="font-semibold">{user.name}</h3>
                    <p className="text-sm text-gray-500">{user.role}</p>
                </div>
            </div>

            <div className="mb-3">
                <p className="text-sm line-clamp-2">{user.bio}</p>
            </div>

            <div className="flex flex-wrap gap-2 mb-4">
                {user.interests && user.interests.map(({interest, idx}:any) => (
                    <span key={idx} className="text-xs bg-gray-100 dark:bg-gray-800 rounded-full px-2 py-1">
                        {interest}
                    </span>
                ))}
            </div>

            <div className="flex justify-between">
                <button
                    onClick={() => onConnect(user.id)}
                    className="flex items-center gap-1 text-sm px-3 py-1 rounded-md border hover:bg-gray-50 dark:hover:bg-gray-800"
                >
                    <UserPlus className="h-4 w-4" />
                    Connect
                </button>
                <button
                    onClick={() => onMessage(user.id)}
                    className="flex items-center gap-1 text-sm px-3 py-1 rounded-md border hover:bg-gray-50 dark:hover:bg-gray-800"
                >
                    <MessageSquare className="h-4 w-4" />
                    Message
                </button>
            </div>
        </div>
    );
};
export default UserProfileCard;