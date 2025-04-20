import styled from "styled-components";
import React from "react";

interface CheckboxProps {
  checked: boolean;
  onChange: () => void;
  label: string;
}

const Label = styled.label`
  display: block;
  margin: 10px 0;
  cursor: pointer;
  user-select: none;
`;

const Checkbox: React.FC<CheckboxProps> = ({ checked, onChange, label }) => (
  <Label>
    <input type="checkbox" checked={checked} onChange={onChange} /> {label}
  </Label>
);

export default Checkbox;
