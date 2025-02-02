import { Dialog, DialogContent, DialogHeader, DialogFooter, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Loader2, AlertCircle, CheckCircle2 } from "lucide-react";

const ConfirmationModal = ({ isOpen, onClose, onConfirm, title, description, confirmText, loading }) => {
    const isDestructive = confirmText === "Desactivar";

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-sm sm:max-w-md rounded-xl p-6 shadow-lg">
                <DialogHeader className="flex flex-col items-center text-center">
                    {/* Icono visual dependiendo de la acción */}
                    {isDestructive ? (
                        <AlertCircle className="text-red-600 mb-3" size={48} />
                    ) : (
                        <CheckCircle2 className="text-green-600 mb-3" size={48} />
                    )}
                    <DialogTitle className="text-lg font-semibold">{title}</DialogTitle>
                    <DialogDescription className="text-gray-500">{description}</DialogDescription>
                </DialogHeader>
                <DialogFooter className="flex flex-col md:flex-row justify-center items-center space-y-3 md:space-y-0 md:space-x-4 mt-4 w-full">
                    <Button 
                        variant="outline" 
                        onClick={onClose} 
                        disabled={loading} 
                        className="w-full md:w-auto"
                    >
                        Cancelar
                    </Button>
                    <Button
                        variant={isDestructive ? "destructive" : "success"}
                        onClick={onConfirm}
                        disabled={loading}
                        className="w-full md:w-auto flex items-center justify-center"
                    >
                        {loading ? <Loader2 className="animate-spin mr-2" size={18} /> : null}
                        {confirmText}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default ConfirmationModal;
