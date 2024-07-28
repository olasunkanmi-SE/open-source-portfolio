interface ISelectProps {
  name: string;
  options: { label: string; key?: string }[];
  onChange: (value: string) => void;
  title: string;
  error?: string;
}

export const SelectItem: React.FC<ISelectProps> = ({ name, options, onChange, error, title }: ISelectProps) => {
  return (
    <select
      name={name}
      className="form-select"
      onChange={(e) => onChange(e.target.value)}
      style={{ borderColor: error ? "red" : "" }}
    >
      <option>{title}</option>
      {options.map((option) => (
        <option key={option.key} value={option.label}>
          {option.label}
        </option>
      ))}
    </select>
  );
};
