"use client";
import { IoClose } from "react-icons/io5";
import React from "react";

type Props = {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
    title?: string;
};

export default function Modal({ isOpen, onClose, children }: Props) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[9999]">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md relative">
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 text-gray-500 hover:text-black"
                >
                    <IoClose size={24} />
                </button>
                {children}
            </div>
        </div>
    );
}
