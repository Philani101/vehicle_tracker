import NavigationBar from './components/NavigationBar'
import StatsBar from './components/StatsBar'
import SearchBar from './components/SearchBar'
import AddBtn from './components/AddBtn'
import CarList from './components/CarList'
import AlertList from './components/AlertList'
import VehicleDetails from './components/VehicleDetails'

function App() {
  return (
    <>
      <NavigationBar />
      <StatsBar />
      <AddBtn onClick={() => { alert('Add New button clicked!'); }} />
      <SearchBar placeholder='search vehicle...'/>
      <CarList title="Tracked Cars"/>
      <AlertList title="Alerts"/>
      <VehicleDetails title="Vehicle Details"/>
    </>
  )
}

export default App
