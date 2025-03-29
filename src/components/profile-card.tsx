import React from 'react';
import { User } from "@/types/types"; // Assuming your User type is defined here
import { UserPlus, MessageSquare } from "lucide-react";
import { toast } from "sonner";

interface ProfileCardProps {
    user: User;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ user }) => {
    function onProfileClick(username: number) {
        toast(`Navigating to ${username}'s profile...`);
    }

    function connectionHandler(username: number) {
        toast(`Connection will be sent to ${username}'s profile...`);
    }

    function messageHandler(username: number) {
        toast(`this click will navigate to message /${username}'s profile...`);
    }

    return (
        <div className="border rounded-lg p-4 
            transition-all duration-300 ease-in-out 
            hover:shadow-lg 
            transform hover:-translate-y-1 
            hover:scale-[1.02]"
        >
            <div onClick={() => onProfileClick(user.id)}>
                <div
                    className="flex items-center gap-3 mb-4 cursor-pointer group"
                >
                    <div className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden 
                        transition-transform duration-300 
                        group-hover:scale-110"
                    >
                        {user.avatar && (
                            <img
                                src={user.avatar}
                                alt={user.name}
                                className="w-full h-full object-cover 
                                    transition-transform duration-300 
                                    group-hover:scale-110"
                            />
                        )}
                    </div>
                    <div>
                        <h3 className="font-semibold 
                            transition-colors duration-300 
                            group-hover:text-blue-600"
                        >
                            {user.peru}
                        </h3>
                        <p className="text-sm text-gray-500">{user.type}</p>
                    </div>
                </div>

                <div className="mb-3">
                    <p className="text-sm line-clamp-2 
                        transition-opacity duration-300 
                        hover:opacity-100"
                    >
                        {user.bio}
                    </p>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                    {user.interests && Array.isArray(user.interests) ? (
                        user.interests.map((interest, idx) => (
                            <span
                                key={idx}
                                className="text-xs bg-gray-100 dark:bg-gray-800 rounded-full px-2 py-1 
                                    transition-all duration-300 
                                    hover:bg-blue-100 dark:hover:bg-blue-900 
                                    "
                            >
                                {interest}
                            </span>
                        ))
                    ) : (
                        <span>No interests listed.</span>
                    )}
                </div>
            </div>

            <div className="flex justify-between space-x-2">
                <button
                    onClick={() => connectionHandler(user.id)}
                    className="flex items-center gap-1 text-sm px-3 py-1 rounded-md border 
                        transition-all duration-300 
                        hover:bg-blue-50 dark:hover:bg-blue-900 
                        active:scale-95"
                >
                    <UserPlus className="h-4 w-4 transition-transform duration-300" />
                    Connect
                </button>
                <button
                    onClick={() => messageHandler(user.id)}
                    className="flex items-center gap-1 text-sm px-3 py-1 rounded-md border 
                        transition-all duration-300 
                        hover:bg-green-50 dark:hover:bg-green-900 
                        active:scale-95"
                >
                    <MessageSquare className="h-4 w-4 transition-transform duration-300" />
                    Message
                </button>
            </div>
        </div>
    );
};

export default ProfileCard;