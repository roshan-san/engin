import { useState, useCallback } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

interface UserProfile {
    id: string;
    username: string;
    email: string;
    peru: string;
    bio: string;
    avatar: string;
    type?: string;
    location?: string;
    skills?: string[];
    areasofinterest?: string[];
    receivedConnections?: any[];
}

const userApi = {
    fetchUser: async (username: string) => {
        const { data } = await axios.get(`/api/user?username=${username}`);
        return data;
    },

    updateUser: async ({ id, ...data }: Partial<UserProfile> & { id: string }) => {
        const { data: response } = await axios.put('/api/user', { id, ...data });
        return response;
    }
};

// Validation functions
const validateList = (items: string[], type: 'skill' | 'interest') => {
    if (items.some(item => item.length < 2)) {
        throw new Error(`${type}s must be at least 2 characters long`);
    }
    if (items.some(item => item.length > 50)) {
        throw new Error(`${type}s must be less than 50 characters long`);
    }
    return [...new Set(items)];
};

export const useUserProfile = (username: string) => {
    const queryClient = useQueryClient();
    
    // State
    const [isEditing, setIsEditing] = useState(false);
    const [isEditingSkills, setIsEditingSkills] = useState(false);
    const [isEditingInterests, setIsEditingInterests] = useState(false);
    const [newSkill, setNewSkill] = useState('');
    const [newInterest, setNewInterest] = useState('');
    const [showConnections, setShowConnections] = useState(false);

    // Data fetching
    const { data: user, isLoading, error } = useQuery({
        queryKey: ['user', username],
        queryFn: () => userApi.fetchUser(username),
        enabled: !!username,
    });

    // Mutations
    const updateProfileMutation = useMutation({
        mutationFn: userApi.updateUser,
        onSuccess: (updatedUser) => {
            queryClient.setQueryData(['user', username], updatedUser);
            setIsEditing(false);
        },
    });

    // Handlers
    const handleSave = useCallback(async (editedProfile: Partial<UserProfile>) => {
        if (!user) return;
        
        const updatedFields: Record<string, any> = {};
        const fieldsToCheck = ['peru', 'bio', 'type', 'location'];
        
        for (const field of fieldsToCheck) {
            if (editedProfile[field as keyof UserProfile] !== user[field as keyof UserProfile]) {
                updatedFields[field] = editedProfile[field as keyof UserProfile];
            }
        }
        
        if (Object.keys(updatedFields).length > 0) {
            await updateProfileMutation.mutateAsync({
                id: user.id,
                ...updatedFields
            });
        } else {
            setIsEditing(false);
        }
    }, [user, updateProfileMutation]);

    const handleUpdateSkills = useCallback(async (skills: string[]) => {
        if (!user) return;
        const validatedSkills = validateList(skills, 'skill');
        await updateProfileMutation.mutateAsync({
            id: user.id,
            skills: validatedSkills
        });
        setIsEditingSkills(false);
        setNewSkill('');
    }, [user, updateProfileMutation]);

    const handleUpdateInterests = useCallback(async (interests: string[]) => {
        if (!user) return;
        const validatedInterests = validateList(interests, 'interest');
        await updateProfileMutation.mutateAsync({
            id: user.id,
            areasofinterest: validatedInterests
        });
        setIsEditingInterests(false);
        setNewInterest('');
    }, [user, updateProfileMutation]);

    return {
        user,
        isLoading,
        error,
        isEditing,
        setIsEditing,
        handleSave,
        isEditingSkills,
        setIsEditingSkills,
        newSkill,
        setNewSkill,
        handleUpdateSkills,
        isEditingInterests,
        setIsEditingInterests,
        newInterest,
        setNewInterest,
        handleUpdateInterests,
        showConnections,
        setShowConnections,
        acceptedConnections: user?.receivedConnections?.filter(
            (connection: any) => connection.status === "accepted"
        ) || [],
        isUpdating: updateProfileMutation.isPending,
        updateError: updateProfileMutation.error
    };
}; 