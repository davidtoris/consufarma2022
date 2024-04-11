import React, { useEffect }  from 'react';
import { useSelector } from 'react-redux';
// import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import { useDispatch } from 'react-redux';
import { getResults } from '../../services/resultsService';

const Results = () => {
  const dispatch = useDispatch();
  const { challenge } = useSelector(state => state.results.dataResults);

  useEffect(() => {
    getResults(dispatch);
  }, []);
  
  return (
    <div className="max-w-7xl mx-auto pb-10">
      <img src="../logo.png" width="600px" className='my-5 m-auto'/>
      
      {/* <div className='m-auto text-center'>
        <ReactHTMLTableToExcel
          id="test-table-xls-button"
          className="table-auto max-w-7xl mx-auto bg-greenCustom p-3 text-white font-bold rounded-lg"
          table="table-to-xls"
          filename="tablexls"
          sheet="tablexls"
          buttonText="Descargar"/>
      </div> */}
       
       <table id="table-to-xls" className="table-auto max-w-7xl mx-auto pb-10 mt-8">
        <thead>
          <tr>
            <th className='font-bold text-2xl bg-redConsufarma p-2 text-white'>Fecha</th>
            <th className='font-bold text-2xl bg-redConsufarma p-2 text-white'>Nombre</th>
            <th className='font-bold text-2xl bg-redConsufarma p-2 text-white'>Correo</th>
            {/* <th className='font-bold text-2xl bg-redConsufarma p-2 text-white'>Nombre Invitado</th>
            <th className='font-bold text-2xl bg-redConsufarma p-2 text-white'>Correo Invitado</th> */}
            <th className='font-bold text-2xl bg-redConsufarma p-2 text-white'>Tag</th>
          </tr>
        </thead>
        <tbody>
          {challenge !== undefined && (
            challenge.filter((f) => f.tag === 'webinarAbr24').map(s => (
              <tr className='border-2 text-center' key={s._id}>
                <td className='border-2 p-2'>{s.fecha}</td>
                <td className='border-2 p-2'>{s.nombre}</td>
                <td className='border-2 p-2'>{s.correo}</td>
                {/* <td className='border-2 p-2'>{s.nombreDos}</td>
                <td className='border-2 p-2'>{s.correoDos}</td> */}
                <td className='border-2 p-2'>{s.tag}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
};

export default Results;