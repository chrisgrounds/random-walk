const FormField = ({ label, value, onChange }: { label: string; value: boolean, onChange: (e: any) => void }) => {
  return (
    <div style={{
      display: "flex",
      flexDirection: "row",
      gap: "1rem",
      alignItems: "center",
      justifyContent: "center",
      width: "100%",
    }}>
      <label>{label}</label>
      <input style={{ padding: "0.33rem" }} type="checkbox" checked={value} step="0.01" onChange={onChange} />
    </div>
  )
};

export default FormField;