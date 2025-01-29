import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

// Función para truncar texto si es muy largo
const truncateText = (text, maxLength = 50) => {
  if (!text) return "N/A";
  return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
};

const SummaryCard = ({ title, value, additionalInfo, valueColor = "text-gray-800" }) => (
  <Card className="shadow-lg p-4 hover:shadow-xl transition">
    <CardHeader>
      <CardTitle>{title}</CardTitle>
    </CardHeader>
    <CardContent>
      <p className={`text-2xl font-semibold ${valueColor}`}>{truncateText(value)}</p>
      {additionalInfo && <p className="text-sm text-gray-500">{additionalInfo}</p>}
    </CardContent>
  </Card>
);

export default SummaryCard;
