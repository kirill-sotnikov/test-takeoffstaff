import { memo, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import AddButton from "../components/AddButton";
import ContactList from "../components/ContactList";
import { debounce } from "../components/debounce";
import InputBlack from "../components/InputBlack";
import search from "../store/search";

const Contacts = memo(() => {
  const [isLogined, setIsLogined] = useState(false);

  useEffect(() => {
    if (
      window.localStorage.getItem("#contact") ===
      "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855"
    ) {
      setIsLogined(true);
    }
  }, []);

  if (!isLogined) {
    return (
      <>
        <Link to="/" style={{ color: "black", marginTop: 20, marginLeft: 10 }}>
          <p>Войти в аккаунт</p>
        </Link>
      </>
    );
  }

  return (
    <ContactsWrapperOuter>
      <ContactsWrapperInner>
        <ContactsParagraph>Contacts</ContactsParagraph>
        <InputBlack
          placeholder="Search by tel or name"
          isNeededIcon={true}
          onChange={(event) => {
            debounce(event.target.value, () => {
              search.setSearchValue(event.target.value);
            });
          }}
        />
        <ContactsListWrapper>
          <AddButton />
          <ContactList />
        </ContactsListWrapper>
      </ContactsWrapperInner>
    </ContactsWrapperOuter>
  );
});
export default Contacts;

const ContactsWrapperOuter = styled.div`
  width: 100vw;
  height: 100%;
  display: flex;
  justify-content: center;
`;

const ContactsWrapperInner = styled.div`
  width: 70%;
  max-width: 900px;

  @media screen and (max-width: 652px) {
    width: 100%;
    padding: 0 8px;
  }
`;

const ContactsParagraph = styled.p`
  font-family: "Inter";
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 19px;
  margin-top: 27px;
  margin-bottom: 17px;
`;

const ContactsListWrapper = styled.div`
  margin-top: 20px;
  width: 100%;
`;
