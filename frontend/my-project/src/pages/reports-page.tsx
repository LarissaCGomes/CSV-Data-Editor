import { useState } from 'react';
import { FileText, Edit, CheckCircle, Upload, Settings, Download, Mail, FileBarChart, Clock, ClipboardCheck } from 'lucide-react';

const ReportsPage = () => {
  const [reportGenerated] = useState(true);
  
  // Dados simulados para o relatório
  const reportData = {
    fileName: "arquivo_campanha_2023.csv",
    processDate: "30/03/2025 14:32",
    originalSize: "2.3 MB",
    totalRows: 432,
    totalColumns: 7,
    errorsFound: 38,
    errorsSummary: [
      { type: "Formato de data", count: 12, percentage: 31.6 },
      { type: "Valores não numéricos", count: 9, percentage: 23.7 },
      { type: "Valores inválidos", count: 8, percentage: 21.1 },
      { type: "Nomes de colunas incorretos", count: 2, percentage: 5.3 },
      { type: "Valores faltantes", count: 7, percentage: 18.4 }
    ],
    autoCorrectionRate: 76,
    manualCorrections: 9,
    processingTime: "1m 28s"
  };
  
  return (
      <div className="flex flex-1 overflow-hidden">
        {/* Main content */}
        <main className="flex-1 p-6 overflow-auto">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Relatório de Processamento</h2>
            <div className="flex gap-3">
              <button className="flex items-center bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                <Download className="h-4 w-4 mr-2" />
                Baixar PDF
              </button>
              <button className="flex items-center bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2">
                <Mail className="h-4 w-4 mr-2" />
                Enviar por Email
              </button>
            </div>
          </div>
          
          {reportGenerated ? (
            <div className="space-y-6">
              {/* Resumo do arquivo */}
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-medium mb-4 flex items-center">
                  <FileText className="h-5 w-5 mr-2 text-blue-600" />
                  Informações do Arquivo
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-gray-50 p-4 rounded-md">
                    <div className="text-sm text-gray-500">Nome do Arquivo</div>
                    <div className="font-medium mt-1">{reportData.fileName}</div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-md">
                    <div className="text-sm text-gray-500">Data de Processamento</div>
                    <div className="font-medium mt-1">{reportData.processDate}</div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-md">
                    <div className="text-sm text-gray-500">Tamanho Original</div>
                    <div className="font-medium mt-1">{reportData.originalSize}</div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-md">
                    <div className="text-sm text-gray-500">Total de Linhas</div>
                    <div className="font-medium mt-1">{reportData.totalRows}</div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-md">
                    <div className="text-sm text-gray-500">Total de Colunas</div>
                    <div className="font-medium mt-1">{reportData.totalColumns}</div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-md">
                    <div className="text-sm text-gray-500">Tempo de Processamento</div>
                    <div className="font-medium mt-1">{reportData.processingTime}</div>
                  </div>
                </div>
              </div>
              
              {/* Análise de erros */}
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-medium mb-4 flex items-center">
                  <FileBarChart className="h-5 w-5 mr-2 text-orange-600" />
                  Análise de Erros Encontrados
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="bg-orange-50 p-4 rounded-md border border-orange-100">
                    <div className="text-orange-800 text-sm">Total de Erros</div>
                    <div className="text-2xl font-semibold text-orange-700 mt-1">{reportData.errorsFound}</div>
                  </div>
                  <div className="bg-green-50 p-4 rounded-md border border-green-100">
                    <div className="text-green-800 text-sm">Taxa de Correção Automática</div>
                    <div className="text-2xl font-semibold text-green-700 mt-1">{reportData.autoCorrectionRate}%</div>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-md border border-blue-100">
                    <div className="text-blue-800 text-sm">Correções Manuais</div>
                    <div className="text-2xl font-semibold text-blue-700 mt-1">{reportData.manualCorrections}</div>
                  </div>
                </div>
                
                <h4 className="text-sm font-medium text-gray-700 mb-3">Distribuição de Erros por Tipo</h4>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="py-2 px-4 text-left text-sm font-medium text-gray-600">Tipo de Erro</th>
                        <th className="py-2 px-4 text-left text-sm font-medium text-gray-600">Ocorrências</th>
                        <th className="py-2 px-4 text-left text-sm font-medium text-gray-600">Percentual</th>
                        <th className="py-2 px-4 text-left text-sm font-medium text-gray-600">Visualização</th>
                      </tr>
                    </thead>
                    <tbody>
                      {reportData.errorsSummary.map((error, idx) => (
                        <tr key={idx} className="border-b">
                          <td className="py-3 px-4">{error.type}</td>
                          <td className="py-3 px-4">{error.count}</td>
                          <td className="py-3 px-4">{error.percentage}%</td>
                          <td className="py-3 px-4">
                            <div className="w-full bg-gray-200 rounded-full h-2.5">
                              <div 
                                className="bg-orange-500 h-2.5 rounded-full" 
                                style={{ width: `${error.percentage}%` }}
                              ></div>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              
              {/* Histórico de correções */}
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-medium mb-4 flex items-center">
                  <Clock className="h-5 w-5 mr-2 text-blue-600" />
                  Histórico de Correções
                </h3>
                
                <div className="space-y-3">
                  <div className="border border-gray-200 rounded-md p-3 flex items-center">
                    <div className="bg-green-100 p-2 rounded-full mr-3">
                      <ClipboardCheck className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <div className="text-sm">Correção automática de 12 erros de formato de data</div>
                      <div className="text-xs text-gray-500 mt-1">30/03/2025 14:28</div>
                    </div>
                  </div>
                  <div className="border border-gray-200 rounded-md p-3 flex items-center">
                    <div className="bg-blue-100 p-2 rounded-full mr-3">
                      <Edit className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <div className="text-sm">Correção manual da coluna 'Local' para 'Local_Coleta'</div>
                      <div className="text-xs text-gray-500 mt-1">30/03/2025 14:29</div>
                    </div>
                  </div>
                  <div className="border border-gray-200 rounded-md p-3 flex items-center">
                    <div className="bg-green-100 p-2 rounded-full mr-3">
                      <ClipboardCheck className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <div className="text-sm">Correção automática de 17 valores não numéricos</div>
                      <div className="text-xs text-gray-500 mt-1">30/03/2025 14:30</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <h3 className="text-xl font-semibold mb-2">Gerando relatório...</h3>
              <p className="text-gray-600">Analisando correções e preparando o relatório detalhado</p>
            </div>
          )}
        </main>
      </div>
  );
};

export default ReportsPage;
