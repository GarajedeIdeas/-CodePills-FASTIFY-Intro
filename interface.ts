import { ExpoPushTicket } from "expo-server-sdk"

export enum Roles {
    user = 'user',
    rider = 'rider',
    establishment = 'establishment',
  }

export enum Status {
    paid = 'paid',
    accepted = 'accepted',
    ready = 'ready',
    delivery = 'delivery',
    delivered = 'delivered',
    canceled = 'canceled',
  }

export interface Dictionary {
    paid?: string
    accepted?: string
    ready?: string
    delivery?: string
    delivered?: string
    canceled: string
}

export interface PushToken {
    status: Status
    role: Roles
    token: string
}

export interface PushNotification {
    (pushTokens: PushToken[]): Promise<ExpoPushTicket[]>
}