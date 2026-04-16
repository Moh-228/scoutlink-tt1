import { forwardRef, type InputHTMLAttributes } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  id: string;
};

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { label, className = "", id, ...props },
  ref,
) {
  return (
    <label htmlFor={id} className="flex flex-col gap-1.5 text-sm font-medium text-slate-700">
      {label ? <span>{label}</span> : null}
      <input
        id={id}
        ref={ref}
        className={[
          "w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 shadow-sm outline-none transition-colors placeholder:text-slate-400 focus:border-cyan-600",
          className,
        ]
          .filter(Boolean)
          .join(" ")}
        {...props}
      />
    </label>
  );
});
