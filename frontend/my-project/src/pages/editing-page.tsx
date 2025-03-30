import React, { useState } from 'react';
import { Save, AlertTriangle, Wand2 } from 'lucide-react';

const EditPage = () => {
  // Dados simulados para demonstração
  const initialData = {
    columns: ['ID', 'Data_Coleta', 'Local', 'pH', 'Temperatura', 'Turbidez', 'Condutividade'],
    rows: [
      {id: 1, values: ['001', '2023-05-10', 'Rio Amazonas', '6.8', '27.5', '12', '189.3'], errors: []},
      {id: 2, values: ['002', '2023-05-10', 'Rio Negro', '5.9', 'vinte e cinco', '8.5', '120.0'], errors: [4]},
      {id: 3, values: ['003', '2023-05-11', 'Lago Mamirauá', '7.2', '26.0', '-1', '142.0'], errors: [5]},
      {id: 4, values: ['004', '2023/05/11', 'Rio Solimões', '6.5', '28.3', '15.0', '155'], errors: [1]},
      {id: 5, values: ['005', '2023-05-12', 'Rio Tapajós', '6.9', '26.8', '9.5', 'NaN'], errors: [6]},
    ],
    columnErrors: [2] 
  };
  
  const [csvData, setCsvData] = useState(initialData);
  const [editingCell, setEditingCell] = useState<{ row: number; col: number } | null>(null);
  const [cellValue, setCellValue] = useState('');
  const [editingHeader, setEditingHeader] = useState<number | null>(null);
  const [headerValue, setHeaderValue] = useState('');
  
  // Contagem de erros
  const errorCount = csvData.rows.reduce((acc, row) => acc + row.errors.length, 0) + csvData.columnErrors.length;
  
  const handleCellClick = (rowIndex: number, colIndex: number, value: React.SetStateAction<string>) => {
    setEditingCell({ row: rowIndex, col: colIndex });
    setCellValue(value);
  };
  
  const handleCellChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
    setCellValue(e.target.value);
  };
  
  const handleCellBlur = () => {
    if (editingCell) {
      const newData = {...csvData};
      newData.rows[editingCell.row].values[editingCell.col] = cellValue;
      
      // Remover erro se foi corrigido
      const errorIndex = newData.rows[editingCell.row].errors.indexOf(editingCell.col);
      if (errorIndex > -1) {
        newData.rows[editingCell.row].errors.splice(errorIndex, 1);
      }
      
      setCsvData(newData);
      setEditingCell(null);
    }
  };
  
  const handleHeaderClick = (colIndex: number | null, value: React.SetStateAction<string>) => {
    setEditingHeader(colIndex);
    setHeaderValue(value);
  };
  
  const handleHeaderChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
    setHeaderValue(e.target.value);
  };
  
  const handleHeaderBlur = () => {
    if (editingHeader !== null) {
      const newData = {...csvData};
      newData.columns[editingHeader] = headerValue;
      
      // Remover erro se foi corrigido
      const errorIndex = newData.columnErrors.indexOf(editingHeader);
      if (errorIndex > -1) {
        newData.columnErrors.splice(errorIndex, 1);
      }
      
      setCsvData(newData);
      setEditingHeader(null);
    }
  };
  
  const handleAutoCorrect = () => {
    const newData = {...csvData};
    
    // Corrigir cabeçalho
    if (newData.columnErrors.includes(2)) {
      newData.columns[2] = 'Local_Coleta';
      newData.columnErrors = newData.columnErrors.filter(idx => idx !== 2);
    }
    
    // Corrigir células
    newData.rows.forEach(row => {
      // Corrigir formato de data
      if (row.errors.includes(1)) {
        row.values[1] = row.values[1].replace('/', '-');
        row.errors = row.errors.filter(idx => idx !== 1);
      }
      
      // Corrigir valores de texto para números
      if (row.errors.includes(4)) {
        if (row.values[4] === 'vinte e cinco') {
          row.values[4] = '25.0';
          row.errors = row.errors.filter(idx => idx !== 4);
        }
      }
      
      // Corrigir valores negativos
      if (row.errors.includes(5) && parseFloat(row.values[5]) < 0) {
        row.values[5] = '0.0';
        row.errors = row.errors.filter(idx => idx !== 5);
      }
      
      // Corrigir NaN
      if (row.errors.includes(6) && row.values[6] === 'NaN') {
        row.values[6] = '';
        row.errors = row.errors.filter(idx => idx !== 6);
      }
    });
    
    setCsvData(newData);
  };
  
  return (
      <div className="flex flex-1 overflow-hidden min-h-screen">

        {/* Main content */}
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
          
          <div className="bg-white p-6 rounded-lg shadow-md overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-50">
                  {csvData.columns.map((col, idx) => (
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
                {csvData.rows.map((row, rowIdx) => (
                  <tr key={row.id} className="border-b hover:bg-gray-50">
                    {row.values.map((cell, colIdx) => (
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
      </div>

  );
};

export default EditPage;
