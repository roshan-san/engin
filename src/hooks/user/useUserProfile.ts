import { useState, useCallback } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

interface UserProfile {
    id: string;
    username: string;
    email: string;
    name: string;
    bio: string;
    avatar: string;
    connections: {
        id: string;
        username: string;
        name: string;
        avatar: string;
    }[];
    skills?: string[];
    areasofinterest?: string[];
    startups?: any[];
    experiences?: any[];
    receivedConnections?: any[];
    peru?: string;
    type?: string;
    location?: string;
    linkedin?: string;
    github?: string;
}

// API service functions
const userApi = {
    fetchUser: async (username: string) => {
        const response = await fetch(`/api/user?username=${username}`);
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error || 'Failed to fetch user');
        }
        return response.json();
    },

    updateUser: async ({ id, ...data }: Partial<UserProfile> & { id: string }) => {
        const response = await fetch('/api/user', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id, ...data }),
        });
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error || 'Failed to update profile');
        }
        return response.json();
    },

    updateSkills: async ({ id, skills }: { id: string; skills: string[] }) => {
        const response = await fetch('/api/user', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id, skills }),
        });
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error || 'Failed to update skills');
        }
        return response.json();
    },

    updateInterests: async ({ id, areasofinterest }: { id: string; areasofinterest: string[] }) => {
        const response = await fetch('/api/user', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id, areasofinterest }),
        });
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error || 'Failed to update interests');
        }
        return response.json();
    },
};

export const useUserProfile = (username: string) => {
    const queryClient = useQueryClient();
    const [isEditing, setIsEditing] = useState(false);
    const [isEditingSkills, setIsEditingSkills] = useState(false);
    const [isEditingInterests, setIsEditingInterests] = useState(false);
    const [newSkill, setNewSkill] = useState('');
    const [newInterest, setNewInterest] = useState('');
    const [showConnections, setShowConnections] = useState(false);

    // Fetch user data
    const { data: user, isLoading, error } = useQuery({
        queryKey: ['user', username],
        queryFn: () => userApi.fetchUser(username),
        enabled: !!username,
    });

    // Update profile mutation
    const updateProfileMutation = useMutation({
        mutationFn: userApi.updateUser,
        onSuccess: (updatedUser) => {
            queryClient.setQueryData(['user', username], updatedUser);
            setIsEditing(false);
        },
    });

    // Update skills mutation
    const updateSkillsMutation = useMutation({
        mutationFn: userApi.updateSkills,
        onSuccess: (updatedUser) => {
            queryClient.setQueryData(['user', username], updatedUser);
            setIsEditingSkills(false);
            setNewSkill('');
        },
    });

    // Update interests mutation
    const updateInterestsMutation = useMutation({
        mutationFn: userApi.updateInterests,
        onSuccess: (updatedUser) => {
            queryClient.setQueryData(['user', username], updatedUser);
            setIsEditingInterests(false);
            setNewInterest('');
        },
    });

    // Get accepted connections
    const acceptedConnections = user?.receivedConnections?.filter(
        (connection: any) => connection.status === "accepted"
    ) || [];

    // Handle profile update
    const handleSave = useCallback(async (editedProfile: Partial<UserProfile>) => {
        if (!user) return;
        
        const updatedFields: Record<string, any> = {};
        const fieldsToCheck = [
            'bio', 'peru', 'type', 'location', 'linkedin', 'github', 
            'skills', 'areasofinterest', 'availableFor'
        ];
        
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

    // Handle skills update
    const handleUpdateSkills = useCallback(async (skills: string[]) => {
        if (!user) return;
        
        // Validate skills
        if (skills.some(skill => skill.length < 2)) {
            throw new Error('Skills must be at least 2 characters long');
        }

        if (skills.some(skill => skill.length > 50)) {
            throw new Error('Skills must be less than 50 characters long');
        }

        // Remove duplicates
        const uniqueSkills = [...new Set(skills)];
        await updateSkillsMutation.mutateAsync({
            id: user.id,
            skills: uniqueSkills
        });
    }, [user, updateSkillsMutation]);

    // Handle interests update
    const handleUpdateInterests = useCallback(async (interests: string[]) => {
        if (!user) return;
        
        // Validate interests
        if (interests.some(interest => interest.length < 2)) {
            throw new Error('Interests must be at least 2 characters long');
        }

        if (interests.some(interest => interest.length > 50)) {
            throw new Error('Interests must be less than 50 characters long');
        }

        // Remove duplicates
        const uniqueInterests = [...new Set(interests)];
        await updateInterestsMutation.mutateAsync({
            id: user.id,
            areasofinterest: uniqueInterests
        });
    }, [user, updateInterestsMutation]);

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
        acceptedConnections,
        isUpdating: updateProfileMutation.isPending || updateSkillsMutation.isPending || updateInterestsMutation.isPending,
        updateError: updateProfileMutation.error || updateSkillsMutation.error || updateInterestsMutation.error
    };
}; 