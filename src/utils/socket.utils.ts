/* eslint-disable @typescript-eslint/no-explicit-any */
import { io, Socket } from "socket.io-client";
import NetInfo from "@react-native-community/netinfo";
import { getToken } from "./token.utils";

class SocketManager {
  private socket: Socket | null = null;
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;

  constructor() {
    this.initializeSocket();
    this.setupNetworkMonitoring();
  }

  private async initializeSocket() {
    const API_URL = process.env.EXPO_PUBLIC_API_URL;
    const token = await getToken();

    this.socket = io(API_URL, {
      auth: {
        token: token,
      },
      reconnection: true,
      reconnectionAttempts: this.maxReconnectAttempts,
      reconnectionDelay: 1000,
      timeout: 20000,
      transports: ["websocket"],
      upgrade: false,
      forceNew: true,
    });

    this.setupSocketEvents();
  }

  private setupSocketEvents() {
    if (!this.socket) return;

    this.socket.on("connect", () => {
      this.reconnectAttempts = 0;
    });

    this.socket.on("disconnect", (reason) => {
      // console.log("Socket disconnected:", reason);
    });

    this.socket.on("connect_error", (error) => {
      // console.log("Socket connection error:", error);
      this.reconnectAttempts++;

      if (this.reconnectAttempts >= this.maxReconnectAttempts) {
        // console.log("Max reconnection attempts reached");
      }
    });

    this.socket.on("reconnect", (attemptNumber) => {
      // console.log("Socket reconnected after", attemptNumber, "attempts");
      this.reconnectAttempts = 0;
    });
  }

  private setupNetworkMonitoring() {
    NetInfo.addEventListener((state) => {
      if (state.isConnected && !this.socket?.connected) {
        this.reconnect();
      }
    });
  }

  public getSocket(): Socket | null {
    return this.socket;
  }

  public connect() {
    if (this.socket && !this.socket.connected) {
      this.socket.connect();
    }
  }

  public disconnect() {
    if (this.socket) {
      this.socket.disconnect();
    }
  }

  public async reinitializeWithAuth() {
    this.disconnect();
    await this.initializeSocket();
  }

  public reconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket.connect();
    }
  }

  public emit(event: string, data?: any) {
    if (this.socket?.connected) {
      this.socket.emit(event, data);
    } else {
      console.warn("Socket not connected, cannot emit event:", event);
    }
  }

  public on(event: string, callback: (...args: any[]) => void) {
    if (this.socket) {
      this.socket.on(event, callback);
    }
  }

  public off(event: string, callback?: (...args: any[]) => void) {
    if (this.socket) {
      this.socket.off(event, callback);
    }
  }
}

// Create singleton instance
export const socketManager = new SocketManager();
export const socket = socketManager.getSocket();
