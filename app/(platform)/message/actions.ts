'use server'

// Mock user data
const mockUsers = [
  {
    id: '1',
    email: 'john.doe@example.com',
    name: 'John Doe',
    avatar: null,
  },
  {
    id: '2',
    email: 'jane.smith@example.com',
    name: 'Jane Smith',
    avatar: null,
  },
  {
    id: '3',
    email: 'alex.wilson@example.com',
    name: 'Alex Wilson',
    avatar: null,
  },
]

export async function getMyChats() {
  // Simulate a 3-second delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // Transform the mock users into chat format
  const chats = mockUsers.map((user) => ({
    id: user.id,
    users: [
      {
        user: {
          email: user.email,
          name: user.name,
          avatar: user.avatar,
        },
      },
    ],
  }))

  return {
    data: chats,
    error: null,
  }
}
