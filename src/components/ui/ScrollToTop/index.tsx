"use client";
import { ArrowUp } from "@phosphor-icons/react";
import { useEffect, useRef } from "react";

const ScrollToTop = (): JSX.Element => {
  const goToTopRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleScroll = (): void => {
      if (window.scrollY > 700) {
        goToTopRef.current?.classList.remove("hidden");
        goToTopRef.current?.classList.add("opacity-100");
      } else {
        goToTopRef.current?.classList.add("hidden");
        goToTopRef.current?.classList.remove("opacity-100");
      }
    };

    window.addEventListener("scroll", handleScroll);

    return (): void => { window.removeEventListener("scroll", handleScroll); };
  }, []);

  const goToTop = (): void => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      ref={goToTopRef}
      className="hidden fixed bottom-14 right-0 md:right-10 z-50 p-[5px] transition-opacity duration-300 ease-in-out opacity-0 hover:opacity-100"
      title="Go to top"
      onClick={goToTop}
    >
      <div className="bg-bgDark dark:bg-gray-300/30 w-10 h-10 rounded-full p-2 flex justify-center items-center">
        <ArrowUp size={32} weight="regular" className="text-white" />
      </div>
      <span className="sr-only">Go to top</span>
    </button>
  );
};

export default ScrollToTop;
