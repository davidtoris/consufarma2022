import moment from 'moment';
import 'moment/locale/es';
// Formato de fecha / Return => 24 - Ene - 25
export const dateFormat = (fecha) => {
  moment.locale('es');
  let fechaFormato;
  if (fecha) {
    fechaFormato = moment(fecha).format('DD - MMM - YY')
  } else {
    fechaFormato = moment().format('DD - MMM - YY')
  }

  const fechaConMesCapitalizado = fechaFormato.replace(/- ([a-z])/, (match, letra) => `- ${letra.toUpperCase()}`);
  const fechaSinPunto = fechaConMesCapitalizado.replace(/\./g, '');
  return fechaSinPunto
}

export const dateTimeFormat = (fecha) => {
  moment.locale('es');
  const fechaFormato = moment(fecha).format('DD - MMM - YY / HH:mm')
  const fechaConMesCapitalizado = fechaFormato.replace(/- ([a-z])/, (match, letra) => `- ${letra.toUpperCase()}`);
  const fechaSinPunto = fechaConMesCapitalizado.replace(/\./g, '');
  return fechaSinPunto
}
