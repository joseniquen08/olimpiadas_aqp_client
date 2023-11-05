interface Props {
  action?: any;
  children: React.ReactNode,
  className: string;
  isPathname: boolean;
}

export function ButtonAside({ action, children, className, isPathname }: Props) {
  return (
    <button type="button" onClick={action} className={`${isPathname ? "bg-emerald-600 text-white" : "border border-emerald-600/50"} hover:bg-emerald-600 hover:text-white px-4 py-2 ${className} text-left rounded-xl font-medium flex justify-between active:scale-95 transition-all duration-75 ease-out`}>
      {children}
    </button>
  )
}