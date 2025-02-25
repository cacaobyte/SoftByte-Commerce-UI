"use client";
import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FilePlus, ChevronRight, ChevronLeft } from "lucide-react";
import { Eye, EyeOff } from "lucide-react";

const StepFormModal = ({ isOpen, onClose, title, modelInputs = [], onSubmit }) => {
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const [steps, setSteps] = useState([]);
  const [activeStep, setActiveStep] = useState("step-0");
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    // Dividir los campos en pasos
    const chunkSize = 4;
    const groupedSteps = [];
    for (let i = 0; i < modelInputs.length; i += chunkSize) {
      groupedSteps.push({
        key: `step-${i / chunkSize}`,
        label: `Paso ${i / chunkSize + 1}`,
        fields: modelInputs.slice(i, i + chunkSize),
      });
    }
    setSteps(groupedSteps);
    setActiveStep(groupedSteps[0]?.key || "");
  }, [modelInputs]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Validaciones
    const field = modelInputs.find(f => f.key === name);
    let error = "";

    if (field?.required && !value) {
      error = "Este campo es obligatorio.";
    } else if (field?.minLength && value.length < field.minLength) {
      error = `Debe tener al menos ${field.minLength} caracteres.`;
    } else if (field?.maxLength && value.length > field.maxLength) {
      error = `No puede exceder los ${field.maxLength} caracteres.`;
    } else if (field?.pattern && !new RegExp(field.pattern).test(value)) {
      error = "Formato inválido.";
    }

    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.files[0] }));
  };

  const nextStep = () => {
    const currentIndex = steps.findIndex((s) => s.key === activeStep);
    if (currentIndex < steps.length - 1) {
      setActiveStep(steps[currentIndex + 1].key);
    }
  };

  const prevStep = () => {
    const currentIndex = steps.findIndex((s) => s.key === activeStep);
    if (currentIndex > 0) {
      setActiveStep(steps[currentIndex - 1].key);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>

        <Tabs defaultValue={activeStep} value={activeStep} onValueChange={setActiveStep}>
          <TabsList className="flex overflow-x-auto border-b pb-2 scrollbar-hide">
            {steps.map((step) => (
              <TabsTrigger key={step.key} value={step.key} className="px-4 py-2 text-gray-700 font-medium">
                {step.label}
              </TabsTrigger>
            ))}
          </TabsList>

          {steps.map((step) => (


<TabsContent key={step.key} value={step.key} className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
  {step.fields.map((field) => (
    <div key={field.key} className="flex flex-col">
     <Label>
       {field.label} {field.required && <span className="text-red-500">*</span>}
     </Label>

      {/* 🔹 Input de texto */}
      {field.type === "text" && (
        <Input 
          name={field.key} 
          value={formData[field.key] || ""} 
          onChange={handleInputChange} 
        />
      )}

      {/* 🔹 Input de contraseña con opción de mostrar/ocultar */}
   {/* 🔹 Input de contraseña con botón de visibilidad */}
   {field.type === "password" && (
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    name={field.key}
                    value={formData[field.key] || ""}
                    onChange={handleInputChange}
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-2 text-gray-500"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
      )}

      {/* 🔹 Input de correo electrónico */}
      {field.type === "email" && (
        <Input 
          type="email" 
          name={field.key} 
          value={formData[field.key] || ""} 
          onChange={handleInputChange} 
        />
      )}

      {/* 🔹 Input de número */}
      {field.type === "number" && (
        <Input 
          type="number" 
          name={field.key} 
          value={formData[field.key] || ""} 
          onChange={handleInputChange} 
        />
      )}

      {/* 🔹 Input de fecha */}
      {field.type === "date" && (
        <Input 
          type="date" 
          name={field.key} 
          value={formData[field.key] || ""} 
          onChange={handleInputChange} 
        />
      )}

      {/* 🔹 Input de selección */}
      {field.type === "select" && field.options && (
        <Select 
          value={formData[field.key] || ""}
          onValueChange={(value) => setFormData((prev) => ({ ...prev, [field.key]: value }))}
        >
          <SelectTrigger>
            <SelectValue placeholder="Seleccione una opción" />
          </SelectTrigger>
          <SelectContent>
            {field.options.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}

      {/* 🔹 Input de archivo */}
      {field.type === "file" && (
        <Input 
          type="file" 
          name={field.key} 
          onChange={handleFileChange} 
        />
      )}

      {/* 🔹 Checkbox */}
      {field.type === "checkbox" && (
        <div className="flex items-center space-x-2">
          <input 
            type="checkbox" 
            name={field.key} 
            checked={formData[field.key] || false} 
            onChange={(e) => setFormData((prev) => ({ ...prev, [field.key]: e.target.checked }))} 
          />
          <Label htmlFor={field.key}> {field.label} </Label>
        </div>
      )}

      {/* 🔹 Textarea */}
      {field.type === "textarea" && (
        <textarea 
          name={field.key} 
          value={formData[field.key] || ""} 
          onChange={handleInputChange} 
          className="border rounded-lg p-2"
        />
      )}
      {errors[field.key] && <span className="text-red-500 text-sm">{errors[field.key]}</span>}
    </div>
  ))}
</TabsContent>


          ))}
        </Tabs>

        <DialogFooter className="flex justify-between mt-4">
          <Button variant="outline" onClick={prevStep} disabled={steps.findIndex((s) => s.key === activeStep) === 0}>
            <ChevronLeft size={18} /> Anterior
          </Button>
          {steps.findIndex((s) => s.key === activeStep) === steps.length - 1 ? (
            <Button onClick={() => onSubmit(formData)}>
              <FilePlus size={18} className="mr-2" /> Guardar
            </Button>
          ) : (
            <Button variant="outline" onClick={nextStep}>
              Siguiente <ChevronRight size={18} />
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default StepFormModal;
