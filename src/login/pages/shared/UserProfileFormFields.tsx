import { useEffect, Fragment } from 'react';
import { useFormValidation } from 'keycloakify/login/lib/useFormValidation';
import type { Attribute } from 'keycloakify/login/kcContext/KcContext';
import type { I18n } from '../../i18n';

export type UserProfileFormFieldsProps = {
    kcContext: Parameters<typeof useFormValidation>[0]['kcContext'];
    i18n: I18n;
    onIsFormSubmittableValueChange: (
        isFormSubmittable: boolean,
    ) => void;
    BeforeField?: (props: {
        attribute: Attribute;
    }) => JSX.Element | null;
    AfterField?: (props: {
        attribute: Attribute;
    }) => JSX.Element | null;
};

export function UserProfileFormFields(
    props: UserProfileFormFieldsProps,
) {
    const {
        kcContext,
        onIsFormSubmittableValueChange,
        i18n,
        BeforeField,
        AfterField,
    } = props;
    const { advancedMsg } = i18n;
    const {
        formValidationState: {
            fieldStateByAttributeName,
            isFormSubmittable,
        },
        formValidationDispatch,
        attributesWithPassword,
    } = useFormValidation({
        kcContext,
        i18n,
    });

    useEffect(() => {
        onIsFormSubmittableValueChange(isFormSubmittable);
    }, [isFormSubmittable]);

    let currentGroup = '';

    return (
        <>
            {attributesWithPassword.map((attribute, i) => {
                const {
                    group = '',
                    groupDisplayHeader = '',
                    groupDisplayDescription = '',
                } = attribute;

                const { value, displayableErrors } =
                    fieldStateByAttributeName[attribute.name];

                return (
                    <Fragment key={i}>
                        {group !== currentGroup &&
                            (currentGroup = group) !== '' && (
                                <div>
                                    <div>
                                        <label id={`header-${group}`}>
                                            {advancedMsg(
                                                groupDisplayHeader,
                                            ) || currentGroup}
                                        </label>
                                    </div>
                                    {groupDisplayDescription !==
                                        '' && (
                                        <div>
                                            <label
                                                id={`description-${group}`}
                                            >
                                                {advancedMsg(
                                                    groupDisplayDescription,
                                                )}
                                            </label>
                                        </div>
                                    )}
                                </div>
                            )}

                        {BeforeField && (
                            <BeforeField attribute={attribute} />
                        )}

                        <div>
                            <div>
                                <label htmlFor={attribute.name}>
                                    {advancedMsg(
                                        attribute.displayName ?? '',
                                    )}
                                </label>
                                {attribute.required && <>*</>}
                            </div>
                            <div>
                                {(() => {
                                    const { options } =
                                        attribute.validators;

                                    if (options !== undefined) {
                                        return (
                                            <select
                                                id={attribute.name}
                                                name={attribute.name}
                                                onChange={(event) =>
                                                    formValidationDispatch(
                                                        {
                                                            action: 'update value',
                                                            name: attribute.name,
                                                            newValue:
                                                                event
                                                                    .target
                                                                    .value,
                                                        },
                                                    )
                                                }
                                                onBlur={() =>
                                                    formValidationDispatch(
                                                        {
                                                            action: 'focus lost',
                                                            name: attribute.name,
                                                        },
                                                    )
                                                }
                                                value={value}
                                            >
                                                {options.options.map(
                                                    (option) => (
                                                        <option
                                                            key={
                                                                option
                                                            }
                                                            value={
                                                                option
                                                            }
                                                        >
                                                            {option}
                                                        </option>
                                                    ),
                                                )}
                                            </select>
                                        );
                                    }

                                    return (
                                        <input
                                            type={(() => {
                                                switch (
                                                    attribute.name
                                                ) {
                                                    case 'password-confirm':
                                                    case 'password':
                                                        return 'password';
                                                    default:
                                                        return 'text';
                                                }
                                            })()}
                                            id={attribute.name}
                                            name={attribute.name}
                                            value={value}
                                            onChange={(event) =>
                                                formValidationDispatch(
                                                    {
                                                        action: 'update value',
                                                        name: attribute.name,
                                                        newValue:
                                                            event
                                                                .target
                                                                .value,
                                                    },
                                                )
                                            }
                                            onBlur={() =>
                                                formValidationDispatch(
                                                    {
                                                        action: 'focus lost',
                                                        name: attribute.name,
                                                    },
                                                )
                                            }
                                            aria-invalid={
                                                displayableErrors.length !==
                                                0
                                            }
                                            disabled={
                                                attribute.readOnly
                                            }
                                            autoComplete={
                                                attribute.autocomplete
                                            }
                                        />
                                    );
                                })()}
                                {displayableErrors.length !== 0 &&
                                    (() => {
                                        const divId = `input-error-${attribute.name}`;

                                        return (
                                            <>
                                                <style>{`#${divId} > span: { display: block; }`}</style>
                                                <span
                                                    id={divId}
                                                    style={{
                                                        position:
                                                            displayableErrors.length ===
                                                            1
                                                                ? 'absolute'
                                                                : undefined,
                                                    }}
                                                    aria-live="polite"
                                                >
                                                    {displayableErrors.map(
                                                        ({
                                                            errorMessage,
                                                        }) =>
                                                            errorMessage,
                                                    )}
                                                </span>
                                            </>
                                        );
                                    })()}
                            </div>
                        </div>
                        {AfterField && (
                            <AfterField attribute={attribute} />
                        )}
                    </Fragment>
                );
            })}
        </>
    );
}
