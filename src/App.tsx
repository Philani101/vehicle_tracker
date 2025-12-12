import NavigationBar from './components/NavigationBar'
import StatsBar from './components/StatsBar'
import SearchBar from './components/SearchBar'
import AddBtn from './components/AddBtn'

function App() {
  return (
    <>
      <NavigationBar />
      <StatsBar />
      <AddBtn onClick={() => { alert('Add New button clicked!'); }} />
      <SearchBar />
    </>
  )
}

export default App
