import BuildingImage from '../assets/building-blocks.svg';

export const Loading: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen p-5 items-center justify-center bg-gray-50">
      <img src={BuildingImage} alt="Montando a aplicação" className="max-w-sm" />
      <h1 className="text-4xl text-slate-900 font-title font-bold mt-8">Carregando...</h1>
      <p className="font-light text-slate-600">Estamos preparando a aplicação para você</p>
    </div>
  );
};
