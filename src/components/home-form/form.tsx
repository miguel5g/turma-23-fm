import clsx from 'clsx';

interface FormProps {
  children: React.ReactNode;
  className?: string;
  onSubmit: () => void;
  title: string;
}

export const Form: React.FC<FormProps> = ({ children, className, onSubmit, title }) => {
  function handleFormSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onSubmit();
  }

  return (
    <form className={clsx('flex flex-col', className)} onSubmit={handleFormSubmit}>
      <h3 className="text-2xl font-bold text-slate-900 font-title">{title}</h3>

      {children}
    </form>
  );
};