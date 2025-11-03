import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileText, Download, Calendar, TrendingUp } from "lucide-react";

export default function ReportsPage() {
  const reports = [
    { id: 1, name: "Monthly Sales Report", period: "January 2024", type: "Sales" },
    { id: 2, name: "User Activity Report", period: "Last 30 days", type: "Users" },
    { id: 3, name: "Revenue Analysis", period: "Q4 2023", type: "Financial" },
    { id: 4, name: "Product Performance", period: "December 2023", type: "Products" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Reports</h2>
          <p className="text-muted-foreground">
            Generate and view detailed reports and analytics.
          </p>
        </div>
        <Button>
          <FileText className="mr-2 h-4 w-4" />
          Generate Report
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {reports.map((report) => (
          <Card key={report.id}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                {report.name}
              </CardTitle>
              <CardDescription className="flex items-center gap-2">
                <Calendar className="h-3 w-3" />
                {report.period}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <Badge variant="secondary">{report.type}</Badge>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Report Analytics
          </CardTitle>
          <CardDescription>
            Visual insights from your reports
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Add charts and visualizations here to display report data. You can integrate with libraries like Recharts or Chart.js for dynamic data visualization.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

