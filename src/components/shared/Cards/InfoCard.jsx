import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const InfoCard = ({ icon: Icon, title, value, className }) => {
    return (
        <Card className={`shadow-lg rounded-lg p-4 bg-white flex items-center ${className}`}>
            {Icon && <Icon className="w-8 h-8 text-blue-500 mr-4" />}
            <div>
                <CardHeader className="p-0">
                    <CardTitle className="text-gray-600 text-sm">{title}</CardTitle>
                </CardHeader>
                <CardContent className="p-0 mt-2">
                    <p className="text-2xl font-bold text-gray-900">{value}</p>
                </CardContent>
            </div>
        </Card>
    );
};

export default InfoCard;
