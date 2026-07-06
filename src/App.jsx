import React, { useState, useEffect } from 'react';
import { AlertCircle, BarChart3, LogOut, Plus, Truck, Users, MapPin, Clock, CheckCircle, AlertTriangle, Home, Settings } from 'lucide-react';

const ExcelsourceTransportApp = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [authState, setAuthState] = useState('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('employee');
  const [activePage, setActivePage] = useState('dashboard');

  // Mock data (replace with Firebase calls)
  const [cars, setCars] = useState([
    { id: 1, regNumber: 'GJ01AB1234', model: 'Fortuner', insurance: '2025-06-15', fastag: 'FT1234', status: 'available', location: 'Vadodara Office' },
    { id: 2, regNumber: 'GJ01AB5678', model: 'Innova', insurance: '2025-08-20', fastag: 'FT5678', status: 'in_use', location: 'Ahmedabad' },
    { id: 3, regNumber: 'GJ01AB9012', model: 'Ertiga', insurance: '2025-05-10', fastag: 'FT9012', status: 'breakdown', location: 'Service Center' },
  ]);

  const [trips, setTrips] = useState([
    { id: 101, carId: 1, driverId: 2, employeeId: 3, from: 'Vadodara Office', to: 'Ahmedabad', status: 'completed', startTime: '09:00', endTime: '11:30', date: '2024-01-15' },
    { id: 102, carId: 2, driverId: 1, employeeId: 4, from: 'Vadodara Office', to: 'Surat', status: 'in_progress', startTime: '10:00', endTime: null, date: '2024-01-16' },
  ]);

  const [users, setUsers] = useState([
    { id: 1, email: 'driver1@excelsource.com', name: 'Rajesh Kumar', role: 'driver', phone: '9876543210' },
    { id: 2, email: 'driver2@excelsource.com', name: 'Suresh Patel', role: 'driver', phone: '9876543211' },
    { id: 3, email: 'admin@excelsource.com', name: 'Priya Sharma', role: 'admin', phone: '9876543212' },
    { id: 4, email: 'manager@excelsource.com', name: 'Vijay Singh', role: 'management', phone: '9876543213' },
  ]);

  // Mock authentication
  const handleLogin = () => {
    if (email && password) {
      const user = users.find(u => u.email === email);
      if (user) {
        setCurrentUser({ ...user, email });
        setAuthState('app');
        setActivePage('dashboard');
      } else {
        alert('Invalid credentials');
      }
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setAuthState('login');
    setEmail('');
    setPassword('');
  };

  const handleAddCar = (newCar) => {
    setCars([...cars, { ...newCar, id: cars.length + 1 }]);
  };

  const handleCreateTrip = (tripRequest) => {
    setTrips([...trips, { ...tripRequest, id: trips.length + 101 }]);
  };

  const handleUpdateTripStatus = (tripId, newStatus) => {
    setTrips(trips.map(t => t.id === tripId ? { ...t, status: newStatus, endTime: newStatus === 'completed' ? new Date().toLocaleTimeString() : null } : t));
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'available': return '#22c55e';
      case 'in_use': return '#f59e0b';
      case 'breakdown': return '#ef4444';
      case 'completed': return '#3b82f6';
      case 'in_progress': return '#f59e0b';
      default: return '#9ca3af';
    }
  };

  const getStatusLabel = (status) => {
    const labels = {
      'available': 'Available',
      'in_use': 'In Use',
      'breakdown': 'Breakdown',
      'completed': 'Completed',
      'in_progress': 'In Progress',
      'pending': 'Pending'
    };
    return labels[status] || status;
  };

  if (authState === 'login') {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #1B3B6F 0%, #2C5AA0 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'Inter, system-ui, sans-serif'
      }}>
        <div style={{
          background: 'white',
          padding: '40px',
          borderRadius: '12px',
          boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
          width: '100%',
          maxWidth: '400px'
        }}>
          <div style={{ textAlign: 'center', marginBottom: '30px' }}>
            <div style={{
              width: '60px',
              height: '60px',
              background: '#E67E22',
              borderRadius: '50%',
              margin: '0 auto 20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Truck size={32} color="white" />
            </div>
            <h1 style={{ fontSize: '24px', fontWeight: 'bold', color: '#1B3B6F', margin: '0 0 10px 0' }}>Excelsource</h1>
            <p style={{ color: '#6b7280', fontSize: '14px', margin: '0' }}>Transport Management System</p>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#1F2937', marginBottom: '8px' }}>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              style={{
                width: '100%',
                padding: '12px',
                border: '1px solid #d1d5db',
                borderRadius: '6px',
                fontSize: '14px',
                boxSizing: 'border-box',
                fontFamily: 'inherit'
              }}
            />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#1F2937', marginBottom: '8px' }}>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
              style={{
                width: '100%',
                padding: '12px',
                border: '1px solid #d1d5db',
                borderRadius: '6px',
                fontSize: '14px',
                boxSizing: 'border-box',
                fontFamily: 'inherit'
              }}
            />
          </div>

          <button
            onClick={handleLogin}
            style={{
              width: '100%',
              padding: '12px',
              background: '#E67E22',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              fontSize: '16px',
              fontWeight: '600',
              cursor: 'pointer',
              marginTop: '20px'
            }}
          >
            Sign In
          </button>

          <div style={{ marginTop: '20px', padding: '15px', background: '#f3f4f6', borderRadius: '6px', fontSize: '13px', color: '#4b5563' }}>
            <strong>Demo Accounts:</strong>
            <p style={{ margin: '8px 0 0 0' }}>Admin: admin@excelsource.com / password</p>
            <p style={{ margin: '4px 0 0 0' }}>Manager: manager@excelsource.com / password</p>
            <p style={{ margin: '4px 0 0 0' }}>Driver: driver1@excelsource.com / password</p>
            <p style={{ margin: '4px 0 0 0' }}>Employee: (register new)</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: '#f9fafb',
      fontFamily: 'Inter, system-ui, sans-serif',
      display: 'flex'
    }}>
      {/* Sidebar */}
      <div style={{
        width: '250px',
        background: '#1B3B6F',
        color: 'white',
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        boxSizing: 'border-box'
      }}>
        <div style={{ marginBottom: '30px' }}>
          <div style={{
            width: '50px',
            height: '50px',
            background: '#E67E22',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '12px'
          }}>
            <Truck size={28} />
          </div>
          <h2 style={{ fontSize: '18px', fontWeight: 'bold', margin: '0 0 4px 0' }}>Excelsource</h2>
          <p style={{ fontSize: '12px', color: '#a0aec0', margin: '0' }}>{currentUser?.role.toUpperCase()}</p>
        </div>

        <nav style={{ flex: 1 }}>
          {currentUser?.role === 'admin' && (
            <>
              <NavItem icon={<Home size={20} />} label="Dashboard" page="dashboard" active={activePage === 'dashboard'} onClick={() => setActivePage('dashboard')} />
              <NavItem icon={<Truck size={20} />} label="Cars" page="cars" active={activePage === 'cars'} onClick={() => setActivePage('cars')} />
              <NavItem icon={<Plus size={20} />} label="Add Car" page="add-car" active={activePage === 'add-car'} onClick={() => setActivePage('add-car')} />
              <NavItem icon={<BarChart3 size={20} />} label="Trips" page="trips" active={activePage === 'trips'} onClick={() => setActivePage('trips')} />
              <NavItem icon={<Users size={20} />} label="Users" page="users" active={activePage === 'users'} onClick={() => setActivePage('users')} />
            </>
          )}
          {currentUser?.role === 'management' && (
            <>
              <NavItem icon={<Home size={20} />} label="Dashboard" page="dashboard" active={activePage === 'dashboard'} onClick={() => setActivePage('dashboard')} />
              <NavItem icon={<BarChart3 size={20} />} label="Reports" page="reports" active={activePage === 'reports'} onClick={() => setActivePage('reports')} />
              <NavItem icon={<Truck size={20} />} label="Trips" page="trips" active={activePage === 'trips'} onClick={() => setActivePage('trips')} />
            </>
          )}
          {currentUser?.role === 'driver' && (
            <>
              <NavItem icon={<Home size={20} />} label="My Assignments" page="assignments" active={activePage === 'assignments'} onClick={() => setActivePage('assignments')} />
              <NavItem icon={<MapPin size={20} />} label="Active Trip" page="active-trip" active={activePage === 'active-trip'} onClick={() => setActivePage('active-trip')} />
            </>
          )}
          {currentUser?.role === 'employee' && (
            <>
              <NavItem icon={<Home size={20} />} label="Request Car" page="request-car" active={activePage === 'request-car'} onClick={() => setActivePage('request-car')} />
              <NavItem icon={<Truck size={20} />} label="My Trips" page="my-trips" active={activePage === 'my-trips'} onClick={() => setActivePage('my-trips')} />
            </>
          )}
        </nav>

        <button
          onClick={handleLogout}
          style={{
            width: '100%',
            padding: '10px',
            background: 'rgba(255,255,255,0.2)',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            fontSize: '14px'
          }}
        >
          <LogOut size={18} /> Logout
        </button>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, padding: '30px', overflowY: 'auto' }}>
        {activePage === 'dashboard' && <DashboardPage cars={cars} trips={trips} currentUser={currentUser} />}
        {activePage === 'cars' && <CarsPage cars={cars} />}
        {activePage === 'add-car' && <AddCarPage onAddCar={handleAddCar} />}
        {activePage === 'trips' && <TripsPage trips={trips} cars={cars} users={users} />}
        {activePage === 'users' && <UsersPage users={users} />}
        {activePage === 'reports' && <ReportsPage trips={trips} cars={cars} />}
        {activePage === 'assignments' && <DriverAssignmentsPage trips={trips} currentUser={currentUser} onUpdateTripStatus={handleUpdateTripStatus} />}
        {activePage === 'active-trip' && <ActiveTripPage trips={trips} currentUser={currentUser} onUpdateTripStatus={handleUpdateTripStatus} />}
        {activePage === 'request-car' && <RequestCarPage onCreateTrip={handleCreateTrip} currentUser={currentUser} cars={cars} />}
        {activePage === 'my-trips' && <MyTripsPage trips={trips} currentUser={currentUser} />}
      </div>
    </div>
  );

  function NavItem({ icon, label, page, active, onClick }) {
    return (
      <button
        onClick={onClick}
        style={{
          width: '100%',
          padding: '12px 15px',
          background: active ? '#E67E22' : 'transparent',
          color: 'white',
          border: 'none',
          borderRadius: '6px',
          cursor: 'pointer',
          marginBottom: '8px',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          fontSize: '14px',
          fontWeight: '500',
          transition: 'all 0.2s'
        }}
      >
        {icon} {label}
      </button>
    );
  }
};

// Dashboard Page
function DashboardPage({ cars, trips, currentUser }) {
  const availableCars = cars.filter(c => c.status === 'available').length;
  const inUseCars = cars.filter(c => c.status === 'in_use').length;
  const breakdownCars = cars.filter(c => c.status === 'breakdown').length;

  return (
    <div>
      <h1 style={{ fontSize: '28px', fontWeight: 'bold', color: '#1F2937', marginBottom: '30px' }}>Dashboard</h1>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', marginBottom: '30px' }}>
        <StatCard label="Available Cars" value={availableCars} color="#22c55e" total={cars.length} />
        <StatCard label="In Use" value={inUseCars} color="#f59e0b" total={cars.length} />
        <StatCard label="Breakdown" value={breakdownCars} color="#ef4444" total={cars.length} />
        <StatCard label="Total Trips" value={trips.length} color="#3b82f6" total={trips.length} />
      </div>

      <div style={{ background: 'white', borderRadius: '8px', padding: '20px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
        <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#1F2937', marginBottom: '20px' }}>Car Availability Status</h3>
        <div style={{ display: 'grid', gap: '12px' }}>
          {cars.map(car => (
            <CarStatusRow key={car.id} car={car} />
          ))}
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value, color, total }) {
  return (
    <div style={{
      background: 'white',
      padding: '20px',
      borderRadius: '8px',
      boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
      borderLeft: `4px solid ${color}`
    }}>
      <p style={{ color: '#6b7280', fontSize: '13px', fontWeight: '500', margin: '0 0 8px 0' }}>{label}</p>
      <p style={{ fontSize: '32px', fontWeight: 'bold', color: color, margin: '0' }}>{value}</p>
      <p style={{ color: '#9ca3af', fontSize: '12px', margin: '8px 0 0 0' }}>of {total} total</p>
    </div>
  );
}

function CarStatusRow({ car }) {
  const getStatusIcon = (status) => {
    switch(status) {
      case 'available': return <CheckCircle size={20} color="#22c55e" />;
      case 'in_use': return <AlertTriangle size={20} color="#f59e0b" />;
      case 'breakdown': return <AlertCircle size={20} color="#ef4444" />;
      default: return null;
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'available': return '#dcfce7';
      case 'in_use': return '#fef3c7';
      case 'breakdown': return '#fee2e2';
      default: return '#f3f4f6';
    }
  };

  const statusLabels = { 'available': 'Available', 'in_use': 'In Use', 'breakdown': 'Breakdown' };

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: '1fr 1fr 1fr auto',
      alignItems: 'center',
      padding: '12px',
      background: '#f9fafb',
      borderRadius: '6px',
      gap: '15px'
    }}>
      <div>
        <p style={{ fontSize: '14px', fontWeight: '600', color: '#1F2937', margin: '0' }}>{car.regNumber}</p>
        <p style={{ fontSize: '12px', color: '#6b7280', margin: '4px 0 0 0' }}>{car.model}</p>
      </div>
      <div>
        <p style={{ fontSize: '12px', color: '#6b7280', margin: '0 0 4px 0' }}>Location</p>
        <p style={{ fontSize: '13px', color: '#1F2937', margin: '0' }}>{car.location}</p>
      </div>
      <div style={{
        padding: '6px 12px',
        background: getStatusColor(car.status),
        borderRadius: '4px',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        justifyContent: 'center'
      }}>
        {getStatusIcon(car.status)}
        <span style={{ fontSize: '12px', fontWeight: '500', color: '#1F2937' }}>{statusLabels[car.status]}</span>
      </div>
    </div>
  );
}

// Cars Page
function CarsPage({ cars }) {
  return (
    <div>
      <h1 style={{ fontSize: '28px', fontWeight: 'bold', color: '#1F2937', marginBottom: '30px' }}>Fleet Inventory</h1>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: '20px'
      }}>
        {cars.map(car => (
          <div key={car.id} style={{
            background: 'white',
            borderRadius: '8px',
            padding: '20px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '15px' }}>
              <div>
                <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#1F2937', margin: '0' }}>{car.regNumber}</h3>
                <p style={{ fontSize: '14px', color: '#6b7280', margin: '4px 0 0 0' }}>{car.model}</p>
              </div>
              <span style={{
                padding: '4px 8px',
                background: car.status === 'available' ? '#dcfce7' : car.status === 'in_use' ? '#fef3c7' : '#fee2e2',
                borderRadius: '4px',
                fontSize: '11px',
                fontWeight: '600',
                color: car.status === 'available' ? '#166534' : car.status === 'in_use' ? '#b45309' : '#7f1d1d'
              }}>
                ● {car.status === 'available' ? 'Available' : car.status === 'in_use' ? 'In Use' : 'Breakdown'}
              </span>
            </div>
            <div style={{ borderTop: '1px solid #e5e7eb', paddingTop: '15px' }}>
              <div style={{ marginBottom: '12px' }}>
                <p style={{ fontSize: '12px', color: '#6b7280', margin: '0 0 4px 0' }}>Insurance Valid Till</p>
                <p style={{ fontSize: '13px', fontWeight: '500', color: '#1F2937', margin: '0' }}>{car.insurance}</p>
              </div>
              <div>
                <p style={{ fontSize: '12px', color: '#6b7280', margin: '0 0 4px 0' }}>Fastag Number</p>
                <p style={{ fontSize: '13px', fontWeight: '500', color: '#1F2937', margin: '0' }}>{car.fastag}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Add Car Page
function AddCarPage({ onAddCar }) {
  const [formData, setFormData] = useState({
    regNumber: '',
    model: '',
    insurance: '',
    fastag: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.regNumber && formData.model && formData.insurance && formData.fastag) {
      onAddCar({ ...formData, status: 'available', location: 'Vadodara Office' });
      setFormData({ regNumber: '', model: '', insurance: '', fastag: '' });
      alert('Car added successfully!');
    }
  };

  return (
    <div>
      <h1 style={{ fontSize: '28px', fontWeight: 'bold', color: '#1F2937', marginBottom: '30px' }}>Add New Car</h1>
      <form onSubmit={handleSubmit} style={{
        background: 'white',
        borderRadius: '8px',
        padding: '30px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        maxWidth: '500px'
      }}>
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#1F2937', marginBottom: '8px' }}>Registration Number</label>
          <input
            type="text"
            placeholder="e.g., GJ01AB1234"
            value={formData.regNumber}
            onChange={(e) => setFormData({ ...formData, regNumber: e.target.value })}
            style={{
              width: '100%',
              padding: '10px',
              border: '1px solid #d1d5db',
              borderRadius: '6px',
              fontSize: '14px',
              boxSizing: 'border-box'
            }}
          />
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#1F2937', marginBottom: '8px' }}>Model</label>
          <input
            type="text"
            placeholder="e.g., Fortuner, Innova"
            value={formData.model}
            onChange={(e) => setFormData({ ...formData, model: e.target.value })}
            style={{
              width: '100%',
              padding: '10px',
              border: '1px solid #d1d5db',
              borderRadius: '6px',
              fontSize: '14px',
              boxSizing: 'border-box'
            }}
          />
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#1F2937', marginBottom: '8px' }}>Insurance Valid Till</label>
          <input
            type="date"
            value={formData.insurance}
            onChange={(e) => setFormData({ ...formData, insurance: e.target.value })}
            style={{
              width: '100%',
              padding: '10px',
              border: '1px solid #d1d5db',
              borderRadius: '6px',
              fontSize: '14px',
              boxSizing: 'border-box'
            }}
          />
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#1F2937', marginBottom: '8px' }}>Fastag Number</label>
          <input
            type="text"
            placeholder="e.g., FT1234"
            value={formData.fastag}
            onChange={(e) => setFormData({ ...formData, fastag: e.target.value })}
            style={{
              width: '100%',
              padding: '10px',
              border: '1px solid #d1d5db',
              borderRadius: '6px',
              fontSize: '14px',
              boxSizing: 'border-box'
            }}
          />
        </div>

        <button
          type="submit"
          style={{
            width: '100%',
            padding: '12px',
            background: '#E67E22',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            fontSize: '16px',
            fontWeight: '600',
            cursor: 'pointer'
          }}
        >
          Add Car to Fleet
        </button>
      </form>
    </div>
  );
}

// Trips Page
function TripsPage({ trips, cars, users }) {
  return (
    <div>
      <h1 style={{ fontSize: '28px', fontWeight: 'bold', color: '#1F2937', marginBottom: '30px' }}>Trip History</h1>
      <div style={{
        background: 'white',
        borderRadius: '8px',
        overflowX: 'auto',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
      }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #e5e7eb', background: '#f9fafb' }}>
              <th style={{ padding: '12px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#6b7280' }}>Car</th>
              <th style={{ padding: '12px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#6b7280' }}>Driver</th>
              <th style={{ padding: '12px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#6b7280' }}>From</th>
              <th style={{ padding: '12px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#6b7280' }}>To</th>
              <th style={{ padding: '12px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#6b7280' }}>Date</th>
              <th style={{ padding: '12px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#6b7280' }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {trips.map(trip => {
              const car = cars.find(c => c.id === trip.carId);
              const driver = users.find(u => u.id === trip.driverId);
              return (
                <tr key={trip.id} style={{ borderBottom: '1px solid #e5e7eb' }}>
                  <td style={{ padding: '12px', fontSize: '13px', color: '#1F2937' }}>{car?.regNumber}</td>
                  <td style={{ padding: '12px', fontSize: '13px', color: '#1F2937' }}>{driver?.name}</td>
                  <td style={{ padding: '12px', fontSize: '13px', color: '#1F2937' }}>{trip.from}</td>
                  <td style={{ padding: '12px', fontSize: '13px', color: '#1F2937' }}>{trip.to}</td>
                  <td style={{ padding: '12px', fontSize: '13px', color: '#1F2937' }}>{trip.date}</td>
                  <td style={{ padding: '12px' }}>
                    <span style={{
                      padding: '4px 8px',
                      background: trip.status === 'completed' ? '#dcfce7' : '#fef3c7',
                      borderRadius: '4px',
                      fontSize: '12px',
                      fontWeight: '600',
                      color: trip.status === 'completed' ? '#166534' : '#b45309'
                    }}>
                      {trip.status === 'completed' ? 'Completed' : 'In Progress'}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// Users Page
function UsersPage({ users }) {
  return (
    <div>
      <h1 style={{ fontSize: '28px', fontWeight: 'bold', color: '#1F2937', marginBottom: '30px' }}>User Management</h1>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        gap: '20px'
      }}>
        {users.map(user => (
          <div key={user.id} style={{
            background: 'white',
            borderRadius: '8px',
            padding: '20px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
          }}>
            <div style={{ display: 'flex', alignItems: 'start', justifyContent: 'space-between', marginBottom: '15px' }}>
              <div>
                <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#1F2937', margin: '0' }}>{user.name}</h3>
                <p style={{ fontSize: '12px', color: '#6b7280', margin: '4px 0 0 0' }}>{user.email}</p>
              </div>
              <span style={{
                padding: '4px 8px',
                background: '#ede9fe',
                borderRadius: '4px',
                fontSize: '11px',
                fontWeight: '600',
                color: '#6d28d9',
                textTransform: 'capitalize'
              }}>
                {user.role}
              </span>
            </div>
            <div style={{ borderTop: '1px solid #e5e7eb', paddingTop: '15px' }}>
              <p style={{ fontSize: '12px', color: '#6b7280', margin: '0 0 4px 0' }}>Phone</p>
              <p style={{ fontSize: '13px', fontWeight: '500', color: '#1F2937', margin: '0' }}>{user.phone}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Reports Page
function ReportsPage({ trips, cars }) {
  const completedTrips = trips.filter(t => t.status === 'completed').length;
  const totalDistance = trips.length * 45; // mock calculation
  const avgUsagePerCar = (trips.length / cars.length).toFixed(1);

  return (
    <div>
      <h1 style={{ fontSize: '28px', fontWeight: 'bold', color: '#1F2937', marginBottom: '30px' }}>Monthly Reports</h1>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginBottom: '30px' }}>
        <ReportCard label="Completed Trips" value={completedTrips} unit="trips" color="#22c55e" />
        <ReportCard label="Car Utilization" value={avgUsagePerCar} unit="avg trips/car" color="#3b82f6" />
        <ReportCard label="Fleet Size" value={cars.length} unit="cars" color="#f59e0b" />
      </div>

      <div style={{ background: 'white', borderRadius: '8px', padding: '20px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
        <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#1F2937', marginBottom: '20px' }}>Trip Summary</h3>
        <div style={{
          padding: '20px',
          background: '#f9fafb',
          borderRadius: '6px',
          fontSize: '14px',
          color: '#1F2937',
          lineHeight: '1.8'
        }}>
          <p><strong>Total Trips This Month:</strong> {trips.length}</p>
          <p><strong>Completed:</strong> {completedTrips}</p>
          <p><strong>In Progress:</strong> {trips.filter(t => t.status === 'in_progress').length}</p>
          <p><strong>Average Trips Per Car:</strong> {avgUsagePerCar}</p>
          <p><strong>Most Used Car:</strong> GJ01AB1234 (4 trips)</p>
        </div>
      </div>
    </div>
  );
}

function ReportCard({ label, value, unit, color }) {
  return (
    <div style={{
      background: 'white',
      padding: '20px',
      borderRadius: '8px',
      boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
      borderLeft: `4px solid ${color}`
    }}>
      <p style={{ color: '#6b7280', fontSize: '13px', fontWeight: '500', margin: '0 0 8px 0' }}>{label}</p>
      <p style={{ fontSize: '28px', fontWeight: 'bold', color: color, margin: '0' }}>{value}</p>
      <p style={{ color: '#9ca3af', fontSize: '12px', margin: '8px 0 0 0' }}>{unit}</p>
    </div>
  );
}

// Driver Assignments Page
function DriverAssignmentsPage({ trips, currentUser, onUpdateTripStatus }) {
  const driverTrips = trips.filter(t => t.driverId === currentUser.id);

  return (
    <div>
      <h1 style={{ fontSize: '28px', fontWeight: 'bold', color: '#1F2937', marginBottom: '30px' }}>My Assignments</h1>

      <div style={{ display: 'grid', gap: '20px' }}>
        {driverTrips.length > 0 ? (
          driverTrips.map(trip => (
            <div key={trip.id} style={{
              background: 'white',
              borderRadius: '8px',
              padding: '20px',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
            }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr auto', gap: '20px', marginBottom: '20px' }}>
                <div>
                  <p style={{ fontSize: '12px', color: '#6b7280', margin: '0 0 4px 0' }}>From</p>
                  <p style={{ fontSize: '16px', fontWeight: '600', color: '#1F2937', margin: '0' }}>{trip.from}</p>
                </div>
                <div>
                  <p style={{ fontSize: '12px', color: '#6b7280', margin: '0 0 4px 0' }}>To</p>
                  <p style={{ fontSize: '16px', fontWeight: '600', color: '#1F2937', margin: '0' }}>{trip.to}</p>
                </div>
                <div>
                  <p style={{ fontSize: '12px', color: '#6b7280', margin: '0 0 4px 0' }}>Date</p>
                  <p style={{ fontSize: '16px', fontWeight: '600', color: '#1F2937', margin: '0' }}>{trip.date}</p>
                </div>
                <span style={{
                  padding: '6px 12px',
                  background: trip.status === 'in_progress' ? '#fef3c7' : '#dcfce7',
                  borderRadius: '4px',
                  fontSize: '12px',
                  fontWeight: '600',
                  color: trip.status === 'in_progress' ? '#b45309' : '#166534',
                  height: 'fit-content'
                }}>
                  {trip.status === 'in_progress' ? '● In Progress' : '✓ Completed'}
                </span>
              </div>

              {trip.status === 'in_progress' && (
                <div style={{ display: 'flex', gap: '10px', paddingTop: '15px', borderTop: '1px solid #e5e7eb' }}>
                  <button
                    onClick={() => onUpdateTripStatus(trip.id, 'completed')}
                    style={{
                      flex: 1,
                      padding: '10px',
                      background: '#22c55e',
                      color: 'white',
                      border: 'none',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      fontSize: '14px',
                      fontWeight: '600'
                    }}
                  >
                    Mark as Completed
                  </button>
                </div>
              )}
            </div>
          ))
        ) : (
          <div style={{
            background: 'white',
            borderRadius: '8px',
            padding: '40px',
            textAlign: 'center',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
          }}>
            <p style={{ color: '#6b7280', fontSize: '14px' }}>No assignments yet</p>
          </div>
        )}
      </div>
    </div>
  );
}

// Active Trip Page
function ActiveTripPage({ trips, currentUser, onUpdateTripStatus }) {
  const activeTrip = trips.find(t => t.driverId === currentUser.id && t.status === 'in_progress');

  return (
    <div>
      <h1 style={{ fontSize: '28px', fontWeight: 'bold', color: '#1F2937', marginBottom: '30px' }}>Active Trip</h1>

      {activeTrip ? (
        <div style={{
          background: 'white',
          borderRadius: '8px',
          padding: '30px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
          maxWidth: '600px'
        }}>
          <div style={{ display: 'grid', gap: '20px', marginBottom: '30px' }}>
            <TripDetailRow label="Route" value={`${activeTrip.from} → ${activeTrip.to}`} />
            <TripDetailRow label="Started" value={activeTrip.startTime} />
            <TripDetailRow label="Date" value={activeTrip.date} />
            <TripDetailRow label="Status" value="🚗 Journey In Progress" />
          </div>

          <div style={{ display: 'grid', gap: '10px' }}>
            <button
              onClick={() => {
                if (window.confirm('Mark this trip as completed?')) {
                  onUpdateTripStatus(activeTrip.id, 'completed');
                }
              }}
              style={{
                width: '100%',
                padding: '14px',
                background: '#22c55e',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '16px',
                fontWeight: '600'
              }}
            >
              ✓ Trip Completed - Reached Destination
            </button>
            <button
              style={{
                width: '100%',
                padding: '14px',
                background: '#e5e7eb',
                color: '#6b7280',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '16px',
                fontWeight: '600'
              }}
            >
              ⚠ Report Issue
            </button>
          </div>
        </div>
      ) : (
        <div style={{
          background: 'white',
          borderRadius: '8px',
          padding: '40px',
          textAlign: 'center',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
        }}>
          <p style={{ color: '#6b7280', fontSize: '14px' }}>No active trip assigned</p>
        </div>
      )}
    </div>
  );
}

function TripDetailRow({ label, value }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '150px 1fr', gap: '20px', alignItems: 'center' }}>
      <p style={{ fontSize: '13px', fontWeight: '500', color: '#6b7280', margin: '0' }}>{label}</p>
      <p style={{ fontSize: '15px', fontWeight: '600', color: '#1F2937', margin: '0' }}>{value}</p>
    </div>
  );
}

// Request Car Page
function RequestCarPage({ onCreateTrip, currentUser, cars }) {
  const [formData, setFormData] = useState({
    from: '',
    to: '',
    date: '',
    time: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.from && formData.to && formData.date && formData.time) {
      const availableCar = cars.find(c => c.status === 'available');
      if (availableCar) {
        onCreateTrip({
          carId: availableCar.id,
          driverId: 1, // mock driver assignment
          employeeId: currentUser.id,
          from: formData.from,
          to: formData.to,
          status: 'in_progress',
          startTime: formData.time,
          endTime: null,
          date: formData.date
        });
        alert('Car request created! Admin will assign shortly.');
        setFormData({ from: '', to: '', date: '', time: '' });
      } else {
        alert('No cars available');
      }
    }
  };

  return (
    <div>
      <h1 style={{ fontSize: '28px', fontWeight: 'bold', color: '#1F2937', marginBottom: '30px' }}>Request a Car</h1>
      <form onSubmit={handleSubmit} style={{
        background: 'white',
        borderRadius: '8px',
        padding: '30px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        maxWidth: '500px'
      }}>
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#1F2937', marginBottom: '8px' }}>From Location</label>
          <input
            type="text"
            placeholder="e.g., Vadodara Office"
            value={formData.from}
            onChange={(e) => setFormData({ ...formData, from: e.target.value })}
            style={{
              width: '100%',
              padding: '10px',
              border: '1px solid #d1d5db',
              borderRadius: '6px',
              fontSize: '14px',
              boxSizing: 'border-box'
            }}
          />
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#1F2937', marginBottom: '8px' }}>To Location</label>
          <input
            type="text"
            placeholder="e.g., Ahmedabad"
            value={formData.to}
            onChange={(e) => setFormData({ ...formData, to: e.target.value })}
            style={{
              width: '100%',
              padding: '10px',
              border: '1px solid #d1d5db',
              borderRadius: '6px',
              fontSize: '14px',
              boxSizing: 'border-box'
            }}
          />
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#1F2937', marginBottom: '8px' }}>Date</label>
          <input
            type="date"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            style={{
              width: '100%',
              padding: '10px',
              border: '1px solid #d1d5db',
              borderRadius: '6px',
              fontSize: '14px',
              boxSizing: 'border-box'
            }}
          />
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#1F2937', marginBottom: '8px' }}>Time</label>
          <input
            type="time"
            value={formData.time}
            onChange={(e) => setFormData({ ...formData, time: e.target.value })}
            style={{
              width: '100%',
              padding: '10px',
              border: '1px solid #d1d5db',
              borderRadius: '6px',
              fontSize: '14px',
              boxSizing: 'border-box'
            }}
          />
        </div>

        <button
          type="submit"
          style={{
            width: '100%',
            padding: '12px',
            background: '#E67E22',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            fontSize: '16px',
            fontWeight: '600',
            cursor: 'pointer'
          }}
        >
          Submit Request
        </button>
      </form>
    </div>
  );
}

// My Trips Page
function MyTripsPage({ trips, currentUser }) {
  const employeeTrips = trips.filter(t => t.employeeId === currentUser.id);

  return (
    <div>
      <h1 style={{ fontSize: '28px', fontWeight: 'bold', color: '#1F2937', marginBottom: '30px' }}>My Trips</h1>

      {employeeTrips.length > 0 ? (
        <div style={{ display: 'grid', gap: '20px' }}>
          {employeeTrips.map(trip => (
            <div key={trip.id} style={{
              background: 'white',
              borderRadius: '8px',
              padding: '20px',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
              display: 'grid',
              gridTemplateColumns: '1fr 1fr 1fr 1fr auto',
              gap: '15px',
              alignItems: 'center'
            }}>
              <div>
                <p style={{ fontSize: '12px', color: '#6b7280', margin: '0 0 4px 0' }}>Route</p>
                <p style={{ fontSize: '14px', fontWeight: '600', color: '#1F2937', margin: '0' }}>{trip.from} → {trip.to}</p>
              </div>
              <div>
                <p style={{ fontSize: '12px', color: '#6b7280', margin: '0 0 4px 0' }}>Date</p>
                <p style={{ fontSize: '14px', fontWeight: '600', color: '#1F2937', margin: '0' }}>{trip.date}</p>
              </div>
              <div>
                <p style={{ fontSize: '12px', color: '#6b7280', margin: '0 0 4px 0' }}>Time</p>
                <p style={{ fontSize: '14px', fontWeight: '600', color: '#1F2937', margin: '0' }}>{trip.startTime} - {trip.endTime || 'ongoing'}</p>
              </div>
              <div>
                <p style={{ fontSize: '12px', color: '#6b7280', margin: '0 0 4px 0' }}>Status</p>
                <p style={{ fontSize: '14px', fontWeight: '600', color: trip.status === 'completed' ? '#22c55e' : '#f59e0b', margin: '0' }}>
                  {trip.status === 'completed' ? '✓ Completed' : '● In Progress'}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div style={{
          background: 'white',
          borderRadius: '8px',
          padding: '40px',
          textAlign: 'center',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
        }}>
          <p style={{ color: '#6b7280', fontSize: '14px' }}>No trips yet</p>
        </div>
      )}
    </div>
  );
}

export default ExcelsourceTransportApp;
