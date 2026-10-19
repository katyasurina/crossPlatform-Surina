import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    Alert
} from 'react-native';

export default function ManagerView({
                                        cars,
                                        orders,
                                        onAddCar,
                                        onEditCar,
                                        onDeleteCar,
                                        onUpdateStatus,
                                        onLogout
                                    }) {
    const [brand, setBrand] = useState('');
    const [price, setPrice] = useState('');
    const [year, setYear] = useState('');

    const handleAdd = () => {
        if (onAddCar(brand, price, year)) {
            setBrand('');
            setPrice('');
            setYear('');
        }
    };

    const handleEdit = (car) => {
        Alert.prompt(
            'Редагування: Крок 1 з 3',
            'Введіть нову марку та модель:',
            [
                { text: 'Скасувати', style: 'cancel' },
                {
                    text: 'Далі',
                    onPress: (newBrand) => {
                        if (!newBrand.trim()) {
                            return Alert.alert('Помилка', 'Поле не може бути порожнім');
                        }

                        Alert.prompt(
                            'Редагування: Крок 2 з 3',
                            'Введіть нову ціну ($):',
                            [
                                { text: 'Скасувати', style: 'cancel' },
                                {
                                    text: 'Далі',
                                    onPress: (newPrice) => {
                                        if (!newPrice.trim() || isNaN(newPrice)) {
                                            return Alert.alert('Помилка', 'Введіть число');
                                        }

                                        Alert.prompt(
                                            'Редагування: Крок 3 з 3',
                                            'Введіть новий рік:',
                                            [
                                                { text: 'Скасувати', style: 'cancel' },
                                                {
                                                    text: 'Зберегти',
                                                    onPress: (newYear) => {
                                                        if (!newYear.trim() || isNaN(newYear)) {
                                                            return Alert.alert('Помилка', 'Введіть число');
                                                        }
                                                        onEditCar(car.id, newBrand, newPrice, newYear);
                                                    }
                                                }
                                            ],
                                            'plain-text',
                                            car.year
                                        );
                                    }
                                }
                            ],
                            'plain-text',
                            car.price
                        );
                    }
                }
            ],
            'plain-text',
            car.brand
        );
    };

    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.header}>
                <Text style={styles.title}>Панель менеджера</Text>
                <TouchableOpacity onPress={onLogout}>
                    <Text style={styles.logout}>Вийти</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.card}>
                <Text style={styles.sectionTitle}>Додати авто в каталог</Text>

                <TextInput
                    style={styles.input}
                    placeholder="Марка та модель"
                    value={brand}
                    onChangeText={setBrand}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Ціна ($)"
                    keyboardType="numeric"
                    value={price}
                    onChangeText={setPrice}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Рік"
                    keyboardType="numeric"
                    value={year}
                    onChangeText={setYear}
                />

                <TouchableOpacity style={styles.addButton} onPress={handleAdd}>
                    <Text style={styles.addButtonText}>Додати авто</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.card}>
                <Text style={styles.sectionTitle}>Каталог авто ({cars.length})</Text>

                {cars.map(car => (
                    <View key={car.id} style={styles.carItem}>
                        <View style={styles.carInfoContainer}>
                            <Text style={styles.carBrand}>{car.brand}</Text>
                            <Text style={styles.carInfo}>{car.year} · {car.price} $</Text>
                        </View>

                        <TouchableOpacity
                            style={styles.actionButton}
                            onPress={() => handleEdit(car)}
                        >
                            <Text style={styles.actionText}>Ред.</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[styles.actionButton, styles.deleteBtn]}
                            onPress={() => onDeleteCar(car.id)}
                        >
                            <Text style={styles.actionText}>Вид.</Text>
                        </TouchableOpacity>
                    </View>
                ))}
            </View>

            <View style={styles.card}>
                <Text style={styles.sectionTitle}>Вхідні замовлення ({orders.length})</Text>

                {orders.length === 0 ? (
                    <Text style={styles.emptyText}>Замовлень поки немає</Text>
                ) : (
                    orders.map((order) => (
                        <TouchableOpacity
                            key={order.id}
                            style={styles.orderItem}
                            onPress={() => onUpdateStatus(order.id)}
                        >
                            <View>
                                <Text style={styles.orderCar}>{order.carBrand}</Text>
                                <Text style={styles.orderClient}>Клієнт: {order.client}</Text>
                                <Text style={styles.orderPrice}>{order.price} $</Text>
                            </View>

                            <View style={[
                                styles.statusBadge,
                                order.status === 'Нове' && styles.statusNew,
                                order.status === 'Оплачено' && styles.statusDone
                            ]}>
                                <Text style={styles.statusText}>{order.status}</Text>
                            </View>
                        </TouchableOpacity>
                    ))
                )}
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
        paddingTop: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#1E293B'
    },
    logout: {
        color: '#EF4444',
        fontWeight: 'bold'
    },
    card: {
        backgroundColor: '#FFF',
        borderRadius: 16,
        padding: 16,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: '#F1F5F9'
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#1E293B',
        marginBottom: 12
    },
    input: {
        backgroundColor: '#F8FAFC',
        borderRadius: 10,
        padding: 12,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#E2E8F0',
        color: '#1E293B'
    },
    addButton: {
        backgroundColor: '#84CC16',
        padding: 14,
        borderRadius: 10,
        alignItems: 'center'
    },
    addButtonText: {
        color: '#FFF',
        fontWeight: 'bold'
    },
    emptyText: {
        color: '#94A3B8',
        fontStyle: 'italic',
        textAlign: 'center'
    },
    carItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderColor: '#F1F5F9'
    },
    carInfoContainer: {
        flex: 1,
    },
    carBrand: {
        fontWeight: 'bold',
        color: '#1E293B',
        fontSize: 15
    },
    carInfo: {
        color: '#64748B',
        fontSize: 13,
        marginTop: 2
    },
    actionButton: {
        backgroundColor: '#E2E8F0',
        paddingVertical: 6,
        paddingHorizontal: 10,
        borderRadius: 6,
        marginLeft: 8
    },
    deleteBtn: {
        backgroundColor: '#FEE2E2'
    },
    actionText: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#1E293B'
    },
    orderItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderColor: '#F1F5F9'
    },
    orderCar: {
        fontWeight: 'bold',
        color: '#1E293B'
    },
    orderClient: {
        color: '#64748B',
        fontSize: 13,
        marginVertical: 2,
    },
    orderPrice: {
        color: '#64748B'
    },
    statusBadge: {
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 8,
        backgroundColor: '#F1F5F9'
    },
    statusNew: {
        backgroundColor: '#FEF08A'
    },
    statusDone: {
        backgroundColor: '#D9F99D'
    },
    statusText: {
        fontSize: 12,
        fontWeight: 'bold'
    },
});