import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Mail, MapPin, Briefcase } from 'lucide-react';
import { FaLinkedin, FaGithub } from 'react-icons/fa';
import { User } from '@/types/types';

interface ProfileCardProps {
  user: User;
  index: number;
}

const ProfileCard = ({ user, index }: ProfileCardProps) => {
  return (
    <div className="animate-wiggle" style={{ animationDelay: `${(index % 3) * 100}ms` }}>
      <div className="bg-card p-6 rounded-lg shadow-sm">
        <div className="flex items-center gap-4 mb-4">
          <img 
            src={user.avatar} 
            alt={user.username} 
            className="w-12 h-12 rounded-full"
          />
          <div>
            <h3 className="font-semibold">{user.peru}</h3>
            <p className="text-sm text-muted-foreground">@{user.username}</p>
          </div>
        </div>
        <div className="space-y-2">
          <p className="text-sm">{user.bio}</p>
          <div className="flex flex-wrap gap-2">
            {user.skills.map((skill, i) => (
              <span key={i} className="text-xs bg-secondary px-2 py-1 rounded">
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard; 