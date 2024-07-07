import { atom, useAtom } from "jotai";

export const languageAtom = atom("en");

const LanguageSelector = () => {
  const [language, setLanguage] = useAtom(languageAtom);

  const handleSelect = (e) => {
    setLanguage(e);
  };

  const languages = [
    { name: "English", code: "en" },
    { name: "French", code: "fr" },
    { name: "Azerbaijani", code: "az" },
    { name: "Persian", code: "fa" },
    { name: "Russian", code: "ru" },
  ];

  return (
    <select
      id="language-choice"
      className="form-select mx-2 px-3"
      value={language}
      onChange={(event) => {
        handleSelect(event.target.value);
      }}
    >
      {languages.map((item) => {
        return (
          <option key={item.code} value={item.code}>
            {item.name}
          </option>
        );
      })}
    </select>
  );
};

export default LanguageSelector;
