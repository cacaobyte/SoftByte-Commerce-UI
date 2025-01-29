import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const RecentArticlesCard = ({ recentArticles }) => (
  <Card className="shadow-lg p-4 hover:shadow-xl transition">
    <CardHeader>
      <CardTitle>Recientes</CardTitle>
    </CardHeader>
    <CardContent>
      {recentArticles.map((article, index) => (
        <p key={index} className="text-sm text-gray-800">
          {article.descripcion} - Q{article.precio.toFixed(2)}
        </p>
      ))}
    </CardContent>
  </Card>
);

export default RecentArticlesCard;
