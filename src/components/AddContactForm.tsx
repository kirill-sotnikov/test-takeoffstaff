import { memo, useCallback, useEffect, useRef } from "react";
import styled from "styled-components";
import contacts from "../store/contacts";
import { ContactBlockWrapper, Icon, IconsWrapper } from "./ContactBlock";

interface AddContactFormType {
  /** функция, которая вызывается при нажатии на крестик */
  onClose?: () => void;
  name?: string;
  phone?: string;
  id?: number | string;
}

const AddContactForm = memo(
  ({ onClose, name, phone, id }: AddContactFormType) => {
    const NameInputValue = useRef<HTMLInputElement | null>(null);
    const PhoneInputValue = useRef<HTMLInputElement | null>(null);

    const createNewContact = useCallback(() => {
      if (
        NameInputValue.current &&
        PhoneInputValue.current &&
        NameInputValue.current.value &&
        PhoneInputValue.current.value
      )
        contacts.addContact({
          name: NameInputValue.current.value,
          phone: PhoneInputValue.current.value,
          id: new Date().getTime(),
        });
    }, []);

    const changeContact = useCallback(() => {
      if (
        id &&
        NameInputValue.current &&
        PhoneInputValue.current &&
        NameInputValue.current.value &&
        PhoneInputValue.current.value
      ) {
        contacts.changeContact({
          name: NameInputValue.current.value,
          phone: PhoneInputValue.current.value,
          id,
        });
      }
    }, [id]);

    useEffect(() => {
      const onEnter = (event: KeyboardEvent) => {
        if (event.key === "Enter") {
          console.log("ENTER");
          !name ? createNewContact() : changeContact();
          onClose && onClose();
        }
      };

      window.addEventListener("keypress", onEnter);

      return () => {
        console.log("Remove listener");

        window.removeEventListener("keypress", onEnter);
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
      <ContactBlockWrapper style={{ marginBottom: 20 }}>
        <AddContactFormInput
          placeholder="Name"
          defaultValue={name && name}
          ref={NameInputValue}
        />
        <AddContactFormInput
          placeholder="Phone"
          defaultValue={phone && phone}
          type="number"
          ref={PhoneInputValue}
        />
        <IconsWrapper>
          <Icon
            src="img/confirmICON.svg"
            onClick={() => {
              !name ? createNewContact() : changeContact();
              onClose && onClose();
            }}
          />
          <Icon src="img/cancelICON.svg" onClick={() => onClose && onClose()} />
        </IconsWrapper>
      </ContactBlockWrapper>
    );
  }
);

export default AddContactForm;

const AddContactFormInput = styled.input`
  margin-left: 20px;
  font-family: "Inter";
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 19px;
  border: none;
  border-bottom: 1px solid #b4b3b3;
  outline: none;
  padding-bottom: 2px;
  min-width: 140px;

  &:focus {
    border-bottom: 1px solid #735cea;
  }

  @media screen and (max-width: 550px) {
    margin-top: 20px;
    min-width: max(50%, 230px);
  }
`;
