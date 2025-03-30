import { useState } from 'react';
import { FileText, CheckCircle, Save, Mail, Database, Bell, Shield, HelpCircle } from 'lucide-react';

const SettingsPage = () => {
  // Estados para as diferentes configurações
  const [csvDelimiter, setCsvDelimiter] = useState(',');
  const [dateFormat, setDateFormat] = useState('YYYY-MM-DD');
  const [decimalSeparator, setDecimalSeparator] = useState('.');
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [autoCorrectEnabled, setAutoCorrectEnabled] = useState(true);
  const [theme, setTheme] = useState('light');
  const [language, setLanguage] = useState('pt-BR');
  const [maxErrorsToShow, setMaxErrorsToShow] = useState(100);
  
  // Estado para exibir mensagem de sucesso
  const [showSuccess, setShowSuccess] = useState(false);
  
  // Exemplo de configurações de banco de dados
  const [dbSettings] = useState({
    host: 'db.laboratorio-sensoriamento.org',
    port: '5432',
    database: 'agua_qualidade_db',
    user: 'admin',
    connectionStatus: 'Conectado'
  });
  
  // Exemplo de usuário atual
  const [currentUser] = useState({
    name: 'Maria Silva',
    email: 'maria.silva@laboratorio.org',
    role: 'Coordenadora'
  });
  
  const handleSaveSettings = () => {
    // Simulação de salvamento
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };
  
  return (
      <div className="flex flex-1 overflow-hidden">
        {/* Main content */}
        <main className="flex-1 p-6 overflow-auto">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Configurações do Sistema</h2>
            
            {showSuccess && (
              <div className="bg-green-100 text-green-800 px-4 py-2 rounded-md flex items-center">
                <CheckCircle className="h-5 w-5 mr-2" />
                Configurações salvas com sucesso!
              </div>
            )}
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Configurações de CSV */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center mb-4">
                <FileText className="h-5 w-5 text-blue-600 mr-2" />
                <h3 className="text-lg font-medium">Configurações de Formato CSV</h3>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Delimitador CSV</label>
                  <select 
                    value={csvDelimiter}
                    onChange={(e) => setCsvDelimiter(e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value=",">Vírgula (,)</option>
                    <option value=";">Ponto e vírgula (;)</option>
                    <option value="\t">Tab</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Formato de Data</label>
                  <select 
                    value={dateFormat}
                    onChange={(e) => setDateFormat(e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="YYYY-MM-DD">AAAA-MM-DD</option>
                    <option value="DD/MM/YYYY">DD/MM/AAAA</option>
                    <option value="MM/DD/YYYY">MM/DD/AAAA</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Separador Decimal</label>
                  <select 
                    value={decimalSeparator}
                    onChange={(e) => setDecimalSeparator(e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value=".">Ponto (.)</option>
                    <option value=",">Vírgula (,)</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Número Máximo de Erros para Exibir</label>
                  <input 
                    type="number" 
                    value={maxErrorsToShow}
                    onChange={(e) => setMaxErrorsToShow(parseInt(e.target.value))}
                    min="10"
                    max="1000"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>
            
            {/* Configurações do Banco de Dados */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center mb-4">
                <Database className="h-5 w-5 text-blue-600 mr-2" />
                <h3 className="text-lg font-medium">Configurações de Banco de Dados</h3>
              </div>
              
              <div className="mb-4 p-3 bg-gray-50 rounded-md">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Status:</span>
                  <span className="text-sm font-medium text-green-600 flex items-center">
                    <span className="h-2 w-2 bg-green-500 rounded-full mr-1.5"></span>
                    {dbSettings.connectionStatus}
                  </span>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Host do Banco</label>
                  <input 
                    type="text" 
                    value={dbSettings.host}
                    disabled
                    className="w-full border border-gray-300 rounded-md px-3 py-2 bg-gray-50"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Porta</label>
                    <input 
                      type="text" 
                      value={dbSettings.port}
                      disabled
                      className="w-full border border-gray-300 rounded-md px-3 py-2 bg-gray-50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nome do Banco</label>
                    <input 
                      type="text" 
                      value={dbSettings.database}
                      disabled
                      className="w-full border border-gray-300 rounded-md px-3 py-2 bg-gray-50"
                    />
                  </div>
                </div>
                
                <button className="mt-2 w-full flex justify-center items-center bg-blue-100 text-blue-800 py-2 px-4 rounded-md hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                  <Shield className="h-4 w-4 mr-2" />
                  Gerenciar Credenciais de Acesso
                </button>
              </div>
            </div>
            
            {/* Configurações de Notificações */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center mb-4">
                <Bell className="h-5 w-5 text-blue-600 mr-2" />
                <h3 className="text-lg font-medium">Notificações e Alertas</h3>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-gray-700">Notificações por E-mail</label>
                  <div className="relative inline-block w-10 align-middle select-none">
                    <input 
                      type="checkbox" 
                      name="toggle" 
                      id="toggleEmail" 
                      className="opacity-0 absolute h-0 w-0"
                      checked={emailNotifications}
                      onChange={() => setEmailNotifications(!emailNotifications)}
                    />
                    <label 
                      htmlFor="toggleEmail" 
                      className={`block overflow-hidden h-6 rounded-full ${emailNotifications ? 'bg-blue-500' : 'bg-gray-300'} cursor-pointer`}
                    >
                      <span className={`block h-6 w-6 rounded-full bg-white transform transition-transform ${emailNotifications ? 'translate-x-4' : 'translate-x-0'}`}></span>
                    </label>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">E-mail para Notificações</label>
                  <div className="flex">
                    <input 
                      type="email" 
                      value={currentUser.email}
                      className="flex-grow border border-gray-300 rounded-l-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button className="bg-blue-100 text-blue-800 px-3 py-2 rounded-r-md border border-l-0 border-gray-300">
                      <Mail className="h-5 w-5" />
                    </button>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-gray-700">Correção Automática</label>
                  <div className="relative inline-block w-10 align-middle select-none">
                    <input 
                      type="checkbox" 
                      name="toggle" 
                      id="toggleAutoCorrect" 
                      className="opacity-0 absolute h-0 w-0"
                      checked={autoCorrectEnabled}
                      onChange={() => setAutoCorrectEnabled(!autoCorrectEnabled)}
                    />
                    <label 
                      htmlFor="toggleAutoCorrect" 
                      className={`block overflow-hidden h-6 rounded-full ${autoCorrectEnabled ? 'bg-blue-500' : 'bg-gray-300'} cursor-pointer`}
                    >
                      <span className={`block h-6 w-6 rounded-full bg-white transform transition-transform ${autoCorrectEnabled ? 'translate-x-4' : 'translate-x-0'}`}></span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Configurações de Interface */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center mb-4">
                <HelpCircle className="h-5 w-5 text-blue-600 mr-2" />
                <h3 className="text-lg font-medium">Preferências de Interface</h3>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Tema</label>
                  <select 
                    value={theme}
                    onChange={(e) => setTheme(e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="light">Claro</option>
                    <option value="dark">Escuro</option>
                    <option value="system">Seguir Sistema</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Idioma</label>
                  <select 
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="pt-BR">Português (Brasil)</option>
                    <option value="en-US">English (US)</option>
                    <option value="es">Español</option>
                  </select>
                </div>
                
                <div className="pt-2 border-t">
                  <div className="flex items-center p-3 bg-blue-50 text-blue-700 rounded-md">
                    <div className="mr-3 bg-blue-100 p-2 rounded-full">
                      <div className="h-6 w-6 rounded-full bg-blue-200 flex items-center justify-center text-blue-600 font-medium">
                        {currentUser.name.charAt(0)}
                      </div>
                    </div>
                    <div>
                      <div className="font-medium">{currentUser.name}</div>
                      <div className="text-xs text-blue-600">{currentUser.role}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-6 flex justify-end">
            <button 
              onClick={handleSaveSettings}
              className="flex items-center bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              <Save className="h-4 w-4 mr-2" />
              Salvar Configurações
            </button>
          </div>
        </main>
      </div>
  );
};

export default SettingsPage;
