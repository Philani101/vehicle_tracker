import { useState, useEffect } from 'react';
import NavigationBar from './components/NavigationBar';
import StatsBar from './components/StatsBar';
import SearchBar from './components/SearchBar';
import AddBtn from './components/AddBtn';
import CarList from './components/CarList';
import AlertList from './components/AlertList';
import VehicleDetails from './components/VehicleDetails';
import VehicleMap from './components/VehicleMap'; // Import the new component
import { type Vehicle } from './components/VehicleCard';

function App() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [filteredVehicles, setFilteredVehicles] = useState<Vehicle[]>([]);
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);

  const fetchVehicles = async () => {
    try {
      const response = await fetch('/api/vehicles');
      if (response.ok) {
        const data = await response.json();
        setVehicles(data);
        setFilteredVehicles(data);
      }
    } catch (error) {
      console.error('Failed to fetch vehicles', error);
    }
  };

  useEffect(() => {
    fetchVehicles();
  }, []);

  const handleVehicleSelect = (vehicle: Vehicle) => {
    setSelectedVehicle(vehicle);
  };

  // Search handler to filter vehicles
  const handleSearch = (query: string) => {
    const lowerCaseQuery = query.toLowerCase();
    const filtered = vehicles.filter((vehicle) => 
      vehicle.name.toLowerCase().includes(lowerCaseQuery) ||
      vehicle.licensePlate.toLowerCase().includes(lowerCaseQuery)
    );
    setFilteredVehicles(filtered);
  };

  return (
    <>
      <NavigationBar />
      <StatsBar />
      <AddBtn onVehicleAdded={fetchVehicles} />
      
      {/* SearchBar with functionality */}
      <SearchBar 
        placeholder='Search vehicle by name or plate...' 
        onSearch={handleSearch} 
      />
      
      {/* New Map Button */}
      <VehicleMap />
      
      {/* Passing state down to lists */}
      <CarList 
        title="Tracked Cars" 
        vehicles={filteredVehicles} 
        onSelect={handleVehicleSelect}
        selectedId={selectedVehicle?.id}
      />
      
      <AlertList title="Alerts"/>
      
      <VehicleDetails title="Vehicle Details" vehicle={selectedVehicle}/>
    </>
  )
}

export default App;