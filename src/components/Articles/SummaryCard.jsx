import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const SummaryCard = ({ title, value, additionalInfo, valueColor = "text-gray-800" }) => (
  <Card className="shadow-lg p-4 hover:shadow-xl transition">
    <CardHeader>
      <CardTitle>{title}</CardTitle>
    </CardHeader>
    <CardContent>
      <p className={`text-2xl font-semibold ${valueColor}`}>{value}</p>
      {additionalInfo && <p className="text-sm text-gray-500">{additionalInfo}</p>}
    </CardContent>
  </Card>
);

export default SummaryCard;
