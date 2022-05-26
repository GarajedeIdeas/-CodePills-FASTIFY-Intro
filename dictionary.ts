import { Dictionary, Roles } from "./interface";

const notificationEstablisment = {
  paid: "Nuevo pedido",
  canceled: "El pedido ha sido cancelado",
};
const notificationRider = {
  delivered: "El restaurante ha preparado el pedido",
  canceled: "El pedido ha sido cancelado",
};
const notificationUser = {
  paid: "Hurrah! Has completado el pedido con exito 🚀",
  accepted: "El restaurante está preparando tu vizzio 😋",
  ready: "Gracias por pedir vizzio te esperamos pronto 🥳",
  delivery: "Tu pedido ya está de camino 🛵",
  delivered: "Tu pedido ha sido preparado 😊",
  canceled: "Lo sentimos, Tu pedido ha sido rechazado 😔",
};

export default (role: Roles): Dictionary => {
  switch(role) {
    case Roles.user:
      return notificationUser
    case Roles.establishment:
      return notificationEstablisment
    case Roles.rider:
      return notificationRider
    default:
      throw new Error(`Unknown Role ${role}`)
  }
}