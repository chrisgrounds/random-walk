const FormField = ({ label, value, onChange }: { label: string; value: number, onChange: (e: any) => void }) => {
  return (
    <div>
      <label>{label}</label>
      <input value={value} type="number" step="0.01" onChange={onChange} />
    </div>
  )
};

export default FormField;