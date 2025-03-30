
const Header = () => {
  return (
    <header className="bg-blue-600 text-white p-4 shadow flex justify-between items-center">
      <h1 className="text-xl font-bold"> INPE - Sensoriamento Remoto</h1>
      <div className="flex items-center gap-2">
        <button className="bg-white text-blue-600 py-1 px-3 rounded text-sm hover:bg-blue-50">
          Salvar Progresso
        </button>
      </div>
    </header>
  );
};

export default Header;
