"use client";
import { Spinner } from "@phosphor-icons/react";

const Loader = (): JSX.Element => {
    return (
        <div className="min-h-[90vh] flex justify-center items-center">
            <Spinner className="animate-spin" size={40} />
        </div>
    )
}

export default Loader