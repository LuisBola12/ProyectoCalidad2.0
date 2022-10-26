import React from 'react';
import { utils, writeFile } from 'xlsx';
import '../../App.css';

export const ExportToExcelButton = ( { objectsArray, sheetName, fileName } ) => {

  const handleExport = () => {
    let workBook = utils.book_new(),
      workSheet = utils.json_to_sheet( objectsArray );
    utils.book_append_sheet( workBook, workSheet, sheetName );
    writeFile( workBook, `${fileName}.xlsx` );
  };

  return (
    <>
      <button className='export-excel-button button' onClick={handleExport}> Export to Excel</button>
    </>
  );

};