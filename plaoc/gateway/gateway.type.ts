declare global {
  export namespace webSocket {
    interface registerBody {
      public_key: string;
    }
  }
}

export {};
