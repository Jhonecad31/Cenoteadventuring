"use client";

import { useState, lazy, Suspense } from "react";
import { X } from "lucide-react";

interface BtnModalBokunProps {
  bookingChannel: string;
  idCalendar: string;
  title: string;
  btnBook: string;
}

const LazyLoadBokunScript = lazy(() => import("@/utils/LoadBokun"));

export default function BtnAccordionBokun({ 
  data, 
  variant = "accordion" //acordeón de desktop
}: { 
  data: BtnModalBokunProps, 
  variant?: "accordion" | "sticky" // variante 'sticky'
}) {
  const [isOpen, setIsOpen] = useState(false);

  //VARIANTE STICKY MÓVIL (MODAL)
  if (variant === "sticky") {
    return (
      <>
        <button
          onClick={() => setIsOpen(true)}
          className="w-full bg-[#006083] text-white py-4 rounded-full font-bold text-base shadow-md active:scale-95 transition-all mt-4"
        >
          {data.btnBook}
        </button>

        {/*Vista Emergente (Drawer) */}
        {isOpen && (
          <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center">
            <div 
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setIsOpen(false)} 
            ></div>

            {/* Contenido del Calendario (Hojal que sube) */}
            <div className="relative bg-[#EDF4FC] w-full h-[90vh] rounded-t-3xl p-6 shadow-2xl overflow-y-auto animate-in slide-in-from-bottom duration-300">
              {/* Cabecera del Modal */}
              <div className="flex justify-between items-center mb-6 border-b pb-4">
                <h3 className="font-serif text-xl text-[#001524]">{data.title}</h3>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="p-2 bg-gray-100 rounded-full text-gray-500 hover:bg-gray-200"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Contenedor del Widget de Bokun */}
              <Suspense fallback={
                <div className="flex justify-center py-20">
                  <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#006083]"></div>
                </div>
              }>
                <LazyLoadBokunScript BookingChannel={data.bookingChannel} />
                <div 
                  className="bokunWidget" 
                  data-src={`https://widgets.bokun.io/online-sales/${data.bookingChannel}/experience-calendar/${data.idCalendar}`}
                ></div>
              </Suspense>
            </div>
          </div>
        )}
      </>
    );
  }

  const [showCalendar, setShowCalendar] = useState(false);
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

      <div className={`overflow-hidden transition-all duration-500 ${showCalendar ? "max-h-[1000px] mt-4" : "max-h-0"}`}>
        <div className="bg-white border border-gray-100 rounded-xl p-4">
          {showCalendar && (
            <Suspense fallback={<div className="animate-spin h-5 w-5 border-b-2 border-[#006083] mx-auto"></div>}>
              <LazyLoadBokunScript BookingChannel={data.bookingChannel} />
              <div className="bokunWidget" data-src={`https://widgets.bokun.io/online-sales/${data.bookingChannel}/experience-calendar/${data.idCalendar}`}></div>
            </Suspense>
          )}
        </div>
      </div>
    </div>
  );
}