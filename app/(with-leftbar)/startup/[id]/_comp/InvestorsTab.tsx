import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { DollarSign } from "lucide-react";
import { Startup } from "../types";

interface InvestorsTabProps {
  startup: Startup;
  isOwner: boolean;
}

export function InvestorsTab({ startup, isOwner }: InvestorsTabProps) {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Investors</CardTitle>
          <CardDescription>People and organizations backing {startup.name}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center p-6">
            <DollarSign className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium">No investors yet</h3>
            <p className="text-muted-foreground mt-2">
              {isOwner 
                ? "Connect with investors to fund your startup" 
                : "This startup is looking for investors"}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 