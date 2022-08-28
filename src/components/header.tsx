import { SendSongForm } from '../components/send-song-form';

export const Header: React.FC = () => {
  return (
    <header className="flex flex-col">
      <h1 className="text-4xl font-bold text-center ">Turma 23 FM</h1>
      <p className="mt-2 font-light text-center text-slate-700">
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tenetur perferendis vel quisquam
        nisi ipsum veniam distinctio officiis quas.
      </p>

      <SendSongForm />
    </header>
  );
};
