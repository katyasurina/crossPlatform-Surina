import React, { useState } from 'react';
import {
  Alert,
  StatusBar,
  StyleSheet,
  View,
  Text,
  TouchableOpacity
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import ManagerView from './components/ManagerView';
import ClientView from './components/ClientView';

export default function App() {
  const [role, setRole] = useState(null);

  const [cars, setCars] = useState([
    { id: '1', brand: 'BMW M4 Competition', price: '78900', year: '2024' },
    { id: '2', brand: 'Audi Q5 Sportback', price: '54500', year: '2023' },
    { id: '3', brand: 'Tesla Model 3', price: '42300', year: '2024' },
    { id: '4', brand: 'Porsche Taycan', price: '96000', year: '2023' },
    { id: '5', brand: 'Mercedes GLC 300', price: '58700', year: '2022' },
  ]);

  const [orders, setOrders] = useState([]);

  const addCar = (brand, price, year) => {
    if (!brand.trim() || !price.trim() || !year.trim()) {
      Alert.alert('Помилка', 'Заповніть усі поля авто.');
      return false;
    }

    const newCar = {
      id: Date.now().toString(),
      brand: brand.trim(),
      price: price.trim(),
      year: year.trim()
    };

    setCars([newCar, ...cars]);
    Alert.alert('Успіх', 'Авто додано до каталогу.');
    return true;
  };

  const editCar = (id, newBrand, newPrice, newYear) => {
    if (!newBrand.trim() || !newPrice.trim() || !newYear.trim()) {
      Alert.alert('Помилка', 'Усі поля мають бути заповнені.');
      return;
    }

    setCars(cars.map(car =>
        car.id === id
            ? { ...car, brand: newBrand.trim(), price: newPrice.trim(), year: newYear.trim() }
            : car
    ));

    Alert.alert('Успіх', 'Дані авто оновлено.');
  };

  const deleteCar = (id) => {
    Alert.alert(
        'Видалити авто?',
        'Ви впевнені, що хочете видалити це авто з каталогу?',
        [
          { text: 'Скасувати', style: 'cancel' },
          {
            text: 'Видалити',
            style: 'destructive',
            onPress: () => setCars(cars.filter(c => c.id !== id))
          }
        ]
    );
  };

  const buyCar = (car, clientName) => {
    const newOrder = {
      id: Date.now().toString(),
      carBrand: car.brand,
      price: car.price,
      client: clientName,
      status: 'Нове',
    };

    setOrders([newOrder, ...orders]);
    setCars(cars.filter(c => c.id !== car.id));

    Alert.alert('Успіх', `Дякуємо, ${clientName}! Ви замовили ${car.brand}.`);
  };

  const cancelOrder = (orderId) => {
    const orderToCancel = orders.find(o => o.id === orderId);

    if (orderToCancel) {
      Alert.alert(
          'Скасувати замовлення?',
          `Ви впевнені, що хочете скасувати замовлення на ${orderToCancel.carBrand}?`,
          [
            { text: 'Ні', style: 'cancel' },
            {
              text: 'Так, скасувати',
              style: 'destructive',
              onPress: () => {
                setOrders(orders.filter(o => o.id !== orderId));

                const returnedCar = {
                  id: Date.now().toString(),
                  brand: orderToCancel.carBrand,
                  price: orderToCancel.price,
                  year: 'Н/Д'
                };
                setCars([returnedCar, ...cars]);

                Alert.alert('Скасовано', 'Замовлення скасовано, авто повернуто в каталог.');
              }
            }
          ]
      );
    }
  };

  const editOrderName = (orderId, newName) => {
    if (!newName || !newName.trim()) {
      Alert.alert('Помилка', 'Ім\'я не може бути порожнім.');
      return;
    }

    setOrders(orders.map(o =>
        o.id === orderId ? { ...o, client: newName.trim() } : o
    ));

    Alert.alert('Успіх', 'ПІБ у замовленні оновлено.');
  };

  const updateOrderStatus = (id) => {
    setOrders(orders.map(o => {
      if (o.id === id) {
        const nextStatus =
            o.status === 'Нове'
                ? 'В обробці'
                : o.status === 'В обробці'
                    ? 'Оплачено'
                    : 'Завершено';

        return { ...o, status: nextStatus };
      }
      return o;
    }));
  };

  if (!role) {
    return (
        <SafeAreaView style={styles.safeArea}>
          <StatusBar barStyle="dark-content" />
          <View style={styles.roleContainer}>
            <Text style={styles.logo}>drivo</Text>
            <Text style={styles.subtitle}>Оберіть роль для входу</Text>

            <TouchableOpacity
                style={styles.roleButton}
                onPress={() => setRole('manager')}
            >
              <Text style={styles.roleButtonText}>Я Менеджер</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={[styles.roleButton, styles.clientButton]}
                onPress={() => setRole('client')}
            >
              <Text style={[styles.roleButtonText, styles.clientButtonText]}>Я Клієнт</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
    );
  }

  return (
      <SafeAreaView style={styles.safeArea}>
        <StatusBar barStyle="dark-content" />
        <View style={styles.container}>
          {role === 'manager' ? (
              <ManagerView
                  cars={cars}
                  orders={orders}
                  onAddCar={addCar}
                  onEditCar={editCar}
                  onDeleteCar={deleteCar}
                  onUpdateStatus={updateOrderStatus}
                  onLogout={() => setRole(null)}
              />
          ) : (
              <ClientView
                  cars={cars}
                  orders={orders}
                  onBuyCar={buyCar}
                  onCancelOrder={cancelOrder}
                  onEditOrderName={editOrderName}
                  onLogout={() => setRole(null)}
              />
          )}
        </View>
      </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F8FAFC'
  },
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 40
  },
  roleContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    paddingTop: 60
  },
  logo: {
    fontSize: 48,
    fontWeight: '900',
    color: '#1E293B',
    marginBottom: 10
  },
  subtitle: {
    fontSize: 16,
    color: '#64748B',
    marginBottom: 40
  },
  roleButton: {
    backgroundColor: '#84CC16',
    width: '100%',
    padding: 18,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 15,
  },
  roleButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold'
  },
  clientButton: {
    backgroundColor: '#FFF',
    borderWidth: 2,
    borderColor: '#E2E8F0'
  },
  clientButtonText: {
    color: '#1E293B'
  },
});