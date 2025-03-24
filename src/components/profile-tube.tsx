'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent } from "@/components/ui/card";

const dummyUser = {
  id: "456",
  name: "Dr. James Wilson",
  role: "Healthcare Technology Specialist",
  lastSeen: "5 minutes ago",
  avatar: "/images/avatar.png"
};

export default function ProfileTube() {
  return (
    <Card className="p-4 flex items-center gap-4 max-w-xl mx-auto">
      <Image
        src={dummyUser.avatar}
        alt={dummyUser.name}
        width={40}
        height={40}
        className="rounded-full"
      />
      <div className="flex-1">
        <Link href={`/profile/${dummyUser.id}`} className="text-lg font-semibold hover:underline">
          {dummyUser.name}
        </Link>
        <p className="text-sm text-gray-500">{dummyUser.role}</p>
      </div>
      <p className="text-sm text-gray-400">Last seen {dummyUser.lastSeen}</p>
    </Card>
  );
}
