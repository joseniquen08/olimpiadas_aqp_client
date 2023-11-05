interface Props {
  action?: any;
  children: React.ReactNode,
  className: string;
}

export function Button({ action, children, className }: Props) {
  return (
    <button type="button" onClick={action} className={`border border-emerald-600/50 hover:bg-emerald-600 hover:text-white px-4 py-2 ${className} text-left rounded-lg font-medium flex justify-between active:scale-95 transition-all duration-75 ease-out`}>
      {children}
    </button>
  )
}