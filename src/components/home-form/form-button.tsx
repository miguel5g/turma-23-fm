interface FormButtonProps {
  children: React.ReactNode;
}

export const FormButton: React.FC<FormButtonProps> = ({ children }) => {
  return (
    <button className="mt-2 button button-primary" type="submit">
      {children}
    </button>
  );
};
