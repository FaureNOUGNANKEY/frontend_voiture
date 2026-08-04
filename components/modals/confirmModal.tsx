"use client";

import { useState, useEffect } from "react";

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
  confirmText = "Oui",
  cancelText = "Annuler",
  onConfirm,
  open,
  onClose,
}: ConfirmModalProps) {
  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  // Bloquer le scroll derrière la modal
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white p-6 rounded-xl shadow-lg w-96 text-center">
        <p className="mb-6 text-slate-700">{message}</p>
        <div className="flex justify-center gap-3">
          <button
            onClick={handleConfirm}
            className="bg-red-600 text-white px-4 py-2 rounded-lg"
          >
            {confirmText}
          </button>
          <button
            onClick={onClose}
            className="bg-gray-300 px-4 py-2 rounded-lg"
          >
            {cancelText}
          </button>
        </div>
      </div>
    </div>
  );
}
