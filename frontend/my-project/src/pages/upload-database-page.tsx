import { useState } from 'react';
import { CheckCircle, Upload, Database, Server, Shield, AlertCircle } from 'lucide-react';

const UploadDatabasePage = () => {
  const [uploadStatus, setUploadStatus] = useState('ready'); // 'ready', 'uploading', 'success', 'error'
  const [showConnectionModal, setShowConnectionModal] = useState(false);
  
  // Dados simulados
  const connectionData = {
    host: "pgserver.labsensoriamento.gov.br",
    database: "agua_qualidade_db",
    username: "admin_lab",
    status: "Conectado",
    lastSync: "30/03/2025 13:45",
    tables: [
      { name: "dados_fisico_quimicos", description: "Parâmetros físico-químicos coletados em campo" },
      { name: "locais_coleta", description: "Informações sobre locais de coleta de amostras" },
      { name: "campanhas", description: "Dados sobre campanhas de monitoramento" }
    ]
  };
  
  const handleUpload = () => {
    setUploadStatus('uploading');
    
    // Simulação de upload
    setTimeout(() => {
      setUploadStatus('success');
    }, 3000);
  };
  
  return (  
      <div className="flex flex-1 overflow-hidden">
        {/* Main content */}
        <main className="flex-1 p-6 overflow-auto">
          <h2 className="text-2xl font-bold mb-6">Envio para o Banco de Dados</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="col-span-2">
              <div className="bg-white p-6 rounded-lg shadow-md h-full">
                <h3 className="text-lg font-medium mb-4 flex items-center">
                  <Database className="h-5 w-5 mr-2 text-blue-600" />
                  Conexão com o Banco de Dados
                </h3>
                
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="border border-gray-200 rounded-md p-3">
                    <div className="text-sm text-gray-500">Servidor</div>
                    <div className="font-medium mt-1 flex items-center">
                      {connectionData.host}
                      <div className="ml-2 h-2 w-2 rounded-full bg-green-500"></div>
                    </div>
                  </div>
                  <div className="border border-gray-200 rounded-md p-3">
                    <div className="text-sm text-gray-500">Banco de Dados</div>
                    <div className="font-medium mt-1">{connectionData.database}</div>
                  </div>
                  <div className="border border-gray-200 rounded-md p-3">
                    <div className="text-sm text-gray-500">Usuário</div>
                    <div className="font-medium mt-1">{connectionData.username}</div>
                  </div>
                  <div className="border border-gray-200 rounded-md p-3">
                    <div className="text-sm text-gray-500">Última Sincronização</div>
                    <div className="font-medium mt-1">{connectionData.lastSync}</div>
                  </div>
                </div>
                
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Tabela de Destino</label>
                  <select className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                    {connectionData.tables.map((table, idx) => (
                      <option key={idx} value={table.name}>{table.name} - {table.description}</option>
                    ))}
                  </select>
                </div>
                
                <div className="flex items-center justify-between">
                  <button 
                    onClick={() => setShowConnectionModal(true)}
                    className="text-blue-600 text-sm hover:text-blue-800 flex items-center"
                  >
                    <Server className="h-4 w-4 mr-1" />
                    Alterar conexão
                  </button>
                  
                  <button 
                    className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center"
                    onClick={handleUpload}
                    disabled={uploadStatus === 'uploading'}
                  >
                    <Database className="h-4 w-4 mr-2" />
                    Testar Conexão
                  </button>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-medium mb-4 flex items-center">
                <Shield className="h-5 w-5 mr-2 text-green-600" />
                Status da Validação
              </h3>
              
              <div className="space-y-4 mb-6">
                <div className="flex items-center">
                  <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center mr-3">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <div className="text-sm font-medium">Verificação de Estrutura</div>
                    <div className="text-xs text-gray-500">Colunas correspondem ao esquema</div>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center mr-3">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <div className="text-sm font-medium">Tipos de Dados</div>
                    <div className="text-xs text-gray-500">Todos os dados com tipos corretos</div>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center mr-3">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <div className="text-sm font-medium">Valores Necessários</div>
                    <div className="text-xs text-gray-500">Campos obrigatórios preenchidos</div>
                  </div>
                </div>
              </div>
              
              <div className="text-center">
                <div className="text-sm text-gray-700 mb-2">O arquivo está pronto para envio</div>
                <div className="text-xs text-gray-500">432 linhas serão inseridas na base de dados</div>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-lg font-medium flex items-center">
                <Upload className="h-5 w-5 mr-2 text-blue-600" />
                Envio para o Banco
              </h3>
              
              <div className="flex items-center gap-2">
                <label className="flex items-center">
                  <input type="checkbox" className="rounded text-blue-600 mr-2" />
                  <span className="text-sm text-gray-700">Manter registro de envio</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="rounded text-blue-600 mr-2" />
                  <span className="text-sm text-gray-700">Notificar por email</span>
                </label>
              </div>
            </div>
            
            {uploadStatus === 'ready' && (
              <div className="border border-gray-200 rounded-lg p-8 text-center mb-4">
                <Database className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h4 className="text-lg font-medium mb-2">Pronto para Enviar</h4>
                <p className="text-gray-600 mb-6">Todos os erros foram corrigidos e os dados estão prontos para serem enviados ao banco</p>
                <button 
                  onClick={handleUpload}
                  className="bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Iniciar Envio
                </button>
              </div>
            )}
            
            {uploadStatus === 'uploading' && (
              <div className="border border-gray-200 rounded-lg p-8 text-center mb-4">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                <h4 className="text-lg font-medium mb-2">Enviando Dados...</h4>
                <p className="text-gray-600 mb-2">Transferindo 432 registros para o banco de dados</p>
                <div className="w-full bg-gray-200 rounded-full h-2.5 mt-4 mb-2">
                  <div className="bg-blue-600 h-2.5 rounded-full w-3/4"></div>
                </div>
                <div className="text-sm text-gray-600">75% concluído</div>
              </div>
            )}
            
            {uploadStatus === 'success' && (
              <div className="border border-green-200 bg-green-50 rounded-lg p-8 text-center mb-4">
                <div className="bg-green-100 rounded-full p-3 inline-block mx-auto mb-4">
                  <CheckCircle className="h-10 w-10 text-green-600" />
                </div>
                <h4 className="text-lg font-medium mb-2">Envio Concluído com Sucesso!</h4>
                <p className="text-gray-700 mb-4">Todos os 432 registros foram inseridos com sucesso no banco de dados.</p>
                <div className="flex justify-center gap-3">
                  <button className="bg-white border border-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-50">
                    Ver Detalhes
                  </button>
                  <button className="bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700">
                    Concluir
                  </button>
                </div>
              </div>
            )}
            
            {uploadStatus === 'error' && (
              <div className="border border-red-200 bg-red-50 rounded-lg p-8 text-center mb-4">
                <div className="bg-red-100 rounded-full p-3 inline-block mx-auto mb-4">
                  <AlertCircle className="h-10 w-10 text-red-600" />
                </div>
                <h4 className="text-lg font-medium mb-2">Erro no Envio</h4>
                <p className="text-gray-700 mb-4">Ocorreu um erro durante o envio dos dados para o banco.</p>
                <div className="bg-white border border-red-100 rounded p-3 mb-4 text-left">
                  <p className="text-sm text-red-800">Erro: Violação de chave estrangeira na coluna "Local_Coleta". A referência "Rio Madeira" não existe na tabela de locais.</p>
                </div>
                <div className="flex justify-center gap-3">
                  <button className="bg-white border border-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-50">
                    Ver Detalhes
                  </button>
                  <button className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700">
                    Voltar para Edição
                  </button>
                </div>
              </div>
            )}
            
            <div className="text-sm text-gray-500">
              Após o envio, os dados estarão disponíveis para consulta através do sistema principal do laboratório.
            </div>
          </div>
          
          {/* Modal de conexão - escondido por padrão */}
          {showConnectionModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
                <h3 className="text-lg font-medium mb-4">Configurar Conexão</h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Servidor</label>
                    <input 
                      type="text" 
                      className="w-full border border-gray-300 rounded-md py-2 px-3" 
                      defaultValue={connectionData.host}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Banco de Dados</label>
                    <input 
                      type="text" 
                      className="w-full border border-gray-300 rounded-md py-2 px-3" 
                      defaultValue={connectionData.database}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Usuário</label>
                    <input 
                      type="text" 
                      className="w-full border border-gray-300 rounded-md py-2 px-3" 
                      defaultValue={connectionData.username}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Senha</label>
                    <input 
                      type="password" 
                      className="w-full border border-gray-300 rounded-md py-2 px-3" 
                      defaultValue="********"
                    />
                  </div>
                </div>
                
                <div className="flex justify-end gap-3 mt-6">
                  <button 
                    onClick={() => setShowConnectionModal(false)}
                    className="bg-white border border-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-50"
                  >
                    Cancelar
                  </button>
                  <button 
                    onClick={() => setShowConnectionModal(false)}
                    className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
                  >
                    Salvar
                  </button>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
  );
};

export default UploadDatabasePage;
