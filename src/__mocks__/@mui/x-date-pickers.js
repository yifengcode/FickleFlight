export const LocalizationProvider = ({ children }: { children: React.ReactNode }) => children;
export const DatePicker = ({ label, onChange, ...props }: any) => (
  <input 
    aria-label={label} 
    onChange={(e) => onChange?.(e.target.value)}
    {...props} 
  />
);