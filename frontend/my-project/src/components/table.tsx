import React from 'react';
import { AlertTriangle, Save, Wand2 } from 'lucide-react';

const Table = ({ csvData, handleCellClick, handleHeaderClick, handleCellChange, handleCellBlur, editingCell, handleHeaderChange, handleHeaderBlur, headerValue, cellValue, editingHeader }: any) => {
  const errorCount = csvData.rows.reduce((acc: number, row: any) => acc + row.errors.length, 0) + csvData.columnErrors.length;

    function handleAutoCorrect(_event: React.MouseEvent<HTMLButtonElement>): void {
        throw new Error('Function not implemented.');
    }

  return (
    <main className="flex-1 p-6 overflow-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Edição de Dados</h2>
        <div className="flex gap-3">
          <button
            onClick={handleAutoCorrect}
            className="flex items-center bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
          >
            <Wand2 className="h-4 w-4 mr-2" />
            Correção Automática
          </button>
          <button
            className="flex items-center bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            <Save className="h-4 w-4 mr-2" />
            Salvar Alterações
          </button>
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg shadow-md mb-6 flex items-center justify-between">
        <div className="flex items-center">
          <div className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium flex items-center mr-4">
            <AlertTriangle className="h-4 w-4 mr-1" />
            {errorCount} erro(s) restante(s)
          </div>
          <span className="text-gray-600 text-sm">arquivo_campanha_2023.csv</span>
        </div>
        <div className="flex gap-2">
          <button className="text-sm text-gray-600 hover:text-gray-900">Filtrar apenas erros</button>
          <span className="text-gray-400">|</span>
          <button className="text-sm text-gray-600 hover:text-gray-900">Redefinir alterações</button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-50">
              {csvData.columns.map((col: string, idx: number) => (
                <th
                  key={idx}
                  className={`text-left py-3 px-4 border font-medium ${csvData.columnErrors.includes(idx) ? 'bg-red-50' : ''}`}
                  onClick={() => handleHeaderClick(idx, col)}
                >
                  {editingHeader === idx ? (
                    <input
                      type="text"
                      value={headerValue}
                      onChange={handleHeaderChange}
                      onBlur={handleHeaderBlur}
                      className="w-full border rounded px-1 py-0.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      autoFocus
                    />
                  ) : (
                    <div className="flex items-center cursor-pointer">
                      {col}
                      {csvData.columnErrors.includes(idx) && (
                        <AlertTriangle className="h-4 w-4 text-red-500 ml-1" />
                      )}
                    </div>
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {csvData.rows.map((row: any, rowIdx: number) => (
              <tr key={row.id} className="border-b hover:bg-gray-50">
                {row.values.map((cell: string, colIdx: number) => (
                  <td
                    key={colIdx}
                    className={`py-3 px-4 ${row.errors.includes(colIdx) ? 'bg-red-50' : ''}`}
                    onClick={() => handleCellClick(rowIdx, colIdx, cell)}
                  >
                    {editingCell && editingCell.row === rowIdx && editingCell.col === colIdx ? (
                      <input
                        type="text"
                        value={cellValue}
                        onChange={handleCellChange}
                        onBlur={handleCellBlur}
                        className="w-full border rounded px-1 py-0.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        autoFocus
                      />
                    ) : (
                      <span className={`${row.errors.includes(colIdx) ? 'text-red-800' : ''}`}>
                        {cell}
                      </span>
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 text-sm text-gray-500">
        Clique em qualquer célula ou nome de coluna para editar. As células em vermelho indicam erros detectados.
      </div>
    </main>
  );
};

export default Table;
