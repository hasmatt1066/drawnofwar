import { Button } from '@/components/ui';

export default function Home() {
  return (
    <>
      <div className="text-center py-20">
        <h1 className="text-5xl font-bold text-white mb-4">
          Welcome to Drawn of War 2
        </h1>
        <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
          Draw your creatures, bring them to life with AI, and battle for territorial supremacy!
        </p>
        <div className="flex gap-4 justify-center">
          <Button size="lg" variant="primary">
            Start Playing
          </Button>
          <Button size="lg" variant="ghost">
            Learn More
          </Button>
        </div>
      </div>
      
      {/* Feature Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20">
        <div className="bg-gray-800 p-6 rounded-lg text-center">
          <div className="text-4xl mb-4">🎨</div>
          <h3 className="text-xl font-bold text-white mb-2">Draw</h3>
          <p className="text-gray-400">Create unique creatures with our intuitive drawing canvas</p>
        </div>
        <div className="bg-gray-800 p-6 rounded-lg text-center">
          <div className="text-4xl mb-4">🤖</div>
          <h3 className="text-xl font-bold text-white mb-2">AI Analysis</h3>
          <p className="text-gray-400">Watch as AI transforms your drawings into powerful warriors</p>
        </div>
        <div className="bg-gray-800 p-6 rounded-lg text-center">
          <div className="text-4xl mb-4">⚔️</div>
          <h3 className="text-xl font-bold text-white mb-2">Battle</h3>
          <p className="text-gray-400">Engage in strategic territorial warfare across multiple lanes</p>
        </div>
      </div>
    </>
  );
}