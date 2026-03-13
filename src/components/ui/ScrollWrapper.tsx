'use client';

import { ReactLenis } from '@studio-freight/react-lenis';

export default function ScrollWrapper({ children }: { children: any }) {
  return (
    // @ts-ignore
    <ReactLenis root>
      {children}
    </ReactLenis>
  );
}
