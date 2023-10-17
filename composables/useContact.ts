import {
  incubationFormValidation,
  collaborateFormValidation,
  hireUsFormValidation,
  HireUs,
  Incubation,
  Collaborate,
  FormField
} from '~/types/forms'

const personalDetailFields = [
  {
    name: 'givenName',
    placeholder: 'Your given name',
    type: 'input'
  },
  {
    name: 'surname',
    placeholder: 'Your surname',
    type: 'input'
  },
  {
    name: 'email',
    placeholder: 'Your email',
    type: 'input'
  },
  {
    name: 'professionalTitle',
    placeholder: 'Select 1-3 professional title(s)',
    type: 'select-menu',
    multiple: true,
    options: [
      'Front-end Developer',
      'Back-end Developer',
      'Full-stack Developer',
      'Mobile App Developer',
      'DevOps Engineer',
      'Data Scientist',
      'System Architect',
      'QA/Test Engineer',
      'Solo-founder',
      'Co-founder',
      'CTO (Chief Technology Officer)',
      'CEO (Chief Executive Officer)',
      'CPO (Chief Product Officer)',
      'COO (Chief Operating Officer)',
      'Technical Lead',
      'Product Manager',
      'UX/UI Designer',
      'Other'
    ]
  }
] as FormField[]

const companyDetailFields = [
  {
    name: 'companyName',
    placeholder: 'Project name',
    type: 'input'
  },
  {
    name: 'companyLink',
    placeholder: 'Project website link',
    type: 'input'
  },
  {
    name: 'companyStage',
    placeholder: 'Project operations stage',
    type: 'select-menu',
    options: ['Idea', 'Prototype', 'Launched', 'Revenue Generating', 'Profitable', 'Scaling']
  }
] as FormField[]

const messageField = {
  name: 'message',
  placeholder: 'Tell us about your company and what you think Incubrain can do for you...',
  type: 'textarea',
  fullWidth: true
} as FormField

const messageFieldCollab = {
  name: 'message',
  placeholder: 'Tell us about how we can work together...',
  type: 'textarea',
  fullWidth: true
} as FormField

const hireFields = [
  {
    name: 'projectBudget',
    placeholder: 'Estimate project budget',
    type: 'select-menu',
    options: ['0-$1k', '$1k-$5k', '$5k-$10k', '$10k+', 'unknown']
  },
  {
    name: 'projectDuration',
    placeholder: 'Estimate project duration',
    type: 'select-menu',
    options: ['1 month', '3 months', '6 months', '6 months+', 'unknown']
  }
] as FormField[]

const incubationSchema: FormField[] = [
  ...personalDetailFields,
  ...companyDetailFields,
  messageField
]
const collaborateSchema: FormField[] = [...personalDetailFields, messageFieldCollab]
const hireUsSchema: FormField[] = [
  ...personalDetailFields,
  ...companyDetailFields,
  ...hireFields,
  messageField
]

/**
 * Creates a default state object for a given schema.
 * Each field in the schema results in a key-value pair in the state,
 * with the field's name as the key and an empty string as the value.
 *
 * @param schema The schema array containing the form fields.
 * @returns An object representing the default state.
 */
function createDefaultStateForSchema(schema: FormField[]): Record<string, any> {
  return schema.reduce((defaultState, field: FormField) => {
    defaultState[field.name] = ''
    return defaultState
  }, {} as Record<string, any>)
}

function submitForm({
  formType,
  formData
}: {
  formType: string
  formData: HireUs | Incubation | Collaborate
}) {
  console.log('submitting form', formType, formData)
  const { data, error } = useFetch(`/api/contact/${formType}`, {
    method: 'POST',
    body: JSON.stringify(formData)
  })

  if (error) console.log('error', error)
  console.log('data', data)
}

const contacts = ref([])

const getContacts = async () => {
  const { data, error } = await useFetch('/api/admin/enquiries')
  if (error.value) {
    console.error(error.value)
  }
  if (data.value) {
    contacts.value.push(data.value)
  }
}

export default function useContact() {
  return {
    admin: {
      contacts,
      getContacts
    },
    submit: submitForm,
    forms: [
      {
        state: ref(createDefaultStateForSchema(incubationSchema)),
        schema: incubationSchema,
        validation: incubationFormValidation
      },
      {
        state: ref(createDefaultStateForSchema(hireUsSchema)),
        schema: hireUsSchema,
        validation: hireUsFormValidation
      },
      {
        state: ref(createDefaultStateForSchema(collaborateSchema)),
        schema: collaborateSchema,
        validation: collaborateFormValidation
      }
    ]
  }
}