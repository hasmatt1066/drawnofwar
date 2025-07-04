import { Card } from '@/components/ui';

// Mock leaderboard data
const mockLeaderboard = [
  { rank: 1, username: 'DragonMaster', level: 45, wins: 342, winRate: 89, points: 4580 },
  { rank: 2, username: 'ShadowAssassin', level: 42, wins: 298, winRate: 85, points: 4230 },
  { rank: 3, username: 'ThunderGod', level: 41, wins: 276, winRate: 82, points: 4120 },
  { rank: 4, username: 'IceQueen', level: 39, wins: 254, winRate: 79, points: 3890 },
  { rank: 5, username: 'FirePhoenix', level: 38, wins: 232, winRate: 77, points: 3670 },
  { rank: 6, username: 'EarthShaker', level: 37, wins: 218, winRate: 75, points: 3450 },
  { rank: 7, username: 'WindWalker', level: 36, wins: 205, winRate: 73, points: 3280 },
  { rank: 8, username: 'LightBringer', level: 35, wins: 192, winRate: 71, points: 3120 },
];

const getRankColor = (rank: number) => {
  switch (rank) {
    case 1: return 'text-yellow-500';
    case 2: return 'text-gray-400';
    case 3: return 'text-orange-600';
    default: return 'text-white';
  }
};

const getRankIcon = (rank: number) => {
  switch (rank) {
    case 1: return '🥇';
    case 2: return '🥈';
    case 3: return '🥉';
    default: return rank.toString();
  }
};

export default function LeaderboardPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold text-white mb-8 text-center">Global Leaderboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Card className="text-center">
          <div className="p-4">
            <div className="text-sm text-gray-400 mb-1">Season Ends In</div>
            <div className="text-xl font-bold text-white">12 Days</div>
          </div>
        </Card>
        <Card className="text-center">
          <div className="p-4">
            <div className="text-sm text-gray-400 mb-1">Total Players</div>
            <div className="text-xl font-bold text-white">24,531</div>
          </div>
        </Card>
        <Card className="text-center">
          <div className="p-4">
            <div className="text-sm text-gray-400 mb-1">Your Rank</div>
            <div className="text-xl font-bold text-green-500">#156</div>
          </div>
        </Card>
      </div>

      <Card variant="bordered">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-left p-4 text-gray-400 font-medium">Rank</th>
                <th className="text-left p-4 text-gray-400 font-medium">Player</th>
                <th className="text-center p-4 text-gray-400 font-medium">Level</th>
                <th className="text-center p-4 text-gray-400 font-medium">Wins</th>
                <th className="text-center p-4 text-gray-400 font-medium">Win Rate</th>
                <th className="text-right p-4 text-gray-400 font-medium">Points</th>
              </tr>
            </thead>
            <tbody>
              {mockLeaderboard.map((player) => (
                <tr key={player.rank} className="border-b border-gray-800 hover:bg-gray-800 transition-colors">
                  <td className="p-4">
                    <span className={`text-2xl font-bold ${getRankColor(player.rank)}`}>
                      {getRankIcon(player.rank)}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="text-white font-medium">{player.username}</div>
                  </td>
                  <td className="p-4 text-center text-gray-400">
                    {player.level}
                  </td>
                  <td className="p-4 text-center text-gray-400">
                    {player.wins}
                  </td>
                  <td className="p-4 text-center">
                    <span className="text-green-500 font-medium">{player.winRate}%</span>
                  </td>
                  <td className="p-4 text-right text-white font-bold">
                    {player.points.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <div className="mt-8 bg-gray-800 rounded-lg p-6 text-center">
        <h3 className="text-xl font-bold text-white mb-2">Season Rewards</h3>
        <p className="text-gray-400 mb-4">
          Top 100 players receive exclusive rewards at the end of each season
        </p>
        <div className="grid grid-cols-3 gap-4 text-sm">
          <div>
            <div className="text-yellow-500 font-bold">Top 10</div>
            <div className="text-gray-400">Legendary Frame</div>
          </div>
          <div>
            <div className="text-gray-400 font-bold">Top 50</div>
            <div className="text-gray-400">Epic Frame</div>
          </div>
          <div>
            <div className="text-orange-600 font-bold">Top 100</div>
            <div className="text-gray-400">Rare Frame</div>
          </div>
        </div>
      </div>
    </div>
  );
}