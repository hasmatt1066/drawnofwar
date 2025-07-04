import { Card } from '@/components/ui';

// Mock creature data
const mockCreatures = [
  { id: 1, name: 'Fire Drake', element: 'fire', power: 85, health: 120, wins: 12, losses: 3 },
  { id: 2, name: 'Aqua Serpent', element: 'water', power: 72, health: 150, wins: 8, losses: 5 },
  { id: 3, name: 'Earth Golem', element: 'earth', power: 95, health: 180, wins: 15, losses: 2 },
  { id: 4, name: 'Wind Dancer', element: 'air', power: 68, health: 90, wins: 6, losses: 7 },
];

const elementColors = {
  fire: 'text-red-500',
  water: 'text-blue-500',
  earth: 'text-green-500',
  air: 'text-cyan-500',
  light: 'text-yellow-500',
  dark: 'text-purple-500',
};

export default function CreaturesPage() {
  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-white">My Creatures</h1>
        <div className="text-gray-400">
          {mockCreatures.length} / 50 Creatures
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockCreatures.map((creature) => (
          <Card key={creature.id} variant="bordered" className="hover:border-blue-500 transition-colors cursor-pointer">
            <div className="p-6">
              {/* Placeholder for creature image */}
              <div className="bg-gray-700 rounded-lg h-48 mb-4 flex items-center justify-center">
                <span className="text-6xl">🐲</span>
              </div>
              
              <h3 className="text-xl font-bold text-white mb-2">{creature.name}</h3>
              
              <div className="flex items-center gap-2 mb-4">
                <span className={`text-sm font-medium ${elementColors[creature.element as keyof typeof elementColors]}`}>
                  {creature.element.toUpperCase()}
                </span>
                <span className="text-gray-500">•</span>
                <span className="text-sm text-gray-400">
                  W: {creature.wins} / L: {creature.losses}
                </span>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-400">Power</span>
                  <span className="text-white font-medium">{creature.power}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Health</span>
                  <span className="text-white font-medium">{creature.health}</span>
                </div>
              </div>
            </div>
          </Card>
        ))}
        
        {/* Add New Creature Card */}
        <Card variant="bordered" className="border-dashed hover:border-blue-500 transition-colors cursor-pointer">
          <div className="p-6 h-full flex flex-col items-center justify-center">
            <div className="text-6xl mb-4 text-gray-600">+</div>
            <p className="text-gray-400 text-center">Draw a new creature</p>
          </div>
        </Card>
      </div>
    </div>
  );
}