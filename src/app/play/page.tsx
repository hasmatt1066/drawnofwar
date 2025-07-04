import { MainLayout } from '@/components/layout';
import { Button, Card, CardHeader, CardTitle, CardDescription } from '@/components/ui';

export default function PlayPage() {
  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-8">Choose Your Battle Mode</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card variant="bordered" className="hover:border-blue-500 transition-colors cursor-pointer">
            <CardHeader>
              <CardTitle>Quick Battle</CardTitle>
              <CardDescription>Jump into a battle with a random opponent</CardDescription>
            </CardHeader>
            <div className="p-6 pt-0">
              <div className="text-3xl mb-4">⚡</div>
              <p className="text-gray-400 mb-4">
                • 5 waves of combat<br/>
                • 3 minute drawing phases<br/>
                • Winner takes all
              </p>
              <Button fullWidth variant="primary">
                Find Match
              </Button>
            </div>
          </Card>

          <Card variant="bordered" className="hover:border-purple-500 transition-colors cursor-pointer">
            <CardHeader>
              <CardTitle>Tournament</CardTitle>
              <CardDescription>Compete in bracketed tournaments</CardDescription>
            </CardHeader>
            <div className="p-6 pt-0">
              <div className="text-3xl mb-4">🏆</div>
              <p className="text-gray-400 mb-4">
                • Multiple rounds<br/>
                • Bigger rewards<br/>
                • Leaderboard points
              </p>
              <Button fullWidth variant="secondary">
                View Tournaments
              </Button>
            </div>
          </Card>
        </div>

        <div className="mt-12 bg-gray-800 rounded-lg p-6 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">New to Drawn of War?</h2>
          <p className="text-gray-400 mb-4">
            Learn the basics in our interactive tutorial
          </p>
          <Button variant="ghost">
            Start Tutorial
          </Button>
        </div>
      </div>
    </MainLayout>
  );
}