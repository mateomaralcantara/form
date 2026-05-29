import React from 'react'

type Field = {
  name: string
  label: string
  placeholder?: string
  type?: 'text' | 'date' | 'number' | 'email' | 'select' | 'textarea'
  options?: { label: string; value: string }[]
  span?: number
}

export default function FormField({ field, value, onChange }:{ field: Field, value: any, onChange: (name:string, value:any)=>void }) {
  const span = field.span ?? 6
  return (
    <div className={`col-${span}`}>
      <div className="field">
        <label htmlFor={field.name}>{field.label}</label>
        {field.type === 'select' ? (
          <select id={field.name} className="select"
            value={value ?? ''}
            onChange={e => onChange(field.name, e.target.value)}>
            <option value="">(Opcional)</option>
            {(field.options ?? []).map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        ) : field.type === 'textarea' ? (
          <textarea id={field.name} className="textarea"
            placeholder={field.placeholder}
            value={value ?? ''}
            onChange={e => onChange(field.name, e.target.value)} />
        ) : (
          <input id={field.name} className="input"
            type={field.type ?? 'text'}
            placeholder={field.placeholder}
            value={value ?? ''}
            onChange={e => onChange(field.name, e.target.value)} />
        )}
      </div>
    </div>
  )
}
