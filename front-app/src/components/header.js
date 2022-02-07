const Header = (props) => {
  const { headerElements } = props;
  return (
    <thead>
      <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
        {headerElements.map((element, index) => (
          <th key={index} className="py-3 px-6 text-left">{element}</th>
        ))}
        <th className="py-3 px-6 text-center">Actions</th>
      </tr>
    </thead>
  );
};

export default Header;
