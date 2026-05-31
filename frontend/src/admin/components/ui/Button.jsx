export default function Button({
  children,
  variant = "primary",
  size = "md",
  className = "",
  loading,
  ...props
}) {
  const variants = {
    primary: "bg-admin-primary text-white hover:bg-admin-primaryDark",
    secondary: "bg-admin-muted text-admin-text hover:bg-admin-border",
    danger: "bg-red-600 text-white hover:bg-red-700",
    ghost: "text-admin-textMuted hover:bg-admin-muted hover:text-admin-text",
  };
  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-3",
  };
  return (
    <button
      className={`inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-colors duration-200 disabled:opacity-50 ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={loading || props.disabled}
      {...props}
    >
      {loading ? (
        <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
      ) : null}
      {children}
    </button>
  );
}
