interface Props {
  action?: any;
  children: React.ReactNode,
  className: string;
  isPathname: boolean;
}

export function ButtonAside({ action, children, className, isPathname }: Props) {
  return (
    <button type="button" onClick={action} className={`${isPathname ? "bg-emerald-600 text-white" : "border-b border-emerald-600/50 hover:bg-emerald-100"} px-4 py-2 ${className} text-left font-medium flex justify-between`}>
      {children}
    </button>
  )
}