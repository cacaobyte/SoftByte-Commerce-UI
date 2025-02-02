"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectContent, SelectItem } from "@/components/ui/select";
import ArticlesService from "../../service/SoftbyteCommerce/Article/articleService";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const articlesService = new ArticlesService();

const ArticleForm = ({ onClose }) => {
    const [article, setArticle] = useState({
        descripcion: "",
        categoria: "",
        precio: "",
        subCategoria: "",
        clasificacion: "",
        pesoNeto: "",
        pesoBruto: "",
        imageFile: null,
    });

    const [loading, setLoading] = useState(false);
    const [preview, setPreview] = useState(null);

    const handleChange = (e) => {
        const { name, value, type, files } = e.target;
        if (type === "file") {
            setArticle({ ...article, imageFile: files[0] });
            setPreview(URL.createObjectURL(files[0]));
        } else {
            setArticle({ ...article, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData();
        Object.keys(article).forEach((key) => {
            if (article[key] !== null && article[key] !== undefined && article[key] !== "") {
                formData.append(key, article[key]);
            }
        });

        formData.append("activo", true);

        try {
            await articlesService.createArticle(formData);
            alert("Artículo creado con éxito");
            setArticle({
                descripcion: "",
                categoria: "",
                precio: "",
                subCategoria: "",
                clasificacion: "",
                pesoNeto: "",
                pesoBruto: "",
                imageFile: null,
            });
            setPreview(null);
            onClose(); // Cerrar el modal después de enviar
        } catch (error) {
            console.error("Error al crear el artículo:", error.response?.data || error.message);
            alert("Error al crear el artículo");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card className="p-4">
            <CardHeader>
                <CardTitle className="text-lg text-center">Crear Artículo</CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="col-span-1 md:col-span-2">
                        <Label>Descripción</Label>
                        <Textarea name="descripcion" value={article.descripcion} onChange={handleChange} required className="w-full" />
                    </div>

                    <div>
                        <Label>Categoría</Label>
                        <Select onValueChange={(value) => setArticle({ ...article, categoria: value })} required>
                            <SelectTrigger className="w-full">{article.categoria || "Selecciona una categoría"}</SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Electronicos">Electrónicos</SelectItem>
                                <SelectItem value="Muebles">Muebles</SelectItem>
                                <SelectItem value="Ropa">Ropa</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div>
                        <Label>SubCategoría</Label>
                        <Input name="subCategoria" value={article.subCategoria} onChange={handleChange} required className="w-full" />
                    </div>

                    <div>
                        <Label>Clasificación</Label>
                        <Input name="clasificacion" value={article.clasificacion} onChange={handleChange} required className="w-full" />
                    </div>

                    <div>
                        <Label>Precio</Label>
                        <Input type="number" name="precio" value={article.precio} onChange={handleChange} required className="w-full" />
                    </div>

                    <div className="col-span-1 md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <Label>Peso Neto (kg) (Opcional)</Label>
                            <Input type="number" name="pesoNeto" value={article.pesoNeto} onChange={handleChange} placeholder="Ej: 5.5" className="w-full" />
                        </div>

                        <div>
                            <Label>Peso Bruto (kg) (Opcional)</Label>
                            <Input type="number" name="pesoBruto" value={article.pesoBruto} onChange={handleChange} placeholder="Ej: 6.2" className="w-full" />
                        </div>
                    </div>

                    <div className="col-span-1 md:col-span-2">
                        <Label>Imagen</Label>
                        <Input type="file" name="imageFile" onChange={handleChange} accept="image/*" className="w-full" />
                        {preview && <img src={preview} alt="Preview" className="mt-2 w-full rounded-md" />}
                    </div>

                    <div className="col-span-1 md:col-span-2 flex justify-center">
                        <Button type="submit" disabled={loading} className="w-full md:w-1/2">
                            {loading ? "Creando..." : "Crear Artículo"}
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
};

export default ArticleForm;
