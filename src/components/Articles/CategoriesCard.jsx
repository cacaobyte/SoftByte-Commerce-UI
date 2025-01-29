import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const CategoriesCard = ({ categories, articles }) => (
  <Card className="shadow-lg p-4 hover:shadow-xl transition">
    <CardHeader>
      <CardTitle>Artículos por Categoría</CardTitle>
    </CardHeader>
    <CardContent>
      {categories.map((category, index) => (
        <Badge key={index} variant="outline" className="mr-2">
          {category} ({articles.filter((a) => a.categoria === category).length})
        </Badge>
      ))}
    </CardContent>
  </Card>
);

export default CategoriesCard;
