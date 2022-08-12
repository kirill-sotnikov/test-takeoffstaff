import { ComponentPropsWithRef, forwardRef, useState } from "react";
import styled from "styled-components";

interface InputBlackType extends ComponentPropsWithRef<"input"> {
  isNeededIcon?: boolean;
}

const InputBlack = forwardRef<HTMLInputElement, InputBlackType>(
  ({ isNeededIcon = false, ...props }, ref) => {
    const [activeBorder, setActiveBorder] = useState(false);
    return (
      <div style={{ position: "relative" }}>
        <InputText
          {...props}
          ref={ref}
          onFocus={() => setActiveBorder(true)}
          onBlur={() => setActiveBorder(false)}
        />
        {isNeededIcon && (
          <Icon src="img/loupe.svg" alt="img" style={{ cursor: "default" }} />
        )}
        <InputBorderBottom
          style={{ backgroundColor: activeBorder ? "#735CEA" : "" }}
        />
      </div>
    );
  }
);

InputBlack.displayName = "InputBlack";

export default InputBlack;

const InputText = styled.input`
  padding: 8px;
  border: none;
  color: #fffbfb;
  min-width: 200px;
  background-color: #1d1c22;
  outline: none;
  font-family: "Inter";
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 16px;
  width: calc(100% - 16px);
`;

const InputBorderBottom = styled.div`
  margin-top: 3px;
  height: 1.5px;
  width: 100%;
  background-color: #1d1c22;
`;

const Icon = styled.img`
  position: absolute;
  top: 17%;
  right: 0%;
  height: 20px;
  cursor: pointer;
  background-color: #1d1c22;
  padding: 0 10px;
`;
