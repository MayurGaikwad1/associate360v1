import { Construction } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface PlaceholderProps {
  title: string;
  description: string;
  features?: string[];
}

export default function Placeholder({ title, description, features = [] }: PlaceholderProps) {
  return (
    <div className="px-6 py-8">
      <div className="max-w-4xl mx-auto text-center">
        <Card>
          <CardHeader className="pb-6">
            <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <Construction className="w-8 h-8 text-gray-400" />
            </div>
            <CardTitle className="text-2xl">{title}</CardTitle>
            <CardDescription className="text-lg">
              {description}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {features.length > 0 && (
              <div className="text-left">
                <h3 className="font-semibold mb-3">Planned Features:</h3>
                <ul className="space-y-2">
                  {features.map((feature, index) => (
                    <li key={index} className="flex items-center text-sm text-gray-600">
                      <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            <div className="border-t pt-6">
              <p className="text-sm text-gray-500 mb-4">
                This page is under development. Continue prompting to add functionality to this module.
              </p>
              <Button variant="outline">
                Request Feature Implementation
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
