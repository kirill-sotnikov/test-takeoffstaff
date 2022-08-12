import { ComponentPropsWithRef, forwardRef, useState } from "react";
import styled from "styled-components";
import contacts from "../store/contacts";
import AddContactForm from "./AddContactForm";

interface ContactBlockType {
  name: string;
  phone: string;
  ref: ComponentPropsWithRef<"div">["ref"];
  id: string | number;
}

const ContactBlock = forwardRef<HTMLDivElement, ContactBlockType>(
  ({ name, phone, id }, ref) => {
    const [isShowForm, setIsShowForm] = useState(false);

    if (isShowForm) {
      return (
        <AddContactForm
          name={name}
          phone={phone}
          id={id}
          onClose={() => setIsShowForm(false)}
        />
      );
    }

    return (
      <ContactBlockWrapper ref={ref}>
        <ContactParagraph style={{ marginLeft: 24 }}>
          {name.split("").splice(0, 27).join("")}
        </ContactParagraph>
        <ContactParagraph style={{ marginLeft: 24 }}>{phone}</ContactParagraph>
        <IconsWrapper>
          <Icon src="img/changeICON.svg" onClick={() => setIsShowForm(true)} />
          <Icon
            src="img/deleteICON.svg"
            onClick={() => contacts.removeContact(id)}
          />
        </IconsWrapper>
      </ContactBlockWrapper>
    );
  }
);

export default ContactBlock;

export const ContactBlockWrapper = styled.div`
  display: flex;
  align-items: center;
  filter: drop-shadow(0px 4px 4px #f3f3f3);
  width: 100%;
  min-height: 72px;
  border: 1px solid #cecece;
  justify-content: space-between;
  margin-top: 20px;

  @media screen and (max-width: 550px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const ContactParagraph = styled.p`
  font-family: "Inter";
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 19px;
  height: fit-content;
  margin: 26px 0;
  word-break: break-word;

  @media screen and (max-width: 550px) {
    margin: 0;
    margin-top: 20px;
    width: calc(100%-24px);
    max-width: none;
  }
`;

export const IconsWrapper = styled.div`
  display: flex;
  min-width: 74;
  margin-left: 20px;

  @media screen and (max-width: 550px) {
    margin-top: 20px;
    margin-left: 20px;
    margin-bottom: 20px;
    width: calc(100% - 20px);
    display: flex;
    justify-content: end;
  }
`;

export const Icon = styled.img`
  height: 20px;
  margin-right: 20px;
  cursor: pointer;
`;
