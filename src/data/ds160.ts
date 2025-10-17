// Config del formulario DS-160 (República Dominicana) — versión "draft"
// Nota: Excluye deliberadamente las últimas preguntas de seguridad.
export type Section = {
  key: string
  title: string
  description?: string
  fields: {
    name: string
    label: string
    placeholder?: string
    type?: 'text' | 'date' | 'number' | 'email' | 'select' | 'textarea'
    options?: { label: string; value: string }[]
    span?: number
  }[]
}

export const DS160_SECTIONS: Section[] = [
  {
    key: 'intro',
    title: 'Inicio',
    description: 'Borrador no oficial del DS-160. Ningún campo es obligatorio. Úsalo para recopilar datos y luego pásalos al sitio oficial.',
    fields: [
      { name: 'oficina', label: 'Oficina/Embajada a aplicar', type: 'select', options: [
        { label: 'Santo Domingo (RD)', value: 'santo-domingo' },
        { label: 'Otra', value: 'otra' }
      ], span: 6 },
      { name: 'idioma', label: 'Idioma preferido', type: 'select', options: [
        { label: 'Español', value: 'es' }, { label: 'Inglés', value: 'en' }
      ], span: 6 },
    ]
  },
  {
    key: 'personal',
    title: 'Datos personales',
    fields: [
      { name: 'apellidos', label: 'Apellidos (tal como en el pasaporte)', placeholder: 'Ej. Pérez García', span: 6 },
      { name: 'nombres', label: 'Nombres', placeholder: 'Ej. Ana María', span: 6 },
      { name: 'sexo', label: 'Sexo', type: 'select', options: [
        { label:'Femenino', value:'F' }, { label:'Masculino', value:'M' }, { label:'Otro', value:'X' }
      ], span: 4 },
      { name: 'estadoCivil', label: 'Estado civil', type: 'select', options: [
        { label:'Soltero/a', value:'single' },
        { label:'Casado/a', value:'married' },
        { label:'Divorciado/a', value:'divorced' },
        { label:'Viudo/a', value:'widowed' }
      ], span: 4 },
      { name: 'fechaNacimiento', label: 'Fecha de nacimiento', type: 'date', span: 4 },
      { name: 'ciudadNacimiento', label: 'Ciudad de nacimiento', span: 6 },
      { name: 'paisNacimiento', label: 'País de nacimiento', span: 6 },
      { name: 'nacionalidad', label: 'Nacionalidad', span: 6 },
      { name: 'Teléfono ', label: 'Teléfono (Whatsapp)', span: 6 },
      { name: 'Correo Electronico', label: 'Correo Electrónico', span: 6 },
      { name: 'Direccion', label: 'Dirección Actual', span: 6 },
    ]
  },
  {
    key: 'pasaporte',
    title: 'Pasaporte',
    fields: [
      { name: 'numeroPasaporte', label: 'Número de pasaporte', span: 6 },
      { name: 'paisEmision', label: 'País de emisión', span: 6 },
      { name: 'fechaEmision', label: 'Fecha de emisión', type: 'date', span: 6 },
      { name: 'fechaExpiracion', label: 'Fecha de expiración', type: 'date', span: 6 },
      { name: 'haPerdidoPasaporte', label: '¿Ha perdido/robado un pasaporte?', type: 'select', options:[
        { label:'No', value:'no' }, { label:'Sí', value:'si' }
      ], span: 6 },
    ]
  },
  {
    key: 'viaje',
    title: 'Plan de viaje',
    fields: [
      { name: 'proposito', label: 'Propósito del viaje', span: 6 },
      { name: 'fechaLlegadaEstimada', label: 'Fecha estimada de llegada', type: 'date', span: 6 },
      { name: 'duracionEstimada', label: 'Duración estimada (días)', type: 'number', span: 6 },
      { name: 'financiador', label: '¿Quién financia el viaje?', span: 6 },
      { name: 'direccionEstadia', label: 'Dirección en EE.UU. (si aplica)', span: 12 },
    ]
  },
  {
    key: 'familia',
    title: 'Familia',
    fields: [
      { name: 'nombrepareja', label: 'Nombre de la pareja', span: 6 },
      { name: 'nombreMadre', label: 'Nombre de la madre', span: 6 },
      { name: 'nombrePadre', label: 'Nombre del padre', span: 6 },
      { name: 'hijos', label: 'Hijos (nombres/edades)', type:'textarea', span: 12 },
    ]
  },
  {
    key: 'Empleo (Plataforma o programa donde labora)',
    title: 'Información del medio (Plataforma o programa donde labora)' ,
    fields: [
      { name: 'correo', label: 'Correo electrónico', type:'email', span: 6 },
      { name: 'telefono', label: 'Teléfono', span: 6 },
      { name: 'direccion', label: 'Dirección', span: 12 },
    ]
  },
  {
    key: 'Otros trabajos',
    title: 'Otros trabajos / Educación',
    fields: [
      { name: 'ocupacionActual', label: 'Ocupación actual', span: 6 },
      { name: 'empleador', label: 'Empleador', span: 6 },
      { name: 'direccionTrabajo', label: 'Dirección del trabajo', span: 12 },
      { name: 'educacion', label: 'Educación (instituciones, fechas, títulos)', type:'textarea', span: 12 },
    ]
  },
  {
    key: 'background',
    title: 'Antecedentes (básico)',
    description: 'Se excluyen intencionalmente las preguntas de seguridad más recientes.',
    fields: [
      { name: 'viajesPreviosEEUU', label: 'Ha solicitado visa alguna vez  para EE.UU. (Qué le respondieron?)', type:'textarea', span: 12 },
      { name: 'visasPrevias', label: 'Ha viajado a otros paises (Ha solicitado visa para otros paises; Qué le respondieron?)', type:'textarea', span: 12 },
    ]
  },
  {
    key: 'extra',
    title: 'Notas adicionales',
    fields: [
      { name: 'notas', label: 'Quiere explicar algúnincidente o cosa que que desee que sepamos, sobre alguna solicitud de visa, bancos, proceso judicial etc', type:'textarea', span: 12 },
    ]
  }
]
