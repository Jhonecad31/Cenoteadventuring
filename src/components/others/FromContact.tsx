import { useState, useRef } from "react";
import { actions } from "astro:actions";

interface FormContactProps {
    TITLE_FORM: string;
    i18n: any;
}

export default function FormContact({ i18n, TITLE_FORM }: FormContactProps) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isError, setIsError] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const formRef = useRef<HTMLFormElement>(null);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);

        const formData = new FormData(e.currentTarget);
        const { data, error } = await actions.mailContactUs(formData);

        if (error) {
            console.error("❌ Error:", error);
            setIsError(true);
        } else {
            setIsError(false);
        }

        setIsSubmitting(false);
        setShowModal(true);
    };

    const inputClasses = "w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-[#006083] focus:bg-white outline-none transition-all placeholder:text-slate-400 text-slate-700 shadow-sm";
    const labelClasses = "block text-sm font-semibold text-slate-700 mb-1 ml-1 uppercase tracking-wider";

    return (
        <div className="relative">
            <h2 className="text-2xl lg:text-3xl font-bold mb-8 text-slate-900">{TITLE_FORM}</h2>
            
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                    <label className={labelClasses}>{i18n.LABELS.FULLNAME}</label>
                    <input required name="fullname" placeholder={i18n.PLACEHOLDERS.FULLNAME} className={inputClasses} type="text" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className={labelClasses}>{i18n.LABELS.EMAIL}</label>
                        <input required name="email" placeholder={i18n.PLACEHOLDERS.EMAIL} className={inputClasses} type="email" />
                    </div>
                    <div className="space-y-2">
                        <label className={labelClasses}>{i18n.LABELS.PHONE}</label>
                        <input required name="phone" placeholder={i18n.PLACEHOLDERS.PHONE} className={inputClasses} type="tel" />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className={labelClasses}>{i18n.LABELS.SUBJECT}</label>
                    <input required name="subject" placeholder={i18n.PLACEHOLDERS.SUBJECT} className={inputClasses} type="text" />
                </div>

                <div className="space-y-2">
                    <label className={labelClasses}>{i18n.LABELS.MESSAGE}</label>
                    <textarea required name="message" placeholder={i18n.PLACEHOLDERS.MESSAGE} className={`${inputClasses} min-h-40 resize-none`} />
                </div>

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full md:w-auto px-12 py-4 bg-[#006083] text-white font-bold rounded-full hover:text-[#006083] hover:shadow-xl hover:-translate-y-0.5 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed uppercase text-sm tracking-[0.2em]"
                >
                    {isSubmitting ? i18n.BUTTONS.SENDING : i18n.BUTTONS.SEND_MESSAGE}
                </button>
            </form>

            {/* Modal Nativo con Tailwind */}
            {showModal && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 text-[#006083] backdrop-blur-md transition-opacity">
                    <div className="bg-white rounded-[2rem] p-10 max-w-md w-full shadow-2xl text-center scale-up-center">
                        <div className={`mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full ${isError ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'}`}>
                            {isError ? (
                                <svg className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3"><path d="M6 18L18 6M6 6l12 12" /></svg>
                            ) : (
                                <svg className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3"><path d="M5 13l4 4L19 7" /></svg>
                            )}
                        </div>

                        <h2 className="text-2xl font-bold text-slate-900 mb-2">
                            {isError ? i18n.ERROR_FORM.TITLE : i18n.SUCCESS_FORM.TITLE}
                        </h2>
                        <p className="text-slate-500 mb-8 leading-relaxed">
                            {isError ? i18n.ERROR_FORM.DESCRIPTION : i18n.SUCCESS_FORM.DESCRIPTION}
                        </p>

                        <button
                            onClick={() => {
                                if (!isError) formRef.current?.reset();
                                setShowModal(false);
                            }}
                            className="w-full py-4 bg-[#006083] text-white rounded-xl font-bold uppercase text-xs tracking-widest hover:bg-[#006083] transition-all"
                        >
                            {i18n.CLOSE_MODAL}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}