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
      <img src="https://res.cloudinary.com/drq8o9k36/image/upload/v1665492528/courses-img/Captura_de_Pantalla_2022-10-11_a_la_s_7.48.33_a.m._vy9r5m.png" width="300px" className='my-5 m-auto'/>
      
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
            <th className='font-bold text-2xl bg-redConsufarma p-2 text-white'>Tag</th>
          </tr>
        </thead>
        <tbody>
          {challenge !== undefined && (
            challenge.map(s => (
              <tr className='border-2 text-center' key={s._id}>
                <td className='border-2 p-2'>{s.fecha}</td>
                <td className='border-2 p-2'>{s.nombre}</td>
                <td className='border-2 p-2'>{s.correo}</td>
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