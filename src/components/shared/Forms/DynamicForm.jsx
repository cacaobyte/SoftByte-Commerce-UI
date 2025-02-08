import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "react-toastify";
import { Loader2 } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import clsx from "clsx";

const DynamicForm = ({ model, title, onSubmit, initialValues = {}, columns = 1 }) => {
    const [formData, setFormData] = useState(initialValues);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (initialValues && Object.keys(initialValues).length > 0) {
            setFormData(initialValues); 
        }
    }, [initialValues]);
    

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
    
        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };
    

    const handleFileChange = (e) => {
        const { name, files } = e.target;
        if (files.length > 0) {
            setFormData((prev) => ({
                ...prev,
                [name]: files[0],  
            }));
        }
    };
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await onSubmit(formData);
            toast.success("Operación exitosa.");
            setFormData(initialValues);
        } catch (error) {
            toast.error("Error al enviar los datos.");
        } finally {
            setLoading(false);
        }
    };

    // 📌 Ajuste del grid para columnas dinámicas
    const gridColumns = clsx({
        "grid-cols-1": columns === 1,
        "grid-cols-2": columns === 2,
        "grid-cols-3": columns === 3,
        "grid-cols-4": columns >= 4,
    });

    return (
        <div className="p-4 mx-auto"> {/* Eliminamos `min-h-screen` */}
            <Card className="max-w-3xl mx-auto shadow-lg rounded-lg bg-white p-6"> {/* Reduje el `max-w` */}
                <CardHeader>
                    <CardTitle className="text-lg font-semibold">{title}</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className={`grid ${gridColumns} gap-4`}>
                        {model.map((field, index) => (
                            <div key={index} className="flex flex-col">
                                <Label className="text-gray-700">
                                    {field.label}{" "}
                                    {field.required && <span className="text-red-500">*</span>}
                                </Label>
                                {field.type === "text" || field.type === "email" || field.type === "number" ? (
                                    <Input
                                        type={field.type}
                                        name={field.name}
                                        value={formData[field.name] || ""}
                                        onChange={handleChange}
                                        required={field.required}
                                    />
                                ) : field.type === "select" ? (
                                    <select
                                        name={field.name}
                                        value={formData[field.name] || ""}
                                        onChange={(e) => {
                                            handleChange(e);
                                            if (field.onChange) {
                                                field.onChange(e.target.value);
                                            }
                                        }}
                                        className="w-full p-2 border border-gray-300 rounded-md"
                                        required={field.required}
                                        disabled={field.disabled}
                                    >
                                        <option value="" disabled>
                                            {field.placeholder || "Seleccione una opción"}
                                        </option>
                                        {field.options.map((option, i) => (
                                            <option key={i} value={option.value}>
                                                {option.label}
                                            </option>
                                        ))}
                                    </select>
                                ) : field.type === "checkbox" ? (
                                    <div className="flex items-center space-x-2 mt-2">
                                        <Checkbox
                                            id={field.name}
                                            checked={formData[field.name] || false}
                                            onCheckedChange={(checked) =>
                                                handleChange({ target: { name: field.name, type: "checkbox", checked } })
                                            }
                                        />
                                        <Label htmlFor={field.name}>{field.label}</Label>
                                    </div>
                                ) : field.type === "file" ? (
                                    <Input
                                        type="file"
                                        name={field.name}
                                        onChange={handleFileChange}
                                        accept={field.accept || "*"}
                                    />
                                ) : null}
                            </div>
                        ))}
                        <div className="col-span-full flex justify-end">
                            <Button type="submit" className="flex items-center justify-center" disabled={loading}>
                                {loading ? <Loader2 className="animate-spin mr-2" size={16} /> : "Guardar"}
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default DynamicForm;
