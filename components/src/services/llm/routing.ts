import type { LlmCapabilityState, LlmProviderId } from './types';

export type LlmRuntimeProbe = {
  /** Apple Intelligence / Gemini Nano readiness (not the in-app helper). */
  osState: LlmCapabilityState;
  /** True when generation uses the in-app local helper instead of OS models. */
  usingLocalHelper: boolean;
  activeProviderId: LlmProviderId;
};

/**
 * OS model when ready, otherwise the in-app local helper — never a cloud vendor.
 * Kept free of native imports so the routing stays testable outside a device.
 */
export function decideRuntime(input: {
  preferredId: LlmProviderId;
  /** OS-model readiness; omit when the local helper is forced. */
  osState?: LlmCapabilityState;
}): LlmRuntimeProbe {
  if (input.preferredId === 'local') {
    return { osState: 'unsupported', usingLocalHelper: true, activeProviderId: 'local' };
  }

  const osState = input.osState ?? 'unsupported';
  if (osState === 'available') {
    return { osState, usingLocalHelper: false, activeProviderId: input.preferredId };
  }

  return { osState, usingLocalHelper: true, activeProviderId: 'local' };
}
