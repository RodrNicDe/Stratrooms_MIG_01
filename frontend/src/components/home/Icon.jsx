const Icon = ({ name, className = "", ...props }) => {
  return (
    <svg className={`icon ${className}`} {...props}>
      <use href={`#icon-${name}`} />
    </svg>
  );
};

export default Icon;
