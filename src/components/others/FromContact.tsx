import { useState } from "react";
import { actions } from "astro:actions";

interface FormContactProps {
    TITLE_FORM: string;
    i18n: any; 
}

export default function FormContact({ i18n, TITLE_FORM }: FormContactProps) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isError, setIsError] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);

        const formData = new FormData(e.currentTarget);
        const { error } = await actions.mailContactUs(formData);

        setIsError(!!error);
        setIsSubmitting(false);
        setShowModal(true);
    };

    const inputClasses = "w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-sky-500 focus:bg-white outline-none transition-all placeholder:text-slate-400 text-slate-700";
    const labelClasses = "block text-sm font-medium text-slate-700 mb-1 ml-1";

    return (
        <div className="relative">
            <h2 className="text-xl/normal lg:text-3xl/relaxed font-bold mt-5 mb-6">{TITLE_FORM}</h2>
            
            <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-1">
                    <label className={labelClasses}>{i18n.LABELS.FULLNAME}</label>
                    <input
                        required
                        name="fullname"
                        placeholder={i18n.PLACEHOLDERS.FULLNAME}
                        className={inputClasses}
                        type="text"
                    />
                </div>

                <div className="flex flex-col md:flex-row gap-5">
                    <div className="flex-1 space-y-1">
                        <label className={labelClasses}>{i18n.LABELS.EMAIL}</label>
                        <input
                            required
                            name="email"
                            placeholder={i18n.PLACEHOLDERS.EMAIL}
                            className={inputClasses}
                            type="email"
                        />
                    </div>
                    <div className="flex-1 space-y-1">
                        <label className={labelClasses}>{i18n.LABELS.PHONE}</label>
                        <input
                            required
                            name="phone"
                            placeholder={i18n.PLACEHOLDERS.PHONE}
                            className={inputClasses}
                            type="tel"
                        />
                    </div>
                </div>

                <div className="space-y-1">
                    <label className={labelClasses}>{i18n.LABELS.SUBJECT}</label>
                    <input
                        required
                        name="subject"
                        placeholder={i18n.PLACEHOLDERS.SUBJECT}
                        className={inputClasses}
                        type="text"
                    />
                </div>

                <div className="space-y-1">
                    <label className={labelClasses}>{i18n.LABELS.MESSAGE}</label>
                    <textarea
                        required
                        name="message"
                        placeholder={i18n.PLACEHOLDERS.MESSAGE}
                        className={`${inputClasses} min-h-40 resize-y`}
                    />
                </div>

                <div className="pt-4">
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full md:w-auto px-10 py-4 bg-linear-to-br bg-[#006083] text-white font-bold rounded-full hover:shadow-lg hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed uppercase text-sm tracking-widest"
                    >
                        {isSubmitting ? i18n.BUTTONS.SENDING : i18n.BUTTONS.SEND_MESSAGE}
                    </button>
                </div>
            </form>

            {/* Modal Custom Nativizado */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="bg-white rounded-[2.5rem] p-8 md:p-12 max-w-lg w-full shadow-2xl transform animate-in zoom-in-95 duration-300 text-center">
                        <div className="mb-6 flex justify-center">
                            {isError ? (
                                <div className="bg-red-100 p-5 rounded-full">
                                    <svg className="size-16 text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </div>
                            ) : (
                                <div className="bg-green-100 p-5 rounded-full">
                                    <svg className="size-16 text-green-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                            )}
                        </div>

                        <h2 className="text-3xl font-bold text-slate-900 mb-4">
                            {isError ? i18n.ERROR_FORM.TITLE : i18n.SUCCESS_FORM.TITLE}
                        </h2>
                        
                        <p className="text-slate-600 text-lg mb-10 leading-relaxed">
                            {isError ? i18n.ERROR_FORM.DESCRIPTION : i18n.SUCCESS_FORM.DESCRIPTION}
                        </p>

                        <button
                            onClick={() => {
                                if (!isError) window.location.reload();
                                setShowModal(false);
                            }}
                            className="w-full py-4 bg-slate-900 text-white rounded-full font-bold uppercase text-xs tracking-widest hover:bg-slate-800 transition-colors"
                        >
                            {i18n.CLOSE_MODAL}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}