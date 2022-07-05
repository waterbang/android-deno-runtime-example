declare global {
  export namespace WebSocket {
    interface registerBody {
      public_key: string;
    }
  }
}

export {};
