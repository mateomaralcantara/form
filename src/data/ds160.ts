// src/data/ds160.ts
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
  { label: 'Florida', value: 'FL' },
  { label: 'New York', value: 'NY' },
  { label: 'New Jersey', value: 'NJ' },
  { label: 'Massachusetts', value: 'MA' },
  { label: 'Pennsylvania', value: 'PA' },
  { label: 'Texas', value: 'TX' },
  { label: 'California', value: 'CA' },
  { label: 'Otro estado', value: 'OTHER' },
]

export const DS160_SECTIONS: Section[] = [
  {
    key: 'application_start',
    title: 'Inicio de solicitud',
    description: 'Datos iniciales para preparar el DS-160. Ningún campo es obligatorio en FORM Premium.',
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
    fields: [
      { name: 'socialMediaUsed', label: '¿Ha usado redes sociales en los últimos 5 años?', type: 'select', options: YES_NO_OPTIONS, span: 6 },
      { name: 'socialMediaIdentifiers', label: 'Plataformas e identificadores/usuarios de redes sociales', type: 'textarea', placeholder: 'Ej. Instagram: usuario; Facebook: usuario; X/Twitter: usuario...', span: 12 },
      { name: 'additionalWebsitesOrApps', label: 'Otros sitios web, perfiles públicos, blogs, canales o aplicaciones donde haya tenido presencia pública', type: 'textarea', span: 12 },
    ],
  },
  {
    key: 'passport',
    title: 'Pasaporte / documento de viaje',
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
    fields: [
      { name: 'everBeenInUS', label: '¿Ha estado alguna vez en EE.UU.?', type: 'select', options: YES_NO_OPTIONS, span: 6 },
      { name: 'previousUSTravelDetails', label: 'Fechas, duración y propósito de viajes anteriores a EE.UU.', type: 'textarea', span: 12 },
      { name: 'hasUSDriverLicense', label: '¿Tiene o tuvo licencia de conducir de EE.UU.?', type: 'select', options: YES_NO_OPTIONS, span: 6 },
      { name: 'usDriverLicenseDetails', label: 'Número(s) y estado(s) de licencia de conducir de EE.UU.', type: 'textarea', span: 12 },
      { name: 'everIssuedUSVisa', label: '¿Alguna vez le han emitido una visa de EE.UU.?', type: 'select', options: YES_NO_OPTIONS, span: 6 },
      { name: 'lastUSVisaIssueDate', label: 'Fecha de emisión de la última visa de EE.UU.', type: 'date', span: 6 },
      { name: 'lastUSVisaNumber', label: 'Número de la última visa de EE.UU., si lo sabe', span: 6, sensitive: true },
      { name: 'everRefusedUSVisa', label: '¿Alguna vez le han negado una visa de EE.UU. o entrada a EE.UU.?', type: 'select', options: YES_NO_OPTIONS, span: 6 },
      { name: 'refusalDetails', label: 'Detalle de negación de visa/entrada o retiro de solicitud', type: 'textarea', span: 12 },
      { name: 'immigrantPetitionFiled', label: '¿Alguien ha presentado una petición migratoria para usted ante USCIS?', type: 'select', options: YES_NO_OPTIONS, span: 6 },
      { name: 'immigrantPetitionDetails', label: 'Detalle de petición migratoria', type: 'textarea', span: 12 },
    ],
  },
  {
    key: 'us_contact',
    title: 'Contacto en EE.UU.',
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
    key: 'family',
    title: 'Familia: padres, cónyuge, hijos y familiares en EE.UU.',
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
      { name: 'spouseSurname', label: 'Apellidos del cónyuge/pareja', span: 6 },
      { name: 'spouseGivenNames', label: 'Nombres del cónyuge/pareja', span: 6 },
      { name: 'spouseDateOfBirth', label: 'Fecha de nacimiento del cónyuge/pareja', type: 'date', span: 6 },
      { name: 'spouseNationality', label: 'Nacionalidad del cónyuge/pareja', span: 6 },
      { name: 'childrenDetails', label: 'Hijos/as: nombre, edad, nacionalidad, viven en EE.UU. o no', type: 'textarea', span: 12 },
      { name: 'immediateRelativesInUS', label: '¿Tiene familiares inmediatos en EE.UU. que no sean padres?', type: 'select', options: YES_NO_OPTIONS, span: 6 },
      { name: 'immediateRelativesDetails', label: 'Detalle: nombre, relación, estatus migratorio, ubicación', type: 'textarea', span: 12 },
      { name: 'otherRelativesInUS', label: '¿Tiene otros familiares en EE.UU.?', type: 'select', options: YES_NO_OPTIONS, span: 6 },
      { name: 'otherRelativesDetails', label: 'Detalle de otros familiares en EE.UU.', type: 'textarea', span: 12 },
    ],
  },
  {
    key: 'work_education',
    title: 'Trabajo, educación y capacitación',
    fields: [
      { name: 'primaryOccupation', label: 'Ocupación principal actual', span: 6 },
      { name: 'employerOrSchoolName', label: 'Nombre del empleador, negocio, plataforma, programa o institución', span: 6 },
      { name: 'employerAddress', label: 'Dirección del trabajo/escuela', type: 'textarea', span: 12 },
      { name: 'employerPhone', label: 'Teléfono del trabajo/escuela', span: 6 },
      { name: 'employmentStartDate', label: 'Fecha de inicio', type: 'date', span: 6 },
      { name: 'monthlyIncomeLocal', label: 'Ingreso mensual aproximado en moneda local', type: 'number', span: 6 },
      { name: 'jobDuties', label: 'Describa sus funciones principales', type: 'textarea', span: 12 },
      { name: 'previousEmployment', label: '¿Ha tenido empleos anteriores?', type: 'select', options: YES_NO_OPTIONS, span: 6 },
      { name: 'previousEmploymentDetails', label: 'Detalle de empleos anteriores: empresa, cargo, supervisor, fechas, funciones', type: 'textarea', span: 12 },
      { name: 'attendedEducationalInstitutions', label: '¿Ha asistido a instituciones educativas de nivel secundario/superior?', type: 'select', options: YES_NO_OPTIONS, span: 6 },
      { name: 'educationDetails', label: 'Educación: institución, dirección, curso/carrera, fechas, títulos', type: 'textarea', span: 12 },
      { name: 'languagesSpoken', label: 'Idiomas que habla', type: 'textarea', span: 12 },
      { name: 'countriesVisitedLastFiveYears', label: 'Países visitados en los últimos 5 años', type: 'textarea', span: 12 },
      { name: 'belongsToOrganizations', label: '¿Pertenece a organizaciones profesionales, sociales o caritativas?', type: 'select', options: YES_NO_OPTIONS, span: 6 },
      { name: 'organizationsDetails', label: 'Detalle de organizaciones', type: 'textarea', span: 12 },
    ],
  },
  {
    key: 'student_petition',
    title: 'Estudiante, intercambio o visa basada en petición',
    fields: [
      { name: 'sevisId', label: 'SEVIS ID, si aplica', span: 6 },
      { name: 'schoolProgramName', label: 'Nombre de escuela/programa', span: 6 },
      { name: 'schoolProgramAddress', label: 'Dirección de escuela/programa', type: 'textarea', span: 12 },
      { name: 'courseOfStudy', label: 'Curso/carrera/programa de estudio', span: 12 },
      { name: 'programStartDate', label: 'Fecha de inicio del programa', type: 'date', span: 6 },
      { name: 'programEndDate', label: 'Fecha de finalización del programa', type: 'date', span: 6 },
      { name: 'programFundingDetails', label: 'Detalle de financiamiento del programa', type: 'textarea', span: 12 },
      { name: 'petitionReceiptNumber', label: 'Número de recibo de petición USCIS, si aplica', span: 6 },
      { name: 'petitionerName', label: 'Nombre del peticionario/empleador', span: 6 },
      { name: 'petitionerAddress', label: 'Dirección del peticionario/empleador', type: 'textarea', span: 12 },
      { name: 'jobTitleUS', label: 'Cargo/posición en EE.UU.', span: 6 },
      { name: 'jobDutiesUS', label: 'Funciones en EE.UU.', type: 'textarea', span: 12 },
    ],
  },
  {
    key: 'security_background',
    title: 'Seguridad y antecedentes',
    fields: [
      { name: 'communicableDiseasePublicHealth', label: '¿Tiene una enfermedad transmisible de importancia para la salud pública?', type: 'select', options: YES_NO_OPTIONS, span: 12, sensitive: true },
      { name: 'mentalOrPhysicalDisorderHarmful', label: '¿Tiene trastorno físico o mental asociado con comportamiento dañino o amenaza de daño?', type: 'select', options: YES_NO_OPTIONS, span: 12, sensitive: true },
      { name: 'drugAbuserOrAddict', label: '¿Es o ha sido consumidor abusivo o adicto a drogas?', type: 'select', options: YES_NO_OPTIONS, span: 12, sensitive: true },
      { name: 'arrestedOrConvicted', label: '¿Ha sido arrestado o condenado por algún delito?', type: 'select', options: YES_NO_OPTIONS, span: 12, sensitive: true },
      { name: 'controlledSubstancesViolation', label: '¿Ha violado leyes relacionadas con sustancias controladas?', type: 'select', options: YES_NO_OPTIONS, span: 12, sensitive: true },
      { name: 'prostitutionOrCommercializedVice', label: '¿Ha participado en prostitución o vicio comercializado en los últimos 10 años?', type: 'select', options: YES_NO_OPTIONS, span: 12, sensitive: true },
      { name: 'moneyLaundering', label: '¿Ha participado o buscado participar en lavado de dinero?', type: 'select', options: YES_NO_OPTIONS, span: 12, sensitive: true },
      { name: 'humanTrafficking', label: '¿Ha cometido, facilitado o recibido beneficio de trata de personas?', type: 'select', options: YES_NO_OPTIONS, span: 12, sensitive: true },
      { name: 'espionageSabotageExportControl', label: '¿Busca participar en espionaje, sabotaje, violaciones de control de exportación u otra actividad ilegal en EE.UU.?', type: 'select', options: YES_NO_OPTIONS, span: 12, sensitive: true },
      { name: 'terroristActivities', label: '¿Ha participado o piensa participar en actividades terroristas?', type: 'select', options: YES_NO_OPTIONS, span: 12, sensitive: true },
      { name: 'terroristSupport', label: '¿Ha proporcionado apoyo financiero u otro apoyo a terroristas u organizaciones terroristas?', type: 'select', options: YES_NO_OPTIONS, span: 12, sensitive: true },
      { name: 'genocideTortureViolence', label: '¿Ha participado en genocidio, tortura, ejecuciones extrajudiciales, reclutamiento de niños soldados u otros actos graves?', type: 'select', options: YES_NO_OPTIONS, span: 12, sensitive: true },
      { name: 'immigrationFraudMisrepresentation', label: '¿Ha buscado obtener o ayudar a obtener beneficio migratorio mediante fraude o tergiversación?', type: 'select', options: YES_NO_OPTIONS, span: 12, sensitive: true },
      { name: 'deportedOrRemoved', label: '¿Ha sido deportado, removido o excluido de EE.UU.?', type: 'select', options: YES_NO_OPTIONS, span: 12, sensitive: true },
      { name: 'unlawfulPresenceOverstay', label: '¿Ha estado ilegalmente presente, excedido estadía o violado términos de visa en EE.UU.?', type: 'select', options: YES_NO_OPTIONS, span: 12, sensitive: true },
      { name: 'votedUnlawfullyUS', label: '¿Ha votado en EE.UU. violando leyes o regulaciones?', type: 'select', options: YES_NO_OPTIONS, span: 12, sensitive: true },
      { name: 'securityDetails', label: 'Detalles de cualquier respuesta afirmativa en seguridad/antecedentes', type: 'textarea', span: 12, sensitive: true },
    ],
  },
  {
    key: 'preparer_review',
    title: 'Preparador, revisión y notas',
    fields: [
      { name: 'applicationPreparedByOther', label: '¿Alguien le ayudó a preparar este formulario?', type: 'select', options: YES_NO_OPTIONS, span: 6 },
      { name: 'preparerSurname', label: 'Apellidos del preparador', span: 6 },
      { name: 'preparerGivenNames', label: 'Nombres del preparador', span: 6 },
      { name: 'preparerOrganization', label: 'Organización del preparador', span: 6 },
      { name: 'preparerRelationship', label: 'Relación con el solicitante', span: 6 },
      { name: 'preparerAddress', label: 'Dirección del preparador', type: 'textarea', span: 12 },
      { name: 'preparerPhone', label: 'Teléfono del preparador', span: 6 },
      { name: 'preparerEmail', label: 'Correo del preparador', type: 'email', span: 6 },
      { name: 'clientInternalNotes', label: 'Notas internas del cliente o asesor', type: 'textarea', span: 12 },
      { name: 'documentsPending', label: 'Documentos pendientes para revisar', type: 'textarea', span: 12 },
      { name: 'reviewWarnings', label: 'Advertencias o inconsistencias detectadas', type: 'textarea', span: 12 },
      { name: 'clientDeclaration', label: 'Declaración: el cliente confirma que la información suministrada es verdadera según su conocimiento', type: 'select', options: YES_NO_OPTIONS, span: 12 },
    ],
  },
]
