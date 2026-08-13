"use client";
import { useState, lazy, Suspense, useEffect } from "react";
import { X } from "lucide-react";

interface BtnModalBokunProps {
  bookingChannel: string;
  idCalendar: string;
  title: string;
  btnBook: string;
  btnCloseText?: string;
}

const LazyLoadBokunScript = lazy(() => import("@/utils/LoadBokun"));

declare global {
  interface Window {
    BokunWidget?: {
      render: () => void;
    };
  }
}

export default function BtnAccordionBokun({
  data,
  variant = "accordion"
}: {
  data: BtnModalBokunProps;
  variant?: "accordion" | "sticky";
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);

  // Escucha el evento global desde Astro para abrir la vista emergente
  useEffect(() => {
    const handleOpenModal = () => setIsOpen(true);
    window.addEventListener("open-bokun-modal", handleOpenModal);
    return () => {
      window.removeEventListener("open-bokun-modal", handleOpenModal);
    };
  }, []);

  // Forzar la reinicialización de las instancias de Bokun si el script ya existe en memoria
  useEffect(() => {
    if ((isOpen || showCalendar) && window.BokunWidget) {
      setTimeout(() => {
        try {
          window.BokunWidget?.render();
        } catch (error) {
          console.warn("Bokun Re-render failed:", error);
        }
      }, 50);
    }
  }, [isOpen, showCalendar]);

  // Bloquear el scroll del body principal cuando el modal flotante esté abierto
  useEffect(() => {
    if (variant === "sticky" && isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen, variant]);

  // VISTA EMERGENTE / MODAL (Variante "sticky" para usar como Popup Global)
  if (variant === "sticky") {
    if (!isOpen) return null;

    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 pointer-events-auto">
        {/* Fondo oscurecido con Blur */}
        <div
          className="absolute inset-0 bg-black/50 backdrop-blur-sm cursor-pointer"
          onClick={() => setIsOpen(false)}
        />
        {/* Ventana del Modal centrada estilo Lightbox */}
        <div className="relative bg-white w-full sm:max-w-2xl rounded-2xl p-8 md:p-10 shadow-2xl flex flex-col justify-between overflow-hidden animate-in fade-in zoom-in-95 duration-200 min-h-[400px]">
          
          {/* Botón X superior derecho */}
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-5 right-5 p-1 text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="Cerrar modal"
          >
            <X size={20} strokeWidth={2} />
          </button>

          {/* Contenido Superior: Título */}
          <div className="mb-6">
            <h3 className="font-sans text-xl md:text-2xl font-bold text-[#001524] pr-6">
              {data.title}
            </h3>
          </div>

          {/* Contenido Central: Contenedor del Widget */}
          <div className="flex-1 overflow-y-auto pr-1 my-2 min-h-[250px]">
            <Suspense fallback={
              <div className="flex justify-center py-20">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#006083]"></div>
              </div>
            }>
              <LazyLoadBokunScript BookingChannel={data.bookingChannel} />
              <div
                className="bokunWidget min-h-[250px]"
                data-src={`https://widgets.bokun.io/online-sales/${data.bookingChannel}/experience-calendar/${data.idCalendar}`}
              ></div>
            </Suspense>
          </div>

          {/* Footer: Botón "Close" de texto abajo a la derecha */}
          <div className="flex justify-end pt-4 mt-2 border-t border-gray-100">
            <button
              onClick={() => setIsOpen(false)}
              className="text-[#e14d76] hover:opacity-80 font-medium text-base transition-opacity px-2 py-1"
            >
              {data.btnCloseText || "Close"}
            </button>
          </div>

        </div>
      </div>
    );
  }

  // VISTA ACORDEÓN (Variante por defecto)
  return (
    <div className="w-full">
      <button
        onClick={() => setShowCalendar(!showCalendar)}
        className={`w-full mt-6 py-3 rounded-lg font-semibold border-2 transition-all cursor-pointer ${
          showCalendar
            ? "bg-white border-[#006083] text-[#006083]"
            : "bg-[#006083] border-[#006083] text-white hover:bg-[#004d6a]"
        }`}
      >
        {showCalendar ? "Cerrar Calendario" : data.btnBook}
      </button>

      <div 
        className={`grid transition-all duration-500 ease-in-out ${
          showCalendar ? "grid-rows-[1fr] mt-4 opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden min-h-0">
          <div className="bg-white border border-gray-100 rounded-xl p-4">
            {showCalendar && (
               <Suspense fallback={
                <div className="flex justify-center py-6">
                  <div className="animate-spin h-6 w-6 border-b-2 border-[#006083]"></div>
                </div>
              }>
                <LazyLoadBokunScript BookingChannel={data.bookingChannel} />
                 <div 
                  className="bokunWidget min-h-[450px]" 
                  data-src={`https://widgets.bokun.io/online-sales/${data.bookingChannel}/experience-calendar/${data.idCalendar}`}
                ></div>
              </Suspense>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}