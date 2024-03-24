'use client'
import { useSearchParams, useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { XIcon } from "lucide-react";


type Props = {
  title: string;
  onClose: () => void;
  onSubmit: (string) => void;
  redirectRoute: string;
  children: React.ReactNode;
};
export default function Modal({ title, onClose, redirectRoute,  children }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const dialogRef = useRef<null | HTMLDialogElement>(null);
  const showDialog = searchParams?.get("showDialog") === "true";

   
  useEffect(() => {
    if (showDialog) {
      dialogRef.current?.showModal();
    } else {
      dialogRef.current?.close();
    }
  }, [showDialog]);

  const closeDialog = () => {
    dialogRef.current?.close();
    router.push(redirectRoute);
    onClose();
  }


  const dialog: JSX.Element | null = showDialog
    ? (
      <dialog ref={dialogRef}>
        <div className="justify-center fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
          <div className="flex items-end justify-center min-h-screen pt-4 px-0 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white pt-0 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">

                  <div className="w-full mt-2 text-left sm:mt-0 sm:ml-4 sm:text-left">
                    <div className="flex flex-row p-2 justify-between bg-gray-50  sm:mt-0 sm:ml-4">
                    <h3 className="text-lg text-center leading-6 p-4 bg- font-medium text-gray-900 " id="modal-title">
                      {title}
        
                    </h3>
                      <XIcon onClick={closeDialog} className="h-auto w-6 text-gray-500  hover:text-gray-700 cursor-pointer" />
               
                    </div>
                   
                    <div className="mt-2">
                        {children}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </dialog>
    ) : null


  return dialog
}
