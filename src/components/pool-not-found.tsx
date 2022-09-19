import NotFoundImage from '../assets/page-not-found.svg';

export const PoolNotFound: React.FC = () => {
  return (
    <div className="flex min-h-screen p-6 items-center justify-center bg-gray-50">
      <div className="flex flex-col text-center items-center">
        <img src={NotFoundImage} alt="Sala não encontrada" className="w-full max-w-sm" />
        <h1 className="text-4xl text-slate-900 font-title font-bold mt-8">
          Não encontramos o que você procura
        </h1>
        <p className="font-light text-slate-600">Talvez algo esteja errado?</p>
      </div>
    </div>
  );
};
