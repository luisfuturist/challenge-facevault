import { Signal, effect, signal } from "@angular/core";

export function debounced<T>(
    sourceSignal: Signal<T>,
    debounceTimeInMs = 0
): Signal<T> {
    const debounceSignal = signal(sourceSignal());

    effect(
        (onCleanup) => {
            const value = sourceSignal();
            const timeout = setTimeout(
                () => debounceSignal.set(value),
                debounceTimeInMs
            );

            onCleanup(() => clearTimeout(timeout));
        },
        { allowSignalWrites: true }
    );

    return debounceSignal;
}
