import { useEffect } from "react";

interface LoadBokunScriptProps {
    BookingChannel: string;
}

const LoadBokunScript = ({ BookingChannel }: LoadBokunScriptProps) => {
    useEffect(() => {
        const script = document.createElement('script');
        script.src = `https://widgets.bokun.io/assets/javascripts/apps/build/BokunWidgetsLoader.js?bookingChannelUUID=${BookingChannel}`;
        script.async = true;
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    return null;
};

export default LoadBokunScript;