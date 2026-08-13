"use client";
import { useState, lazy, Suspense, useEffect } from "react";
import { X } from "lucide-react";

interface Promotion {
  discount: string;        // Ej: "-15%"
  title: string;           // Ej: "Book 15 days in advance"
  originalPrice?: string;  // Ej: "$69.99 USD"
  price: string;           // Ej: "$59"
  currency?: string;       // Ej: "USD"
}

interface BtnModalBokunProps {
  bookingChannel: string;
  idCalendar: string;
  title: string;
  btnBook: string;
  btnCloseText?: string;
  promotions?: Promotion[]; // Lista opcional de promociones
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
      <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-4 md:p-6 pointer-events-auto">
        {/* Fondo oscurecido con Blur */}
        <div
          className="absolute inset-0 bg-black/60 backdrop-blur-sm cursor-pointer transition-opacity"
          onClick={() => setIsOpen(false)}
        />
        
        {/* Ventana del Modal: Fullscreen en móvil (rounded-t-2xl) y Centrada en sm+ */}
        <div className="relative bg-white w-full sm:max-w-3xl rounded-t-3xl sm:rounded-2xl p-4 sm:p-6 md:p-8 shadow-2xl flex flex-col justify-between overflow-hidden animate-in fade-in zoom-in-95 duration-200 h-[92vh] sm:h-auto sm:max-h-[90vh]">
          
          {/* Botón X superior derecho */}
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-3 right-3 sm:top-4 sm:right-4 p-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full transition-colors z-30 cursor-pointer shadow-xs"
            aria-label="Cerrar modal"
          >
            <X size={20} strokeWidth={2.5} />
          </button>

          {/* Contenido Superior: Título con espacio extra a la derecha para la X */}
          <div className="mb-2 pr-12 pt-1 sm:pt-0 shrink-0">
            <h3 className="font-sans text-base sm:text-xl md:text-2xl font-bold text-[#001524] line-clamp-2">
              {data.title}
            </h3>
          </div>

          {/* Contenido Central con Scroll Fluido para Móvil */}
          <div className="flex-1 overflow-y-auto pr-1 my-2 space-y-4 overscroll-contain">
            
            {/* Sección de Promociones Adaptada: 2 arriba y la última a ancho completo abajo en móvil */}
            {data.promotions && data.promotions.length > 0 && (
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 pt-4 pb-2 px-0.5">
                {data.promotions.map((promo, index) => {
                  const isLastAndOdd = data.promotions && data.promotions.length % 2 !== 0 && index === data.promotions.length - 1;
                  
                  return (
                    <div 
                      key={index} 
                      className={`relative overflow-visible bg-white border border-gray-200/95 rounded-2xl p-4 text-center shadow-xs flex flex-col justify-between items-center ${
                        isLastAndOdd ? "col-span-2 lg:col-span-1" : "col-span-1"
                      }`}
                    >
                      {/* Badge Circular de Descuento */}
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-orange-500 text-white text-[11px] font-bold px-3 py-0.5 rounded-full shadow-sm whitespace-nowrap z-20">
                        {promo.discount}
                      </div>
                      
                      <p className="text-xs text-gray-600 font-medium leading-snug mt-3">
                        {promo.title}
                      </p>
                      
                      {promo.originalPrice && (
                        <span className="text-xs text-gray-400 line-through mt-1">
                          {promo.originalPrice}
                        </span>
                      )}
                      
                      <div className="text-lg sm:text-xl font-bold text-black mt-1">
                        {promo.price} <span className="text-xs font-semibold text-gray-400">{promo.currency || "USD"}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Contenedor del Widget de Calendario */}
            <Suspense fallback={
              <div className="flex justify-center py-20">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#006083]"></div>
              </div>
            }>
              <LazyLoadBokunScript BookingChannel={data.bookingChannel} />
              <div
                className="bokunWidget min-h-[300px]"
                data-src={`https://widgets.bokun.io/online-sales/${data.bookingChannel}/experience-calendar/${data.idCalendar}`}
              ></div>
            </Suspense>
          </div>

          {/* Footer: Botón "Close" de texto abajo a la derecha */}
          <div className="flex justify-end pt-3 mt-1 border-t border-gray-100 shrink-0">
            <button
              onClick={() => setIsOpen(false)}
              className="text-[#e14d76] hover:opacity-80 font-semibold text-sm sm:text-base transition-opacity px-3 py-1.5 cursor-pointer"
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