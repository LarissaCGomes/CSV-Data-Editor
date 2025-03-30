import { useState } from 'react';
import { Upload, FileText, AlertTriangle, AlertCircle } from 'lucide-react';

const Main = () => {
  const [fileUploaded, setFileUploaded] = useState(false);
  const [verificationComplete, setVerificationComplete] = useState(false);
  const [csvData, setCsvData] = useState<{
    columns: string[];
    rows: { id: number; values: string[]; errors: number[] }[];
    columnErrors: number[];
  } | null>(null);
  const [errors, setErrors] = useState<{ type: string; message: string; count: number }[]>([]);

  const sampleData = {
    columns: ['ID', 'Data_Coleta', 'Local', 'pH', 'Temperatura', 'Turbidez', 'Condutividade'],
    rows: [
      {id: 1, values: ['001', '2023-05-10', 'Rio Amazonas', '6.8', '27.5', '12', '189.3'], errors: []},
      {id: 2, values: ['002', '2023-05-10', 'Rio Negro', '5.9', 'vinte e cinco', '8.5', '120.0'], errors: [3]},
      {id: 3, values: ['003', '2023-05-11', 'Lago Mamirauá', '7.2', '26.0', '-1', '142.0'], errors: [4]},
      {id: 4, values: ['004', '2023/05/11', 'Rio Solimões', '6.5', '28.3', '15.0', '155'], errors: [1]},
      {id: 5, values: ['005', '2023-05-12', 'Rio Tapajós', '6.9', '26.8', '9.5', 'NaN'], errors: [6]},
    ],
    columnErrors: [2]
  };

  const handleFileUpload = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    setTimeout(() => {
      setFileUploaded(true);
      setTimeout(() => {
        setVerificationComplete(true);
        setCsvData(sampleData);
        let errorCount = 0;
        sampleData.rows.forEach(row => {
          errorCount += row.errors.length;
        });
        errorCount += sampleData.columnErrors.length;

        setErrors([
          { type: 'column', message: 'Nome de coluna fora do padrão: "Local" (deveria ser "Local_Coleta")', count: 1 },
          { type: 'format', message: 'Formato de data incorreto: encontrado "2023/05/11", esperado "YYYY-MM-DD"', count: 1 },
          { type: 'type', message: 'Erro de tipo: valor não numérico em coluna numérica', count: 2 },
          { type: 'value', message: 'Valor inválido: número negativo ou NaN em medição', count: 2 }
        ]);
      }, 1000);
    }, 1000);
  };

  return (
    <main className="flex-1 p-6 overflow-auto">
      <h2 className="text-2xl font-bold mb-6">Verificação de Arquivo CSV</h2>

      {!fileUploaded ? (
        <div className="bg-white p-8 rounded-lg shadow-md text-center">
          <div className="mb-6">
            <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Upload className="h-10 w-10 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Faça upload do arquivo CSV</h3>
            <p className="text-gray-600 mb-4">O sistema verificará automaticamente se o arquivo está de acordo com o formato esperado</p>
          </div>

          <form onSubmit={handleFileUpload} className="flex flex-col items-center">
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 w-full max-w-md hover:border-blue-400 transition-colors">
              <input type="file" className="hidden" id="file-upload" accept=".csv" />
              <label htmlFor="file-upload" className="cursor-pointer flex flex-col items-center">
                <FileText className="h-12 w-12 text-gray-400 mb-2" />
                <span className="text-gray-600">Clique para selecionar um arquivo ou arraste-o aqui</span>
                <span className="text-sm text-gray-500 mt-1">Apenas arquivos .CSV</span>
              </label>
            </div>

            <button 
              type="submit"
              className="mt-6 bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Verificar Arquivo
            </button>
          </form>
        </div>
      ) : verificationComplete ? (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-medium">Resultados da Verificação</h3>
                <p className="text-sm text-gray-600">arquivo_campanha_2023.csv</p>
              </div>
              <div className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium flex items-center">
                <AlertTriangle className="h-4 w-4 mr-1" />
                {errors.reduce((acc, err) => acc + err.count, 0)} erros encontrados
              </div>
            </div>

            <div className="border rounded-md overflow-hidden mb-4">
              <div className="bg-gray-50 p-3 border-b">
                <h4 className="font-medium">Resumo dos Erros</h4>
              </div>
              <div className="p-4 space-y-3">
                {errors.map((error, idx) => (
                  <div key={idx} className="flex items-start">
                    <AlertCircle className="h-5 w-5 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-gray-800">{error.message}</p>
                      <p className="text-sm text-gray-600">{error.count} ocorrência(s)</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-between">
              <button 
                className="bg-white border border-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Fazer Upload de Outro Arquivo
              </button>
              <button 
                className="bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Prosseguir para Edição
              </button>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md overflow-x-auto">
            <h3 className="text-lg font-medium mb-4">Visualização dos Dados</h3>
            
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-50">
                  {csvData?.columns.map((col, idx) => (
                    <th key={idx} className={`text-left py-3 px-4 border ${csvData.columnErrors.includes(idx) ? 'bg-red-50' : ''}`}>
                      <div className="flex items-center">
                        {col}
                        {csvData.columnErrors.includes(idx) && (
                          <AlertCircle className="h-4 w-4 text-red-500 ml-1" />
                        )}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {csvData?.rows.map((row) => (
                  <tr key={row.id} className="border-b hover:bg-gray-50">
                    {row.values.map((cell, idx) => (
                      <td key={idx} className={`py-3 px-4 ${row.errors.includes(idx) ? 'bg-red-50 text-red-800' : ''}`}>
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="bg-white p-8 rounded-lg shadow-md text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <h3 className="text-xl font-semibold mb-2">Verificando arquivo...</h3>
          <p className="text-gray-600">Analisando estrutura e conteúdo dos dados</p>
        </div>
      )}
    </main>
  );
};

export default Main;
