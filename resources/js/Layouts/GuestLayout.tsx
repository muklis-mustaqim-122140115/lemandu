import { useEffect, useState } from "react";
import { PropsWithChildren } from "react";
import Loading from "@/Components/Loading";
import Navbar from "@/Components/Navbar";

export default function Guest({ children }: PropsWithChildren) {
  const [progress, setProgress] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isFirstTime, setIsFirstTime] = useState<boolean>(false);

  useEffect(() => {
    const hasVisited = sessionStorage.getItem("hasVisited");

    if (!hasVisited) {
      setIsFirstTime(true);
      setIsLoading(true);

      const timer = setInterval(() => {
        setProgress((prev) => {
          const newProgress = prev + 10;
          if (newProgress >= 70) {
            clearInterval(timer);
            setIsLoading(false);
            sessionStorage.setItem("hasVisited", "true");
            return 10;
          }
          return newProgress;
        });
      }, 100);

      return () => clearInterval(timer);
    } else {
      setIsLoading(false);
    }

    // Gunakan sessionStorage untuk melacak tab aktif
    sessionStorage.setItem("active", "true");

    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      // Hanya hapus sessionStorage jika tidak ada tab lain yang aktif
      sessionStorage.removeItem("active");
      if (!document.hidden) {
        sessionStorage.removeItem("hasVisited");
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      sessionStorage.removeItem("active");
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  return isLoading ? (
    <Loading progress={progress} />
  ) : (
    <div className=" bg-gradient-to-t from-[#FFE2DC] ">
      <div className="flex xs:container w-full sm:w-full">
        <Navbar />
      <div className="flex-1 xs:container w-full sm:w-full">{children}</div>
      </div>  
    </div>
  );
}
