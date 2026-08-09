// "use client";

// import { useState, useEffect } from "react";

// interface ConfirmModalProps {
//   message: string;
//   confirmText?: string;
//   cancelText?: string;
//   onConfirm: () => void;   // callback fourni par le parent
//   open: boolean;           // état ouvert/fermé géré par le parent
//   onClose: () => void;     // fonction pour fermer la modal
// }

// export default function ConfirmModal({
//   message,
//   confirmText = "Oui",
//   cancelText = "Annuler",
//   onConfirm,
//   open,
//   onClose,
// }: ConfirmModalProps) {
//   const handleConfirm = () => {
//     onConfirm();
//     onClose();
//   };

//   // Bloquer le scroll derrière la modal
//   useEffect(() => {
//     document.body.style.overflow = open ? "hidden" : "auto";
//     return () => {
//       document.body.style.overflow = "auto";
//     };
//   }, [open]);

//   if (!open) return null;

//   return (
//     <>
//     <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
//       <div className="bg-white p-6 rounded-xl shadow-lg w-96 text-center">
//         <p className="mb-6 text-slate-700">{message}</p>
//         <div className="flex justify-center gap-3">
//           <button
//             onClick={handleConfirm}
//             className="bg-red-600 text-white px-4 py-2 rounded-lg"
//           >
//             {confirmText}
//           </button>
//           <button
//             onClick={onClose}
//             className="bg-gray-300 px-4 py-2 rounded-lg"
//           >
//             {cancelText}
//           </button>
//         </div>
//       </div>
//     </div>
//     </>
//   );
// }

"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface ConfirmModalProps {
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;   // callback fourni par le parent
  open: boolean;           // état ouvert/fermé géré par le parent
  onClose: () => void;     // fonction pour fermer la modal
}

export default function ConfirmModal({
  message,
  confirmText = "Supprimer",
  cancelText = "Annuler",
  onConfirm,
  open,
  onClose,
}: ConfirmModalProps) {
  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold text-center text-slate-800">
            Confirmation
          </DialogTitle>
          <DialogDescription className="text-center text-slate-600">
            {message}
          </DialogDescription>
        </DialogHeader>

        {/* Boutons centrés */}
        <DialogFooter className="!flex !flex-row !justify-center gap-4 mt-6">
          <Button
            onClick={handleConfirm}
            className="bg-green-600 text-white px-6 py-2 rounded-lg"
            
          >
            {confirmText}
          </Button>
          <Button
            variant="outline"
            onClick={onClose}
            className="bg-red-600 text-white px-6 py-2 rounded-lg"
           
          >
            {cancelText}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
