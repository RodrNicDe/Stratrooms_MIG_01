const StyledSelect = ({
  id,
  name,
  options,
  value,
  defaultValue,
  onChange,
  placeholder,
  required,
  disabled,
  icon,
  error,
  ...rest
}) => {
  const baseClassName =
    "bg-gray-50 border border-gray-300 text-gray-900 text-sm font-medium rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500";
  const errorClassName =
    "border-red-500 text-red-900 placeholder-red-700 focus:ring-red-500 focus:border-red-500";
  const iconPaddingClassName = icon ? "pl-10" : "";

  const selectClassName = `${baseClassName} ${
    error ? errorClassName : ""
  } ${iconPaddingClassName}`;

  const handleChange = (e) => {
    const selectedValue = e.target.value;
    onChange(selectedValue);
  };

  return (
    <div className="relative">
      {icon && (
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          {icon}
        </div>
      )}
      <select
        id={id}
        name={name}
        value={value}
        onChange={handleChange}
        className={selectClassName}
        required={required}
        disabled={disabled}
        {...rest}
      >
        {placeholder && !value && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options &&
          options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
      </select>
    </div>
  );
};

export default StyledSelect;
