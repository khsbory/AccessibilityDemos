declare global {
  namespace React {
    interface HTMLAttributes<T> {
      inert?: boolean;
    }
  }
}

export {};