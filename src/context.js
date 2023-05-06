import React, { useState, useContext, useEffect } from 'react'

const url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s='
const AppContext = React.createContext()
//console.log(AppContext)

const AppProvider = ({ children }) => {
  const [loading, setLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState('b')
  const [cocktails, setCocktails] = useState([])

  const fetchDrinks = async () => {
    setLoading(true)
    try {
      const response = await fetch(`${url}${searchTerm}`)
      const data = await response.json()
      //console.log(data)
      const { drinks } = data
      //console.log(data, drinks)
      if (drinks) {
        const newCocktails = drinks.map((item) => {
          const { idDrink, strAlcoholic, strDrink, strDrinkThumb, strGlass } =
            item
          return {
            id: idDrink,
            name: strDrink,
            image: strDrinkThumb,
            info: strAlcoholic,
            glass: strGlass,
          }
        })

        setCocktails(newCocktails)
      } else {
        setCocktails([])
      }
      setLoading(false)
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchDrinks()
  }, [searchTerm])
  return (
    <AppContext.Provider
      value={{
        loading,
        searchTerm,
        cocktails,
        setSearchTerm,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext)
}

export { AppContext, AppProvider }
