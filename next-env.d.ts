/// <reference types="next" />
/// <reference types="next/types/global" />

declare module "file-loader!*" {
  const url: string;
  export default url;
}

// for Paint Worklet
declare namespace CSS {
  const paintWorklet: {
    addModule(url: string): void;
  };
}
