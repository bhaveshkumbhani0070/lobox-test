import React, { useState } from "react";

interface Option {
  label: string;
  value: string;
}

interface CustomDropDownProps {
  options: Option[];
  onChange: (value: Option[]) => void;
}

const useCustomDropDown = (options: Option[]): [Option[], React.ReactNode] => {
  const [selectedOptions, setSelectedOptions] = useState<Option[]>([]);
  const [newOption, setNewOption] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewOption(event.target.value);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && newOption) {
      const option = { label: newOption, value: newOption };
      setSelectedOptions([...selectedOptions, option]);
      setNewOption("");
    }
  };

  const handleDelete = (option: Option) => () => {
    const newSelectedOptions = selectedOptions.filter(
      (o) => o.value !== option.value
    );
    setSelectedOptions(newSelectedOptions);
  };

  const renderOption = (option: Option) => (
    <div key={option.value} className="option">
      <span role="img" aria-label="Checkmark">
        ✅
      </span>
      {option.label}
      <span role="img" aria-label="Delete" onClick={handleDelete(option)}>
        ❌
      </span>
    </div>
  );

  const dropDown = (
    <div className="root">
      {selectedOptions.map(renderOption)}
      <input
        placeholder="Add an option"
        value={newOption}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
    </div>
  );

  return [selectedOptions, dropDown];
};

const Home = () => {
  const options: Option[] = [
    { label: "Option 1", value: "option1" },
    { label: "Option 2", value: "option2" },
    { label: "Option 3", value: "option3" },
  ];

  const [selectedOptions, dropDown] = useCustomDropDown(options);

  const handleChange = (value: Option[]) => {
    console.log("Selected options:", value);
  };

  return (
    <div>
      {dropDown}
      <p>Selected options: {JSON.stringify(selectedOptions)}</p>
    </div>
  );
};

export default Home;
