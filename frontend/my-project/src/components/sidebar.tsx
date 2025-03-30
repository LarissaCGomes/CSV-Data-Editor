import { FileText, Edit, CheckCircle, Upload, Settings, Wand2, FileDown } from 'lucide-react';
import { NavLink } from 'react-router-dom';

const Sidebar = ({ handleAutoCorrect }: { handleAutoCorrect: () => void }) => {
  return (
    <aside className="w-64 bg-white shadow-md min-h-screen">
      <nav className="p-4">
        <ul className="space-y-2">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) => 
                `hover:bg-gray-100 rounded p-2 text-gray-700 flex items-center ${isActive ? 'bg-blue-100 text-blue-800 font-medium' : ''}`
              }
            >
              <FileText className="mr-2 h-5 w-5" />
              Verificação
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/editing-page"
              className={({ isActive }) => 
                `hover:bg-gray-100 rounded p-2 text-gray-700 flex items-center ${isActive ? 'bg-blue-100 text-blue-800 font-medium' : ''}`
              }
            >
              <Edit className="mr-2 h-5 w-5" />
              Edição
            </NavLink>
          </li>

          <li> <NavLink
              to="/reports"
              className={({ isActive }) => 
                `hover:bg-gray-100 rounded p-2 text-gray-700 flex items-center ${isActive ? 'bg-blue-100 text-blue-800 font-medium' : ''}`
              }
            >
               <CheckCircle className="mr-2 h-5 w-5" />
              Relatório
            </NavLink>
          </li>


          <li> <NavLink
              to="/upload-database"
              className={({ isActive }) => 
                `hover:bg-gray-100 rounded p-2 text-gray-700 flex items-center ${isActive ? 'bg-blue-100 text-blue-800 font-medium' : ''}`
              }
            >
               <Upload className="mr-2 h-5 w-5" />
              Envio
            </NavLink>
          </li>

          <li> <NavLink
              to="/settings"
              className={({ isActive }) => 
                `hover:bg-gray-100 rounded p-2 text-gray-700 flex items-center ${isActive ? 'bg-blue-100 text-blue-800 font-medium' : ''}`
              }
            >
                <Settings className="mr-2 h-5 w-5" />
                Configurações
            </NavLink>
          </li>

        </ul>

        <div className="mt-8 border-t pt-4">
          <h3 className="font-medium text-gray-700 mb-2">Ações</h3>
          <div className="space-y-2">
          <button 
              onClick={handleAutoCorrect} 
              className="w-full flex items-center justify-start text-sm p-2 rounded text-gray-700 hover:bg-gray-100"
            >
              <Wand2 className="mr-2 h-4 w-4" />
              Corrigir Todos os Erros
            </button>
            <button className="w-full flex items-center justify-start text-sm p-2 rounded text-gray-700 hover:bg-gray-100">
              <FileDown className="mr-2 h-4 w-4" />
              Exportar CSV Corrigido
            </button>
          </div>
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;
