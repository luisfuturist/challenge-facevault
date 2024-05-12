import { computed } from "@angular/core";
import { FormField, FormGroup } from "ng-signal-forms";
import { FormGroupCreatorOrSignal } from "ng-signal-forms/lib/models";

export type FieldValidation = ReturnType<typeof createFieldValidation>;

export function createFieldValidation<T>(field: FormField<T>) {
    const errorTip = computed(() => {
        if (!field.touched()) {
            return
        }

        const error = field.errorsArray()[0]

        if (!error) {
            return;
        }

        const isRequired = error.key === 'required';

        if (isRequired) {
            return 'Campo obrigatório.'
        }

        return error.message || 'Campo inválido.'
    })

    const validateStatus = computed(() => {
        return errorTip() ? 'error' : 'success';
    })

    return {
        errorTip,
        validateStatus,
    }
}

export function createFormValidation<T extends FormGroupCreatorOrSignal = {}>(
    form: FormGroup<T>
) {
    type FormValidation = Record<keyof typeof form.controls, FieldValidation>
    const fieldValidations: FormValidation = {} as FormValidation

    for (let key of Object.keys(form.controls)) {
        (fieldValidations as any)[key] = createFieldValidation((form.controls as any)[key])
    }

    return fieldValidations;
}

export function convertToDto<T>(form: FormGroup) {
    const dto: T = {} as T;
    
    for(const key of Object.keys(form.controls)) {
        (dto as any)[key] = (form.controls as any)[key].value();
    }

    return dto;
}
