import { createContext } from 'react';

export const FilterContext = createContext();

const FilterProvider = (props) => {

  const { showVal, setShowVal } = props.showVal;
  const {pageContent , setPageContent}=props.wichPage;
  const {isLogin}=props.isLogin;


  return (
    <FilterContext.Provider value={{showVal, setShowVal , pageContent , setPageContent , isLogin}}>
      {props.children}
    </FilterContext.Provider>
  );
};

export default FilterProvider;