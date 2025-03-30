import { Globe, Save } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-gradient-to-r from-blue-700 to-blue-400 text-white p-2 shadow-md flex justify-between items-center fixed top-0 left-0 w-full z-50">
      <div className="flex items-center space-x-2">
        <Globe className="h-6 w-6" />
        <h1 className="text-xl font-bold tracking-wide">INPE | Sensoriamento Remoto</h1>
      </div>
      
      <div className="flex items-center">
        <button className="bg-white text-blue-600 py-1.5 px-4 rounded-md text-sm font-medium hover:bg-blue-50 transition-colors flex items-center gap-2 shadow-sm">
          <Save className="h-3 w-3" />
          <span>Salvar Progresso</span>
        </button>
      </div>
    </header>
  );
};

export default Header;
