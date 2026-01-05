import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import { Platform } from 'react-native';

// Configuration du comportement des notifications
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

/**
 * Demande les permissions pour les notifications
 * @returns {Promise<boolean>} true si les permissions sont accordées
 */
export async function registerForPushNotificationsAsync() {
  let token;

  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    
    if (finalStatus !== 'granted') {
      alert('Échec de l\'obtention du token de notification push!');
      return null;
    }
    
    // Obtenir le token Expo Push
    token = (await Notifications.getExpoPushTokenAsync({
      projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
    })).data;
    
    console.log('Expo Push Token:', token);
  } else {
    alert('Les notifications push ne fonctionnent que sur un appareil physique!');
  }

  return token;
}

/**
 * Programmer une notification locale
 * @param {Object} options - Options de la notification
 * @param {string} options.title - Titre de la notification
 * @param {string} options.body - Corps de la notification
 * @param {Object} options.data - Données supplémentaires
 * @param {Object} options.trigger - Déclencheur (seconds, date, etc.)
 */
export async function schedulePushNotification({
  title,
  body,
  data = {},
  trigger = null,
}) {
  await Notifications.scheduleNotificationAsync({
    content: {
      title,
      body,
      data,
      sound: true,
    },
    trigger: trigger || { seconds: 2 },
  });
}

/**
 * Annuler toutes les notifications programmées
 */
export async function cancelAllNotifications() {
  await Notifications.cancelAllScheduledNotificationsAsync();
}

/**
 * Obtenir le nombre de notifications non lues
 */
export async function getBadgeCount() {
  return await Notifications.getBadgeCountAsync();
}

/**
 * Réinitialiser le badge
 */
export async function resetBadge() {
  await Notifications.setBadgeCountAsync(0);
}

/**
 * Écouter les notifications reçues
 * @param {Function} callback - Fonction appelée quand une notification est reçue
 * @returns {Function} Fonction pour se désabonner
 */
export function addNotificationReceivedListener(callback) {
  return Notifications.addNotificationReceivedListener(callback);
}

/**
 * Écouter les interactions avec les notifications (clic)
 * @param {Function} callback - Fonction appelée quand une notification est cliquée
 * @returns {Function} Fonction pour se désabonner
 */
export function addNotificationResponseReceivedListener(callback) {
  return Notifications.addNotificationResponseReceivedListener(callback);
}


