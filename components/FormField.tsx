const FormField = ({ label, value, onChange }: { label: string; value: number, onChange: (e: any) => void }) => {
  return (
    <div style={{
      display: "flex",
      flexDirection: "row",
      gap: "1rem",
      alignItems: "end",
      justifyContent: "end",
      width: "100%",
    }}>
      <label>{label}</label>
      <input style={{ padding: "0.33rem" }} value={value} type="number" step="0.01" onChange={onChange} />
    </div>
  )
};

export default FormField;