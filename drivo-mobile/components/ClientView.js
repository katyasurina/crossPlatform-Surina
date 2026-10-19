import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    Alert
} from 'react-native';

export default function ClientView({
                                       cars,
                                       orders,
                                       onBuyCar,
                                       onCancelOrder,
                                       onEditOrderName,
                                       onLogout
                                   }) {

    const handleBuyPress = (car) => {
        Alert.prompt(
            'Оформлення замовлення',
            `Введіть ваше ПІБ:`,
            [
                { text: 'Скасувати', style: 'cancel' },
                {
                    text: 'Підтвердити',
                    onPress: (name) => {
                        if (!name || !name.trim()) {
                            return Alert.alert('Помилка', 'Будь ласка, введіть ваше ім\'я.');
                        }
                        onBuyCar(car, name.trim());
                    }
                }
            ],
            'plain-text'
        );
    };

    const handleEditName = (order) => {
        Alert.prompt(
            'Редагування ПІБ',
            'Введіть правильне ПІБ:',
            [
                { text: 'Скасувати', style: 'cancel' },
                {
                    text: 'Зберегти',
                    onPress: (newName) => onEditOrderName(order.id, newName)
                }
            ],
            'plain-text',
            order.client
        );
    };

    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.header}>
                <Text style={styles.title}>Каталог авто</Text>
                <TouchableOpacity onPress={onLogout}>
                    <Text style={styles.logout}>Вийти</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.card}>
                <Text style={styles.sectionTitle}>Доступні авто ({cars.length})</Text>

                {cars.length === 0 ? (
                    <Text style={styles.emptyText}>Всі авто розкуплені!</Text>
                ) : (
                    cars.map((car) => (
                        <View key={car.id} style={styles.carItem}>
                            <View style={styles.carInfoContainer}>
                                <Text style={styles.carBrand}>{car.brand}</Text>
                                <Text style={styles.carYear}>{car.year} рік</Text>
                                <Text style={styles.carPrice}>{car.price} $</Text>
                            </View>

                            <TouchableOpacity
                                style={styles.buyButton}
                                onPress={() => handleBuyPress(car)}
                            >
                                <Text style={styles.buyButtonText}>Купити</Text>
                            </TouchableOpacity>
                        </View>
                    ))
                )}
            </View>

            <View style={styles.card}>
                <Text style={styles.sectionTitle}>Мої замовлення ({orders.length})</Text>

                {orders.length === 0 ? (
                    <Text style={styles.emptyText}>У вас ще немає замовлень</Text>
                ) : (
                    orders.map((order) => (
                        <View key={order.id} style={styles.orderItem}>

                            <View style={styles.orderInfo}>
                                <Text style={styles.carBrand}>{order.carBrand}</Text>
                                <Text style={styles.orderStatus}>Статус: {order.status}</Text>
                                <Text style={styles.orderClient}>ПІБ: {order.client}</Text>
                            </View>

                            <View style={styles.actionButtons}>
                                <TouchableOpacity
                                    style={styles.editButton}
                                    onPress={() => handleEditName(order)}
                                >
                                    <Text style={styles.editText}>Ред.</Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={styles.cancelButton}
                                    onPress={() => onCancelOrder(order.id)}
                                >
                                    <Text style={styles.cancelText}>Вид.</Text>
                                </TouchableOpacity>
                            </View>

                        </View>
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
        paddingTop: 20
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
    emptyText: {
        color: '#94A3B8',
        fontStyle: 'italic',
        textAlign: 'center'
    },
    carItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderColor: '#F1F5F9'
    },
    carInfoContainer: {
        flex: 1
    },
    carBrand: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#1E293B'
    },
    carYear: {
        fontSize: 12,
        color: '#64748B'
    },
    carPrice: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#84CC16',
        marginTop: 4
    },
    buyButton: {
        backgroundColor: '#1E293B',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 8
    },
    buyButtonText: {
        color: '#FFF',
        fontWeight: 'bold'
    },
    orderItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderColor: '#F1F5F9'
    },
    orderInfo: {
        flex: 1
    },
    orderStatus: {
        color: '#64748B',
        marginTop: 4
    },
    orderClient: {
        color: '#64748B',
        fontSize: 13,
        marginTop: 2
    },
    actionButtons: {
        flexDirection: 'row'
    },
    editButton: {
        backgroundColor: '#E2E8F0',
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 8,
        marginLeft: 8
    },
    editText: {
        color: '#1E293B',
        fontWeight: 'bold',
        fontSize: 12
    },
    cancelButton: {
        backgroundColor: '#FEE2E2',
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 8,
        marginLeft: 8
    },
    cancelText: {
        color: '#EF4444',
        fontWeight: 'bold',
        fontSize: 12
    },
});