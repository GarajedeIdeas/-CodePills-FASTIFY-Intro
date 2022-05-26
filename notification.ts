import fp from 'fastify-plugin'
import { FastifyInstance } from 'fastify'
import { Expo, ExpoPushTicket } from 'expo-server-sdk';
import NOTIFICATIONDICTIONARY from './dictionary'
import { PushNotification, PushToken, Roles, Status } from './interface';
const expo = new Expo();

async function sendNotification(pushTokens: PushToken[]): Promise<ExpoPushTicket[]> {
let messages = [];
for (let pushToken of pushTokens) {
  const { token, status, role } = pushToken
  const body = textNotification(status, role)
  if (!Expo.isExpoPushToken(token)) {
    console.error(`Push token ${token} is not a valid Expo push token`);
    continue;
  }
  if(body) {
    messages.push({
      to: token,
      body,
      data: { pushToken },
    })
  }
}

function textNotification(status: Status, role: Roles): string | void {
  const dictionary = NOTIFICATIONDICTIONARY(role)
  return dictionary[status]
}

const chunk = expo.chunkPushNotifications(messages);
const ticketChunk = await expo.sendPushNotificationsAsync(chunk[0]);
return ticketChunk
}

async function init(fastify: FastifyInstance): Promise<void> {
    fastify.decorateRequest('notification', null)
    fastify.addHook('onRequest', async (req) => {
        req.pushNotification = sendNotification
    })
}

declare module 'fastify' {
    interface FastifyRequest {
        pushNotification: PushNotification
    }
}

export default fp(init, { name: 'expo-notification' })
