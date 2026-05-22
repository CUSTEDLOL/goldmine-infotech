import React from "react";

import { cn } from "@/lib/utils";
interface RainbowButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export function RainbowButton({
  children,
  className,
  ...props
}: RainbowButtonProps) {
  return (
    <button
      className={cn(
        "group relative inline-flex h-14 animate-rainbow cursor-pointer items-center justify-center rounded-xl border-0 bg-[length:200%] px-12 py-4 text-lg font-bold text-white transition-colors [background-clip:padding-box,border-box,border-box] [background-origin:border-box] [border:calc(0.1*1rem)_solid_transparent] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",

        // before styles
        "before:absolute before:bottom-[-20%] before:left-1/2 before:z-0 before:h-1/5 before:w-4/5 before:-translate-x-1/2 before:animate-rainbow before:bg-[linear-gradient(90deg,#ff595e,#ffca3a,#8ac926,#1982c4,#6a4c93,#ff595e)] before:bg-[length:200%] before:[filter:blur(calc(0.8*1rem))]",

        // bg colors - fixing complex CSS function failure by using direct hex colors
        "bg-[linear-gradient(#121213,#121213),linear-gradient(#121213_50%,rgba(18,18,19,0.6)_80%,rgba(18,18,19,0)),linear-gradient(90deg,#ff595e,#ffca3a,#8ac926,#1982c4,#6a4c93,#ff595e)]",

        className,
      )}
      {...props}
    >
      <span className="relative z-10">{children}</span>
    </button>
  );
}
