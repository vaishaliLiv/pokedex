import logo from './logo.svg';
import './App.css';
import {AgGridColumn, AgGridReact } from 'ag-grid-react';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { useEffect, useState, useRef } from 'react';

function App() {
  function formatName(user) {
      return user.firstName + ' ~ ' + user.lastName;
  }
  const user = { firstName: 'Vaishali', lastName: 'Desai' };
  const hrefAtt = 'https://www.reactjs.org';
  const element = (
    <h1 className="greeting">
      Hello, world!
    </h1>
  );
  // const rowData = [
  //   { make: "Toyota", model: "Celica", price: 35000 },
  //   { make: "Ford", model: "Mondeo", price: 32000 },
  //   { make: "Porsche", model: "Boxter", price: 72000 }
  // ];

  const [rowData, setRowData] = useState([]);
  const gridRef = useRef(null);

  const onButtonClick = e => {
    const selectedNodes = gridRef.current.api.getSelectedNodes();
    const selectedData= selectedNodes.map( node => node.data);
    const selectedDataStringPresentation = selectedData.map( node => `${node.make} ${node.model}`).join(', ')
    alert(`Selected nodes: ${selectedDataStringPresentation}`);
  }

  useEffect(()=> {
    fetch('https://www.ag-grid.com/example-assets/row-data.json').then(result => result.json())
    .then(rowData => setRowData(rowData))
  }, []);
  return (
    <div className="App">
      <header>
        <img src={logo} className="App-logo" alt="logo" />
        <span>My name is {formatName(user)}</span>
        <span>{element}</span>
        <div className='ag-theme-alpine' style={{height: 400, width: 600}}>
          <button onClick={onButtonClick}>Get Selected Rows</button>
          <AgGridReact 
              rowData={rowData} 
              ref={gridRef}
              reactUi="true"
              animateRows="true"
              rowSelection='multiple'>
            <AgGridColumn field='make' sortable= { true } filter= { true }></AgGridColumn>
            <AgGridColumn field='model'></AgGridColumn>
            <AgGridColumn field='price'></AgGridColumn>
          </AgGridReact>
        </div>
    
        </header>
    </div>
  );
}

export default App;
