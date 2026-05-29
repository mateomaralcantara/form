// src/data/ds160.ts
// FORM Premium — DS-160 RD amplio/moderno.
// Nota: el DS-160 oficial es dinámico; esta plantilla recopila datos de forma amplia
// para preparar el llenado oficial en CEAC. Ningún campo es obligatorio en esta app.

export type FieldType = 'text' | 'date' | 'number' | 'email' | 'select' | 'textarea'

export type FieldOption = {
  label: string
  value: string
}

export type FieldCondition = {
  field: string
  operator?: 'equals' | 'not_equals' | 'includes' | 'not_empty' | 'empty'
  value?: string | string[] | boolean
}

export type Field = {
  name: string
  label: string
  placeholder?: string
  type?: FieldType
  options?: FieldOption[]
  span?: number
  required?: boolean
  helpText?: string
  sensitive?: boolean
  repeatable?: boolean
  condition?: FieldCondition
  officialSection?: string
  category?: string
}

export type Section = {
  key: string
  title: string
  description?: string
  officialSection?: string
  fields: Field[]
}

export const YES_NO_OPTIONS: FieldOption[] = [
  { label: 'No', value: 'no' },
  { label: 'Sí', value: 'si' },
]

export const VISA_CLASS_OPTIONS: FieldOption[] = [
  { label: 'B1/B2 - Negocios/Turismo', value: 'B1_B2' },
  { label: 'B1 - Negocios', value: 'B1' },
  { label: 'B2 - Turismo/Tratamiento médico', value: 'B2' },
  { label: 'C1/D - Tránsito/Tripulante', value: 'C1_D' },
  { label: 'F1 - Estudiante académico', value: 'F1' },
  { label: 'F2 - Dependiente de F1', value: 'F2' },
  { label: 'M1 - Estudiante vocacional', value: 'M1' },
  { label: 'M2 - Dependiente de M1', value: 'M2' },
  { label: 'J1 - Visitante de intercambio', value: 'J1' },
  { label: 'J2 - Dependiente de J1', value: 'J2' },
  { label: 'H1B - Trabajador especializado', value: 'H1B' },
  { label: 'H2A/H2B - Trabajador temporal', value: 'H2' },
  { label: 'L1 - Transferencia intra-compañía', value: 'L1' },
  { label: 'O/P/Q/R - Categorías especiales', value: 'OPQR' },
  { label: 'I - Medios/periodista', value: 'I' },
  { label: 'K - Prometido(a)/cónyuge', value: 'K' },
  { label: 'E1/E2 - Tratado comerciante/inversionista', value: 'E' },
  { label: 'A/G/NATO - Diplomático/organización', value: 'A_G_NATO' },
  { label: 'Otra / No sé', value: 'other' },
]

export const US_STATES: FieldOption[] = [
  { label: 'No aplica / No sé', value: '' },
  { label: 'Alabama', value: 'AL' },
  { label: 'Alaska', value: 'AK' },
  { label: 'Arizona', value: 'AZ' },
  { label: 'Arkansas', value: 'AR' },
  { label: 'California', value: 'CA' },
  { label: 'Colorado', value: 'CO' },
  { label: 'Connecticut', value: 'CT' },
  { label: 'Delaware', value: 'DE' },
  { label: 'District of Columbia', value: 'DC' },
  { label: 'Florida', value: 'FL' },
  { label: 'Georgia', value: 'GA' },
  { label: 'Hawaii', value: 'HI' },
  { label: 'Idaho', value: 'ID' },
  { label: 'Illinois', value: 'IL' },
  { label: 'Indiana', value: 'IN' },
  { label: 'Iowa', value: 'IA' },
  { label: 'Kansas', value: 'KS' },
  { label: 'Kentucky', value: 'KY' },
  { label: 'Louisiana', value: 'LA' },
  { label: 'Maine', value: 'ME' },
  { label: 'Maryland', value: 'MD' },
  { label: 'Massachusetts', value: 'MA' },
  { label: 'Michigan', value: 'MI' },
  { label: 'Minnesota', value: 'MN' },
  { label: 'Mississippi', value: 'MS' },
  { label: 'Missouri', value: 'MO' },
  { label: 'Montana', value: 'MT' },
  { label: 'Nebraska', value: 'NE' },
  { label: 'Nevada', value: 'NV' },
  { label: 'New Hampshire', value: 'NH' },
  { label: 'New Jersey', value: 'NJ' },
  { label: 'New Mexico', value: 'NM' },
  { label: 'New York', value: 'NY' },
  { label: 'North Carolina', value: 'NC' },
  { label: 'North Dakota', value: 'ND' },
  { label: 'Ohio', value: 'OH' },
  { label: 'Oklahoma', value: 'OK' },
  { label: 'Oregon', value: 'OR' },
  { label: 'Pennsylvania', value: 'PA' },
  { label: 'Rhode Island', value: 'RI' },
  { label: 'South Carolina', value: 'SC' },
  { label: 'South Dakota', value: 'SD' },
  { label: 'Tennessee', value: 'TN' },
  { label: 'Texas', value: 'TX' },
  { label: 'Utah', value: 'UT' },
  { label: 'Vermont', value: 'VT' },
  { label: 'Virginia', value: 'VA' },
  { label: 'Washington', value: 'WA' },
  { label: 'West Virginia', value: 'WV' },
  { label: 'Wisconsin', value: 'WI' },
  { label: 'Wyoming', value: 'WY' },
]

export const DS160_SECTIONS: Section[] = [
  {
    key: 'application_start',
    title: 'Inicio de solicitud',
    description: 'Datos iniciales para preparar el DS-160. Ningún campo es obligatorio en FORM Premium.',
    officialSection: 'Application Information',
    fields: [
      { name: 'applicationLocation', label: 'Lugar/Embajada donde aplicará', type: 'select', options: [
        { label: 'Santo Domingo, República Dominicana', value: 'santo_domingo_do' },
        { label: 'Otra ubicación', value: 'other' },
      ], span: 6 },
      { name: 'applicationLanguage', label: 'Idioma preferido para asistencia', type: 'select', options: [
        { label: 'Español', value: 'es' },
        { label: 'Inglés', value: 'en' },
      ], span: 6 },
      { name: 'visaClass', label: 'Clase/tipo de visa solicitada', type: 'select', options: VISA_CLASS_OPTIONS, span: 6 },
      { name: 'applicationId', label: 'Application ID / AA Number si ya existe', placeholder: 'Ej. AA00...', span: 6 },
      { name: 'ceacSecurityQuestionNote', label: 'Nota sobre pregunta de recuperación/seguridad del CEAC, si ya existe', type: 'textarea', span: 12 },
    ],
  },

  {
    key: 'personal_1',
    title: 'Información personal 1',
    officialSection: 'Personal Information 1',
    fields: [
      { name: 'apellidos', label: 'Apellidos / Surnames tal como aparecen en el pasaporte', span: 6 },
      { name: 'nombres', label: 'Nombres / Given Names tal como aparecen en el pasaporte', span: 6 },
      { name: 'fullNameNativeAlphabet', label: 'Nombre completo en alfabeto nativo, si aplica', span: 6 },
      { name: 'hasOtherNames', label: '¿Ha usado otros nombres, alias, nombre de soltera o nombres anteriores?', type: 'select', options: YES_NO_OPTIONS, span: 6 },
      { name: 'otherNamesDetails', label: 'Detalle de otros nombres usados', type: 'textarea', span: 12, condition: { field: 'hasOtherNames', value: 'si' } },
      { name: 'hasTelecodeName', label: '¿Tiene telecode representando su nombre?', type: 'select', options: YES_NO_OPTIONS, span: 6 },
      { name: 'telecodeSurname', label: 'Telecode de apellidos', span: 6, condition: { field: 'hasTelecodeName', value: 'si' } },
      { name: 'telecodeGivenNames', label: 'Telecode de nombres', span: 6, condition: { field: 'hasTelecodeName', value: 'si' } },
      { name: 'sexo', label: 'Sexo', type: 'select', options: [
        { label: 'Masculino', value: 'M' },
        { label: 'Femenino', value: 'F' },
        { label: 'Otro / según documento', value: 'X' },
      ], span: 4 },
      { name: 'estadoCivil', label: 'Estado civil', type: 'select', options: [
        { label: 'Soltero/a', value: 'single' },
        { label: 'Casado/a', value: 'married' },
        { label: 'Unión libre / common law', value: 'common_law' },
        { label: 'Divorciado/a', value: 'divorced' },
        { label: 'Separado/a', value: 'separated' },
        { label: 'Viudo/a', value: 'widowed' },
        { label: 'Otro', value: 'other' },
      ], span: 4 },
      { name: 'fechaNacimiento', label: 'Fecha de nacimiento', type: 'date', span: 4 },
      { name: 'ciudadNacimiento', label: 'Ciudad de nacimiento', span: 4 },
      { name: 'provinciaNacimiento', label: 'Provincia/Estado de nacimiento', span: 4 },
      { name: 'paisNacimiento', label: 'País de nacimiento', span: 4 },
    ],
  },

  {
    key: 'personal_2',
    title: 'Información personal 2',
    officialSection: 'Personal Information 2',
    fields: [
      { name: 'nacionalidad', label: 'Nacionalidad actual', span: 6 },
      { name: 'otherNationality', label: '¿Tiene o ha tenido otra nacionalidad?', type: 'select', options: YES_NO_OPTIONS, span: 6 },
      { name: 'otherNationalityDetails', label: 'Detalle de otras nacionalidades y documentos relacionados', type: 'textarea', span: 12, condition: { field: 'otherNationality', value: 'si' } },
      { name: 'permanentResidentOtherCountry', label: '¿Es residente permanente de un país distinto a su nacionalidad?', type: 'select', options: YES_NO_OPTIONS, span: 6 },
      { name: 'permanentResidentCountryDetails', label: 'País(es) de residencia permanente', type: 'textarea', span: 12, condition: { field: 'permanentResidentOtherCountry', value: 'si' } },
      { name: 'cedula', label: 'Número de identificación nacional / cédula', span: 6, sensitive: true },
      { name: 'usSocialSecurityNumber', label: 'U.S. Social Security Number, si aplica', span: 6, sensitive: true },
      { name: 'usTaxpayerId', label: 'U.S. Taxpayer ID Number, si aplica', span: 6, sensitive: true },
    ],
  },

  {
    key: 'contact_address',
    title: 'Dirección y contacto',
    officialSection: 'Address and Phone Information',
    fields: [
      { name: 'homeAddressLine1', label: 'Dirección residencial línea 1', span: 12 },
      { name: 'homeAddressLine2', label: 'Dirección residencial línea 2', span: 12 },
      { name: 'homeCity', label: 'Ciudad', span: 4 },
      { name: 'homeStateProvince', label: 'Provincia/Estado', span: 4 },
      { name: 'homePostalCode', label: 'Código postal', span: 4 },
      { name: 'homeCountry', label: 'País', span: 6 },
      { name: 'mailingSameAsHome', label: '¿La dirección postal es igual a la residencial?', type: 'select', options: YES_NO_OPTIONS, span: 6 },
      { name: 'mailingAddressDetails', label: 'Dirección postal si es diferente', type: 'textarea', span: 12, condition: { field: 'mailingSameAsHome', value: 'no' } },
      { name: 'primaryPhone', label: 'Teléfono principal', span: 4 },
      { name: 'secondaryPhone', label: 'Teléfono secundario', span: 4 },
      { name: 'workPhone', label: 'Teléfono de trabajo', span: 4 },
      { name: 'usedOtherPhoneNumbersFiveYears', label: '¿Ha usado otros números telefónicos en los últimos 5 años?', type: 'select', options: YES_NO_OPTIONS, span: 6 },
      { name: 'otherPhoneNumbersDetails', label: 'Otros números telefónicos usados en los últimos 5 años', type: 'textarea', span: 12 },
      { name: 'correo', label: 'Correo electrónico principal', type: 'email', span: 6 },
      { name: 'usedOtherEmailsFiveYears', label: '¿Ha usado otros correos electrónicos en los últimos 5 años?', type: 'select', options: YES_NO_OPTIONS, span: 6 },
      { name: 'otherEmailsDetails', label: 'Otros correos electrónicos usados en los últimos 5 años', type: 'textarea', span: 12 },
    ],
  },

  {
    key: 'social_media',
    title: 'Redes sociales e identificadores en línea',
    officialSection: 'Social Media',
    fields: [
      { name: 'socialMediaUsed', label: '¿Ha usado redes sociales en los últimos 5 años?', type: 'select', options: YES_NO_OPTIONS, span: 6 },
      { name: 'socialMediaIdentifiers', label: 'Plataformas e identificadores/usuarios de redes sociales', type: 'textarea', placeholder: 'Ej. Instagram: usuario; Facebook: usuario; X/Twitter: usuario...', span: 12 },
      { name: 'additionalWebsitesOrApps', label: 'Otros sitios web, perfiles públicos, blogs, canales o aplicaciones donde haya tenido presencia pública', type: 'textarea', span: 12 },
    ],
  },

  {
    key: 'passport',
    title: 'Pasaporte / documento de viaje',
    officialSection: 'Passport Information',
    fields: [
      { name: 'passportType', label: 'Tipo de pasaporte/documento de viaje', type: 'select', options: [
        { label: 'Regular', value: 'regular' },
        { label: 'Oficial', value: 'official' },
        { label: 'Diplomático', value: 'diplomatic' },
        { label: 'Laissez-Passer', value: 'laissez_passer' },
        { label: 'Otro', value: 'other' },
      ], span: 6 },
      { name: 'numeroPasaporte', label: 'Número de pasaporte/documento', span: 6, sensitive: true },
      { name: 'passportBookNumber', label: 'Passport Book Number, si aplica', span: 6 },
      { name: 'passportIssuingCountry', label: 'País/autoridad que emitió el pasaporte', span: 6 },
      { name: 'passportIssueCity', label: 'Ciudad de emisión', span: 4 },
      { name: 'passportIssueState', label: 'Provincia/Estado de emisión', span: 4 },
      { name: 'passportIssueCountry', label: 'País de emisión', span: 4 },
      { name: 'fechaEmision', label: 'Fecha de emisión', type: 'date', span: 6 },
      { name: 'fechaExpiracion', label: 'Fecha de expiración', type: 'date', span: 6 },
      { name: 'passportLostOrStolen', label: '¿Alguna vez ha perdido o le han robado un pasaporte?', type: 'select', options: YES_NO_OPTIONS, span: 6 },
      { name: 'passportLostOrStolenDetails', label: 'Detalle de pasaporte perdido/robado', type: 'textarea', span: 12, condition: { field: 'passportLostOrStolen', value: 'si' } },
    ],
  },

  {
    key: 'travel',
    title: 'Información del viaje',
    officialSection: 'Travel Information',
    fields: [
      { name: 'purposeOfTrip', label: 'Propósito principal del viaje', type: 'select', options: VISA_CLASS_OPTIONS, span: 6 },
      { name: 'specificPurposeExplanation', label: 'Explique el propósito específico del viaje', type: 'textarea', span: 12 },
      { name: 'specificTravelPlans', label: '¿Tiene planes de viaje específicos?', type: 'select', options: YES_NO_OPTIONS, span: 6 },
      { name: 'arrivalDate', label: 'Fecha estimada de llegada a EE.UU.', type: 'date', span: 6 },
      { name: 'arrivalFlight', label: 'Vuelo/línea aérea de llegada, si aplica', span: 6 },
      { name: 'arrivalCity', label: 'Ciudad de llegada', span: 6 },
      { name: 'departureDate', label: 'Fecha estimada de salida de EE.UU.', type: 'date', span: 6 },
      { name: 'departureFlight', label: 'Vuelo/línea aérea de salida, si aplica', span: 6 },
      { name: 'locationsToVisit', label: 'Lugares/ciudades que piensa visitar en EE.UU.', type: 'textarea', span: 12 },
      { name: 'usStayAddressLine1', label: 'Dirección donde se hospedará en EE.UU. línea 1', span: 12 },
      { name: 'usStayAddressLine2', label: 'Dirección donde se hospedará en EE.UU. línea 2', span: 12 },
      { name: 'usStayCity', label: 'Ciudad en EE.UU.', span: 4 },
      { name: 'usStayState', label: 'Estado en EE.UU.', type: 'select', options: US_STATES, span: 4 },
      { name: 'usStayZip', label: 'ZIP Code', span: 4 },
      { name: 'tripLengthNumber', label: 'Duración estimada del viaje - número', type: 'number', span: 6 },
      { name: 'tripLengthUnit', label: 'Unidad de duración', type: 'select', options: [
        { label: 'Días', value: 'days' },
        { label: 'Semanas', value: 'weeks' },
        { label: 'Meses', value: 'months' },
        { label: 'Años', value: 'years' },
      ], span: 6 },
    ],
  },

  {
    key: 'travel_payment',
    title: 'Quién paga el viaje',
    officialSection: 'Travel Information - Person/Entity Paying',
    fields: [
      { name: 'payerType', label: '¿Quién pagará el viaje?', type: 'select', options: [
        { label: 'Yo mismo/a', value: 'self' },
        { label: 'Otra persona', value: 'other_person' },
        { label: 'Empresa/organización', value: 'organization' },
        { label: 'Padres/familia', value: 'family' },
        { label: 'No sé', value: 'unknown' },
      ], span: 6 },
      { name: 'payerName', label: 'Nombre de la persona/entidad que paga', span: 6 },
      { name: 'payerRelationship', label: 'Relación con quien paga', span: 6 },
      { name: 'payerPhone', label: 'Teléfono de quien paga', span: 6 },
      { name: 'payerEmail', label: 'Correo de quien paga', type: 'email', span: 6 },
      { name: 'payerAddress', label: 'Dirección de quien paga', type: 'textarea', span: 12 },
    ],
  },

  {
    key: 'travel_companions',
    title: 'Compañeros de viaje',
    officialSection: 'Travel Companions Information',
    fields: [
      { name: 'travelingWithOthers', label: '¿Viaja con otras personas?', type: 'select', options: YES_NO_OPTIONS, span: 6 },
      { name: 'travelingAsGroup', label: '¿Viaja como parte de un grupo u organización?', type: 'select', options: YES_NO_OPTIONS, span: 6 },
      { name: 'groupName', label: 'Nombre del grupo/organización', span: 12, condition: { field: 'travelingAsGroup', value: 'si' } },
      { name: 'travelCompanionsDetails', label: 'Detalle de acompañantes: nombre completo, relación, fecha de nacimiento', type: 'textarea', span: 12 },
    ],
  },

  {
    key: 'previous_us_travel',
    title: 'Viajes previos a EE.UU.',
    officialSection: 'Previous U.S. Travel Information',
    fields: [
      { name: 'everBeenInUS', label: '¿Ha estado alguna vez en EE.UU.?', type: 'select', options: YES_NO_OPTIONS, span: 6 },
      { name: 'previousUSTravelDetails', label: 'Fechas, duración y propósito de viajes anteriores a EE.UU.', type: 'textarea', span: 12 },
      { name: 'hasUSDriverLicense', label: '¿Tiene o tuvo licencia de conducir de EE.UU.?', type: 'select', options: YES_NO_OPTIONS, span: 6 },
      { name: 'usDriverLicenseDetails', label: 'Número(s) y estado(s) de licencia de conducir de EE.UU.', type: 'textarea', span: 12 },
      { name: 'everIssuedUSVisa', label: '¿Alguna vez le han emitido una visa de EE.UU.?', type: 'select', options: YES_NO_OPTIONS, span: 6 },
      { name: 'lastUSVisaIssueDate', label: 'Fecha de emisión de la última visa de EE.UU.', type: 'date', span: 6 },
      { name: 'lastUSVisaNumber', label: 'Número de la última visa de EE.UU., si lo sabe', span: 6, sensitive: true },
      { name: 'applyingSameTypeVisa', label: '¿Está solicitando el mismo tipo de visa?', type: 'select', options: YES_NO_OPTIONS, span: 6 },
      { name: 'applyingSameCountryLocation', label: '¿Aplica en el mismo país/lugar donde le emitieron la visa anterior?', type: 'select', options: YES_NO_OPTIONS, span: 6 },
      { name: 'tenPrinted', label: '¿Le han tomado las diez huellas digitales?', type: 'select', options: YES_NO_OPTIONS, span: 6 },
      { name: 'visaLostOrStolen', label: '¿Alguna visa de EE.UU. ha sido perdida o robada?', type: 'select', options: YES_NO_OPTIONS, span: 6 },
      { name: 'visaLostOrStolenDetails', label: 'Detalle de visa perdida/robada', type: 'textarea', span: 12 },
      { name: 'visaCancelledOrRevoked', label: '¿Alguna visa de EE.UU. ha sido cancelada o revocada?', type: 'select', options: YES_NO_OPTIONS, span: 6 },
      { name: 'visaCancelledOrRevokedDetails', label: 'Detalle de cancelación/revocación', type: 'textarea', span: 12 },
      { name: 'everRefusedUSVisa', label: '¿Alguna vez le han negado una visa de EE.UU. o entrada a EE.UU.?', type: 'select', options: YES_NO_OPTIONS, span: 6 },
      { name: 'refusalDetails', label: 'Detalle de negación de visa/entrada o retiro de solicitud', type: 'textarea', span: 12 },
      { name: 'immigrantPetitionFiled', label: '¿Alguien ha presentado una petición migratoria para usted ante USCIS?', type: 'select', options: YES_NO_OPTIONS, span: 6 },
      { name: 'immigrantPetitionDetails', label: 'Detalle de petición migratoria', type: 'textarea', span: 12 },
    ],
  },

  {
    key: 'us_contact',
    title: 'Contacto en EE.UU.',
    officialSection: 'U.S. Contact Information',
    fields: [
      { name: 'usContactPersonName', label: 'Nombre de persona contacto en EE.UU.', span: 6 },
      { name: 'usContactOrganization', label: 'Organización contacto en EE.UU.', span: 6 },
      { name: 'usContactRelationship', label: 'Relación con contacto en EE.UU.', span: 6 },
      { name: 'usContactAddressLine1', label: 'Dirección contacto EE.UU. línea 1', span: 12 },
      { name: 'usContactAddressLine2', label: 'Dirección contacto EE.UU. línea 2', span: 12 },
      { name: 'usContactCity', label: 'Ciudad', span: 4 },
      { name: 'usContactState', label: 'Estado', type: 'select', options: US_STATES, span: 4 },
      { name: 'usContactZip', label: 'ZIP Code', span: 4 },
      { name: 'usContactPhone', label: 'Teléfono', span: 6 },
      { name: 'usContactEmail', label: 'Correo electrónico', type: 'email', span: 6 },
    ],
  },

  {
    key: 'family_parents',
    title: 'Familia: padres y familiares en EE.UU.',
    officialSection: 'Family Information - Relatives',
    fields: [
      { name: 'fatherSurname', label: 'Apellidos del padre', span: 6 },
      { name: 'fatherGivenNames', label: 'Nombres del padre', span: 6 },
      { name: 'fatherDateOfBirth', label: 'Fecha de nacimiento del padre', type: 'date', span: 6 },
      { name: 'fatherInUS', label: '¿Su padre está en EE.UU.?', type: 'select', options: YES_NO_OPTIONS, span: 6 },
      { name: 'fatherUSStatus', label: 'Estatus del padre en EE.UU., si aplica', span: 12 },
      { name: 'motherSurname', label: 'Apellidos de la madre', span: 6 },
      { name: 'motherGivenNames', label: 'Nombres de la madre', span: 6 },
      { name: 'motherDateOfBirth', label: 'Fecha de nacimiento de la madre', type: 'date', span: 6 },
      { name: 'motherInUS', label: '¿Su madre está en EE.UU.?', type: 'select', options: YES_NO_OPTIONS, span: 6 },
      { name: 'motherUSStatus', label: 'Estatus de la madre en EE.UU., si aplica', span: 12 },
      { name: 'immediateRelativesInUS', label: '¿Tiene familiares inmediatos en EE.UU. que no sean padres?', type: 'select', options: YES_NO_OPTIONS, span: 6 },
      { name: 'immediateRelativesDetails', label: 'Detalle: nombre, relación, estatus migratorio, ubicación', type: 'textarea', span: 12 },
      { name: 'otherRelativesInUS', label: '¿Tiene otros familiares en EE.UU.?', type: 'select', options: YES_NO_OPTIONS, span: 6 },
      { name: 'otherRelativesDetails', label: 'Detalle de otros familiares en EE.UU.', type: 'textarea', span: 12 },
    ],
  },

  {
    key: 'family_spouse',
    title: 'Familia: cónyuge/pareja e hijos',
    officialSection: 'Family Information - Spouse',
    fields: [
      { name: 'spouseSurname', label: 'Apellidos del cónyuge/pareja', span: 6 },
      { name: 'spouseGivenNames', label: 'Nombres del cónyuge/pareja', span: 6 },
      { name: 'spouseDateOfBirth', label: 'Fecha de nacimiento del cónyuge/pareja', type: 'date', span: 6 },
      { name: 'spouseNationality', label: 'Nacionalidad del cónyuge/pareja', span: 6 },
      { name: 'spouseBirthCity', label: 'Ciudad de nacimiento del cónyuge/pareja', span: 6 },
      { name: 'spouseBirthCountry', label: 'País de nacimiento del cónyuge/pareja', span: 6 },
      { name: 'spouseAddress', label: 'Dirección del cónyuge/pareja', type: 'textarea', span: 12 },
      { name: 'childrenDetails', label: 'Hijos/as: nombre, edad, nacionalidad, viven en EE.UU. o no', type: 'textarea', span: 12 },
    ],
  },

  {
    key: 'work_current',
    title: 'Trabajo/educación actual',
    officialSection: 'Present Work/Education/Training Information',
    fields: [
      { name: 'primaryOccupation', label: 'Ocupación principal actual', span: 6 },
      { name: 'employerOrSchoolName', label: 'Nombre del empleador, negocio, plataforma, programa o institución', span: 6 },
      { name: 'employerAddress', label: 'Dirección del trabajo/escuela', type: 'textarea', span: 12 },
      { name: 'employerPhone', label: 'Teléfono del trabajo/escuela', span: 6 },
      { name: 'employmentStartDate', label: 'Fecha de inicio', type: 'date', span: 6 },
      { name: 'monthlyIncomeLocal', label: 'Ingreso mensual aproximado en moneda local', type: 'number', span: 6 },
      { name: 'jobDuties', label: 'Describa sus funciones principales', type: 'textarea', span: 12 },
    ],
  },

  {
    key: 'work_previous',
    title: 'Trabajos anteriores y educación',
    officialSection: 'Previous Work/Education/Training Information',
    fields: [
      { name: 'previousEmployment', label: '¿Ha tenido empleos anteriores?', type: 'select', options: YES_NO_OPTIONS, span: 6 },
      { name: 'previousEmploymentDetails', label: 'Detalle de empleos anteriores: empresa, cargo, supervisor, fechas, funciones', type: 'textarea', span: 12 },
      { name: 'attendedEducationalInstitutions', label: '¿Ha asistido a instituciones educativas de nivel secundario/superior?', type: 'select', options: YES_NO_OPTIONS, span: 6 },
      { name: 'educationDetails', label: 'Educación: institución, dirección, curso/carrera, fechas, títulos', type: 'textarea', span: 12 },
    ],
  },

  {
    key: 'training_additional',
    title: 'Capacitación, viajes y habilidades',
    officialSection: 'Additional Work/Education/Training Information',
    fields: [
      { name: 'belongsToClanOrTribe', label: '¿Pertenece a un clan o tribu?', type: 'select', options: YES_NO_OPTIONS, span: 6 },
      { name: 'clanOrTribeDetails', label: 'Detalle de clan/tribu', span: 12 },
      { name: 'languagesSpoken', label: 'Idiomas que habla', type: 'textarea', span: 12 },
      { name: 'countriesVisitedLastFiveYears', label: 'Países visitados en los últimos 5 años', type: 'textarea', span: 12 },
      { name: 'belongsToOrganizations', label: '¿Pertenece, contribuye o trabaja con organizaciones profesionales, sociales o caritativas?', type: 'select', options: YES_NO_OPTIONS, span: 6 },
      { name: 'organizationsDetails', label: 'Detalle de organizaciones', type: 'textarea', span: 12 },
      { name: 'specializedSkillsTraining', label: '¿Tiene entrenamiento o habilidades especializadas, incluyendo armas, explosivos, nuclear, biológico o químico?', type: 'select', options: YES_NO_OPTIONS, span: 6 },
      { name: 'specializedSkillsDetails', label: 'Detalle de habilidades/entrenamiento especializado', type: 'textarea', span: 12 },
      { name: 'militaryService', label: '¿Ha servido en fuerzas armadas?', type: 'select', options: YES_NO_OPTIONS, span: 6 },
      { name: 'militaryServiceDetails', label: 'Detalle de servicio militar: país, rama, rango, especialidad, fechas', type: 'textarea', span: 12 },
      { name: 'paramilitaryService', label: '¿Ha servido o participado en organización paramilitar, vigilante, rebelde, guerrilla o insurgente?', type: 'select', options: YES_NO_OPTIONS, span: 6 },
      { name: 'paramilitaryServiceDetails', label: 'Detalle de participación paramilitar/rebelde/insurgente', type: 'textarea', span: 12 },
    ],
  },

  {
    key: 'student_exchange',
    title: 'Estudiante / intercambio',
    officialSection: 'Student/Exchange Visitor Information',
    fields: [
      { name: 'sevisId', label: 'SEVIS ID, si aplica', span: 6 },
      { name: 'schoolProgramName', label: 'Nombre de escuela/programa', span: 6 },
      { name: 'schoolProgramAddress', label: 'Dirección de escuela/programa', type: 'textarea', span: 12 },
      { name: 'courseOfStudy', label: 'Curso/carrera/programa de estudio', span: 12 },
      { name: 'programStartDate', label: 'Fecha de inicio del programa', type: 'date', span: 6 },
      { name: 'programEndDate', label: 'Fecha de finalización del programa', type: 'date', span: 6 },
      { name: 'programFundingDetails', label: 'Detalle de financiamiento del programa', type: 'textarea', span: 12 },
    ],
  },

  {
    key: 'petition_worker',
    title: 'Visa basada en petición / trabajo temporal',
    officialSection: 'Petition/Temporary Worker Information',
    fields: [
      { name: 'petitionReceiptNumber', label: 'Número de recibo de petición USCIS, si aplica', span: 6 },
      { name: 'petitionerName', label: 'Nombre del peticionario/empleador', span: 6 },
      { name: 'petitionerAddress', label: 'Dirección del peticionario/empleador', type: 'textarea', span: 12 },
      { name: 'petitionerPhone', label: 'Teléfono del peticionario/empleador', span: 6 },
      { name: 'jobTitleUS', label: 'Cargo/posición en EE.UU.', span: 6 },
      { name: 'jobDutiesUS', label: 'Funciones en EE.UU.', type: 'textarea', span: 12 },
    ],
  },

  {
    key: 'security_medical',
    title: 'Seguridad y antecedentes: salud',
    officialSection: 'Security and Background - Part 1',
    fields: [
      { name: 'communicableDiseasePublicHealth', label: '¿Tiene una enfermedad transmisible de importancia para la salud pública?', type: 'select', options: YES_NO_OPTIONS, span: 12, sensitive: true },
      { name: 'mentalOrPhysicalDisorderHarmful', label: '¿Tiene trastorno físico o mental asociado con comportamiento dañino o amenaza de daño?', type: 'select', options: YES_NO_OPTIONS, span: 12, sensitive: true },
      { name: 'drugAbuserOrAddict', label: '¿Es o ha sido consumidor abusivo o adicto a drogas?', type: 'select', options: YES_NO_OPTIONS, span: 12, sensitive: true },
      { name: 'medicalSecurityDetails', label: 'Detalles de respuestas afirmativas sobre salud', type: 'textarea', span: 12, sensitive: true },
    ],
  },

  {
    key: 'security_criminal',
    title: 'Seguridad y antecedentes: delitos',
    officialSection: 'Security and Background - Part 2',
    fields: [
      { name: 'arrestedOrConvicted', label: '¿Ha sido arrestado o condenado por algún delito, aunque haya recibido perdón, amnistía u otra acción similar?', type: 'select', options: YES_NO_OPTIONS, span: 12, sensitive: true },
      { name: 'controlledSubstancesViolation', label: '¿Ha violado o conspirado para violar leyes relacionadas con sustancias controladas?', type: 'select', options: YES_NO_OPTIONS, span: 12, sensitive: true },
      { name: 'prostitutionOrCommercializedVice', label: '¿Ha participado en prostitución o vicio comercializado en los últimos 10 años?', type: 'select', options: YES_NO_OPTIONS, span: 12, sensitive: true },
      { name: 'moneyLaundering', label: '¿Ha participado o buscado participar en lavado de dinero?', type: 'select', options: YES_NO_OPTIONS, span: 12, sensitive: true },
      { name: 'humanTrafficking', label: '¿Ha cometido o conspirado para cometer trata de personas?', type: 'select', options: YES_NO_OPTIONS, span: 12, sensitive: true },
      { name: 'assistedHumanTrafficking', label: '¿Ha ayudado, promovido o facilitado trata de personas?', type: 'select', options: YES_NO_OPTIONS, span: 12, sensitive: true },
      { name: 'benefitedFromHumanTrafficking', label: '¿Ha recibido beneficio de actividades de trata de personas de un familiar cercano?', type: 'select', options: YES_NO_OPTIONS, span: 12, sensitive: true },
      { name: 'criminalSecurityDetails', label: 'Detalles de respuestas afirmativas sobre delitos', type: 'textarea', span: 12, sensitive: true },
    ],
  },

  {
    key: 'security_national',
    title: 'Seguridad y antecedentes: seguridad nacional',
    officialSection: 'Security and Background - Part 3',
    fields: [
      { name: 'espionageSabotageExportControl', label: '¿Busca participar en espionaje, sabotaje, violaciones de control de exportación u otra actividad ilegal en EE.UU.?', type: 'select', options: YES_NO_OPTIONS, span: 12, sensitive: true },
      { name: 'terroristActivities', label: '¿Ha participado o piensa participar en actividades terroristas?', type: 'select', options: YES_NO_OPTIONS, span: 12, sensitive: true },
      { name: 'terroristSupport', label: '¿Ha proporcionado apoyo financiero u otro apoyo a terroristas u organizaciones terroristas?', type: 'select', options: YES_NO_OPTIONS, span: 12, sensitive: true },
      { name: 'terroristOrganizationMember', label: '¿Es miembro o representante de una organización terrorista?', type: 'select', options: YES_NO_OPTIONS, span: 12, sensitive: true },
      { name: 'familyTerroristActivity', label: '¿Tiene familiar cercano involucrado en actividad terrorista?', type: 'select', options: YES_NO_OPTIONS, span: 12, sensitive: true },
      { name: 'genocide', label: '¿Ha ordenado, incitado, cometido, asistido o participado en genocidio?', type: 'select', options: YES_NO_OPTIONS, span: 12, sensitive: true },
      { name: 'torture', label: '¿Ha cometido, ordenado, incitado, asistido o participado en tortura?', type: 'select', options: YES_NO_OPTIONS, span: 12, sensitive: true },
      { name: 'extrajudicialKillings', label: '¿Ha cometido, ordenado, asistido o participado en ejecuciones extrajudiciales, asesinatos políticos u otros actos de violencia?', type: 'select', options: YES_NO_OPTIONS, span: 12, sensitive: true },
      { name: 'childSoldiers', label: '¿Ha reclutado o usado niños soldados?', type: 'select', options: YES_NO_OPTIONS, span: 12, sensitive: true },
      { name: 'religiousFreedomViolations', label: '¿Ha sido responsable o ha participado directamente en violaciones graves de libertad religiosa?', type: 'select', options: YES_NO_OPTIONS, span: 12, sensitive: true },
      { name: 'populationControlCoercion', label: '¿Ha participado en aborto forzado, esterilización forzada u otro control coercitivo de población?', type: 'select', options: YES_NO_OPTIONS, span: 12, sensitive: true },
      { name: 'coerciveOrganTransplant', label: '¿Ha participado en trasplante coercitivo de órganos o tejidos humanos?', type: 'select', options: YES_NO_OPTIONS, span: 12, sensitive: true },
      { name: 'nationalSecurityDetails', label: 'Detalles de respuestas afirmativas sobre seguridad nacional', type: 'textarea', span: 12, sensitive: true },
    ],
  },

  {
    key: 'security_immigration',
    title: 'Seguridad y antecedentes: leyes migratorias',
    officialSection: 'Security and Background - Part 4',
    fields: [
      { name: 'immigrationFraudMisrepresentation', label: '¿Ha buscado obtener o ayudar a otros a obtener visa, entrada o beneficio migratorio mediante fraude o tergiversación?', type: 'select', options: YES_NO_OPTIONS, span: 12, sensitive: true },
      { name: 'deportedOrRemoved', label: '¿Ha sido deportado, removido o excluido de EE.UU.?', type: 'select', options: YES_NO_OPTIONS, span: 12, sensitive: true },
      { name: 'unlawfulPresenceOverstay', label: '¿Ha estado ilegalmente presente, excedido estadía o violado términos de visa en EE.UU.?', type: 'select', options: YES_NO_OPTIONS, span: 12, sensitive: true },
      { name: 'withheldChildCustody', label: '¿Ha retenido custodia de un menor ciudadano estadounidense fuera de EE.UU. en violación de derechos legales?', type: 'select', options: YES_NO_OPTIONS, span: 12, sensitive: true },
      { name: 'votedUnlawfullyUS', label: '¿Ha votado en EE.UU. violando leyes o regulaciones?', type: 'select', options: YES_NO_OPTIONS, span: 12, sensitive: true },
      { name: 'renouncedCitizenshipForTax', label: '¿Ha renunciado a ciudadanía estadounidense para evitar impuestos?', type: 'select', options: YES_NO_OPTIONS, span: 12, sensitive: true },
      { name: 'immigrationSecurityDetails', label: 'Detalles de respuestas afirmativas sobre leyes migratorias', type: 'textarea', span: 12, sensitive: true },
    ],
  },

  {
    key: 'security_misc',
    title: 'Seguridad y antecedentes: otros temas',
    officialSection: 'Security and Background - Part 5',
    fields: [
      { name: 'polygamy', label: '¿Practica la poligamia o piensa practicarla en EE.UU.?', type: 'select', options: YES_NO_OPTIONS, span: 12, sensitive: true },
      { name: 'childAbductionInternational', label: '¿Ha participado en secuestro internacional de menores o retención ilícita de menores?', type: 'select', options: YES_NO_OPTIONS, span: 12, sensitive: true },
      { name: 'violatedReligiousFreedomAsOfficial', label: '¿Como funcionario, ha sido responsable de violaciones graves de libertad religiosa?', type: 'select', options: YES_NO_OPTIONS, span: 12, sensitive: true },
      { name: 'servedInForeignGovernmentAbuses', label: '¿Ha servido en gobierno/unidad implicada en violaciones severas de derechos humanos?', type: 'select', options: YES_NO_OPTIONS, span: 12, sensitive: true },
      { name: 'publicChargeConcern', label: 'Explique cualquier situación financiera, médica o familiar que deba considerarse para demostrar solvencia y propósito de viaje', type: 'textarea', span: 12, sensitive: true },
      { name: 'miscSecurityDetails', label: 'Detalles adicionales de seguridad/antecedentes', type: 'textarea', span: 12, sensitive: true },
    ],
  },

  {
    key: 'preparer',
    title: 'Persona que ayudó a llenar el formulario',
    officialSection: 'Preparer Information',
    fields: [
      { name: 'applicationPreparedByOther', label: '¿Alguien le ayudó a preparar este formulario?', type: 'select', options: YES_NO_OPTIONS, span: 6 },
      { name: 'preparerSurname', label: 'Apellidos del preparador', span: 6 },
      { name: 'preparerGivenNames', label: 'Nombres del preparador', span: 6 },
      { name: 'preparerOrganization', label: 'Organización del preparador', span: 6 },
      { name: 'preparerRelationship', label: 'Relación con el solicitante', span: 6 },
      { name: 'preparerAddress', label: 'Dirección del preparador', type: 'textarea', span: 12 },
      { name: 'preparerPhone', label: 'Teléfono del preparador', span: 6 },
      { name: 'preparerEmail', label: 'Correo del preparador', type: 'email', span: 6 },
    ],
  },

  {
    key: 'review_notes',
    title: 'Notas internas y revisión',
    officialSection: 'Review',
    fields: [
      { name: 'clientInternalNotes', label: 'Notas internas del cliente o asesor', type: 'textarea', span: 12 },
      { name: 'documentsPending', label: 'Documentos pendientes para revisar', type: 'textarea', span: 12 },
      { name: 'reviewWarnings', label: 'Advertencias o inconsistencias detectadas', type: 'textarea', span: 12 },
      { name: 'clientDeclaration', label: 'Declaración: el cliente confirma que la información suministrada es verdadera según su conocimiento', type: 'select', options: YES_NO_OPTIONS, span: 12 },
    ],
  },
]