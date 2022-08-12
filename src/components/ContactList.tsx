import { observer } from "mobx-react";
import contacts from "../store/contacts";
import search from "../store/search";
import ContactBlock from "./ContactBlock";

const ContactList = observer(() => {
  if (search.value) {
    return (
      <>
        {contacts.value
          .filter(
            (item) =>
              item.name
                .toLocaleLowerCase()
                .includes(search.value.toLocaleLowerCase()) ||
              item.phone
                .toLocaleLowerCase()
                .includes(search.value.toLocaleLowerCase())
          )
          .map((item) => (
            <ContactBlock
              name={item.name}
              phone={item.phone}
              id={item.id}
              key={item.id}
            />
          ))}
      </>
    );
  }

  return (
    <>
      {contacts.value.map((item) => (
        <ContactBlock
          name={item.name}
          phone={item.phone}
          id={item.id}
          key={item.id}
        />
      ))}
    </>
  );
});

export default ContactList;
