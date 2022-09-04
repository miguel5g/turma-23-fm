interface FormInputProps {
  id: string;
  label: string;
  onChange: (value: string) => void;
  value: string;
}

export const FormInput: React.FC<FormInputProps> = ({ id, label, onChange, value }) => {
  return (
    <>
      <label className="mt-2 font-light text-slate-600" htmlFor={id}>
        {label}
      </label>
      <input
        id={id}
        type="text"
        className="px-4 py-2 mt-1 transition-colors border border-gray-200 rounded-lg focus:outline-none focus:border-indigo-600"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    </>
  );
};