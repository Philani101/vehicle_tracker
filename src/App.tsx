import { useState, useEffect } from 'react';
import NavigationBar from './components/NavigationBar';
import StatsBar from './components/StatsBar';
import SearchBar from './components/SearchBar';
import AddBtn from './components/AddBtn';
import CarList from './components/CarList';
import AlertList from './components/AlertList';
import VehicleDetails from './components/VehicleDetails';
import VehicleMap from './components/VehicleMap';
import { type Vehicle } from './components/VehicleCard';

function App() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [filteredVehicles, setFilteredVehicles] = useState<Vehicle[]>([]);
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchVehicles = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/vehicles');
      if (response.ok) {
        const data = await response.json();
        setVehicles(data);
        applySearch(data, searchQuery);
      }
    } catch (error) {
      console.error('Failed to fetch vehicles', error);
    } finally {
      setLoading(false);
    }
  };

  const applySearch = (vehicleList: Vehicle[], query: string) => {
    if (!query.trim()) {
      setFilteredVehicles(vehicleList);
      return;
    }

    const lowerCaseQuery = query.toLowerCase();
    const filtered = vehicleList.filter(
      (vehicle) =>
        vehicle.name.toLowerCase().includes(lowerCaseQuery) ||
        vehicle.licensePlate.toLowerCase().includes(lowerCaseQuery)
    );
    setFilteredVehicles(filtered);
  };

  useEffect(() => {
    fetchVehicles();
  }, []);

  const handleVehicleSelect = (vehicle: Vehicle) => {
    setSelectedVehicle(vehicle);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    applySearch(vehicles, query);
  };

  return (
    <>
      <NavigationBar />
      <StatsBar />
      <AddBtn onVehicleAdded={fetchVehicles} />

      <SearchBar
        placeholder="Search vehicle by name or plate..."
        onSearch={handleSearch}
      />

      <VehicleMap />

      <CarList
        title="Tracked Cars"
        vehicles={filteredVehicles}
        onSelect={handleVehicleSelect}
        selectedId={selectedVehicle?.id}
        loading={loading}
      />

      <AlertList title="Alerts" />

      <VehicleDetails
        title="Vehicle Details"
        vehicle={selectedVehicle}
        loading={false}
      />
    </>
  );
}

export default App;