import { Card, CardHeader, CardTitle, Button } from '@/components/ui';

export default function ProfilePage() {
  // Mock user data
  const user = {
    username: 'DragonMaster',
    email: 'player@example.com',
    level: 12,
    experience: 2450,
    nextLevelExp: 3000,
    battleTokens: 25,
    totalBattles: 48,
    wins: 32,
    losses: 16,
    winStreak: 5,
    bestWinStreak: 8,
    joinDate: 'January 2025',
  };

  const expProgress = (user.experience / user.nextLevelExp) * 100;

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold text-white mb-8">My Profile</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Profile Info */}
        <Card>
          <CardHeader>
            <CardTitle>Account Information</CardTitle>
          </CardHeader>
          <div className="p-6 pt-0 space-y-4">
            <div>
              <label className="text-sm text-gray-400">Username</label>
              <div className="text-white font-medium">{user.username}</div>
            </div>
            <div>
              <label className="text-sm text-gray-400">Email</label>
              <div className="text-white font-medium">{user.email}</div>
            </div>
            <div>
              <label className="text-sm text-gray-400">Member Since</label>
              <div className="text-white font-medium">{user.joinDate}</div>
            </div>
            <Button variant="secondary" size="sm">
              Edit Profile
            </Button>
          </div>
        </Card>

        {/* Level Progress */}
        <Card>
          <CardHeader>
            <CardTitle>Level Progress</CardTitle>
          </CardHeader>
          <div className="p-6 pt-0 space-y-4">
            <div className="text-center">
              <div className="text-5xl font-bold text-white mb-2">
                Level {user.level}
              </div>
              <div className="text-gray-400">
                {user.experience} / {user.nextLevelExp} XP
              </div>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-3">
              <div 
                className="bg-blue-500 h-3 rounded-full transition-all duration-500"
                style={{ width: `${expProgress}%` }}
              />
            </div>
            <div className="text-center text-sm text-gray-400">
              {user.nextLevelExp - user.experience} XP to next level
            </div>
          </div>
        </Card>

        {/* Battle Stats */}
        <Card>
          <CardHeader>
            <CardTitle>Battle Statistics</CardTitle>
          </CardHeader>
          <div className="p-6 pt-0 space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-400">Total Battles</span>
              <span className="text-white font-medium">{user.totalBattles}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Wins</span>
              <span className="text-green-500 font-medium">{user.wins}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Losses</span>
              <span className="text-red-500 font-medium">{user.losses}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Win Rate</span>
              <span className="text-white font-medium">
                {Math.round((user.wins / user.totalBattles) * 100)}%
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Current Streak</span>
              <span className="text-yellow-500 font-medium">{user.winStreak}</span>
            </div>
          </div>
        </Card>

        {/* Resources */}
        <Card>
          <CardHeader>
            <CardTitle>Resources</CardTitle>
          </CardHeader>
          <div className="p-6 pt-0 space-y-4">
            <div className="flex items-center justify-between bg-gray-800 p-4 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="text-2xl">🪙</div>
                <div>
                  <div className="text-white font-medium">Battle Tokens</div>
                  <div className="text-sm text-gray-400">Used to enter battles</div>
                </div>
              </div>
              <div className="text-2xl font-bold text-yellow-500">
                {user.battleTokens}
              </div>
            </div>
            <Button variant="primary" fullWidth>
              Get More Tokens
            </Button>
          </div>
        </Card>
      </div>

      <div className="mt-8 bg-red-900/20 border border-red-800 rounded-lg p-6">
        <h3 className="text-xl font-bold text-red-400 mb-2">Danger Zone</h3>
        <p className="text-gray-400 mb-4">
          Once you delete your account, there is no going back. Please be certain.
        </p>
        <Button variant="danger" size="sm">
          Delete Account
        </Button>
      </div>
    </div>
  );
}