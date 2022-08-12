import { memo, useState } from "react";
import styled from "styled-components";
import AddContactForm from "./AddContactForm";
import { ContactBlockWrapper } from "./ContactBlock";

const AddButton = memo(() => {
  const [isShowForm, setIsShowForm] = useState(false);

  if (isShowForm) {
    return <AddContactForm onClose={() => setIsShowForm(false)} />;
  }

  return (
    <>
      <ContactBlockWrapper
        onClick={() => setIsShowForm(true)}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: 20,
        }}
      >
        <ButtonPlus>+</ButtonPlus>
      </ContactBlockWrapper>
    </>
  );
});

export default AddButton;

const ButtonPlus = styled.p`
  font-family: "Inter";
  font-style: normal;
  font-weight: 300;
  font-size: 48px;
  line-height: 58px;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
`;
