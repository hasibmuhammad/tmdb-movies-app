"use client";

import MobileSearchPopup from "@/components/ui/MobileSearchPopup";
import { MagnifyingGlass } from "@phosphor-icons/react";
import { useState } from "react";

const MobileSearchComponent = (): JSX.Element => {
    const [isOpen, setIsOpen] = useState(false);

    const togglePopup = (): void => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            {/* Search Icon for smaller devices */}
            <div onClick={togglePopup} className="block md:hidden">
                <MagnifyingGlass size={28} />
            </div>
            {/* Popup for smaller devices */}
            <MobileSearchPopup isOpen={isOpen} setIsOpen={setIsOpen} />
        </>
    )
}

export default MobileSearchComponent