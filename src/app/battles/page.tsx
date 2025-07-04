import { MainLayout } from '@/components/layout';
import { Card, Button } from '@/components/ui';

// Mock battle history
const mockBattles = [
  {
    id: 1,
    opponent: 'ShadowKnight',
    result: 'victory',
    territoryControl: 85,
    duration: '12:34',
    date: '2 hours ago',
    reward: '+15 XP, +2 Tokens',
  },
  {
    id: 2,
    opponent: 'DragonLord99',
    result: 'defeat',
    territoryControl: 42,
    duration: '14:22',
    date: '5 hours ago',
    reward: '+5 XP',
  },
  {
    id: 3,
    opponent: 'MysticWizard',
    result: 'victory',
    territoryControl: 78,
    duration: '11:45',
    date: '1 day ago',
    reward: '+15 XP, +2 Tokens',
  },
];

export default function BattlesPage() {
  return (
    <MainLayout>
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-white">Battle History</h1>
          <Button variant="primary">
            New Battle
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card className="text-center">
            <div className="p-6">
              <div className="text-3xl font-bold text-white mb-2">24</div>
              <div className="text-gray-400">Total Battles</div>
            </div>
          </Card>
          <Card className="text-center">
            <div className="p-6">
              <div className="text-3xl font-bold text-green-500 mb-2">67%</div>
              <div className="text-gray-400">Win Rate</div>
            </div>
          </Card>
          <Card className="text-center">
            <div className="p-6">
              <div className="text-3xl font-bold text-yellow-500 mb-2">5</div>
              <div className="text-gray-400">Win Streak</div>
            </div>
          </Card>
        </div>

        <div className="space-y-4">
          {mockBattles.map((battle) => (
            <Card key={battle.id} variant="bordered">
              <div className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className={`text-2xl font-bold ${
                      battle.result === 'victory' ? 'text-green-500' : 'text-red-500'
                    }`}>
                      {battle.result === 'victory' ? '✓' : '✗'}
                    </div>
                    <div>
                      <div className="text-white font-medium">
                        vs {battle.opponent}
                      </div>
                      <div className="text-sm text-gray-400">
                        {battle.date} • {battle.duration}
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="text-white font-medium">
                      {battle.territoryControl}% Territory
                    </div>
                    <div className="text-sm text-gray-400">
                      {battle.reward}
                    </div>
                  </div>
                  
                  <Button variant="ghost" size="sm">
                    View Replay
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Button variant="ghost">
            Load More Battles
          </Button>
        </div>
      </div>
    </MainLayout>
  );
}